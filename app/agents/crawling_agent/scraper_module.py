import requests
import urllib.parse
from typing import List, Dict, Optional
import time
import json
from bs4 import BeautifulSoup
import re

class ScraperModule:
    def __init__(self, serpapi_key: str):
        self.serpapi_key = serpapi_key
        self.serpapi_url = "https://serpapi.com/search"
    
    def scrape_place_complete(self, name: str, address: str) -> Dict:
        """Complete scraping workflow: search -> filter -> get reviews -> extract content"""
        try:
            print(f"Starting complete scraping for: {name}")
            print(f"Address: {address}")
            print("-" * 50)
            
            # Step 1: Search with SerpApi to get place info
            print("Step 1: Searching with SerpApi...")
            search_results = self._search_with_serpapi(name, address)
            
            if not search_results:
                print("No search results found")
                return {}
            
            # Step 2: Filter and find best matching place
            print("Step 2: Filtering best matching place...")
            best_place = self._find_best_match(search_results, name, address)
            
            if not best_place:
                print("No matching place found")
                return {}
            
            # Step 3: Get reviews using SerpApi reviews link
            print("Step 3: Extracting review content...")
            review_content = self._extract_review_content_serpapi(best_place)
            
            # Step 4: Combine all data
            print("Step 4: Combining all data...")
            final_result = self._format_final_result(best_place, review_content)
            
            print("✓ Complete scraping finished successfully")
            return final_result
            
        except Exception as e:
            print(f"Error in complete scraping: {e}")
            return {}
    
    def _search_with_serpapi(self, name: str, address: str) -> List[Dict]:
        """Search using SerpApi and return results as JSON"""
        try:
            # Try multiple query variations
            queries = [
                f"{name}, {address}",
                f"{name} {address}",
                address,
                name
            ]
            
            for query in queries:
                print(f"   Trying query: {query}")
                
                params = {
                    "engine": "google_maps",
                    "q": query,
                    "api_key": self.serpapi_key
                }
                
                response = requests.get(self.serpapi_url, params=params)
                data = response.json()
                
                if "local_results" in data and data["local_results"]:
                    print(f"   Found {len(data['local_results'])} results")
                    return data["local_results"]
                
                time.sleep(1)  # Rate limiting
            
            print("   No results found with any query")
            return []
            
        except Exception as e:
            print(f"   SerpApi search error: {e}")
            return []
    
    def _find_best_match(self, search_results: List[Dict], target_name: str, target_address: str) -> Optional[Dict]:
        """Filter and find the best matching place from search results"""
        try:
            best_match = None
            best_score = 0
            
            print(f"   Evaluating {len(search_results)} places...")
            
            for i, place in enumerate(search_results, 1):
                place_name = place.get('title', '').lower()
                place_address = place.get('address', '').lower()
                
                # Calculate match score
                name_score = self._calculate_similarity(target_name.lower(), place_name)
                address_score = self._calculate_similarity(target_address.lower(), place_address)
                
                # Weighted score (name 40%, address 60%)
                total_score = (name_score * 0.4) + (address_score * 0.6)
                
                print(f"   {i}. {place.get('title', 'Unknown')}")
                print(f"      Name score: {name_score:.2f}, Address score: {address_score:.2f}")
                print(f"      Total score: {total_score:.2f}")
                
                if total_score > best_score:
                    best_score = total_score
                    best_match = place
            
            if best_match:
                print(f"   Best match: {best_match.get('title', 'Unknown')} (score: {best_score:.2f})")
                return best_match
            else:
                print("   No good match found")
                return None
                
        except Exception as e:
            print(f"   Error finding best match: {e}")
            return None
    
    def _calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate text similarity (simple word overlap method)"""
        if not text1 or not text2:
            return 0.0
        
        words1 = set(re.findall(r'\w+', text1.lower()))
        words2 = set(re.findall(r'\w+', text2.lower()))
        
        if not words1 or not words2:
            return 0.0
        
        intersection = words1.intersection(words2)
        union = words1.union(words2)
        
        return len(intersection) / len(union) if union else 0.0
    
    def _extract_review_content_serpapi(self, place: Dict) -> Dict:
        """Extract review content using SerpApi reviews link"""
        try:
            review_content = {
                'reviews': [],
                'review_summary': '',
                'total_reviews': 0,
                'average_rating': 0
            }
            
            # Get reviews link from place data
            reviews_link = place.get('reviews_link', '')
            if not reviews_link:
                print("   No reviews link found")
                return review_content
            
            print(f"   Accessing SerpApi reviews: {reviews_link}")
            
            # Parse the reviews link to extract parameters
            if "serpapi.com" in reviews_link:
                # Add API key to the reviews link
                if "api_key=" not in reviews_link:
                    separator = "&" if "?" in reviews_link else "?"
                    reviews_link = f"{reviews_link}{separator}api_key={self.serpapi_key}"
                
                # Make request to SerpApi reviews endpoint
                response = requests.get(reviews_link, timeout=30)
                
                if response.status_code == 200:
                    reviews_data = response.json()
                    
                    # Extract reviews from SerpApi response
                    reviews = self._parse_serpapi_reviews(reviews_data)
                    review_content['reviews'] = reviews
                    review_content['total_reviews'] = len(reviews)
                    
                    # Calculate average rating from extracted reviews
                    if reviews:
                        ratings = [r.get('rating', 0) for r in reviews if r.get('rating')]
                        if ratings:
                            review_content['average_rating'] = sum(ratings) / len(ratings)
                    
                    # Get summary from place data if available
                    if 'reviews' in reviews_data:
                        total_from_api = reviews_data.get('place', {}).get('reviews', 0)
                        if total_from_api:
                            review_content['total_reviews'] = total_from_api
                    
                    print(f"   Extracted {len(reviews)} reviews from SerpApi")
                else:
                    print(f"   Failed to access SerpApi reviews (status: {response.status_code})")
            else:
                # Fallback to regular web scraping if not SerpApi link
                print("   Using fallback web scraping...")
                review_content = self._extract_review_content_web(reviews_link)
            
            return review_content
            
        except Exception as e:
            print(f"   Error extracting review content: {e}")
            return {
                'reviews': [],
                'review_summary': '',
                'total_reviews': 0,
                'average_rating': 0
            }
    
    def _parse_serpapi_reviews(self, reviews_data: Dict) -> List[Dict]:
        """Parse reviews from SerpApi reviews response"""
        reviews = []
        
        try:
            # Get reviews from the response
            if 'reviews' in reviews_data:
                api_reviews = reviews_data['reviews']
                
                for review in api_reviews[:10]:  # Limit to 10 reviews
                    review_item = {
                        'text': review.get('snippet', review.get('text', '')),
                        'rating': review.get('rating', 0),
                        'author': review.get('user', {}).get('name', 'Anonymous'),
                        'date': review.get('date', ''),
                        'source': 'serpapi'
                    }
                    
                    # Only add meaningful reviews
                    if len(review_item['text']) > 20:
                        reviews.append(review_item)
                
                print(f"   Parsed {len(reviews)} reviews from SerpApi")
            else:
                print(f"   No 'reviews' key found in SerpApi response")
                print(f"   Available keys: {list(reviews_data.keys())}")
            
            return reviews
            
        except Exception as e:
            print(f"   Error parsing SerpApi reviews: {e}")
            return []
    
    def _extract_review_content_web(self, reviews_link: str) -> Dict:
        """Fallback method for web scraping reviews"""
        try:
            review_content = {
                'reviews': [],
                'review_summary': '',
                'total_reviews': 0,
                'average_rating': 0
            }
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            
            response = requests.get(reviews_link, headers=headers, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Extract reviews (this depends on the website structure)
                reviews = self._parse_reviews_from_html(soup)
                review_content['reviews'] = reviews
                review_content['total_reviews'] = len(reviews)
                
                if reviews:
                    ratings = [r.get('rating', 0) for r in reviews if r.get('rating')]
                    if ratings:
                        review_content['average_rating'] = sum(ratings) / len(ratings)
                
                print(f"   Extracted {len(reviews)} reviews via web scraping")
            else:
                print(f"   Failed to access reviews (status: {response.status_code})")
            
            return review_content
            
        except Exception as e:
            print(f"   Error in web scraping: {e}")
            return {
                'reviews': [],
                'review_summary': '',
                'total_reviews': 0,
                'average_rating': 0
            }
    
    def _parse_reviews_from_html(self, soup: BeautifulSoup) -> List[Dict]:
        """Parse reviews from HTML content (generic parser)"""
        reviews = []
        
        try:
            # Generic patterns for different review sites
            review_patterns = [
                # TripAdvisor patterns
                {'container': 'div', 'class': 'review-item'},
                {'container': 'div', 'class': 'reviewContainer'},
                # Google patterns
                {'container': 'div', 'class': 'JFGH6S'},
                # Generic patterns
                {'container': 'div', 'class': 'review'},
                {'container': 'div', 'class': 'comment'}
            ]
            
            for pattern in review_patterns:
                review_elements = soup.find_all(pattern['container'], class_=pattern['class'])
                
                if review_elements:
                    for element in review_elements[:5]:  # Limit to 5 reviews
                        review_text = element.get_text(strip=True)
                        if len(review_text) > 50:  # Only meaningful reviews
                            reviews.append({
                                'text': review_text[:500],  # Limit length
                                'rating': self._extract_rating_from_element(element),
                                'source': 'scraped'
                            })
                    break  # Use first successful pattern
            
            return reviews
            
        except Exception as e:
            print(f"   Error parsing reviews: {e}")
            return []
    
    def _extract_rating_from_element(self, element) -> float:
        """Extract rating from review element"""
        try:
            # Look for rating patterns
            rating_patterns = [
                r'(\d+(?:\.\d+)?)\s*(?:out of|/)\s*5',
                r'(\d+(?:\.\d+)?)\s*stars?',
                r'rating["\s:]*(\d+(?:\.\d+)?)'
            ]
            
            element_text = element.get_text()
            
            for pattern in rating_patterns:
                match = re.search(pattern, element_text, re.IGNORECASE)
                if match:
                    return float(match.group(1))
            
            return 0.0
            
        except:
            return 0.0
    
    def _format_final_result(self, place: Dict, review_content: Dict) -> Dict:
        """Format final result combining place info and review content"""
        gps = place.get('gps_coordinates', {})
        
        # Create Google Maps link
        address = place.get('address', '')
        name = place.get('title', '')
        maps_link = self._create_google_maps_link(address, name)
        
        return {
            # Basic place information
            'name': name,
            'address': address,
            'phone': place.get('phone', ''),
            'website': place.get('website', ''),
            'rating': place.get('rating', 0),
            'reviews_count': place.get('reviews', 0),
            'category': place.get('type', ''),
            'price_level': place.get('price', ''),
            
            # Location information
            'coordinates': {
                'lat': gps.get('latitude', 0),
                'lng': gps.get('longitude', 0)
            },
            'google_maps_link': maps_link,
            
            # Review content (extracted from SerpApi)
            'review_content': review_content,
            
            # Additional info
            'hours': place.get('hours', {}),
            'place_id': place.get('place_id', ''),
            'verified': True,
            'business_status': 'OPERATIONAL',
            
            # Raw data for reference
            'raw_serpapi_data': place
        }
    
    def _create_google_maps_link(self, address: str, name: str = "") -> str:
        """Create Google Maps link"""
        if name and address:
            full_query = f"{name}, {address}"
            encoded_query = urllib.parse.quote(full_query)
            return f"https://maps.google.com/maps/search/{encoded_query}/"
        elif address:
            encoded_address = urllib.parse.quote(address)
            return f"https://maps.google.com/maps/search/{encoded_address}/"
        else:
            return ""


# # Test with search results data
# if __name__ == "__main__":
#     # API key for SerpApi
#     SERPAPI_KEY = "ab3152b8ec37b04ad1812b44d75230b8de3c8fb49bd80eb5712d9237fedbf010"
    
#     # Test data from search_results.txt
#     test_places = [
#         {
#             "name": "DANANG JOOBANG KOREA RESTAURANT",
#             "address": "17 Nguyễn Thái Học, Hai Chau, Da Nang 550000 Vietnam"
#         }
#     ]
    
#     scraper = ScraperModule(SERPAPI_KEY)
    
#     print("Complete Scraping Workflow Test with SerpApi Reviews")
#     print("=" * 60)
#     print("Workflow: Search -> Filter -> Extract Reviews (SerpApi) -> Output JSON")
#     print("=" * 60)
    
#     all_results = []
    
#     for i, place in enumerate(test_places, 1):
#         print(f"\n{'='*20} TEST {i} {'='*20}")
        
#         # Run complete scraping workflow
#         result = scraper.scrape_place_complete(place['name'], place['address'])
        
#         if result:
#             print(f"\n✓ SUCCESS - Complete data extracted:")
#             print(f"   Name: {result['name']}")
#             print(f"   Address: {result['address']}")
#             print(f"   Phone: {result['phone']}")
#             print(f"   Rating: {result['rating']} ({result['reviews_count']} reviews)")
#             print(f"   Category: {result['category']}")
#             print(f"   Google Maps: {result['google_maps_link']}")
#             print(f"   Review Content: {len(result['review_content']['reviews'])} reviews extracted")
#             print(f"   Average Rating: {result['review_content']['average_rating']:.1f}")
            
#             # Show sample reviews
#             if result['review_content']['reviews']:
#                 print(f"\n   Sample Reviews:")
#                 for j, review in enumerate(result['review_content']['reviews'][:3], 1):
#                     print(f"   {j}. Rating: {review.get('rating', 'N/A')} - {review.get('text', '')[:100]}...")
            
#             all_results.append(result)
#         else:
#             print(f"\n✗ FAILED - No data extracted for {place['name']}")
        
#         print("\n" + "="*50)
        
#         # Rate limiting between requests
#         if i < len(test_places):
#             time.sleep(2)
    
#     # Save all results to JSON file
#     if all_results:
#         output_file = "scraped_places_complete.json"
#         with open(output_file, 'w', encoding='utf-8') as f:
#             json.dump(all_results, f, indent=2, ensure_ascii=False)
        
#         print(f"\n🎉 All results saved to {output_file}")
#         print(f"Total places successfully scraped: {len(all_results)}")
        
#         # Print final summary
#         total_reviews = sum(len(result['review_content']['reviews']) for result in all_results)
#         print(f"Total reviews extracted: {total_reviews}")
#     else:
#         print("\nNo results to save")
    
#     print("\nComplete scraping workflow finished!")