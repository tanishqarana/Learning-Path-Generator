"""
Student class - represents a learner in the system
"""

class Student:
    def __init__(self, student_id, name, goal, target_score=None):
        self.student_id = student_id
        self.name = name
        self.goal = goal  # e.g., "gre_quantitative"
        self.target_score = target_score  # e.g., 165 (for GRE)
        
        # Knowledge profile - tracks what concepts the student knows
        # Format: {"concept_name": proficiency_score (0-100)}
        #This will be inputed using an interactive setup later here
        self.known_concepts = {}
        
        # Learning preferences
        self.available_time_week = 0  # in minutes
        self.preferred_difficulty_pace = "medium"  # slow, medium, fast
        self.learning_style = "balanced"  # visual, auditory, reading_writing, kinesthetic, balanced
        
        # Progress tracking
        self.completed_modules = []
        self.struggling_concepts = []
    
    def configure_interactive(self):
        """Interactive configuration of student preferences"""
        self._configure_availability()
        self._configure_learning_pace() 
        self._configure_learning_style()
        self._assess_initial_knowledge()
        
    def _configure_availability(self):
        """Configure weekly study time"""
        print(f"\n  WEEKLY STUDY TIME for {self.name}")
        print("How much time can you dedicate to studying per week?")
        print("1. Casual (2-3 hours) - 120-180 minutes")
        print("2. Standard (4-6 hours) - 240-360 minutes") 
        print("3. Intensive (7-10 hours) - 420-600 minutes")
        print("4. Immersive (10+ hours) - 600+ minutes")
        print("5. Custom (enter your own time)")
        
        while True:
            choice = input("Enter choice (1-5): ").strip()
            
            if choice == '1':
                self.available_time_week = 180  # 3 hours
                break
            elif choice == '2':
                self.available_time_week = 360  # 6 hours
                break
            elif choice == '3':
                self.available_time_week = 600  # 10 hours
                break
            elif choice == '4':
                self.available_time_week = 720  # 12 hours
                break
            elif choice == '5':
                try:
                    hours = float(input("Enter hours per week: "))
                    self.available_time_week = int(hours * 60)  # Convert to minutes
                    break
                except ValueError:
                    print("X Please enter a valid number")
            else:
                print("X Please enter 1-5")
        
        print(f"  Set weekly study time: {self.available_time_week} minutes ({self.available_time_week/60:.1f} hours)")
    
    def _configure_learning_pace(self):
        """Configure preferred learning pace"""
        print(f"\n🚀 LEARNING PACE for {self.name}")
        print("How quickly do you prefer to learn new material?")
        print("1. Slow & Steady - Master each concept thoroughly before moving on")
        print("2. Medium Pace - Balanced approach between depth and progress")
        print("3. Fast Pace - Cover more material quickly, review as needed")
        
        while True:
            choice = input("Enter choice (1-3): ").strip()
            
            if choice == '1':
                self.preferred_difficulty_pace = "slow"
                break
            elif choice == '2':
                self.preferred_difficulty_pace = "medium" 
                break
            elif choice == '3':
                self.preferred_difficulty_pace = "fast"
                break
            else:
                print("X Please enter 1-3")
        
        pace_descriptions = {
            "slow": "Thorough mastery of each concept",
            "medium": "Balanced learning pace", 
            "fast": "Rapid progression through material"
        }
        print(f"  Set learning pace: {self.preferred_difficulty_pace} ({pace_descriptions[self.preferred_difficulty_pace]})")
    
    def _configure_learning_style(self):
        """Configure learning style preference"""
        print(f"\n  LEARNING STYLE for {self.name}")
        print("How do you learn best?")
        print("1. Visual - Diagrams, charts, videos, spatial understanding")
        print("2. Reading/Writing - Text explanations, examples, written practice") 
        print("3. Balanced - Mix of different approaches")
        print("4. Kinesthetic - Hands-on practice, interactive exercises")
        
        while True:
            choice = input("Enter choice (1-4): ").strip()
            
            if choice == '1':
                self.learning_style = "visual"
                break
            elif choice == '2':
                self.learning_style = "reading_writing"
                break
            elif choice == '3':
                self.learning_style = "balanced"
                break
            elif choice == '4':
                self.learning_style = "kinesthetic"
                break
            else:
                print("X Please enter 1-4")
        
        style_descriptions = {
            "visual": "Prefer visual aids and diagrams",
            "reading_writing": "Prefer text-based learning", 
            "balanced": "Adaptable to different styles",
            "kinesthetic": "Learn by doing and practice"
        }
        print(f"✅ Set learning style: {self.learning_style} ({style_descriptions[self.learning_style]})")
    
    def _assess_initial_knowledge(self):
        """Interactive initial knowledge assessment"""
        print(f"\n  INITIAL KNOWLEDGE ASSESSMENT for {self.name}")
        print("Rate your current familiarity with each math area (1-5):")
        print("1: Beginner - Little to no knowledge")
        print("2: Basic Awareness - Heard of it but not comfortable")
        print("3: Intermediate - Some understanding, need practice") 
        print("4: Advanced - Comfortable with most concepts")
        print("5: Expert - Very confident, could teach others")
        
        assessment_areas = {
            'integers': "Whole numbers, positive/negative numbers",
            'arithmetic_operations': "Basic math operations (+, -, ×, ÷)",
            'fractions': "Fractions, decimals, percentages",
            'algebra': "Algebraic expressions and equations", 
            'geometry': "Shapes, area, perimeter, angles",
            'word_problems': "Solving math word problems",
            'data_interpretation': "Reading charts, graphs, tables"
        }
        
        for concept, description in assessment_areas.items():
            while True:
                try:
                    rating = int(input(f"\n{description} (1-5): "))
                    if 1 <= rating <= 5:
                        proficiency = (rating / 5) * 100  # Convert to 0-100 scale
                        self.add_known_concept(concept, proficiency)
                        print(f"   Rated {rating}/5 → {proficiency}% proficiency")
                        break
                    else:
                        print("X Please enter a number between 1-5")
                except ValueError:
                    print("X Please enter a valid number")
        
        print(f"  Knowledge assessment completed! {len(self.known_concepts)} areas rated.")
        
    def add_known_concept(self, concept, proficiency=100):
        """Add a concept that the student already knows"""
        self.known_concepts[concept] = min(100, max(0, proficiency))  # Clamp between 0-100
        
    def update_proficiency(self, concept, proficiency_change):
        """Update proficiency after completing a module or assessment"""
        if concept in self.known_concepts:
            self.known_concepts[concept] = min(100, max(0, self.known_concepts[concept] + proficiency_change))
        else:
            self.known_concepts[concept] = min(100, max(0, proficiency_change))
    
    def complete_module(self, module, performance_score=100):
        """Mark a module as completed and update knowledge"""
        self.completed_modules.append(module.id)
        
        # Update proficiency for each concept in the module
        for concept in module.concepts:
            self.update_proficiency(concept, performance_score * 0.8)  # Scale the improvement
        
        # If performance was poor, mark concepts as struggling
        if performance_score < 70:
            self.struggling_concepts.extend(module.concepts)
    
    def get_unknown_concepts(self, all_concepts):
        """Get concepts the student doesn't know yet"""
        return [concept for concept in all_concepts if concept not in self.known_concepts or self.known_concepts[concept] < 70]
    
    def get_weak_concepts(self, threshold=70):
        """Get concepts where proficiency is below threshold"""
        return [concept for concept, proficiency in self.known_concepts.items() if proficiency < threshold]
    
    def calculate_readiness(self, module):
        """Calculate how ready the student is for a module (0-100)"""
        if not module.prerequisites:
            return 100  # No prerequisites = fully ready
            
        total_prereq_score = 0
        for prereq_concept in module.prerequisites:
            if prereq_concept in self.known_concepts:
                total_prereq_score += self.known_concepts[prereq_concept]
            else:
                total_prereq_score += 0  # Unknown concept = 0 proficiency
                
        return total_prereq_score / len(module.prerequisites)
    
    def display_summary(self):
        """Display a summary of the student's configuration"""
        print(f"\n{'='*50}")
        print(f"   STUDENT PROFILE SUMMARY: {self.name}")
        print(f"{'='*50}")
        print(f"   Goal: {self.goal} (Target score: {self.target_score})")
        print(f"   Weekly Study Time: {self.available_time_week} minutes ({self.available_time_week/60:.1f} hours)")
        print(f"   Learning Pace: {self.preferred_difficulty_pace}")
        print(f"   Learning Style: {self.learning_style}")
        print(f"   Known Concepts: {len(self.known_concepts)} areas assessed")
        
        # Show proficiency levels
        if self.known_concepts:
            print(f"\n   Current Proficiency Levels:")
            for concept, proficiency in sorted(self.known_concepts.items()):
                level = "Beginner" if proficiency < 40 else "Intermediate" if proficiency < 70 else "Advanced"
                print(f"   • {concept}: {proficiency:.0f}% ({level})")
                
    
    
    def to_dict(self):
        """Convert student to dictionary for storage"""
        return {
            'student_id': self.student_id,
            'name': self.name,
            'goal': self.goal,
            'target_score': self.target_score,
            'known_concepts': self.known_concepts,
            'available_time_week': self.available_time_week,
            'preferred_difficulty_pace': self.preferred_difficulty_pace,
            'learning_style': self.learning_style,
            'completed_modules': self.completed_modules,
            'struggling_concepts': self.struggling_concepts
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create Student from dictionary"""
        student = cls(data['student_id'], data['name'], data['goal'], data['target_score'])
        student.known_concepts = data.get('known_concepts', {})
        student.available_time_week = data.get('available_time_week', 0)
        student.preferred_difficulty_pace = data.get('preferred_difficulty_pace', 'medium')
        student.learning_style = data.get('learning_style', 'balanced')
        student.completed_modules = data.get('completed_modules', [])
        student.struggling_concepts = data.get('struggling_concepts', [])
        return student
    
    def __str__(self):
        return f"Student({self.student_id}: {self.name}, Goal: {self.goal})"
    
    def __repr__(self):
        return f"Student(id={self.student_id}, name='{self.name}', goal='{self.goal}')"


# Sample student creation for testing
def create_student_interactive():
    """Complete interactive student creation"""
    print("   CREATE NEW STUDENT PROFILE")
    print("=" * 40)
    
    # Basic information
    name = input("Enter your name: ").strip()
    if not name:
        name = "Test Student"
    
    target_score = 160
    try:
        score_input = input("Target GRE Quantitative score (130-170) [default: 160]: ").strip()
        if score_input:
            target_score = int(score_input)
            target_score = max(130, min(170, target_score))  # Clamp to valid range
    except ValueError:
        print("Using default target score: 160")
    
    # Create student
    student = Student(
        student_id=1,  # You'll generate this properly later
        name=name,
        goal="gre_quantitative",
        target_score=target_score
    )
    
    # Interactive configuration
    student.configure_interactive()
    
    # Display summary
    student.display_summary()
    
    return student


# Test the interactive configuration
if __name__ == "__main__":
    print("     INTERACTIVE STUDENT CONFIGURATION TEST")
    print("=" * 50)
    
    student = create_student_interactive()
    
    print(f"\n  Student creation completed!")
    print(f"   {student.name} is ready for personalized learning!")