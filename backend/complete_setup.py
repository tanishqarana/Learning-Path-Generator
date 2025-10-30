# backend/complete_setup.py
"""
Compulsory complete setup: Profile + Mock Exam
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from student_creator import create_student_profile
from mock_exam_runner import take_mock_exam_with_profile
from database.student_repository import get_database_connection

def compulsory_complete_setup():
    """COMPULSORY: Create profile AND take mock exam"""
    print("\n🚀 COMPULSORY SETUP PROCESS")
    print("=" * 50)
    
    # Step 1: Compulsory Profile Creation
    print("\n📝 STEP 1: CREATE STUDENT PROFILE (Required)")
    print("-" * 40)
    student = create_student_profile()
    if not student:
        print("❌ Profile creation failed. Cannot continue.")
        return None
    
    # Step 2: Compulsory Mock Exam
    print("\n🎯 STEP 2: MOCK EXAM ASSESSMENT (Required)")
    print("-" * 40)
    print("This exam is ESSENTIAL for accurate personalization.")
    print("It helps us understand your actual math proficiency.")
    print("Duration: ~70 minutes")
    print("Questions: 40 GRE-style questions")
    print("-" * 40)
    
    input("Press Enter to start the compulsory mock exam...")
    
    exam_results = take_mock_exam_with_profile()
    if not exam_results:
        print("❌ Mock exam failed. Cannot generate accurate roadmap.")
        return None
    
    # Step 3: Show setup completion
    print("\n✅ SETUP COMPLETE!")
    print("=" * 50)
    print(f"🎓 Student: {student.name}")
    print(f"🎯 Target Score: {student.target_score}")
    print(f"📊 Mock Exam Score: {exam_results['score']}/170")
    print(f"⏰ Study Time: {student.available_time_week} min/week")
    print("=" * 50)
    print("You can now generate your personalized learning roadmap!")
    
    return student

def check_setup_complete():
    """Check if compulsory setup is complete"""
    db = get_database_connection()
    if not db or not db.students:
        return False
    
    students = db.get_all_students()
    for student in students:
        # Check if student has both profile and exam data
        if (student.get('name') and student.get('target_score') and 
            student.get('known_concepts') and len(student.get('known_concepts', {})) > 0):
            return True
    return False

if __name__ == "__main__":
    compulsory_complete_setup()