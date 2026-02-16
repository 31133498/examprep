import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    API_KEY = os.getenv("MYQUEST_API_KEY")
    BASE_URL = "https://api.myquest.com.ng/api/questions"
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    # Headers for API calls
    @property
    def headers(self):
        return {
            "Authorization": f"Bearer {self.API_KEY}",
            "Content-Type": "application/json"
        }

settings = Settings()