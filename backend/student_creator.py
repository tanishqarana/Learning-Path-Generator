# backend/student_creator.py

import sys
import os
from datetime import datetime
import uuid

# Add the parent directory to the path to import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.student import Student
from database.student_repository import StudentRepository

class StudentCreator:
    def __init__(self):
        self.repository = StudentRepository()
    
    def create_new_student(self):
        """Main method to create a new student with full profile setup"""
        print("\n" + "="*50)
        print("CREATE NEW STUDENT PROFILE")
        print("="*50)
        
        # Step 1: Get basic information
        student_data = self._get_basic_information()
        if not student_data:
            return None
        
        # Step 2: Set learning goals
        learning_goals = self._get_learning_goals()
        
        # Step 3: Create student object
        student = self._create_student_object(student_data, learning_goals)
        
        # Step 4: Interactive configuration
        student.configure_interactive()
        
        # Step 5: Save to database
        if self._save_student(student):
            print(f"\n✅ Student '{student.name}' created successfully!")
            student.display_summary()
            return student
        else:
            print("\n❌ Failed to save student to database.")
            return None
    
    def _get_basic_information(self):
        """Collect basic student information"""
        print("\n📝 Basic Information")
        print("-" * 30)
        
        try:
            name = input("Full Name: ").strip()
            if not name:
                print("❌ Name cannot be empty.")
                return None
            
            return {
                'name': name,
                'created_at': datetime.now()
            }
            
        except KeyboardInterrupt:
            print("\n\n👋 Student creation cancelled.")
            return None
        except Exception as e:
            print(f"❌ Error collecting basic information: {e}")
            return None
    
    def _get_learning_goals(self):
        """Get student's learning goals and target scores"""
        print("\n🎯 Learning Goals & Targets")
        print("-" * 30)
        
        try:
            print("Enter your target GRE Quantitative score:")
            target_score = self._get_valid_target_score("Quantitative", 130, 170)
            
            return {
                'target_score': target_score,
                'goal': 'gre_quantitative'
            }
            
        except Exception as e:
            print(f"❌ Error setting goals: {e}")
            # Return default goals
            return {
                'target_score': 160,
                'goal': 'gre_quantitative'
            }
    
    def _get_valid_target_score(self, section, min_score, max_score):
        """Get a valid target score for a section"""
        while True:
            try:
                score = int(input(f"{section} Target ({min_score}-{max_score}): "))
                if min_score <= score <= max_score:
                    return score
                else:
                    print(f"❌ Please enter a value between {min_score} and {max_score}.")
            except ValueError:
                print("❌ Please enter a valid number.")
    
    def _create_student_object(self, basic_info, learning_goals):
        """Create a Student object from collected data"""
        # Generate a unique student ID
        student_id = str(uuid.uuid4())[:8]  # First 8 chars of UUID
        
        return Student(
            student_id=student_id,
            name=basic_info['name'],
            goal=learning_goals['goal'],
            target_score=learning_goals['target_score']
        )
    
    def _save_student(self, student):
        """Save student to database"""
        try:
            return student.save_to_database()
        except Exception as e:
            print(f"❌ Database error: {e}")
            return False

def create_student_profile():
    """Standalone function to create student profile (for selector integration)"""
    creator = StudentCreator()
    return creator.create_new_student()

def main():
    """Standalone function to test student creation"""
    student = create_student_profile()
    
    if student:
        print(f"\n🎉 Successfully created student: {student.name}")
        print(f"Student ID: {student.student_id}")
    else:
        print("\n😞 Student creation failed.")

if __name__ == "__main__":
    main()