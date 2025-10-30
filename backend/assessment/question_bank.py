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
            'id': 2,
            'question': "Which of the following is a prime number?",
            'options': ["21", "29", "35", "49"],
            'correct_answer': "29",
            'concept': "primes",
            'difficulty': 2,
            'explanation': "29 is only divisible by 1 and itself"
        },
        {
            'id': 3,
            'question': "What is the least common multiple of 6 and 8?",
            'options': ["12", "24", "36", "48"],
            'correct_answer': "24",
            'concept': "divisibility",
            'difficulty': 2,
            'explanation': "LCM of 6 and 8 is 24"
        },
        {
            'id': 4,
            'question': "If |x - 3| = 7, what are the possible values of x?",
            'options': ["10 only", "-4 only", "10 and -4", "4 and -10"],
            'correct_answer': "10 and -4",
            'concept': "absolute_value",
            'difficulty': 3,
            'explanation': "x - 3 = 7 → x=10, or x - 3 = -7 → x=-4"
        },

        # === ARITHMETIC: OPERATIONS (3 questions) ===
        {
            'id': 5,
            'question': "Simplify: 8 - 3 × 2 + 4",
            'options': ["6", "10", "14", "18"],
            'correct_answer': "6",
            'concept': "order_of_operations",
            'difficulty': 2,
            'explanation': "Multiplication first: 8 - 6 + 4 = 6"
        },
        {
            'id': 6,
            'question': "What is (-5) × (-3) + (-2)?",
            'options': ["-17", "13", "17", "-13"],
            'correct_answer': "13",
            'concept': "signed_numbers",
            'difficulty': 2,
            'explanation': "(-5)×(-3)=15, 15+(-2)=13"
        },
        {
            'id': 7,
            'question': "If 0 × x = 0 for all x, which property is demonstrated?",
            'options': ["Commutative", "Associative", "Zero Property", "Identity"],
            'correct_answer': "Zero Property",
            'concept': "zero_one_properties",
            'difficulty': 2,
            'explanation': "Zero property: a × 0 = 0 for any a"
        },

        # === FRACTIONS, DECIMALS, PERCENTS (3 questions) ===
        {
            'id': 8,
            'question': "Convert 3/8 to a decimal",
            'options': ["0.375", "0.38", "0.4", "0.425"],
            'correct_answer': "0.375",
            'concept': "fractions",
            'difficulty': 2,
            'explanation': "3 ÷ 8 = 0.375"
        },
        {
            'id': 9,
            'question': "What is 0.125 as a fraction in simplest form?",
            'options': ["1/8", "1/4", "1/6", "1/12"],
            'correct_answer': "1/8",
            'concept': "decimals",
            'difficulty': 2,
            'explanation': "0.125 = 125/1000 = 1/8"
        },
        {
            'id': 10,
            'question': "If a price increases from $80 to $100, what is the percentage increase?",
            'options': ["20%", "25%", "30%", "35%"],
            'correct_answer': "25%",
            'concept': "percentages",
            'difficulty': 3,
            'explanation': "Increase = $20, % increase = (20/80)×100 = 25%"
        },

        # === ALGEBRA (4 questions) ===
        {
            'id': 11,
            'question': "Solve for x: 2x + 5 = 15",
            'options': ["10", "5", "7.5", "8"],
            'correct_answer': "5",
            'concept': "linear_equations",
            'difficulty': 2,
            'explanation': "2x = 10 → x = 5"
        },
        {
            'id': 12,
            'question': "Simplify: 3(x + 2) - 2(x - 1)",
            'options': ["x + 8", "x + 4", "5x + 4", "5x + 8"],
            'correct_answer': "x + 8",
            'concept': "algebraic_expressions",
            'difficulty': 2,
            'explanation': "3x + 6 - 2x + 2 = x + 8"
        },
        {
            'id': 13,
            'question': "Solve: x² - 5x + 6 = 0",
            'options': ["x=2,3", "x=-2,-3", "x=1,6", "x=-1,-6"],
            'correct_answer': "x=2,3",
            'concept': "quadratic_equations",
            'difficulty': 3,
            'explanation': "Factors: (x-2)(x-3)=0 → x=2,3"
        },
        {
            'id': 14,
            'question': "If f(x) = 2x - 3, what is f(4)?",
            'options': ["5", "6", "7", "8"],
            'correct_answer': "5",
            'concept': "functions",
            'difficulty': 2,
            'explanation': "f(4) = 2(4) - 3 = 8 - 3 = 5"
        },

        # === GEOMETRY (3 questions) ===
        {
            'id': 15,
            'question': "What is the area of a circle with radius 7?",
            'options': ["49π", "14π", "28π", "7π"],
            'correct_answer': "49π",
            'concept': "circles",
            'difficulty': 2,
            'explanation': "Area = πr² = π(7)² = 49π"
        },
        {
            'id': 16,
            'question': "In a right triangle, if two sides are 3 and 4, what is the hypotenuse?",
            'options': ["5", "6", "7", "8"],
            'correct_answer': "5",
            'concept': "pythagorean_theorem",
            'difficulty': 2,
            'explanation': "3² + 4² = 9 + 16 = 25 → √25 = 5"
        },
        {
            'id': 17,
            'question': "What is the sum of interior angles in a pentagon?",
            'options': ["540°", "360°", "720°", "1080°"],
            'correct_answer': "540°",
            'concept': "polygons",
            'difficulty': 3,
            'explanation': "Sum = (n-2)×180° = (5-2)×180 = 540°"
        },

        # === STATISTICS & PROBABILITY (3 questions) ===
        {
            'id': 18,
            'question': "What is the mean of: 4, 8, 6, 5, 7?",
            'options': ["5", "6", "7", "8"],
            'correct_answer': "6",
            'concept': "mean_median_mode",
            'difficulty': 1,
            'explanation': "Mean = (4+8+6+5+7)/5 = 30/5 = 6"
        },
        {
            'id': 19,
            'question': "If you roll a fair die, what is the probability of getting an even number?",
            'options': ["1/6", "1/3", "1/2", "2/3"],
            'correct_answer': "1/2",
            'concept': "probability",
            'difficulty': 2,
            'explanation': "Even numbers: 2,4,6 → 3/6 = 1/2"
        },
        {
            'id': 20,
            'question': "What is the range of: 12, 8, 15, 8, 20?",
            'options': ["8", "10", "12", "14"],
            'correct_answer': "12",
            'concept': "range",
            'difficulty': 2,
            'explanation': "Range = max - min = 20 - 8 = 12"
        }
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

def get_concept_coverage():
    """Return which concepts are covered by the assessment"""
    questions = get_initial_assessment_questions()
    concepts_covered = set(q['concept'] for q in questions)
    
    return {
        'total_questions': len(questions),
        'concepts_covered': list(concepts_covered),
        'concepts_count': len(concepts_covered),
        'estimated_time': len(questions) * 2  # 2 minutes per question
    }