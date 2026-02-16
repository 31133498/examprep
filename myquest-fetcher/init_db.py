from app.database.config import engine
from app.models.models import Base

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("✅ Tables created successfully!")