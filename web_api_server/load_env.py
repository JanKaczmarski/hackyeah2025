import os
from dotenv import load_dotenv

load_dotenv()

SESSION_TTL = int(os.getenv("SESSION_TTL", "3600"))  # seconds

