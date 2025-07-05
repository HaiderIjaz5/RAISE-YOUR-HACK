import requests
import json
from typing import List, Dict
from googleapiclient.discovery import build
import facebook
from outscraper import ApiClient
import openai
import os
from dotenv import load_dotenv

load_dotenv()

class CrawlingAgent:
    def __init__(self):
        # API configurations
        self.google_api_key = os.getenv("GOOGLE_API_KEY")
        self.google_cse_id = os.getenv("GOOGLE_CSE_ID")
        self.facebook_token = os.getenv("FACEBOOK_ACCESS_TOKEN")
        self.outscraper_api_key = os.getenv("OUTSCRAPER_API_KEY")
        
        # Grok LLM client
        self.llm_client = openai.OpenAI(
            api_key=os.getenv("GROK_API_KEY"),
            base_url="https://api.x.ai/v1"
        )
        
        # Outscraper client
        self.outscraper = ApiClient(api_key=self.outscraper_api_key)
    
    def search_places(self, query: str, location: str = "") -> List[Dict]:
        """Search places from Google and Facebook"""
        google_results = self._search_google(query, location, 5)
        facebook_results = self._search_facebook(query, location, 5)
        return google_results + facebook_results
    
    def _search_google(self, query: str, location: str, limit: int) -> List[Dict]:
        try:
            service = build("customsearch", "v1", developerKey=self.google_api_key)
            result = service.cse().list(
                q=f"{query} {location} restaurant hotel attraction",
                cx=self.google_cse_id,
                num=limit
            ).execute()
            
            return [{
                'title': item.get('title', ''),
                'snippet': item.get('snippet', ''),
                'source': 'google'
            } for item in result.get('items', [])]
        except:
            return []
    
    def _search_facebook(self, query: str, location: str, limit: int) -> List[Dict]:
        try:
            graph = facebook.GraphAPI(access_token=self.facebook_token)
            result = graph.request(f"/search?q={query} {location}&type=place&limit={limit}")
            
            return [{
                'title': place.get('name', ''),
                'snippet': place.get('about', ''),
                'source': 'facebook'
            } for place in result.get('data', [])]
        except:
            return []
    
    def format_with_llm(self, raw_results: List[Dict], user_query: str) -> List[Dict]:
        """Format results using Grok LLM"""
        try:
            prompt = f"""
            User Query: "{user_query}"
            Raw results: {json.dumps(raw_results)}
            
            Return JSON array of top 10 relevant places:
            [{{"name": "Place Name", "search_query": "query for maps", "relevance_score": 0.95}}]
            """
            
            response = self.llm_client.chat.completions.create(
                model="grok-beta",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3
            )
            
            return json.loads(response.choices[0].message.content)
        except:
            return [{"name": r.get('title', ''), "search_query": r.get('title', ''), "relevance_score": 1.0} 
                   for r in raw_results[:10]]
    
    def scrape_google_maps(self, place_queries: List[str], location: str = "") -> List[Dict]:
        """Scrape Google Maps using Outscraper with location optimization"""
        try:
            # Add location to queries for better accuracy
            enhanced_queries = []
            for query in place_queries:
                if location and location not in query.lower():
                    enhanced_queries.append(f"{query}, {location}")
                else:
                    enhanced_queries.append(query)
            
            # Use optimized parameters for speed
            results = self.outscraper.google_maps_search(
                query=enhanced_queries,
                limit=10,  # Max speed optimization
                language='en',
                region='US',
                dropDuplicates=True,
                async_request=False  # Real-time response
            )
            
            detailed_places = []
            # Handle response format
            data = results if isinstance(results, list) else results.get('data', [])
            
            for place in data:
                detailed_places.append({
                    'name': place.get('name', ''),
                    'address': place.get('full_address', ''),
                    'phone': place.get('phone', ''),
                    'rating': place.get('rating', 0),
                    'reviews_count': place.get('reviews', 0),
                    'category': place.get('type', ''),
                    'hours': place.get('hours', {}),
                    'photos': place.get('photos_sample', []),
                    'coordinates': {
                        'lat': place.get('latitude', 0),
                        'lng': place.get('longitude', 0)
                    }
                })
            return detailed_places
        except Exception as e:
            print(f"Maps scraping error: {e}")
            return []
    
    def process_travel_query(self, user_query: str) -> Dict:
        """Main processing pipeline with location extraction"""
        # Extract location from query for better results
        location = self._extract_location(user_query)
        
        # Step 1: Search social media
        raw_results = self.search_places(user_query, location)
        if not raw_results:
            return {"error": "No places found"}
        
        # Step 2: Format with LLM
        formatted_places = self.format_with_llm(raw_results, user_query)
        
        # Step 3: Scrape detailed info with location
        place_queries = [place['search_query'] for place in formatted_places]
        detailed_places = self.scrape_google_maps(place_queries, location)
        
        return {
            "formatted_places": formatted_places,
            "detailed_places": detailed_places,
            "total_found": len(detailed_places),
            "location": location
        }
    
    def _extract_location(self, query: str) -> str:
        """Simple location extraction from query"""
        # Common location indicators
        location_words = ['in ', 'at ', 'near ', 'around ']
        query_lower = query.lower()
        
        for word in location_words:
            if word in query_lower:
                location_part = query_lower.split(word, 1)[1]
                # Take first part before comma or end
                location = location_part.split(',')[0].split(' for')[0].strip()
                return location.title()
        
        return ""  # No location found