from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database.config import engine, get_db
from app.models import models
from app.services.fetcher import MyQuestFetcher
import threading
import time

# Create tables (just in case)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MyQuest Data Fetcher")

# 🔴 ADD CORS MIDDLEWARE - THIS FIXES THE 405 OPTIONS ERRORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods including OPTIONS, POST, GET
    allow_headers=["*"],  # Allows all headers
    expose_headers=["*"],
)

# Background fetch status
fetch_status = {
    "is_running": False,
    "progress": "",
    "total_questions": 0,
    "total_calls": 0,
    "last_run": None
}

@app.get("/")
def root():
    return {
        "message": "MyQuest Data Fetcher API",
        "status": fetch_status
    }

@app.post("/start-fetch")
def start_fetch(db: Session = Depends(get_db)):
    """Start fetching all data in background"""
    global fetch_status
    
    if fetch_status["is_running"]:
        return {"message": "Fetch already running"}
    
    def run_fetch():
        global fetch_status
        fetch_status["is_running"] = True
        fetch_status["progress"] = "Starting..."
        
        fetcher = MyQuestFetcher(db)
        fetcher.run_full_fetch()
        
        fetch_status["is_running"] = False
        fetch_status["progress"] = "Complete"
        fetch_status["total_questions"] = fetcher.total_questions
        fetch_status["total_calls"] = fetcher.total_calls
        fetch_status["last_run"] = time.strftime("%Y-%m-%d %H:%M:%S")
    
    # Start background thread
    thread = threading.Thread(target=run_fetch)
    thread.start()
    
    return {"message": "Fetch started in background"}

@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    """Get database statistics"""
    exams = db.query(models.Exam).count()
    years = db.query(models.Year).count()
    subjects = db.query(models.Subject).count()
    questions = db.query(models.Question).count()
    
    # Per exam breakdown
    exam_counts = []
    for exam in db.query(models.Exam).all():
        count = db.query(models.Question).filter(models.Question.exam_id == exam.id).count()
        exam_counts.append({
            "exam": exam.name,
            "questions": count
        })
    
    return {
        "totals": {
            "exams": exams,
            "years": years,
            "subjects": subjects,
            "questions": questions
        },
        "breakdown": exam_counts,
        "fetch_status": fetch_status
    }

@app.post("/save-question")
def save_question(question_data: dict, db: Session = Depends(get_db)):
    """Endpoint for HTML fetcher to save questions"""
    try:
        exam_name = question_data.get("exam")
        year_value = question_data.get("year")
        subject_name = question_data.get("subject")
        q = question_data.get("question", {})
        
        # Get or create exam
        exam = db.query(models.Exam).filter(models.Exam.name == exam_name).first()
        if not exam:
            exam = models.Exam(name=exam_name)
            db.add(exam)
            db.flush()
        
        # Get or create year
        year = db.query(models.Year).filter(
            models.Year.exam_id == exam.id,
            models.Year.year_value == year_value
        ).first()
        if not year:
            year = models.Year(exam_id=exam.id, year_value=year_value)
            db.add(year)
            db.flush()
        
        # Get or create subject
        subject = db.query(models.Subject).filter(
            models.Subject.exam_id == exam.id,
            models.Subject.name == subject_name
        ).first()
        if not subject:
            subject = models.Subject(exam_id=exam.id, name=subject_name)
            db.add(subject)
            db.flush()
        
        # Save question
        options = q.get("options", {})
        question = models.Question(
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
        db.add(question)
        db.commit()
        
        return {"success": True}
    except Exception as e:
        db.rollback()
        return {"success": False, "error": str(e)}

@app.get("/questions/{exam}")
def get_questions(
    exam: str,
    year: str = None,
    subject: str = None,
    db: Session = Depends(get_db)
):
    """Query saved questions"""
    query = db.query(models.Question)
    
    # Join with exam
    query = query.join(models.Exam).filter(models.Exam.name == exam)
    
    # Filter by year
    if year:
        query = query.join(models.Year).filter(models.Year.year_value == year)
    
    # Filter by subject
    if subject:
        query = query.join(models.Subject).filter(models.Subject.name == subject)
    
    questions = query.limit(50).all()
    
    return {
        "total": len(questions),
        "questions": [
            {
                "id": q.id,
                "question": q.question_text,
                "options": {
                    "A": q.option_a,
                    "B": q.option_b,
                    "C": q.option_c,
                    "D": q.option_d,
                    "E": q.option_e
                },
                "correct_answer": q.correct_answer,
                "explanation": q.explanation
            }
            for q in questions
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)