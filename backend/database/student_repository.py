"""
Database operations for Student management
"""

import pymongo
from bson import ObjectId
from datetime import datetime

# Import path fix
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.models import StudentModel, LearningPathModel

class StudentRepository:
    def __init__(self, connection_string="mongodb://localhost:27017/", db_name="learning_path_generator"):
        try:
            self.client = pymongo.MongoClient(connection_string)
            self.db = self.client[db_name]
            self.students = self.db.students
            self.learning_paths = self.db.learning_paths
            self.exam_results = self.db.exam_results
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
            # Create mock database for testing
            self.client = None
            self.db = None
            self.students = None
            self.learning_paths = None
            self.exam_results = None
    
    def save_student(self, student):
        """Save or update student in database"""
        if not self.students:
            print("✅ Student data would be saved (database not connected)")
            return student
            
        student_data = StudentModel.to_dict(student)
        
        if hasattr(student, 'db_id'):
            # Update existing student
            result = self.students.update_one(
                {'_id': student.db_id},
                {'$set': student_data}
            )
            print(f"✅ Student updated in database: {student.name}")
        else:
            # Insert new student
            result = self.students.insert_one(student_data)
            student.db_id = result.inserted_id
            print(f"✅ Student saved to database: {student.name}")
        
        return student
    
    def load_student(self, student_id):
        """Load student from database by student_id"""
        if not self.students:
            print("❌ Database not connected")
            return None
            
        student_data = self.students.find_one({'student_id': student_id})
        
        if student_data:
            student = StudentModel.from_dict(student_data)
            print(f"✅ Student loaded from database: {student.name}")
            return student
        else:
            print(f"❌ Student not found: {student_id}")
            return None
    
    def load_student_by_name(self, name):
        """Load student by name (for testing)"""
        if not self.students:
            print("❌ Database not connected")
            return None
            
        student_data = self.students.find_one({'name': name})
        
        if student_data:
            student = StudentModel.from_dict(student_data)
            print(f"✅ Student loaded: {student.name}")
            return student
        else:
            print(f"❌ Student not found: {name}")
            return None
    
    def save_learning_path(self, path, student_id):
        """Save generated learning path"""
        if not self.learning_paths:
            print("✅ Learning path would be saved (database not connected)")
            return "mock_path_id"
            
        path_data = LearningPathModel.to_dict(path, student_id)
        result = self.learning_paths.insert_one(path_data)
        print(f"✅ Learning path saved for student {student_id}")
        return result.inserted_id
    
    def get_student_learning_history(self, student_id):
        """Get all learning paths for a student"""
        if not self.learning_paths:
            return []
            
        paths = self.learning_paths.find({'student_id': student_id}).sort('created_at', -1)
        return list(paths)
    
    def update_student_progress(self, student_id, completed_module_id, performance_score):
        """Update student progress after module completion"""
        if not self.students:
            print("✅ Progress would be updated (database not connected)")
            return
            
        self.students.update_one(
            {'student_id': student_id},
            {
                '$push': {'completed_modules': completed_module_id},
                '$set': {'updated_at': datetime.now()}
            }
        )
        print(f"✅ Progress updated: Module {completed_module_id} completed")
    
    def get_all_students(self):
        """Get all students (for admin purposes)"""
        if not self.students:
            return []
            
        return list(self.students.find())
    
    def delete_student(self, student_id):
        """Delete student and their data"""
        if not self.students:
            print("✅ Student would be deleted (database not connected)")
            return True
            
        result = self.students.delete_one({'student_id': student_id})
        self.learning_paths.delete_many({'student_id': student_id})
        self.exam_results.delete_many({'student_id': student_id})
        print(f"✅ Student {student_id} and all associated data deleted")
        return result.deleted_count > 0

# Database configuration
def get_database_connection():
    """Get database connection with error handling"""
    try:
        repo = StudentRepository()
        if repo.client:
            # Test connection
            repo.client.admin.command('ping')
            print("✅ Database connection successful")
            return repo
        else:
            print("⚠️  Database not available - using mock database")
            return repo
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("💡 Make sure MongoDB is running: mongod")
        # Return mock repository for testing
        return StudentRepository()
    