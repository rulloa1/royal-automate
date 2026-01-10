# website_generator.py
import requests
import json
from datetime import datetime
import cloudflare

class WebsiteGenerator:
    def __init__(self, relume_api_key, webflow_api_key, cloudflare_token):
        self.relume_api_key = relume_api_key
        self.webflow_api_key = webflow_api_key
        self.cloudflare_token = cloudflare_token
        self.cf = cloudflare.Cloudflare(api_token=cloudflare_token)
        
    def generate_website(self, agent_data):
        """Generate website using Relume and Webflow"""
        try:
            # Generate sitemap with Relume
            sitemap = self._generate_sitemap(agent_data)
            
            # Create Webflow site
            webflow_site = self._create_webflow_site(agent_data, sitemap)
            
            # Create subdomain
            subdomain = self._create_subdomain(agent_data)
            
            return {
                'website_url': f"https://{subdomain}",
                'webflow_id': webflow_site['id'],
                'status': 'created'
            }
        except Exception as e:
            print(f"Website generation error: {e}")
            return None
    
    def _generate_sitemap(self, agent_data):
        """Generate website structure with Relume"""
        # Use Relume API to create sitemap
        prompt = f"""
        Create a professional real estate website for {agent_data['agent_name']}
        Include: Home, About, Listings, Services, Contact pages
        Focus on {agent_data['city_area']} real estate market
        Include lead capture forms and property search functionality
        """
        
        # This would call Relume API
        return {
            'pages': ['home', 'about', 'listings', 'services', 'contact'],
            'components': ['hero', 'property-search', 'testimonials', 'contact-form']
        }
    
    def _create_webflow_site(self, agent_data, sitemap):
        """Create Webflow site and populate with data"""
        # Create Webflow site via API
        site_data = {
            'name': f"{agent_data['agent_name']} Real Estate",
            'template': 'real-estate-professional',
            'custom_attributes': {
                'agent_name': agent_data['agent_name'],
                'brokerage': agent_data['brokerage'],
                'phone': agent_data['phone'],
                'email': agent_data['email'],
                'city_area': agent_data['city_area'],
                'headshot_url': agent_data.get('headshot'),
                'bio': agent_data.get('bio', 'Experienced real estate professional')
            }
        }
        
        return site_data
    
    def _create_subdomain(self, agent_data):
        """Create unique subdomain"""
        subdomain = f"{agent_data['agent_name'].lower().replace(' ', '')}{agent_data['agent_name'].split()[-1].lower()}"
        
        # Create DNS record in Cloudflare
        zone_id = "your-zone-id"  # Replace with your zone ID
        dns_record = {
            'type': 'CNAME',
            'name': subdomain,
            'content': 'webflow-proxy.webflow.com',
            'ttl': 300
        }
        
        # This would create the DNS record
        return f"{subdomain}.yourdomain.com"
