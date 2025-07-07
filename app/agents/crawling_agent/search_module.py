from googleapiclient.discovery import build
from typing import List, Dict
import os
import requests
from bs4 import BeautifulSoup
import time
import random

class SearchModule:
    def __init__(self, google_api_key: str, google_cse_id: str):
        self.google_api_key = google_api_key
        self.google_cse_id = google_cse_id
    
    def search_google(self, query: str, location: str = "", limit: int = 5) -> List[Dict]:
        try:
            service = build("customsearch", "v1", developerKey=self.google_api_key)
            result = service.cse().list(
                q=f"{query} {location}",
                cx=self.google_cse_id,
                num=limit
            ).execute()
            
            search_results = []
            for item in result.get('items', []):
                # Extract only essential information
                result_data = {
                    'title': item.get('title', ''),
                    'snippet': item.get('snippet', ''),
                    'link': item.get('link', ''),
                    'displayLink': item.get('displayLink', ''),
                    'images': 0,  # Default to 0 images
                    'address': None  # Add address field
                }
                
                # Count images if available
                if 'pagemap' in item and 'cse_image' in item['pagemap']:
                    result_data['images'] = len(item['pagemap']['cse_image'])
                
                # Extract address if it's a TripAdvisor link
                if 'tripadvisor.com' in item.get('link', '').lower():
                    print(f"   Extracting address from TripAdvisor: {result_data['title']}")
                    address = self.extract_tripadvisor_address(item.get('link', ''))
                    result_data['address'] = address
                
                search_results.append(result_data)
            
            return search_results
                
        except Exception as e:
            print(f"Google search error: {e}")
            return []
    
    def extract_tripadvisor_address(self, url):
        """Extract address from TripAdvisor using restaurantsMapLinkOnName"""
        user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        ]
        
        headers = {
            "User-Agent": random.choice(user_agents),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9"
        }
        
        try:
            time.sleep(random.uniform(1, 2))
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, "html.parser")
            
            # Find address with data-automation="restaurantsMapLinkOnName"
            address_element = soup.find("span", {"data-automation": "restaurantsMapLinkOnName"})
            
            if address_element:
                address = address_element.get_text(strip=True)
                return address if address else None
            
            return None
            
        except Exception as e:
            print(f"      Address extraction error: {e}")
            return None
    
    def format_for_outscraper(self, search_results: List[Dict], location: str = "") -> List[str]:
        """Format search results for Outscraper API queries"""
        outscraper_queries = []
        
        for result in search_results:
            title = result.get('title', '')
            address = result.get('address', '')
            
            # Clean title (remove review site info)
            clean_title = title.split(' - ')[0] if ' - ' in title else title
            
            # Create query for Outscraper
            if address:
                # Use address if available (most accurate)
                query = address
            elif clean_title:
                # Use clean title with location
                if location and location.lower() not in clean_title.lower():
                    query = f"{clean_title}, {location}"
                else:
                    query = clean_title
            else:
                continue
            
            if query:
                outscraper_queries.append(query)
        
        return outscraper_queries


# # Test
# if __name__ == "__main__":
#     API_KEY = "AIzaSyCduYWt508zC0GvCGwGQp6WD8T7hZDE4Ho"
#     CSE_ID = "d14ae020547a945d4"
    
#     search = SearchModule(API_KEY, CSE_ID)
#     results = search.search_google("korean restaurant", "Da Nang", 5)
    
#     print("Search Results with Addresses:")
#     print("=" * 50)
    
#     for i, result in enumerate(results, 1):
#         print(f"\n{i}. {result['title']}")
#         print(f"   URL: {result['link']}")
#         print(f"   Domain: {result['displayLink']}")
#         if result['address']:
#             print(f"   Address: {result['address']}")
#         else:
#             print(f"   Address: Not found")
    
#     # Format for Outscraper
#     print(f"\n\nFormatted Queries for Outscraper:")
#     print("=" * 40)
    
#     outscraper_queries = search.format_for_outscraper(results, "Da Nang")
    
#     for i, query in enumerate(outscraper_queries, 1):
#         print(f"{i}. {query}")
    
#     print(f"\nTotal queries for Outscraper: {len(outscraper_queries)}")