from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, Index
from sqlalchemy.orm import relationship
from app.database.config import Base

class Exam(Base):
    __tablename__ = "exams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False)  # JAMB, WAEC, etc
    
    # Relationships
    years = relationship("Year", back_populates="exam", cascade="all, delete-orphan")
    subjects = relationship("Subject", back_populates="exam", cascade="all, delete-orphan")
    questions = relationship("Question", back_populates="exam")

class Year(Base):
    __tablename__ = "years"
    
    id = Column(Integer, primary_key=True, index=True)
    exam_id = Column(Integer, ForeignKey("exams.id", ondelete="CASCADE"), nullable=False)
    year_value = Column(String(10), nullable=False)  # "1999", "2024", etc
    
    # Relationships
    exam = relationship("Exam", back_populates="years")
    questions = relationship("Question", back_populates="year")
    
    __table_args__ = (Index('idx_exam_year', 'exam_id', 'year_value', unique=True),)

class Subject(Base):
    __tablename__ = "subjects"
    
    id = Column(Integer, primary_key=True, index=True)
    exam_id = Column(Integer, ForeignKey("exams.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)  # "Mathematics", "Government", etc
    
    # Relationships
    exam = relationship("Exam", back_populates="subjects")
    questions = relationship("Question", back_populates="subject")
    
    __table_args__ = (Index('idx_exam_subject', 'exam_id', 'name', unique=True),)

class Question(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, nullable=False)  # Original ID from API
    exam_id = Column(Integer, ForeignKey("exams.id"), nullable=False)
    year_id = Column(Integer, ForeignKey("years.id"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    
    question_text = Column(Text, nullable=False)
    option_a = Column(Text)
    option_b = Column(Text)
    option_c = Column(Text)
    option_d = Column(Text)
    option_e = Column(Text)  # Some questions have 5 options
    correct_answer = Column(String(10), nullable=False)  # "A", "B", "C", "D", "E"
    explanation = Column(Text)
    page = Column(Integer, default=1)
    raw_data = Column(JSON)  # Store full original response as backup
    
    # Relationships
    exam = relationship("Exam", back_populates="questions")
    year = relationship("Year", back_populates="questions")
    subject = relationship("Subject", back_populates="questions")
    
    __table_args__ = (
        Index('idx_unique_question', 'exam_id', 'year_id', 'subject_id', 'question_id', unique=True),
        Index('idx_question_search', 'exam_id', 'year_id', 'subject_id'),
    )