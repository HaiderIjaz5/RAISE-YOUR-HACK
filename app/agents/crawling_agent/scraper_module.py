from outscraper import ApiClient
from typing import List, Dict

class ScraperModule:
    def __init__(self, api_key: str):
        self.client = ApiClient(api_key=api_key)
    
    def scrape_google_maps(self, place_queries: List[str]) -> List[Dict]:
        try:
            # Use Outscraper Google Places v3 API with speed optimization
            results = self.client.google_maps_search(
                query=place_queries,  # Support batching up to 250 queries
                limit=10,  # Set to 10 for maximum speed as per docs
                language='en',
                region='US',
                dropDuplicates=True,  # Remove duplicates across queries
                async_request=False  # Real-time API for fast response
            )
            
            detailed_places = []
            # Handle both single array and nested array responses
            data = results if isinstance(results, list) else results.get('data', [])
            
            for place in data:
                detailed_places.append({
                    'name': place.get('name', ''),
                    'address': place.get('full_address', ''),
                    'phone': place.get('phone', ''),
                    'website': place.get('site', ''),
                    'rating': place.get('rating', 0),
                    'reviews_count': place.get('reviews', 0),
                    'category': place.get('type', ''),
                    'price_level': place.get('price_level', ''),
                    'hours': place.get('hours', {}),
                    'photos': place.get('photos_sample', []),
                    'reviews_sample': place.get('reviews_data', [])[:3],
                    'coordinates': {
                        'lat': place.get('latitude', 0),
                        'lng': place.get('longitude', 0)
                    },
                    'description': place.get('description', ''),
                    'amenities': place.get('amenities', [])
                })
            return detailed_places
        except Exception as e:
            print(f"Scraping error: {e}")
            return []
    
    def scrape_with_location(self, queries: List[str], location: str = "") -> List[Dict]:
        """Enhanced search with location for better accuracy"""
        try:
            # Add location to queries for better results
            location_queries = []
            for query in queries:
                if location and location not in query:
                    location_queries.append(f"{query}, {location}")
                else:
                    location_queries.append(query)
            
            return self.scrape_google_maps(location_queries)
        except Exception as e:
            print(f"Location search error: {e}")
            return []
    
    def get_place_reviews(self, place_id: str, limit: int = 10) -> List[Dict]:
        try:
            reviews = self.client.google_maps_reviews([place_id], reviews_limit=limit)
            
            formatted_reviews = []
            for review_set in reviews:
                for review in review_set:
                    formatted_reviews.append({
                        'author': review.get('author_title', ''),
                        'rating': review.get('review_rating', 0),
                        'text': review.get('review_text', ''),
                        'date': review.get('review_datetime_utc', '')
                    })
            return formatted_reviews
        except Exception as e:
            print(f"Reviews error: {e}")
            return []