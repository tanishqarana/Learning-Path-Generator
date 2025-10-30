# backend/roadmap_generator.py
"""
Roadmap generator that REQUIRES mock exam data
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from genetic_algorithm import LearningPathGA
from database.student_repository import get_database_connection
from student_selector import select_student_profile
from mock_exam_runner import is_mock_exam_completed

def generate_roadmap_with_profile():
    """Generate learning path - REQUIRES mock exam data"""
    print("\n🧬 GENERATE LEARNING ROADMAP")
    print("=" * 50)
    
    # Select which student profile to use
    student = select_student_profile()
    if not student:
        print("❌ No student profile selected.")
        return None
    
    # CHECK: Verify mock exam is completed
    if not is_mock_exam_completed(student.student_id) and not student.known_concepts:
        print("❌ COMPULSORY MOCK EXAM NOT COMPLETED")
        print("=" * 50)
        print("You must complete the mock exam before generating a roadmap.")
        print("The exam provides essential data for accurate personalization.")
        print("=" * 50)
        
        choice = input("Take mock exam now? (y/n): ").lower()
        if choice == 'y':
            from mock_exam_runner import take_mock_exam_with_profile
            exam_results = take_mock_exam_with_profile()
            if not exam_results:
                return None
        else:
            print("❌ Cannot generate roadmap without exam data.")
            return None
    
    print(f"🎯 Generating roadmap for: {student.name}")
    print(f"📊 Exam Score: {getattr(student, 'exam_score', 'N/A')}/170")
    print(f"🎯 Target Score: {student.target_score}")
    print(f"⏰ Available time: {student.available_time_week} min/week")
    
    # Generate learning path using REAL exam data
    ga = LearningPathGA(population_size=50, generations=100)
    learning_path = ga.evolve(student)
    
    # Display results
    ga.display_path(learning_path, student)
    ga.analyze_path_quality(learning_path, student)
    
    # Save the generated path
    db = get_database_connection()
    if db:
        db.save_learning_path(learning_path, student.student_id)
    
    print(f"\n✅ Roadmap generated using real exam data!")
    print(f"📈 Based on your mock exam score: {getattr(student, 'exam_score', 'N/A')}/170")
    
    return student, learning_path

if __name__ == "__main__":
    generate_roadmap_with_profile()