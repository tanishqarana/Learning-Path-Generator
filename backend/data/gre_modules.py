from ..models.module import Module 

def create_gre_quantitative_module():
     modules = [
        # === ARITHMETIC: NUMBER PROPERTIES ===
        Module(id=1, name="Integer Properties and Types", difficulty=1, time_estimate=25,
               concepts=["integers"], topics=["arithmetic", "number_properties"]),
        Module(id=2, name="Even and Odd Numbers", difficulty=1, time_estimate=20,
               concepts=["even_odd"], topics=["arithmetic", "number_properties"]),
        Module(id=3, name="Prime Numbers and Factorization", difficulty=2, time_estimate=30,
               concepts=["primes", "factorization"], topics=["arithmetic", "number_properties"]),
        Module(id=4, name="Divisibility Rules", difficulty=2, time_estimate=25,
               concepts=["divisibility"], topics=["arithmetic", "number_properties"]),
        Module(id=5, name="Absolute Value", difficulty=2, time_estimate=20,
               concepts=["absolute_value"], topics=["arithmetic", "number_properties"]),
        
        # === ARITHMETIC: OPERATIONS ===
        Module(id=6, name="Basic Arithmetic Operations", difficulty=1, time_estimate=30,
               concepts=["arithmetic_operations"], topics=["arithmetic", "operations"]),
        Module(id=7, name="Order of Operations (PEMDAS)", difficulty=1, time_estimate=25,
               concepts=["order_of_operations"], topics=["arithmetic", "operations"]),
        Module(id=8, name="Positive and Negative Numbers", difficulty=2, time_estimate=30,
               concepts=["signed_numbers"], topics=["arithmetic", "operations"]),
        Module(id=9, name="Properties of Zero and One", difficulty=2, time_estimate=20,
               concepts=["zero_one_properties"], topics=["arithmetic", "operations"]),
        
        # === FRACTIONS, DECIMALS, PERCENTS ===
        Module(id=10, name="Fraction Operations", difficulty=2, time_estimate=35,
               concepts=["fractions"], topics=["arithmetic", "fractions"]),
        Module(id=11, name="Decimal Operations", difficulty=2, time_estimate=30,
               concepts=["decimals"], topics=["arithmetic", "decimals"]),
        Module(id=12, name="Percentage Calculations", difficulty=2, time_estimate=35,
               concepts=["percentages"], topics=["arithmetic", "percentages"]),
        Module(id=13, name="Fraction/Decimal/Percent Conversions", difficulty=3, time_estimate=30,
               concepts=["conversions"], topics=["arithmetic", "conversions"]),
        
        # === RATIOS, RATES, PROPORTIONS ===
        Module(id=14, name="Ratios and Proportions", difficulty=2, time_estimate=35,
               concepts=["ratios"], topics=["arithmetic", "ratios"]),
        Module(id=15, name="Rate Problems", difficulty=3, time_estimate=40,
               concepts=["rates"], topics=["arithmetic", "rates"]),
        Module(id=16, name="Unit Conversion", difficulty=2, time_estimate=25,
               concepts=["unit_conversion"], topics=["arithmetic", "conversions"]),
        
        # === ALGEBRA: EXPRESSIONS ===
        Module(id=17, name="Algebraic Terms and Expressions", difficulty=2, time_estimate=30,
               concepts=["algebraic_expressions"], topics=["algebra", "expressions"]),
        Module(id=18, name="Simplifying Expressions", difficulty=2, time_estimate=35,
               concepts=["simplifying_expressions"], topics=["algebra", "expressions"]),
        Module(id=19, name="Evaluating Expressions", difficulty=2, time_estimate=25,
               concepts=["evaluating_expressions"], topics=["algebra", "expressions"]),
        
        # === ALGEBRA: EQUATIONS ===
        Module(id=20, name="Linear Equations", difficulty=2, time_estimate=40,
               concepts=["linear_equations"], topics=["algebra", "equations"]),
        Module(id=21, name="Systems of Linear Equations", difficulty=3, time_estimate=45,
               concepts=["systems_equations"], topics=["algebra", "equations"]),
        Module(id=22, name="Inequalities", difficulty=3, time_estimate=35,
               concepts=["inequalities"], topics=["algebra", "equations"]),
        Module(id=23, name="Quadratic Equations", difficulty=3, time_estimate=50,
               concepts=["quadratic_equations"], topics=["algebra", "equations"]),
        Module(id=24, name="Factoring Polynomials", difficulty=3, time_estimate=45,
               concepts=["factoring"], topics=["algebra", "polynomials"]),
        
        # === ALGEBRA: ADVANCED ===
        Module(id=25, name="Functions and Function Notation", difficulty=3, time_estimate=40,
               concepts=["functions"], topics=["algebra", "advanced"]),
        Module(id=26, name="Exponents and Roots", difficulty=3, time_estimate=45,
               concepts=["exponents", "roots"], topics=["algebra", "advanced"]),
        Module(id=27, name="Sequences and Series", difficulty=4, time_estimate=50,
               concepts=["sequences"], topics=["algebra", "advanced"]),
        
        # === WORD PROBLEMS ===
        Module(id=28, name="Algebraic Word Problems", difficulty=3, time_estimate=45,
               concepts=["word_problems"], topics=["word_problems", "algebra"]),
        Module(id=29, name="Work Rate Problems", difficulty=4, time_estimate=50,
               concepts=["work_problems"], topics=["word_problems", "rates"]),
        Module(id=30, name="Mixture Problems", difficulty=4, time_estimate=50,
               concepts=["mixture_problems"], topics=["word_problems", "algebra"]),
        
        # === STATISTICS ===
        Module(id=31, name="Mean, Median, Mode", difficulty=2, time_estimate=35,
               concepts=["mean_median_mode"], topics=["statistics", "descriptive"]),
        Module(id=32, name="Range and Quartiles", difficulty=3, time_estimate=30,
               concepts=["range", "quartiles"], topics=["statistics", "descriptive"]),
        Module(id=33, name="Standard Deviation", difficulty=4, time_estimate=45,
               concepts=["standard_deviation"], topics=["statistics", "descriptive"]),
        Module(id=34, name="Percentiles and Distributions", difficulty=4, time_estimate=40,
               concepts=["percentiles"], topics=["statistics", "descriptive"]),
        
        # === COUNTING & PROBABILITY ===
        Module(id=35, name="Sets and Venn Diagrams", difficulty=3, time_estimate=35,
               concepts=["sets"], topics=["counting", "probability"]),
        Module(id=36, name="Combinations", difficulty=4, time_estimate=45,
               concepts=["combinations"], topics=["counting", "probability"]),
        Module(id=37, name="Permutations", difficulty=4, time_estimate=45,
               concepts=["permutations"], topics=["counting", "probability"]),
        Module(id=38, name="Basic Probability", difficulty=3, time_estimate=40,
               concepts=["probability"], topics=["probability"]),
        Module(id=39, name="Probability of Multiple Events", difficulty=4, time_estimate=50,
               concepts=["multiple_events_probability"], topics=["probability"]),
        
        # === GEOMETRY: LINES & ANGLES ===
        Module(id=40, name="Lines and Angles", difficulty=2, time_estimate=35,
               concepts=["lines_angles"], topics=["geometry", "plane"]),
        Module(id=41, name="Parallel and Perpendicular Lines", difficulty=3, time_estimate=30,
               concepts=["parallel_lines"], topics=["geometry", "plane"]),
        
        # === GEOMETRY: POLYGONS ===
        Module(id=42, name="Triangles and Properties", difficulty=3, time_estimate=40,
               concepts=["triangles"], topics=["geometry", "plane"]),
        Module(id=43, name="Pythagorean Theorem", difficulty=3, time_estimate=35,
               concepts=["pythagorean_theorem"], topics=["geometry", "plane"]),
        Module(id=44, name="Quadrilaterals", difficulty=3, time_estimate=40,
               concepts=["quadrilaterals"], topics=["geometry", "plane"]),
        Module(id=45, name="Polygons and Interior Angles", difficulty=3, time_estimate=35,
               concepts=["polygons"], topics=["geometry", "plane"]),
        
        # === GEOMETRY: CIRCLES & AREA ===
        Module(id=46, name="Circles: Circumference and Area", difficulty=3, time_estimate=40,
               concepts=["circles"], topics=["geometry", "plane"]),
        Module(id=47, name="Area and Perimeter Formulas", difficulty=3, time_estimate=45,
               concepts=["area_perimeter"], topics=["geometry", "plane"]),
        
        # === GEOMETRY: ADVANCED ===
        Module(id=48, name="Coordinate Geometry", difficulty=4, time_estimate=50,
               concepts=["coordinate_geometry"], topics=["geometry", "advanced"]),
        Module(id=49, name="3D Geometry: Volume and Surface Area", difficulty=4, time_estimate=55,
               concepts=["3d_geometry"], topics=["geometry", "advanced"]),
        Module(id=50, name="Multiple Figures and Composite Shapes", difficulty=4, time_estimate=50,
               concepts=["composite_shapes"], topics=["geometry", "advanced"]),
        
        # === DATA INTERPRETATION ===
        Module(id=51, name="Reading Tables and Charts", difficulty=3, time_estimate=35,
               concepts=["data_tables"], topics=["data_interpretation"]),
        Module(id=52, name="Interpreting Graphs", difficulty=3, time_estimate=40,
               concepts=["graphs"], topics=["data_interpretation"]),
        
        # === GRE STRATEGIES ===
        Module(id=53, name="Quantitative Comparison Strategies", difficulty=3, time_estimate=40,
               concepts=["quantitative_comparison"], topics=["strategies"]),
        Module(id=54, name="Multiple-Choice Strategies", difficulty=3, time_estimate=35,
               concepts=["multiple_choice_strategies"], topics=["strategies"]),
        Module(id=55, name="Time Management for Quantitative Section", difficulty=3, time_estimate=30,
               concepts=["time_management"], topics=["strategies"])
    ]
     set_prerequisites(modules)
     return modules
 
     
def set_prerequisites(modules):
    """Define the learning dependencies between modules"""
    
    print("Setting up prerequisites...")  # Debug line
    
    """Define precise prerequisite relationships for atomic modules"""
    
    module_dict = {module.id: module for module in modules}
    
    # Atomic prerequisites - very specific dependencies
    prerequisites = {
        # Arithmetic dependencies
        2: [1],    # Even/Odd needs Integer properties
        3: [1],    # Primes needs Integer properties  
        4: [1],    # Divisibility needs Integer properties
        5: [1],    # Absolute Value needs Integer properties
        
        7: [6],    # Order of Operations needs Basic Operations
        8: [6, 7], # Signed numbers needs Operations + Order of Operations
        9: [1, 6], # Properties of 0/1 needs Integers + Operations
        
        # Fraction/Decimal dependencies
        10: [6, 7], # Fractions needs Operations + Order of Operations
        11: [6, 7], # Decimals needs Operations + Order of Operations  
        12: [10, 11], # Percentages needs Fractions + Decimals
        13: [10, 11, 12], # Conversions needs all three
        
        # Ratio dependencies
        14: [10, 12], # Ratios needs Fractions + Percentages
        15: [14],     # Rates needs Ratios
        16: [6, 7],   # Unit Conversion needs Operations
        
        # Algebra dependencies
        17: [6, 7],   # Algebraic Expressions needs Arithmetic
        18: [17],     # Simplifying needs Expressions
        19: [17, 18], # Evaluating needs Expressions + Simplifying
        
        20: [17, 18], # Linear Equations needs Expressions
        21: [20],     # Systems needs Linear Equations
        22: [20],     # Inequalities needs Linear Equations
        23: [18, 20], # Quadratic Equations needs Simplifying + Linear Equations
        24: [18, 23], # Factoring needs Simplifying + Quadratic Equations
        
        25: [20],     # Functions needs Linear Equations
        26: [18],     # Exponents/Roots needs Simplifying
        27: [20, 25], # Sequences needs Linear Equations + Functions
        
        # Word Problem dependencies
        28: [17, 20], # Word Problems needs Expressions + Equations
        29: [15, 28], # Work Problems needs Rates + Word Problems
        30: [20, 28], # Mixture Problems needs Equations + Word Problems
        
        # Statistics dependencies
        31: [6, 10],  # Mean/Median/Mode needs Operations + Fractions
        32: [31],     # Range/Quartiles needs Mean/Median/Mode
        33: [31, 32], # Standard Deviation needs basic stats
        34: [31, 32], # Percentiles needs basic stats
        
        # Counting/Probability dependencies
        35: [1],      # Sets needs Integers
        36: [35],     # Combinations needs Sets
        37: [35],     # Permutations needs Sets
        38: [31, 35], # Probability needs Stats + Sets
        39: [38],     # Multiple Events needs basic Probability
        
        # Geometry dependencies
        40: [6, 7],   # Lines/Angles needs basic math
        41: [40],     # Parallel Lines needs Lines/Angles
        42: [40],     # Triangles needs Lines/Angles
        43: [42],     # Pythagorean Theorem needs Triangles
        44: [40],     # Quadrilaterals needs Lines/Angles
        45: [40],     # Polygons needs Lines/Angles
        46: [6, 7],   # Circles needs basic math
        47: [40, 42, 44, 46], # Area/Perimeter needs all shapes
        48: [20, 40], # Coordinate Geometry needs Algebra + Geometry
        49: [47],     # 3D Geometry needs Area/Perimeter
        50: [47, 48, 49], # Composite Shapes needs all geometry
        
        # Data Interpretation dependencies
        51: [31],     # Tables needs basic stats
        52: [31, 51], # Graphs needs stats + tables
        
        # Strategy dependencies (need comprehensive knowledge)
        53: list(range(1, 52)), # QC Strategies needs almost everything
        54: list(range(1, 52)), # Multiple-choice needs almost everything
        55: list(range(1, 54))  # Time Management needs everything
    }
    # Apply prerequisites
    for module_id, prereq_ids in prerequisites.items():
        for prereq_id in prereq_ids:
            prereq_module = module_dict[prereq_id]
            for concept in prereq_module.concepts:
                if concept not in module_dict[module_id].prerequisites:
                    module_dict[module_id].add_prerequisite(concept)

    # Apply prerequisites with error checking
    for module_id, prereq_ids in prerequisites.items():
        # Check if module exists
        if module_id not in module_dict:
            print(f"ERROR: Module ID {module_id} not found!")
            continue
            
        #print(f"   Setting prerequisites for module {module_id}...")
        
        for prereq_id in prereq_ids:
            # Check if prerequisite module exists
            if prereq_id not in module_dict:
                print(f"ERROR: Prerequisite module ID {prereq_id} not found!")
                continue
                
            # Add concept prerequisites from the prerequisite modules
            prereq_module = module_dict[prereq_id]
            for concept in prereq_module.concepts:
                if concept not in module_dict[module_id].prerequisites:
                    module_dict[module_id].add_prerequisite(concept)
                    print(f"      Added prerequisite: {concept}")
    
    print("   Prerequisites set successfully!")
    
# Test function
if __name__ == "__main__":
    modules = create_gre_quantitative_module()
    
    print("=== GRE QUANTITATIVE - MODULES ===")
    print(f"Total modules: {len(modules)}")
    print("\n=== MODULES BY TOPIC ===")
    
    from collections import defaultdict
    topics_count = defaultdict(int)
    for module in modules:
        for topic in module.topics:
            topics_count[topic] += 1
    
    for topic, count in sorted(topics_count.items()):
        print(f"{topic}: {count} modules")
    
    print("\n=== SAMPLE MODULES ===")
    for i in [1, 20, 38, 53]:  # Show diverse samples
        module = modules[i-1]  # -1 because list is 0-indexed
        print(f"\n{module.id}: {module.name}")
        print(f"   Concepts: {module.concepts}")
        print(f"   Prerequisites: {len(module.prerequisites)} concepts")
        print(f"   Difficulty: {module.difficulty}/5, Time: {module.time_estimate}min")