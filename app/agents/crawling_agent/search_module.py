from googleapiclient.discovery import build
import facebook
from typing import List, Dict
import os

class SearchModule:
    def __init__(self, google_api_key: str, google_cse_id: str, facebook_token: str):
        self.google_api_key = google_api_key
        self.google_cse_id = google_cse_id
        self.facebook_token = facebook_token
    
    def search_google(self, query: str, location: str = "", limit: int = 5) -> List[Dict]:
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
                'link': item.get('link', ''),
                'source': 'google'
            } for item in result.get('items', [])]
        except Exception as e:
            print(f"Google search error: {e}")
            return []
    
    def search_facebook(self, query: str, location: str = "", limit: int = 5) -> List[Dict]:
        try:
            graph = facebook.GraphAPI(access_token=self.facebook_token)
            result = graph.request(f"/search?q={query} {location}&type=place&limit={limit}")
            
            return [{
                'title': place.get('name', ''),
                'snippet': place.get('about', ''),
                'link': f"https://facebook.com/{place.get('id', '')}",
                'source': 'facebook',
                'category': place.get('category', '')
            } for place in result.get('data', [])]
        except Exception as e:
            print(f"Facebook search error: {e}")
            return []