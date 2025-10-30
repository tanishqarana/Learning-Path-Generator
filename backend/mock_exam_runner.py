# backend/mock_exam_runner.py
"""
COMPULSORY mock exam system
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from assessment.mock_exams import GREMockExam
from database.student_repository import get_database_connection
from student_selector import select_student_profile

def take_mock_exam_with_profile():
    """COMPULSORY mock exam with existing student profile"""
    print("\n🎯 COMPULSORY MOCK EXAM ASSESSMENT")
    print("=" * 50)
    print("This exam is REQUIRED for accurate learning path generation.")
    print("It provides real data about your current proficiency levels.")
    print("=" * 50)
    
    # Select which student profile to use
    student = select_student_profile()
    if not student:
        print("❌ No student profile selected. Cannot take exam.")
        return None
    
    print(f"📝 Taking compulsory exam for: {student.name}")
    print(f"🎯 Your Target Score: {student.target_score}")
    print(f"📊 This exam will measure your current level")
    print("=" * 50)
    
    # Take exam
    exam = GREMockExam()
    exam_results = exam.take_exam_interactive(student)
    
    # Update student with exam results (OVERWRITE any previous data)
    student.known_concepts = {}  # Clear any existing data
    student.update_from_mock_exam(exam_results)
    
    # Mark exam as completed
    student.exam_completed = True
    student.exam_score = exam_results['score']
    student.exam_date = '2024-01-01'  # You'd use actual date
    
    # Save updated student
    db = get_database_connection()
    if db:
        db.save_student(student)
    
    print(f"\n✅ COMPULSORY EXAM COMPLETED!")
    print(f"📈 Score: {exam_results['score']}/170")
    print(f"🎯 Target: {student.target_score}")
    
    if exam_results['score'] >= student.target_score:
        print("🎉 You're already at or above your target score!")
    else:
        gap = student.target_score - exam_results['score']
        print(f"📚 You need to gain {gap} points to reach your target")
    
    print("📊 Your knowledge profile has been updated with real exam data")
    
    return exam_results

def is_mock_exam_completed(student_id):
    """Check if compulsory mock exam is completed"""
    db = get_database_connection()
    if not db:
        return False
    
    student = db.load_student(student_id)
    return student and getattr(student, 'exam_completed', False)

if __name__ == "__main__":
    take_mock_exam_with_profile()