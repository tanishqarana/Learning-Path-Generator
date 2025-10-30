"""
Student Profile Selector - Select from existing student profiles
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.student_repository import get_database_connection
from models.student import Student
import json

def select_student_profile():
    """Select from existing student profiles or create new one"""
    print("\n📋 SELECT STUDENT PROFILE")
    print("=" * 50)
    
    # Get available students
    students = get_available_students()
    
    if not students:
        print("❌ No student profiles found.")
        print("You need to create a student profile first.")
        from student_creator import create_student_profile
        return create_student_profile()
    
    # Display available students
    display_students_list(students)
    
    # Get user selection
    selected_student = get_user_selection(students)
    
    if selected_student:
        print(f"✅ Selected: {selected_student.name}")
        display_student_summary(selected_student)
        return selected_student
    else:
        print("❌ No student selected.")
        return None

def get_available_students():
    """Get list of all available students from database and files"""
    students = []
    
    # Try database first
    db = get_database_connection()
    if db and db.students:
        try:
            db_students = db.get_all_students()
            for student_data in db_students:
                from database.models import StudentModel
                student = StudentModel.from_dict(student_data)
                students.append(student)
        except Exception as e:
            print(f"⚠️  Error loading from database: {e}")
    
    # Try JSON file as backup
    file_students = load_students_from_file()
    students.extend(file_students)
    
    # Remove duplicates (based on student_id)
    unique_students = {}
    for student in students:
        if student.student_id not in unique_students:
            unique_students[student.student_id] = student
    
    return list(unique_students.values())

def load_students_from_file():
    """Load students from JSON backup file"""
    students = []
    try:
        if os.path.exists("students.json"):
            with open("students.json", "r") as f:
                students_data = json.load(f)
            
            for student_id, student_dict in students_data.items():
                student = Student.from_dict(student_dict)
                students.append(student)
                
            print(f"📁 Loaded {len(students)} students from backup file")
    except Exception as e:
        print(f"⚠️  Error loading from file: {e}")
    
    return students

def display_students_list(students):
    """Display list of available students"""
    print("\nAvailable Student Profiles:")
    print("-" * 40)
    
    for i, student in enumerate(students, 1):
        # Get exam status
        exam_status = "✅" if has_exam_data(student) else "❌"
        exam_score = getattr(student, 'exam_score', 'No exam')
        
        # Get study time in hours
        study_hours = student.available_time_week / 60
        
        print(f"{i}. {student.name}")
        print(f"   🎯 Target: {student.target_score} | ⏰ {study_hours:.1f}h/week")
        print(f"   📊 Exam: {exam_status} {exam_score}")
        print(f"   📈 Proficiency: {calculate_overall_proficiency(student):.0f}%")
        print()

def has_exam_data(student):
    """Check if student has exam data"""
    return (getattr(student, 'exam_completed', False) or 
            (hasattr(student, 'known_concepts') and student.known_concepts))

def calculate_overall_proficiency(student):
    """Calculate overall proficiency percentage"""
    if not hasattr(student, 'known_concepts') or not student.known_concepts:
        return 0
    
    proficiencies = list(student.known_concepts.values())
    return sum(proficiencies) / len(proficiencies)

def get_user_selection(students):
    """Get user selection from available students"""
    while True:
        try:
            print("\nOptions:")
            print(f"1-{len(students)} - Select student profile")
            print(f"{len(students) + 1} - Create new profile")
            print(f"{len(students) + 2} - Refresh list")
            print(f"{len(students) + 3} - Cancel")
            
            choice = input(f"\nEnter your choice (1-{len(students) + 3}): ").strip()
            
            if not choice:
                continue
                
            choice_num = int(choice)
            
            if 1 <= choice_num <= len(students):
                return students[choice_num - 1]
                
            elif choice_num == len(students) + 1:
                # Create new profile
                from student_creator import create_student_profile
                return create_student_profile()
                
            elif choice_num == len(students) + 2:
                # Refresh list
                return select_student_profile()  # Recursive call to refresh
                
            elif choice_num == len(students) + 3:
                # Cancel
                return None
                
            else:
                print("❌ Invalid choice. Please try again.")
                
        except ValueError:
            print("❌ Please enter a valid number.")
        except KeyboardInterrupt:
            print("\n❌ Selection cancelled.")
            return None
        except Exception as e:
            print(f"❌ Error: {e}")
            return None

def display_student_summary(student):
    """Display summary of selected student"""
    print(f"\n📊 PROFILE SUMMARY: {student.name}")
    print("=" * 40)
    print(f"🎯 Target GRE Score: {student.target_score}")
    print(f"⏰ Weekly Study Time: {student.available_time_week}min ({student.available_time_week/60:.1f}h)")
    print(f"🚀 Learning Pace: {student.preferred_difficulty_pace}")
    print(f"🎨 Learning Style: {student.learning_style}")
    
    # Exam information
    if has_exam_data(student):
        exam_score = getattr(student, 'exam_score', 'N/A')
        print(f"📊 Mock Exam Score: {exam_score}/170")
        
        # Calculate gap
        if exam_score != 'N/A' and isinstance(exam_score, (int, float)):
            gap = student.target_score - exam_score
            if gap > 0:
                print(f"📚 Points needed: {gap}")
            else:
                print(f"🎉 Exceeding target by: {-gap}")
        
        # Proficiency summary
        if hasattr(student, 'known_concepts') and student.known_concepts:
            strong_areas = [c for c, p in student.known_concepts.items() if p >= 70]
            weak_areas = [c for c, p in student.known_concepts.items() if p < 50]
            
            print(f"📈 Strong areas: {len(strong_areas)}")
            print(f"📚 Weak areas: {len(weak_areas)}")
            print(f"📊 Overall proficiency: {calculate_overall_proficiency(student):.0f}%")
    else:
        print("❌ No exam data available")
        print("💡 Complete mock exam for accurate personalization")
    
    print("=" * 40)

def switch_student_profile():
    """Switch between student profiles - main interface"""
    print("\n🔄 SWITCH STUDENT PROFILE")
    print("=" * 40)
    return select_student_profile()

def delete_student_profile():
    """Delete a student profile"""
    students = get_available_students()
    
    if not students:
        print("❌ No student profiles to delete.")
        return
    
    print("\n🗑️  DELETE STUDENT PROFILE")
    print("=" * 40)
    
    for i, student in enumerate(students, 1):
        print(f"{i}. {student.name} (Target: {student.target_score})")
    
    try:
        choice = int(input(f"\nSelect profile to delete (1-{len(students)}): "))
        
        if 1 <= choice <= len(students):
            student_to_delete = students[choice - 1]
            
            confirm = input(f"⚠️  DELETE {student_to_delete.name}? This cannot be undone! (y/n): ")
            if confirm.lower() == 'y':
                # Delete from database
                db = get_database_connection()
                if db:
                    db.delete_student(student_to_delete.student_id)
                
                # Delete from file
                delete_student_from_file(student_to_delete.student_id)
                
                print(f"✅ Deleted: {student_to_delete.name}")
            else:
                print("❌ Deletion cancelled.")
        else:
            print("❌ Invalid selection.")
    except (ValueError, IndexError):
        print("❌ Invalid input.")

def delete_student_from_file(student_id):
    """Delete student from JSON backup file"""
    try:
        if os.path.exists("students.json"):
            with open("students.json", "r") as f:
                students_data = json.load(f)
            
            if str(student_id) in students_data:
                del students_data[str(student_id)]
                
                with open("students.json", "w") as f:
                    json.dump(students_data, f, indent=2)
    except Exception as e:
        print(f"⚠️  Error deleting from file: {e}")

def get_student_by_name(name):
    """Get student by name (case-insensitive)"""
    students = get_available_students()
    
    for student in students:
        if student.name.lower() == name.lower():
            return student
    
    return None

# Test function
def test_student_selector():
    """Test the student selector"""
    print("🧪 TESTING STUDENT SELECTOR")
    print("=" * 50)
    
    student = select_student_profile()
    
    if student:
        print(f"✅ Successfully selected: {student.name}")
        return student
    else:
        print("❌ No student selected")
        return None

if __name__ == "__main__":
    test_student_selector()