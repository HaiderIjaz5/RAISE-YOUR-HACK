from search_module import SearchModule
from scraper_module import ScraperModule
from typing import List, Dict
import os
import json
import time
from dotenv import load_dotenv

load_dotenv()

class CrawlingAgent:
    def __init__(self):
        # Initialize modules
        self.search_module = SearchModule(
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            google_cse_id=os.getenv("GOOGLE_CSE_ID")
        )
        self.scraper_module = ScraperModule(
            serpapi_key=os.getenv("SERPAPI_API_KEY")
        )
    
    def crawl_places(self, query: str, location: str = "", limit: int = 5) -> List[Dict]:
        """Complete crawling workflow: search -> scrape -> return detailed data"""
        try:
            # Step 1: Search using Google CSE
            search_results = self.search_module.search_google(query, location, limit)
            if not search_results:
                return []
            
            # Step 2: Format queries for scraping
            scraper_queries = self.search_module.format_for_outscraper(search_results, location)
            
            # Step 3: Scrape detailed data for each place
            detailed_places = []
            for i, result in enumerate(search_results):
                if i < len(scraper_queries):
                    # Use title as name and address from search result
                    name = result.get('title', '').split(' - ')[0]  # Clean title
                    address = result.get('address', '') or scraper_queries[i]
                    
                    print(f"Processing {i+1}/{len(search_results)}: {name}")
                    
                    # Scrape complete data
                    place_data = self.scraper_module.scrape_place_complete(name, address)
                    if place_data:
                        detailed_places.append(place_data)
                    
                    time.sleep(1)  # Rate limiting
            
            return detailed_places
            
        except Exception as e:
            print(f"Crawling error: {e}")
            return []
    
    def scrape_specific_place(self, name: str, address: str) -> Dict:
        """Scrape specific place by name and address"""
        return self.scraper_module.scrape_place_complete(name, address)
    
    def print_place_details(self, place: Dict, place_number: int = 1):
        """Print all place information in a structured format"""
        print("\n" + "=" * 80)
        print(f"PLACE {place_number}: COMPLETE INFORMATION")
        print("=" * 80)
        
        # Basic Information
        print("\n[BASIC INFORMATION]")
        print(f"Name: {place.get('name', 'N/A')}")
        print(f"Address: {place.get('address', 'N/A')}")
        print(f"Phone: {place.get('phone', 'N/A')}")
        print(f"Website: {place.get('website', 'N/A')}")
        print(f"Category: {place.get('category', 'N/A')}")
        print(f"Price Level: {place.get('price_level', 'N/A')}")
        print(f"Business Status: {place.get('business_status', 'N/A')}")
        
        # Ratings & Reviews
        print("\n[RATINGS & REVIEWS]")
        print(f"Rating: {place.get('rating', 'N/A')}/5")
        print(f"Total Reviews: {place.get('reviews_count', 'N/A')}")
        
        # Location Information
        print("\n[LOCATION INFORMATION]")
        coordinates = place.get('coordinates', {})
        if isinstance(coordinates, dict):
            print(f"Latitude: {coordinates.get('lat', 'N/A')}")
            print(f"Longitude: {coordinates.get('lng', 'N/A')}")
        else:
            print(f"Coordinates: {coordinates}")
        print(f"Google Maps Link: {place.get('google_maps_link', 'N/A')}")
        
        # Operating Hours - Fixed to handle both dict and string
        print("\n[OPERATING HOURS]")
        hours = place.get('hours', {})
        if isinstance(hours, dict) and hours:
            for day, time_info in hours.items():
                print(f"{day}: {time_info}")
        elif isinstance(hours, str) and hours:
            print(f"Operating hours: {hours}")
        else:
            print("Operating hours: Not available")
        
        # Review Content
        print("\n[REVIEW CONTENT]")
        review_content = place.get('review_content', {})
        if isinstance(review_content, dict):
            extracted_reviews = review_content.get('reviews', [])
            print(f"Extracted Reviews: {len(extracted_reviews)}")
            print(f"Average Rating from Reviews: {review_content.get('average_rating', 'N/A')}")
            
            if extracted_reviews:
                print("\nSample Reviews:")
                for i, review in enumerate(extracted_reviews[:3], 1):
                    if isinstance(review, dict):
                        print(f"\n  Review {i}:")
                        print(f"    Rating: {review.get('rating', 'N/A')}/5")
                        print(f"    Author: {review.get('author', 'Anonymous')}")
                        print(f"    Date: {review.get('date', 'N/A')}")
                        review_text = review.get('text', 'N/A')
                        if isinstance(review_text, str) and len(review_text) > 200:
                            review_text = review_text[:200] + "..."
                        print(f"    Text: {review_text}")
                        print(f"    Source: {review.get('source', 'N/A')}")
        else:
            print(f"Review content: {review_content}")
        
        # Additional Information
        print("\n[ADDITIONAL INFORMATION]")
        print(f"Place ID: {place.get('place_id', 'N/A')}")
        print(f"Verified: {place.get('verified', 'N/A')}")
        
        # Raw Data Summary
        print("\n[RAW DATA SUMMARY]")
        raw_data = place.get('raw_serpapi_data', {})
        if isinstance(raw_data, dict) and raw_data:
            print(f"Raw data keys: {list(raw_data.keys())}")
            print(f"Data source: SerpApi")
        else:
            print("No raw data available")
        
        print("\n" + "=" * 80)
    
    def safe_get_numeric(self, value, default=0):
        """Safely get numeric value"""
        try:
            return float(value) if value is not None else default
        except (ValueError, TypeError):
            return default
    
    def safe_get_list_length(self, data, key, default=0):
        """Safely get length of list in nested dict"""
        try:
            item = data.get(key, {})
            if isinstance(item, dict):
                reviews = item.get('reviews', [])
                return len(reviews) if isinstance(reviews, list) else default
            return default
        except:
            return default
    
    def save_to_json(self, data: List[Dict], filename: str = None):
        """Save data to JSON file"""
        if not filename:
            timestamp = time.strftime("%Y%m%d_%H%M%S")
            filename = f"crawled_places_{timestamp}.json"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"\nData saved to: {filename}")
            return filename
        except Exception as e:
            print(f"Error saving to JSON: {e}")
            return None


# Test
if __name__ == "__main__":
    agent = CrawlingAgent()
    
    # Test parameters
    test_query = "korean restaurant"
    test_location = "Da Nang"
    test_limit = 2
    
    print(f"Starting crawling test...")
    print(f"Query: {test_query}")
    print(f"Location: {test_location}")
    print(f"Limit: {test_limit}")
    
    # Test complete crawling
    print(f"\nTesting complete crawling...")
    detailed_results = agent.crawl_places(test_query, test_location, test_limit)
    print(f"Crawled {len(detailed_results)} detailed places")
    
    if detailed_results:
        # Print detailed information for each place
        for i, place in enumerate(detailed_results, 1):
            try:
                agent.print_place_details(place, i)
            except Exception as e:
                print(f"Error printing place {i}: {e}")
                print(f"Place data: {place}")
        
        # Save all results to JSON
        json_file = agent.save_to_json(detailed_results)
        
        # Additional test: scrape specific place
        print(f"\n{'='*80}")
        print("TESTING SPECIFIC PLACE SCRAPING")
        print("="*80)
        
        first_place = detailed_results[0]
        print(f"Re-scraping: {first_place.get('name', 'Unknown')}")
        
        try:
            scrape_result = agent.scrape_specific_place(
                first_place.get('name', ''), 
                first_place.get('address', '')
            )
            
            if scrape_result:
                print(f"\nRe-scrape successful!")
                print(f"Name: {scrape_result.get('name', 'N/A')}")
                print(f"Address: {scrape_result.get('address', 'N/A')}")
                print(f"Rating: {scrape_result.get('rating', 'N/A')}")
                reviews_count = agent.safe_get_list_length(scrape_result, 'review_content')
                print(f"Reviews extracted: {reviews_count}")
            else:
                print("Re-scrape failed!")
        except Exception as e:
            print(f"Re-scrape error: {e}")
        
        # Summary with error handling
        print(f"\n{'='*80}")
        print("CRAWLING SUMMARY")
        print("="*80)
        print(f"Total places crawled: {len(detailed_results)}")
        
        try:
            total_reviews = sum(agent.safe_get_list_length(place, 'review_content') for place in detailed_results)
            print(f"Total reviews extracted: {total_reviews}")
            
            ratings = [agent.safe_get_numeric(place.get('rating')) for place in detailed_results]
            ratings = [r for r in ratings if r > 0]  # Filter out 0 ratings
            avg_rating = sum(ratings) / len(ratings) if ratings else 0
            print(f"Average rating: {avg_rating:.1f}/5")
            
            places_with_coords = 0
            for place in detailed_results:
                coords = place.get('coordinates', {})
                if isinstance(coords, dict) and coords.get('lat'):
                    places_with_coords += 1
            print(f"Places with coordinates: {places_with_coords}/{len(detailed_results)}")
            
        except Exception as e:
            print(f"Error calculating summary: {e}")
        
        if json_file:
            print(f"Results saved to: {json_file}")
        
    else:
        print("No places found!")
    
    print(f"\nCrawling test completed!")