# backend/main_menu.py
"""
Main menu with compulsory profile creation AND mock exam
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.student_repository import get_database_connection

def main_menu():
    """Main menu that requires both profile creation AND mock exam"""
    
    # Check if any students exist with exam data
    db = get_database_connection()
    students_with_exams = False
    
    if db and db.students:
        students = db.get_all_students()
        # Check if any student has exam results
        for student in students:
            if student.get('exam_results') or student.get('known_concepts'):
                students_with_exams = True
                break
    
    # If no students with exam data exist, force complete setup
    if not students_with_exams:
        print("\n" + "="*50)
        print("👋 WELCOME TO PERSONALIZED LEARNING PATH GENERATOR")
        print("="*50)
        print("Let's set up your complete learning profile!")
        print("This includes:")
        print("1. 📝 Student Profile (Required)")
        print("2. 🎯 Mock Exam Assessment (Required)")
        print("="*50)
        print("The mock exam is essential for accurate personalization.")
        print("It helps us understand your actual strengths and weaknesses.")
        print("="*50)
        
        # Force complete setup
        from complete_setup import compulsory_complete_setup
        student = compulsory_complete_setup()
        
        if not student:
            print("❌ Setup failed. Exiting.")
            return
    
    # Main menu loop (only reachable after complete setup)
    while True:
        print("\n" + "="*50)
        print("🎓 PERSONALIZED LEARNING PATH GENERATOR")
        print("="*50)
        print("1. 🧬 Generate/Update Learning Roadmap")
        print("2. 🎯 Retake Mock Exam")
        print("3. 📊 View My Progress & Analytics")
        print("4. 📝 Edit Profile Settings")
        print("5. 🚪 Exit")
        print("="*50)
        
        choice = input("Choose an option (1-5): ").strip()
        
        if choice == "1":
            from roadmap_generator import generate_roadmap_with_profile
            generate_roadmap_with_profile()
            
        elif choice == "2":
            from mock_exam_runner import take_mock_exam_with_profile
            take_mock_exam_with_profile()
            
        elif choice == "3":
            from progress_tracker import view_progress
            view_progress()
            
        elif choice == "4":
            from profile_editor import edit_profile_settings
            edit_profile_settings()
            
        elif choice == "5":
            print("👋 Thank you for using the Learning Path Generator!")
            break
            
        else:
            print("❌ Invalid choice. Please enter 1-5.")

if __name__ == "__main__":
    main_menu()