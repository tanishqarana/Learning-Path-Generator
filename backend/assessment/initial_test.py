"""
Initial assessment system - static test for all students
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from assessment.question_bank import get_initial_assessment_questions

class InitialAssessment:
    def __init__(self):
        self.questions = get_initial_assessment_questions()
    
    def conduct_assessment(self, student_answers):
        """
        Calculate proficiency scores based on test results
        
        Args:
            student_answers: Dict of {question_id: selected_answer}
            
        Returns:
            Dict of {concept: proficiency_score}
        """
        print("📊 Evaluating initial assessment...")
        
        # Track performance by concept
        concept_performance = {}
        
        for question in self.questions:
            question_id = question['id']
            concept = question['concept']
            correct_answer = question['correct_answer']
            difficulty = question['difficulty']
            
            # Initialize concept tracking
            if concept not in concept_performance:
                concept_performance[concept] = {
                    'total_questions': 0,
                    'correct_answers': 0,
                    'total_difficulty': 0
                }
            
            concept_performance[concept]['total_questions'] += 1
            concept_performance[concept]['total_difficulty'] += difficulty
            
            # Check if answer is correct
            student_answer = student_answers.get(question_id)
            if student_answer == correct_answer:
                concept_performance[concept]['correct_answers'] += 1
                print(f"   ✅ Q{question_id} ({concept}): Correct")
            else:
                print(f"   ❌ Q{question_id} ({concept}): Incorrect (Answer: {correct_answer})")
        
        # Calculate proficiency scores (0-100)
        proficiency_scores = {}
        
        for concept, performance in concept_performance.items():
            accuracy = (performance['correct_answers'] / performance['total_questions']) * 100
            
            # Adjust for question difficulty (weight harder questions more)
            avg_difficulty = performance['total_difficulty'] / performance['total_questions']
            difficulty_bonus = (avg_difficulty - 2) * 10  # Center on difficulty 2
            
            proficiency = min(100, max(0, accuracy + difficulty_bonus))
            proficiency_scores[concept] = proficiency
            
            print(f"   📈 {concept}: {performance['correct_answers']}/{performance['total_questions']} = {proficiency:.0f}%")
        
        return proficiency_scores
    
    def display_questions(self):
        """Display all questions for the test"""
        print("\n🎯 INITIAL ASSESSMENT TEST")
        print("=" * 50)
        
        for question in self.questions:
            print(f"\nQ{question['id']}. {question['question']}")
            for i, option in enumerate(question['options'], 1):
                print(f"   {i}. {option}")
            print(f"   [Concept: {question['concept']}, Difficulty: {question['difficulty']}/5]")
    
    def get_test_summary(self):
        """Get summary of the test"""
        concepts_covered = set(q['concept'] for q in self.questions)
        return {
            'total_questions': len(self.questions),
            'concepts_covered': list(concepts_covered),
            'estimated_time': len(self.questions) * 2  # 2 minutes per question
        }


# Interactive test runner
def run_interactive_assessment():
    """Run the assessment interactively in terminal"""
    assessment = InitialAssessment()
    
    print("🎯 GRE QUANTITATIVE INITIAL ASSESSMENT")
    print("=" * 50)
    print("This test will help us understand your current math level.")
    print(f"Total questions: {len(assessment.questions)}")
    print("Estimated time: 30 minutes\n")
    
    input("Press Enter to start the assessment...")
    
    student_answers = {}
    
    # Ask each question
    for question in assessment.questions:
        print(f"\nQ{question['id']}. {question['question']}")
        
        # Display options
        for i, option in enumerate(question['options'], 1):
            print(f"   {i}. {option}")
        
        # Get answer
        while True:
            try:
                choice = int(input(f"\nYour answer (1-{len(question['options'])}): "))
                if 1 <= choice <= len(question['options']):
                    student_answers[question['id']] = question['options'][choice-1]
                    break
                else:
                    print(f"Please enter a number between 1 and {len(question['options'])}")
            except ValueError:
                print("Please enter a valid number")
    
    # Evaluate results
    print("\n" + "=" * 50)
    print("📊 CALCULATING YOUR RESULTS...")
    print("=" * 50)
    
    proficiency_scores = assessment.conduct_assessment(student_answers)
    
    # Display overall results
    print("\n🎓 ASSESSMENT RESULTS SUMMARY")
    print("=" * 50)
    
    for concept, score in proficiency_scores.items():
        level = "Beginner" if score < 40 else "Intermediate" if score < 70 else "Advanced"
        print(f"   {concept}: {score:.0f}% ({level})")
    
    avg_score = sum(proficiency_scores.values()) / len(proficiency_scores)
    print(f"\n📈 Overall Score: {avg_score:.0f}%")
    
    return proficiency_scores


if __name__ == "__main__":
    # Test the assessment system
    run_interactive_assessment()