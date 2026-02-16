from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class QuestionOptionSchema(BaseModel):
    A: Optional[str] = None
    B: Optional[str] = None
    C: Optional[str] = None
    D: Optional[str] = None
    E: Optional[str] = None

class QuestionSchema(BaseModel):
    id: int
    question: str
    options: Dict[str, str]
    correct_answer: str
    explanation: Optional[str] = None

class PaginationSchema(BaseModel):
    total: int
    per_page: int
    current_page: int
    total_pages: int

class QuestionResponseSchema(BaseModel):
    success: bool
    exam: str
    exam_year_id: str
    subject: str
    old_balance: Optional[str] = None
    charges: Optional[str] = None
    new_balance: Optional[str] = None
    data: Dict[str, Any]