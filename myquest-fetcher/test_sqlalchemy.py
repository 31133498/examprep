from app.database.config import engine
from sqlalchemy import text

print("Testing SQLAlchemy connection...")

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version()"))
        version = result.scalar()
        print(f"✅ Connected! PostgreSQL version: {version}")
        
        result = conn.execute(text("SELECT current_database()"))
        db_name = result.scalar()
        print(f"✅ Database: {db_name}")
        
        result = conn.execute(text("SELECT current_user"))
        user = result.scalar()
        print(f"✅ User: {user}")
        
    print("🎉 SQLAlchemy connection successful!")
except Exception as e:
    print(f"❌ Error: {e}")