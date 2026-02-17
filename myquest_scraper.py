import requests
import json
import time

# --- CONFIGURATION ---
API_KEY = "f2812cef784d06464971aa62dd81a777e58b1a0dc06e9e4ef3f07722e6ba145f"
BASE_URL = "https://api.myquest.com.ng/api/questions"
EXAM_TYPE = "JAMB"
YEARS = [str(year) for year in range(2005, 2026)] # 2005 to 2025
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

all_data = []

def fetch_data(params, body=None):
    url = f"{BASE_URL}?get={params}" if params else BASE_URL
    response = requests.post(url, headers=HEADERS, json=body or {})
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# --- MAIN PROCESS ---
print(f"Starting data extraction for {EXAM_TYPE}...")

for year in YEARS:
    print(f"--- Fetching Subjects for Year: {year} ---")
    
    # 1. Get Subjects for this specific year
    subject_resp = fetch_data("subject", {"exam": EXAM_TYPE, "exam_year_id": year})
    
    if not subject_resp or "data" not in subject_resp:
        continue

    subjects = subject_resp["data"]
    
    for subject in subjects:
        print(f"Fetching: {year} | {subject}...")
        
        # 2. Fetch Questions (handling page 1)
        # Note: If a subject has more than 50 questions, you might need a loop for 'page'
        question_body = {
            "exam": EXAM_TYPE,
            "exam_year_id": year,
            "subject": subject,
            "page": 1
        }
        
        q_resp = fetch_data(None, question_body)
        
        if q_resp and q_resp.get("success"):
            # Clean and store
            entry = {
                "year": year,
                "subject": subject,
                "questions": q_resp["data"]["questions"]
            }
            all_data.append(entry)
            
        # 3. Rate Limiting (Prevent getting blocked & manage your wallet)
        time.sleep(1) 

# --- SAVE TO FILE ---
with open("jamb_questions_2005_2025.json", "w", encoding="utf-8") as f:
    json.dump(all_data, f, indent=4)

print(f"Done! Saved {len(all_data)} subject-year blocks to jamb_questions_2005_2025.json")