import requests
import time
import urllib.parse
from sqlalchemy.orm import Session
from app.utils.config import settings
from app.models.models import Exam, Year, Subject, Question
from requests.exceptions import RequestException, JSONDecodeError

class MyQuestFetcher:
    def __init__(self, db: Session):
        self.db = db
        self.base_url = settings.BASE_URL
        self.total_calls = 0
        self.total_questions = 0
        
        # Proxy configuration
        self.proxy_url = "https://corsproxy.io/?"
        self.use_proxy = True
        
        # 🟢 EXACT HEADERS FROM YOUR WORKING BROWSER REQUEST
        self.headers = {
            "authority": "corsproxy.io",
            "method": "POST",
            "path": "/?https%3A%2F%2Fapi.myquest.com.ng%2Fapi%2Fquestions%3Fget%3Dexam_year_id",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "en-US,en;q=0.9",
            "authorization": f"Bearer {settings.API_KEY}",
            "content-type": "text/plain;charset=UTF-8",  # 🔴 CRITICAL: text/plain not application/json
            "origin": "http://127.0.0.1:5500",  # 🔴 Your live server origin
            "priority": "u=1, i",
            "referer": "http://127.0.0.1:5500/",
            "sec-ch-ua": '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36"
        }
    
    def _get_url(self, endpoint=""):
        """Build URL with optional proxy"""
        if endpoint:
            url = f"{self.base_url}{endpoint}"
        else:
            url = self.base_url
            
        if self.use_proxy:
            encoded_url = urllib.parse.quote(url, safe='')
            return f"{self.proxy_url}{encoded_url}"
        return url
    
    def _make_request(self, method, url, **kwargs):
        """Make request with browser headers"""
        session = requests.Session()
        
        # Use exact browser headers
        if 'headers' not in kwargs:
            kwargs['headers'] = self.headers.copy()
        else:
            headers = self.headers.copy()
            headers.update(kwargs['headers'])
            kwargs['headers'] = headers
        
        # 🔴 CRITICAL: Send JSON as text/plain (just like browser)
        if 'json' in kwargs:
            # Convert JSON to string since content-type is text/plain
            import json as json_lib
            kwargs['data'] = json_lib.dumps(kwargs.pop('json'))
        
        time.sleep(0.5)
        
        try:
            response = session.request(method, url, **kwargs)
            return response
        except Exception as e:
            print(f"   ❌ Request failed: {e}")
            raise
    
    def fetch_exams(self):
        """Get all exam types"""
        print("📋 Fetching exams...")
        try:
            url = self._get_url("?get=exam")
            print(f"   URL: {url}")
            
            response = self._make_request(
                "POST",
                url,
                json={},  # This will be converted to text/plain data
                timeout=30
            )
            
            print(f"   Status code: {response.status_code}")
            print(f"   Response preview: {response.text[:200]}")
            
            if response.status_code == 200:
                try:
                    data = response.json()
                    exams = data.get("data", [])
                    print(f"   ✅ Found exams: {exams}")
                    return exams
                except:
                    print(f"   ❌ Not JSON: {response.text[:200]}")
                    return []
            else:
                print(f"   ❌ API returned status {response.status_code}")
                return []
            
        except Exception as e:
            print(f"   ❌ Error: {e}")
            return []
    
    def fetch_years(self, exam_name):
        """Get years for an exam"""
        try:
            url = self._get_url("?get=exam_year_id")
            response = self._make_request(
                "POST",
                url,
                json={"exam": exam_name},
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get("data", [])
            return []
        except Exception as e:
            print(f"   ❌ Error fetching years: {e}")
            return []
    
    def fetch_subjects(self, exam_name, year):
        """Get subjects for exam + year"""
        try:
            url = self._get_url("?get=subject")
            response = self._make_request(
                "POST",
                url,
                json={
                    "exam": exam_name,
                    "exam_year_id": year
                },
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get("data", [])
            return []
        except Exception as e:
            print(f"   ❌ Error fetching subjects: {e}")
            return []
    
    def fetch_questions(self, exam_name, year, subject, page=1):
        """Get questions for a specific subject"""
        try:
            url = self._get_url("")
            response = self._make_request(
                "POST",
                url,
                json={
                    "exam": exam_name,
                    "exam_year_id": year,
                    "subject": subject,
                    "page": page
                },
                timeout=30
            )
            self.total_calls += 1
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"      ❌ API returned {response.status_code}")
                return {"success": False}
                
        except Exception as e:
            print(f"      ❌ Error fetching questions: {e}")
            return {"success": False}
    
    def save_to_db(self, exam_name, year_value, subject_name, response_data):
        """Save questions to database"""
        if not response_data.get("success"):
            return 0
        
        try:
            # Get or create exam
            exam = self.db.query(Exam).filter(Exam.name == exam_name).first()
            if not exam:
                exam = Exam(name=exam_name)
                self.db.add(exam)
                self.db.flush()
            
            # Get or create year
            year = self.db.query(Year).filter(
                Year.exam_id == exam.id,
                Year.year_value == year_value
            ).first()
            if not year:
                year = Year(exam_id=exam.id, year_value=year_value)
                self.db.add(year)
                self.db.flush()
            
            # Get or create subject
            subject = self.db.query(Subject).filter(
                Subject.exam_id == exam.id,
                Subject.name == subject_name
            ).first()
            if not subject:
                subject = Subject(exam_id=exam.id, name=subject_name)
                self.db.add(subject)
                self.db.flush()
            
            # Save questions
            questions_data = response_data.get("data", {}).get("questions", [])
            saved_count = 0
            
            for q in questions_data:
                options = q.get("options", {})
                
                existing = self.db.query(Question).filter(
                    Question.exam_id == exam.id,
                    Question.year_id == year.id,
                    Question.subject_id == subject.id,
                    Question.question_id == q.get("id")
                ).first()
                
                if existing:
                    continue
                
                question = Question(
                    question_id=q.get("id"),
                    exam_id=exam.id,
                    year_id=year.id,
                    subject_id=subject.id,
                    question_text=q.get("question"),
                    option_a=options.get("A"),
                    option_b=options.get("B"),
                    option_c=options.get("C"),
                    option_d=options.get("D"),
                    option_e=options.get("E"),
                    correct_answer=q.get("correct_answer"),
                    explanation=q.get("explanation"),
                    raw_data=q
                )
                self.db.add(question)
                saved_count += 1
            
            self.db.commit()
            self.total_questions += saved_count
            return saved_count
            
        except Exception as e:
            print(f"      ❌ Database error: {e}")
            self.db.rollback()
            return 0
    
    def run_full_fetch(self):
        """Main orchestrator - fetch ALL data"""
        print("=" * 60)
        print("🚀 MYQUEST API FULL DATA FETCHER")
        print("=" * 60)
        print(f"📡 Using proxy: {self.use_proxy}")
        print(f"🌐 Proxy URL: {self.proxy_url}")
        print("=" * 60)
        
        # 1. Get all exams
        exams = self.fetch_exams()
        
        if not exams:
            print("\n❌ COULD NOT FETCH EXAMS!")
            return
        
        print(f"✅ Found exams: {exams}")
        
        # 2. Loop through each exam
        for exam_name in exams:
            print(f"\n🔴 PROCESSING: {exam_name}")
            
            # Get years
            years = self.fetch_years(exam_name)
            print(f"  📅 Years: {len(years)} found")
            
            if not years:
                continue
            
            # Loop years
            for year in years:
                print(f"\n  🟡 YEAR: {year}")
                
                # Get subjects
                subjects = self.fetch_subjects(exam_name, year)
                print(f"    📚 Subjects: {len(subjects)} found")
                
                if not subjects:
                    continue
                
                # Loop subjects
                for subject in subjects:
                    print(f"\n    🔵 SUBJECT: {subject}")
                    
                    page = 1
                    total_saved_for_subject = 0
                    
                    while True:
                        print(f"      📄 Fetching page {page}...")
                        
                        result = self.fetch_questions(exam_name, year, subject, page)
                        
                        if result.get("success"):
                            saved = self.save_to_db(exam_name, year, subject, result)
                            total_saved_for_subject += saved
                            print(f"      ✅ Saved {saved} new questions (total: {total_saved_for_subject})")
                            
                            pagination = result.get("data", {}).get("pagination", {})
                            if page >= pagination.get("total_pages", 1):
                                break
                        else:
                            break
                        
                        page += 1
                        time.sleep(0.5)
                    
                    time.sleep(0.5)
                
                time.sleep(1)
            
            time.sleep(2)
        
        print("\n" + "=" * 60)
        print("🎉 FETCH COMPLETE!")
        print(f"📊 Total API calls: {self.total_calls}")
        print(f"📚 Total questions saved: {self.total_questions}")
        print("=" * 60)
        
        if self.total_calls > 0:
            cost = self.total_calls * 20.1
            print(f"💰 Estimated cost: ₦{cost:,.2f}")
            print("=" * 60)