import openai
import json
from typing import List, Dict

class LLMFormatter:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(
            api_key=api_key,
            base_url="https://api.x.ai/v1"
        )
    
    def format_search_results(self, raw_results: List[Dict], user_query: str) -> List[Dict]:
        try:
            prompt = f"""
            User Query: "{user_query}"
            Raw results: {json.dumps(raw_results, indent=2)}
            
            Format and rank these results. Return JSON array of top 10 relevant places:
            [
                {{
                    "name": "Place Name",
                    "description": "Brief description",
                    "relevance_score": 0.95,
                    "source": "google/facebook",
                    "category": "restaurant/hotel/attraction",
                    "search_query": "formatted query for Google Maps"
                }}
            ]
            """
            
            response = self.client.chat.completions.create(
                model="grok-beta",
                messages=[
                    {"role": "system", "content": "You are a travel assistant that formats search results."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )
            
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"LLM formatting error: {e}")
            return self._fallback_format(raw_results)
    
    def _fallback_format(self, raw_results: List[Dict]) -> List[Dict]:
        formatted = []
        for i, result in enumerate(raw_results[:10]):
            formatted.append({
                "name": result.get('title', f'Place {i+1}'),
                "description": result.get('snippet', ''),
                "relevance_score": 1.0 - (i * 0.1),
                "source": result.get('source', 'unknown'),
                "category": "general",
                "search_query": result.get('title', '')
            })
        return formatted
    
    def generate_summary(self, detailed_places: List[Dict], user_query: str) -> Dict:
        try:
            prompt = f"""
            User Query: "{user_query}"
            Places data: {json.dumps(detailed_places, indent=2)}
            
            Create travel summary JSON:
            {{
                "summary": "Overall recommendations summary",
                "top_recommendations": [
                    {{
                        "name": "Place name",
                        "why_recommended": "Reason",
                        "rating": 4.5,
                        "price_level": "$$$"
                    }}
                ]
            }}
            """
            
            response = self.client.chat.completions.create(
                model="grok-beta",
                messages=[
                    {"role": "system", "content": "You are a travel planning expert."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5
            )
            
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"Summary error: {e}")
            return {"summary": "Unable to generate summary", "top_recommendations": []}