"""
Full-length GRE Quantitative Mock Exams
"""

import random
import time
from datetime import datetime

class GREMockExam:
    def __init__(self):
        self.exam_duration = 70  # minutes for GRE Quantitative
        self.questions_per_section = 20
        self.sections = 2  # GRE Quantitative has 2 sections
        
        # Question bank for mock exams (expanded)
        self.question_bank = self._create_mock_exam_questions()
    
    def _create_mock_exam_questions(self):
        """Create a large bank of GRE-style questions"""
        return [
            # Section 1 - Mixed Difficulty
            {
                "id": 1, "section": 1, "difficulty": 2,
                "question": "If x + y = 7 and x - y = 3, what is the value of x?",
                "options": ["2", "3", "4", "5", "6"],
                "correct_answer": "5",
                "concept": "linear_equations",
                "time_estimate": 60
            },
            {
                "id": 2, "section": 1, "difficulty": 3,
                "question": "A triangle has sides of length 6, 8, and 10. What is its area?",
                "options": ["24", "30", "36", "40", "48"],
                "correct_answer": "24", 
                "concept": "triangles",
                "time_estimate": 75
            },
            {
                "id": 3, "section": 1, "difficulty": 4,
                "question": "If 2^x = 16, what is the value of 3^x?",
                "options": ["9", "27", "64", "81", "243"],
                "correct_answer": "81",
                "concept": "exponents",
                "time_estimate": 45
            },
            {
                "id": 4, "section": 1, "difficulty": 2,
                "question": "What is 35% of 80?",
                "options": ["20", "25", "28", "30", "35"],
                "correct_answer": "28",
                "concept": "percentages",
                "time_estimate": 30
            },
            {
                "id": 5, "section": 1, "difficulty": 3,
                "question": "If the average of 5 numbers is 20, what is their sum?",
                "options": ["20", "50", "80", "100", "120"],
                "correct_answer": "100",
                "concept": "mean_median_mode",
                "time_estimate": 40
            },
            {
                "id": 6, "section": 1, "difficulty": 2,
                "question": "Simplify: (3x²)(4x³)",
                "options": ["7x⁵", "12x⁵", "7x⁶", "12x⁶", "12x⁸"],
                "correct_answer": "12x⁵",
                "concept": "exponents",
                "time_estimate": 35
            },
            {
                "id": 7, "section": 1, "difficulty": 3,
                "question": "What is the probability of drawing a red card from a standard deck?",
                "options": ["1/4", "1/2", "1/3", "2/3", "3/4"],
                "correct_answer": "1/2",
                "concept": "probability",
                "time_estimate": 40
            },
            {
                "id": 8, "section": 1, "difficulty": 4,
                "question": "If x² - 5x + 6 = 0, what is the sum of the roots?",
                "options": ["-5", "5", "6", "-6", "1"],
                "correct_answer": "5",
                "concept": "quadratic_equations",
                "time_estimate": 50
            },
            {
                "id": 9, "section": 1, "difficulty": 2,
                "question": "Convert 3/8 to a decimal:",
                "options": ["0.375", "0.38", "0.4", "0.425", "0.45"],
                "correct_answer": "0.375",
                "concept": "fractions",
                "time_estimate": 25
            },
            {
                "id": 10, "section": 1, "difficulty": 3,
                "question": "A car travels 120 miles in 2 hours. What is its average speed?",
                "options": ["50 mph", "55 mph", "60 mph", "65 mph", "70 mph"],
                "correct_answer": "60 mph",
                "concept": "rates",
                "time_estimate": 30
            },
            {
                "id": 11, "section": 1, "difficulty": 4,
                "question": "Solve for x: |2x - 5| = 11",
                "options": ["x = 8", "x = -3", "x = 8 or x = -3", "x = 3", "x = -8"],
                "correct_answer": "x = 8 or x = -3",
                "concept": "absolute_value",
                "time_estimate": 55
            },
            {
                "id": 12, "section": 1, "difficulty": 2,
                "question": "What is the area of a circle with radius 4?",
                "options": ["8π", "12π", "16π", "20π", "24π"],
                "correct_answer": "16π",
                "concept": "circles",
                "time_estimate": 35
            },
            {
                "id": 13, "section": 1, "difficulty": 3,
                "question": "If 3a = 2b and 2b = 5c, what is the ratio a:c?",
                "options": ["3:5", "5:3", "2:5", "5:2", "3:2"],
                "correct_answer": "5:3",
                "concept": "ratios",
                "time_estimate": 60
            },
            {
                "id": 14, "section": 1, "difficulty": 4,
                "question": "What is the median of: 4, 7, 1, 9, 2, 8, 5?",
                "options": ["4", "5", "6", "7", "8"],
                "correct_answer": "5",
                "concept": "mean_median_mode",
                "time_estimate": 45
            },
            {
                "id": 15, "section": 1, "difficulty": 2,
                "question": "Solve: 2(x - 3) + 4 = 12",
                "options": ["x = 5", "x = 6", "x = 7", "x = 8", "x = 9"],
                "correct_answer": "x = 7",
                "concept": "linear_equations",
                "time_estimate": 40
            },
            {
                "id": 16, "section": 1, "difficulty": 3,
                "question": "A number increased by 20% gives 60. What is the number?",
                "options": ["48", "50", "52", "54", "56"],
                "correct_answer": "50",
                "concept": "percentages",
                "time_estimate": 50
            },
            {
                "id": 17, "section": 1, "difficulty": 4,
                "question": "What is the slope of the line perpendicular to y = 2x + 3?",
                "options": ["2", "-2", "1/2", "-1/2", "3"],
                "correct_answer": "-1/2",
                "concept": "coordinate_geometry",
                "time_estimate": 40
            },
            {
                "id": 18, "section": 1, "difficulty": 2,
                "question": "What is 15% of 200?",
                "options": ["15", "20", "25", "30", "35"],
                "correct_answer": "30",
                "concept": "percentages",
                "time_estimate": 20
            },
            {
                "id": 19, "section": 1, "difficulty": 3,
                "question": "If a square has area 64, what is its perimeter?",
                "options": ["16", "24", "32", "48", "64"],
                "correct_answer": "32",
                "concept": "area_perimeter",
                "time_estimate": 35
            },
            {
                "id": 20, "section": 1, "difficulty": 4,
                "question": "How many 3-person committees can be formed from 8 people?",
                "options": ["24", "56", "84", "112", "336"],
                "correct_answer": "56",
                "concept": "combinations",
                "time_estimate": 65
            },
            
            # Section 2 - Mixed Difficulty
            {
                "id": 21, "section": 2, "difficulty": 2,
                "question": "What is the value of 5! (5 factorial)?",
                "options": ["25", "60", "120", "240", "720"],
                "correct_answer": "120",
                "concept": "counting",
                "time_estimate": 25
            },
            {
                "id": 22, "section": 2, "difficulty": 3,
                "question": "If 2x + 3y = 12 and x - y = 1, what is y?",
                "options": ["1", "2", "3", "4", "5"],
                "correct_answer": "2",
                "concept": "systems_equations",
                "time_estimate": 55
            },
            {
                "id": 23, "section": 2, "difficulty": 4,
                "question": "What is the next number in the sequence: 2, 6, 18, 54, ...?",
                "options": ["108", "142", "162", "172", "182"],
                "correct_answer": "162",
                "concept": "sequences",
                "time_estimate": 40
            },
            {
                "id": 24, "section": 2, "difficulty": 2,
                "question": "What is the prime factorization of 36?",
                "options": ["2×18", "3×12", "4×9", "6×6", "2²×3²"],
                "correct_answer": "2²×3²",
                "concept": "factorization",
                "time_estimate": 35
            },
            {
                "id": 25, "section": 2, "difficulty": 3,
                "question": "A rectangle's length is twice its width. If perimeter is 36, what is area?",
                "options": ["48", "54", "60", "66", "72"],
                "correct_answer": "72",
                "concept": "area_perimeter",
                "time_estimate": 50
            },
            {
                "id": 26, "section": 2, "difficulty": 4,
                "question": "If f(x) = x² + 2x - 3, what is f(2)?",
                "options": ["-3", "0", "3", "5", "7"],
                "correct_answer": "5",
                "concept": "functions",
                "time_estimate": 35
            },
            {
                "id": 27, "section": 2, "difficulty": 2,
                "question": "What is 0.75 as a fraction in simplest form?",
                "options": ["1/4", "1/2", "2/3", "3/4", "4/5"],
                "correct_answer": "3/4",
                "concept": "fractions",
                "time_estimate": 20
            },
            {
                "id": 28, "section": 2, "difficulty": 3,
                "question": "If 5 pencils cost $1.25, how much do 12 pencils cost?",
                "options": ["$2.50", "$2.75", "$3.00", "$3.25", "$3.50"],
                "correct_answer": "$3.00",
                "concept": "ratios",
                "time_estimate": 45
            },
            {
                "id": 29, "section": 2, "difficulty": 4,
                "question": "Solve: x² - 4x - 5 = 0",
                "options": ["x = -1, 5", "x = 1, -5", "x = 2, -3", "x = -2, 3", "x = 4, 1"],
                "correct_answer": "x = -1, 5",
                "concept": "quadratic_equations",
                "time_estimate": 50
            },
            {
                "id": 30, "section": 2, "difficulty": 2,
                "question": "What is the complement of a 35° angle?",
                "options": ["35°", "45°", "55°", "65°", "145°"],
                "correct_answer": "55°",
                "concept": "lines_angles",
                "time_estimate": 25
            },
            {
                "id": 31, "section": 2, "difficulty": 3,
                "question": "If 30% of a number is 45, what is the number?",
                "options": ["120", "135", "150", "165", "180"],
                "correct_answer": "150",
                "concept": "percentages",
                "time_estimate": 40
            },
            {
                "id": 32, "section": 2, "difficulty": 4,
                "question": "What is the range of: 8, 3, 12, 5, 7, 10?",
                "options": ["5", "7", "9", "10", "12"],
                "correct_answer": "9",
                "concept": "mean_median_mode",
                "time_estimate": 30
            },
            {
                "id": 33, "section": 2, "difficulty": 2,
                "question": "Simplify: 4(2x - 3) - 2(3x + 1)",
                "options": ["2x - 14", "2x - 10", "2x + 10", "14x - 10", "14x + 10"],
                "correct_answer": "2x - 14",
                "concept": "algebraic_expressions",
                "time_estimate": 45
            },
            {
                "id": 34, "section": 2, "difficulty": 3,
                "question": "A cube has volume 64. What is its surface area?",
                "options": ["64", "96", "128", "144", "192"],
                "correct_answer": "96",
                "concept": "3d_geometry",
                "time_estimate": 55
            },
            {
                "id": 35, "section": 2, "difficulty": 4,
                "question": "If P(A) = 0.4 and P(B) = 0.3 and A and B are independent, what is P(A and B)?",
                "options": ["0.12", "0.7", "0.1", "0.3", "0.4"],
                "correct_answer": "0.12",
                "concept": "probability",
                "time_estimate": 40
            },
            {
                "id": 36, "section": 2, "difficulty": 2,
                "question": "What is the least common multiple of 6 and 8?",
                "options": ["12", "16", "24", "32", "48"],
                "correct_answer": "24",
                "concept": "integers",
                "time_estimate": 30
            },
            {
                "id": 37, "section": 2, "difficulty": 3,
                "question": "A train travels 240 miles in 4 hours. How far will it travel in 7 hours?",
                "options": ["360", "400", "420", "450", "480"],
                "correct_answer": "420",
                "concept": "rates",
                "time_estimate": 35
            },
            {
                "id": 38, "section": 2, "difficulty": 4,
                "question": "What is the vertex of the parabola y = x² - 4x + 3?",
                "options": ["(2, -1)", "(2, 1)", "(-2, -1)", "(-2, 1)", "(4, 3)"],
                "correct_answer": "(2, -1)",
                "concept": "quadratic_equations",
                "time_estimate": 60
            },
            {
                "id": 39, "section": 2, "difficulty": 2,
                "question": "What is 7² + 8²?",
                "options": ["49", "64", "113", "121", "169"],
                "correct_answer": "113",
                "concept": "arithmetic_operations",
                "time_estimate": 20
            },
            {
                "id": 40, "section": 2, "difficulty": 3,
                "question": "If 4x - 7 > 9, which values of x satisfy the inequality?",
                "options": ["x > 4", "x < 4", "x > 2", "x < 2", "x > 1"],
                "correct_answer": "x > 4",
                "concept": "inequalities",
                "time_estimate": 45
            }
        ]
    
    def generate_mock_exam(self, student):
        """Generate a personalized mock exam based on student's level"""
        print("🎯 Generating GRE Quantitative Mock Exam...")
        
        exam_questions = []
        
        # Select questions based on student's proficiency
        for section in range(1, self.sections + 1):
            section_questions = self._select_section_questions(section, student)
            exam_questions.extend(section_questions)
        
        exam = {
            'exam_id': f"GRE_MOCK_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            'student_id': student.student_id,
            'student_name': student.name,
            'total_questions': len(exam_questions),
            'duration_minutes': self.exam_duration,
            'sections': self.sections,
            'questions': exam_questions,
            'generated_at': datetime.now()
        }
        
        print(f"✅ Mock exam generated: {len(exam_questions)} questions, {self.exam_duration} minutes")
        return exam
    
    def _select_section_questions(self, section, student):
        """Select questions for a section based on student's level"""
        section_questions = [q for q in self.question_bank if q['section'] == section]
        
        # Adjust difficulty based on student's target score
        target_score = student.target_score
        if target_score >= 165:  # High scorer - more difficult questions
            difficulty_weights = [1, 2, 3, 4, 5]  # Emphasize hard questions
        elif target_score >= 155:  # Medium scorer - balanced
            difficulty_weights = [2, 3, 3, 2, 1]  # Bell curve
        else:  # Lower scorer - more easier questions
            difficulty_weights = [3, 3, 2, 1, 1]  # Emphasize easy/medium
        
        selected_questions = []
        questions_needed = self.questions_per_section
        
        for difficulty in range(1, 6):
            # Number of questions of this difficulty needed
            num_needed = int(questions_needed * (difficulty_weights[difficulty-1] / sum(difficulty_weights)))
            
            # Get questions of this difficulty
            diff_questions = [q for q in section_questions if q['difficulty'] == difficulty]
            
            # Randomly select the needed number
            if diff_questions:
                selected = random.sample(diff_questions, min(num_needed, len(diff_questions)))
                selected_questions.extend(selected)
        
        # Fill remaining slots if needed
        while len(selected_questions) < questions_needed:
            remaining_questions = [q for q in section_questions if q not in selected_questions]
            if remaining_questions:
                selected_questions.append(random.choice(remaining_questions))
            else:
                break
        
        return selected_questions[:questions_needed]
    
    def take_exam_interactive(self, student):
        """Take mock exam interactively in terminal"""
        exam = self.generate_mock_exam(student)
        
        print(f"\n🎯 GRE QUANTITATIVE MOCK EXAM")
        print("=" * 60)
        print(f"Student: {student.name}")
        print(f"Target Score: {student.target_score}")
        print(f"Duration: {exam['duration_minutes']} minutes")
        print(f"Questions: {exam['total_questions']}")
        print(f"Sections: {exam['sections']}")
        print("\nInstructions:")
        print("- You have 70 minutes total (35 minutes per section)")
        print("- Answer all questions")
        print("- You cannot go back to previous sections")
        print("- Calculator is allowed")
        
        input("\nPress Enter to start the exam...")
        
        # For now, simulate exam completion (in real implementation, you'd run the full exam)
        print("\n📝 Exam simulation complete!")
        print("In a full implementation, you would answer 40 questions here.")
        
        # Simulate results based on student's current knowledge
        return self._simulate_exam_results(exam, student)
    
    def _simulate_exam_results(self, exam, student):
        """Simulate exam results based on student's current knowledge"""
        print("\n📊 SIMULATING EXAM RESULTS...")
        
        # Calculate score based on student's current proficiency
        total_score = 0
        concept_performance = {}
        
        for question in exam['questions']:
            concept = question['concept']
            if concept not in concept_performance:
                concept_performance[concept] = {'total': 0, 'correct': 0}
            
            concept_performance[concept]['total'] += 1
            
            # Simulate if student gets question right based on their proficiency
            student_proficiency = student.known_concepts.get(concept, 0)
            probability_correct = student_proficiency / 100.0
            
            if random.random() <= probability_correct:
                concept_performance[concept]['correct'] += 1
                total_score += 1
        
        # Calculate concept scores
        concept_scores = {}
        for concept, performance in concept_performance.items():
            if performance['total'] > 0:
                score = (performance['correct'] / performance['total']) * 100
                concept_scores[concept] = score
        
        # Convert to GRE scale (130-170)
        raw_score = total_score
        gre_score = self._convert_to_gre_score(raw_score, len(exam['questions']))
        
        results = {
            'student_id': student.student_id,
            'exam_type': 'GRE_QUANTITATIVE_MOCK',
            'score': gre_score,
            'raw_score': raw_score,
            'total_questions': len(exam['questions']),
            'section_scores': {1: raw_score//2, 2: raw_score//2},
            'time_spent': 70 * 60,  # 70 minutes in seconds
            'concept_breakdown': concept_scores,
            'weak_areas': [c for c, s in concept_scores.items() if s < 60],
            'questions_attempted': len(exam['questions']),
        }
        
        self._display_exam_results(results, student)
        return results
    
    def _convert_to_gre_score(self, raw_score, total_questions):
        """Convert raw score to GRE scale (130-170)"""
        min_score, max_score = 130, 170
        percentage = raw_score / total_questions
        gre_score = min_score + (max_score - min_score) * percentage
        return round(gre_score)
    
    def _display_exam_results(self, results, student):
        """Display comprehensive exam results"""
        print(f"\n🎓 EXAM RESULTS for {student.name}")
        print("=" * 60)
        print(f"📈 GRE Quantitative Score: {results['score']} / 170")
        print(f"📊 Raw Score: {results['raw_score']}/{results['total_questions']}")
        
        target = student.target_score
        actual = results['score']
        if actual >= target:
            print(f"\n🎉 EXCELLENT! You met your target score of {target}!")
        else:
            gap = target - actual
            print(f"\n📚 Keep working! You're {gap} points from your target of {target}")
        
        if results['weak_areas']:
            print(f"\n🔴 Areas Needing Improvement:")
            for area in results['weak_areas'][:5]:
                score = results['concept_breakdown'][area]
                print(f"   • {area}: {score:.1f}%")


# Test function
def test_mock_exam():
    """Test the mock exam system"""
    print("🧪 TESTING MOCK EXAM SYSTEM")
    from models.student import create_sample_student
    
    student = create_sample_student()
    exam = GREMockExam()
    results = exam.take_exam_interactive(student)
    
    return student, results

if __name__ == "__main__":
    test_mock_exam()