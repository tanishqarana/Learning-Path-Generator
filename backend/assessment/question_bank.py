"""
Static question bank for initial assessment
Covers all major GRE Quantitative areas
"""

INITIAL_ASSESSMENT_QUESTIONS = [
    # === ARITHMETIC ===
    {
        "id": 1,
        "concept": "arithmetic_operations",
        "question": "Calculate: 15 - 8 × 2 + 3",
        "options": ["2", "5", "14", "17"],
        "correct_answer": "2",
        "difficulty": 2,
        "explanation": "Use order of operations: 8×2=16, then 15-16=-1, then -1+3=2"
    },
    {
        "id": 2,
        "concept": "integers", 
        "question": "What is the value of |-5| + 3?",
        "options": ["-8", "-2", "2", "8"],
        "correct_answer": "8",
        "difficulty": 1,
        "explanation": "Absolute value of -5 is 5, then 5 + 3 = 8"
    },
    {
        "id": 3,
        "concept": "fractions",
        "question": "What is 3/4 of 28?",
        "options": ["7", "14", "21", "24"],
        "correct_answer": "21", 
        "difficulty": 2,
        "explanation": "3/4 × 28 = (3 × 28) / 4 = 84 / 4 = 21"
    },
    # Add more questions as needed...
]

def get_initial_assessment_questions():
    """Return the static initial assessment questions"""
    return INITIAL_ASSESSMENT_QUESTIONS

def get_questions_by_concept(concept):
    """Get all questions for a specific concept"""
    return [q for q in INITIAL_ASSESSMENT_QUESTIONS if q['concept'] == concept]

def get_question_by_id(question_id):
    """Get a specific question by ID"""
    for question in INITIAL_ASSESSMENT_QUESTIONS:
        if question['id'] == question_id:
            return question
    return None