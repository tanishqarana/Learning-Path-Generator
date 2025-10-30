"""
Genetic Algorithm for generating optimal learning paths
Enhanced with assessment-driven personalization
"""

import random
import math
import sys
import os

# Add the backend directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from models.student import Student
from data.gre_modules import create_gre_quantitative_modules

class LearningPathGA:
    def __init__(self, population_size=50, generations=100, mutation_rate=0.1):
        self.population_size = population_size
        self.generations = generations
        self.mutation_rate = mutation_rate
        self.modules = create_gre_quantitative_modules()
        
    class LearningPath:
        """Represents a candidate learning path (chromosome)"""
        def __init__(self, module_sequence):
            self.module_sequence = module_sequence  # Ordered list of modules
            self.fitness = 0  # How good this path is
            self.total_time = sum(module.time_estimate for module in module_sequence) if module_sequence else 0
            
        def __len__(self):
            return len(self.module_sequence)
        
        def __getitem__(self, index):
            return self.module_sequence[index]
        
        def __repr__(self):
            return f"Path(fitness={self.fitness:.3f}, modules={len(self)}, time={self.total_time}min)"
    
    def create_initial_population(self, student):
        """Create initial random population of learning paths"""
        population = []
        
        for _ in range(self.population_size):
            # Filter modules based on student's current knowledge
            available_modules = self.get_available_modules(student)
            
            if not available_modules:
                print("❌ No available modules for student. Using all modules.")
                available_modules = self.modules.copy()
            
            # Create path of appropriate length based on student's available time
            max_path_length = self._calculate_optimal_path_length(student, available_modules)
            path_length = min(max_path_length, len(available_modules))
            
            # Create random path
            random_path = random.sample(available_modules, path_length)
            path = self.LearningPath(random_path)
            population.append(path)
            
        return population
    
    def _calculate_optimal_path_length(self, student, available_modules):
        """Calculate optimal number of modules based on student's available time"""
        if not available_modules:
            return 10  # Default length
        
        avg_module_time = sum(module.time_estimate for module in available_modules) / len(available_modules)
        optimal_length = max(5, min(20, student.available_time_week // avg_module_time))
        return int(optimal_length)
    
    def get_available_modules(self, student):
        """Get modules that are appropriate for the student's current level"""
        available_modules = []
        
        for module in self.modules:
            # Check if student is ready for this module (prerequisites satisfied)
            readiness = student.calculate_readiness(module)
            
            # More sophisticated availability based on assessment data
            if readiness >= 40:  # Lower threshold since we have real data
                # Bonus: prioritize modules that address weak areas
                addresses_weak_areas = any(
                    concept in student.get_weak_concepts(50) 
                    for concept in module.concepts
                )
                
                if addresses_weak_areas:
                    # These modules get priority - insert at beginning
                    available_modules.insert(0, module)
                else:
                    # Check if module only covers strong areas (potential penalty)
                    only_strong_areas = all(
                        concept in student.get_strong_concepts(70)
                        for concept in module.concepts
                    )
                    if not only_strong_areas:
                        available_modules.append(module)
        
        # If no modules are available, return easier modules
        if not available_modules:
            available_modules = [module for module in self.modules 
                               if module.difficulty <= 2]
        
        return available_modules
    
    def _get_all_required_concepts(self, student):
        """Get ALL concepts required for comprehensive GRE preparation"""
        # For comprehensive learning, include all concepts from all modules
        all_concepts = set()
        for module in self.modules:
            all_concepts.update(module.concepts)
        return list(all_concepts)
    
    # In backend/genetic_algorithm.py - ENHANCE THE GENETIC ALGORITHM

    def calculate_fitness(self, path, student):
        """Enhanced fitness function using comprehensive assessment data"""
        if not path.module_sequence:
            return 0
        
        fitness = 0
        total_time = 0
        concepts_covered = set()
        weak_concepts_covered = set()
        strong_concepts_reviewed = set()
    
        # Get student's comprehensive knowledge profile from 20-question assessment
        weak_concepts = student.get_weak_concepts(threshold=50)
        strong_concepts = student.get_strong_concepts(threshold=70)
        all_required_concepts = self._get_all_required_concepts(student)
    
        # Track progression through the path
        learned_concepts = set(student.known_concepts.keys())
        prerequisite_violations = 0
        difficulty_changes = 0
        weak_area_focus = 0
    
        for i, module in enumerate(path.module_sequence):
            total_time += module.time_estimate

        # Track concept coverage
            for concept in module.concepts:
                concepts_covered.add(concept)
                if concept in weak_concepts:
                    weak_concepts_covered.add(concept)
                    weak_area_focus += 1  # Bonus for addressing weak areas
                if concept in strong_concepts:
                    strong_concepts_reviewed.add(concept)
        
            # Check prerequisite violations
            for prereq in module.prerequisites:
                if prereq not in learned_concepts:
                    prerequisite_violations += 1
                    # Extra penalty if student is particularly weak in this prerequisite
                    if prereq in student.known_concepts and student.known_concepts[prereq] < 30:
                        prerequisite_violations += 1
        
        # Update learned concepts for next module
            learned_concepts.update(module.concepts)
        
        # Track difficulty progression (smooth progression is better)
            if i > 0:
                prev_difficulty = path[i-1].difficulty
                current_difficulty = module.difficulty
                difficulty_changes += abs(current_difficulty - prev_difficulty)
    
    # 1. WEAK AREA COVERAGE (30% weight) - HIGHEST PRIORITY
        if weak_concepts:
            weak_area_coverage = len(weak_concepts_covered) / len(weak_concepts)
            weak_area_bonus = weak_area_focus / len(path.module_sequence) * 0.1
        else:
            weak_area_coverage = 1.0
            weak_area_bonus = 0
        
        fitness += weak_area_coverage * 0.3 + weak_area_bonus
    
    # 2. COMPREHENSIVE COVERAGE (25% weight) - Cover all required concepts
        if all_required_concepts:
            required_coverage = len(concepts_covered & set(all_required_concepts)) / len(all_required_concepts)
        else:
            required_coverage = 1.0
        
        fitness += required_coverage * 0.25
    
    # 3. TIME OPTIMIZATION (15% weight) - Respect student's available time
        time_ratio = total_time / student.available_time_week if student.available_time_week > 0 else 1
        if time_ratio <= 1.2:  # Allow 20% overage
            time_fitness = 1 - (time_ratio - 1) * 0.5
        else:
            time_fitness = 1 / time_ratio  # Heavy penalty for exceeding
        
        fitness += time_fitness * 0.15
    
    # 4. PREREQUISITE COMPLIANCE (12% weight)
        max_possible_violations = sum(len(module.prerequisites) for module in path.module_sequence)
        if max_possible_violations > 0:
            prereq_fitness = 1 - (prerequisite_violations / max_possible_violations)
        else:
            prereq_fitness = 1.0
        
        fitness += prereq_fitness * 0.12
    
    # 5. DIFFICULTY PROGRESSION (10% weight)
        if len(path.module_sequence) > 1:
            avg_difficulty_change = difficulty_changes / (len(path.module_sequence) - 1)
            progression_fitness = 1.0 / (1 + avg_difficulty_change * 0.5)
        else:
            progression_fitness = 1.0
        
        fitness += progression_fitness * 0.10
    
    # 6. EFFICIENT REVIEW (8% weight) - Avoid unnecessary review of strong areas
        if path.module_sequence:
            review_penalty = len(strong_concepts_reviewed) / (len(concepts_covered) + 1)
            fitness += (1 - review_penalty) * 0.08
    
    # Ensure fitness is between 0 and 1
        path.fitness = max(0, min(1, fitness))
        path.total_time = total_time
        path.concepts_covered = len(concepts_covered)
        path.weak_areas_covered = f"{len(weak_concepts_covered)}/{len(weak_concepts)}" if weak_concepts else "0/0"
    
        return path.fitness

    def get_available_modules(self, student):
        """Get modules that are appropriate based on comprehensive assessment"""
        available_modules = []
    
    # Get detailed knowledge profile from 20-question assessment
        weak_concepts = student.get_weak_concepts(50)
        strong_concepts = student.get_strong_concepts(70)
    
        for module in self.modules:
        # Calculate readiness based on prerequisites
           readiness = student.calculate_readiness(module)
        
        # More sophisticated availability logic
        if readiness >= 30:  # Lower threshold to allow more modules
            # Prioritize modules that address weak areas
            addresses_weak_areas = any(concept in weak_concepts for concept in module.concepts)
            
            # Penalize modules that only cover strong areas (unless for review)
            only_strong_areas = all(concept in strong_concepts for concept in module.concepts)
        
            if addresses_weak_areas:
                # High priority - insert at beginning
                available_modules.insert(0, module)
            elif not only_strong_areas:
                # Medium priority - modules with mixed or new concepts
                available_modules.append(module)
            elif module.difficulty <= 2 and random.random() < 0.3:
                # Low priority - occasional easy review modules
                available_modules.append(module)
    
    # If no modules are available, return easier modules
        if not available_modules:
            available_modules = [module for module in self.modules if module.difficulty <= 2]
    
        print(f"   Available modules: {len(available_modules)} (based on {len(weak_concepts)} weak areas)")
        return available_modules
        """Enhanced fitness function that values comprehensive coverage"""
        if not path.module_sequence:
           return 0
        
        fitness = 0
        total_time = 0
        concepts_covered = set()
    
        # Get ALL concepts from all modules
        all_required_concepts = self._get_all_required_concepts(student)
    
        for module in path.module_sequence:
          total_time += module.time_estimate
          concepts_covered.update(module.concepts)
    
        # 1. Comprehensive Coverage Fitness (30% weight)
        if all_required_concepts:
            coverage_ratio = len(concepts_covered) / len(all_required_concepts)
        else:
            coverage_ratio = 0
        fitness += coverage_ratio * 0.3
    
        # 2. Weak Area Coverage (25% weight)
        weak_concepts = student.get_weak_concepts(50)
        if weak_concepts:
           weak_coverage = len([c for c in weak_concepts if c in concepts_covered]) / len(weak_concepts)
        else:
           weak_coverage = 1.0
        fitness += weak_coverage * 0.25
    
        # 3. Time Fitness (20% weight)
        time_ratio = total_time / student.available_time_week if student.available_time_week > 0 else 1
        if time_ratio <= 1:
           time_fitness = 1 - (1 - time_ratio) * 0.3
        else:
           time_fitness = 1 / time_ratio
        fitness += time_fitness * 0.2
    
        # 4. Difficulty Progression (15% weight)
        progression_score = self.calculate_progression_score(path)
        fitness += progression_score * 0.15
    
        # 5. Prerequisite Compliance (10% weight)
        prereq_score = self.calculate_prerequisite_score(path, student)
        fitness += prereq_score * 0.1
    
        path.fitness = max(0, min(1, fitness))
        path.total_time = total_time
        path.concepts_covered = len(concepts_covered)
        path.total_concepts = len(all_required_concepts)
    
        return path.fitness
        """Enhanced fitness function using real assessment data"""
        if not path.module_sequence:
            return 0
            
        fitness = 0
        total_time = 0
        concepts_covered = set()
        weak_concepts_covered = set()
        strong_concepts_reviewed = set()
        
        # Get student's knowledge profile
        weak_concepts = student.get_weak_concepts(threshold=50)
        strong_concepts = student.get_strong_concepts(threshold=70)
        all_required_concepts = self._get_all_required_concepts(student)
        
        # Track progression through the path
        learned_concepts = set(student.known_concepts.keys())
        prerequisite_violations = 0
        difficulty_changes = 0
        
        for i, module in enumerate(path.module_sequence):
            total_time += module.time_estimate
            
            # Track concept coverage
            for concept in module.concepts:
                concepts_covered.add(concept)
                if concept in weak_concepts:
                    weak_concepts_covered.add(concept)
                if concept in strong_concepts:
                    strong_concepts_reviewed.add(concept)
            
            # Check prerequisite violations
            for prereq in module.prerequisites:
                if prereq not in learned_concepts:
                    prerequisite_violations += 1
                    # Extra penalty if student is particularly weak in this prerequisite
                    if prereq in student.known_concepts and student.known_concepts[prereq] < 30:
                        prerequisite_violations += 1  # Double penalty for critical gaps
            
            # Update learned concepts for next module
            learned_concepts.update(module.concepts)
            
            # Track difficulty progression
            if i > 0:
                prev_difficulty = path[i-1].difficulty
                current_difficulty = module.difficulty
                difficulty_changes += abs(current_difficulty - prev_difficulty)
        
        # 1. Weak Area Coverage Fitness (40% weight) - HIGHEST PRIORITY
        if weak_concepts:
            weak_area_coverage = len(weak_concepts_covered) / len(weak_concepts)
        else:
            weak_area_coverage = 1.0  # Max score if no weak areas
            
        fitness += weak_area_coverage * 0.4
        
        # 2. Required Concept Coverage Fitness (20% weight)
        if all_required_concepts:
            required_coverage = len(concepts_covered & set(all_required_concepts)) / len(all_required_concepts)
        else:
            required_coverage = 1.0
            
        fitness += required_coverage * 0.2
        
        # 3. Time Fitness (15% weight) - respect student's available time
        time_ratio = total_time / student.available_time_week if student.available_time_week > 0 else 1
        if time_ratio <= 1:  # Within or under available time
            time_fitness = 1 - (1 - time_ratio) * 0.5  # Small penalty for underutilization
        else:  # Over available time
            time_fitness = 1 / time_ratio  # Heavy penalty for exceeding
            
        fitness += time_fitness * 0.15
        
        # 4. Prerequisite Fitness (10% weight)
        max_possible_violations = sum(len(module.prerequisites) for module in path.module_sequence)
        if max_possible_violations > 0:
            prereq_fitness = 1 - (prerequisite_violations / max_possible_violations)
        else:
            prereq_fitness = 1.0
            
        fitness += prereq_fitness * 0.1
        
        # 5. Difficulty Progression Fitness (8% weight)
        if len(path.module_sequence) > 1:
            avg_difficulty_change = difficulty_changes / (len(path.module_sequence) - 1)
            progression_fitness = 1.0 / (1 + avg_difficulty_change)
        else:
            progression_fitness = 1.0
            
        fitness += progression_fitness * 0.08
        
        # 6. Unnecessary Review Penalty (7% weight)
        if path.module_sequence:
            review_penalty = len(strong_concepts_reviewed) / (len(concepts_covered) + 1)
            fitness += (1 - review_penalty) * 0.07
        
        # Ensure fitness is between 0 and 1
        path.fitness = max(0, min(1, fitness))
        path.total_time = total_time
        
        return path.fitness
    
    def _get_all_required_concepts(self, student):
        """Get all concepts required to achieve student's target score"""
        # Simplified: for higher target scores, include more advanced concepts
        target_score = student.target_score
        
        if target_score >= 165:
            # Include all advanced concepts
            all_concepts = set()
            for module in self.modules:
                all_concepts.update(module.concepts)
            return list(all_concepts)
        elif target_score >= 155:
            # Include up to difficulty 4 concepts
            required_concepts = set()
            for module in self.modules:
                if module.difficulty <= 4:
                    required_concepts.update(module.concepts)
            return list(required_concepts)
        else:
            # Basic to intermediate concepts only
            required_concepts = set()
            for module in self.modules:
                if module.difficulty <= 3:
                    required_concepts.update(module.concepts)
            return list(required_concepts)
    
    def select_parent(self, population):
        """Select a parent using tournament selection"""
        tournament_size = min(5, len(population))
        tournament = random.sample(population, tournament_size)
        tournament.sort(key=lambda x: x.fitness, reverse=True)
        return tournament[0]
    
    def crossover(self, parent1, parent2):
        """Create a child path by combining two parents"""
        if len(parent1) < 2 or len(parent2) < 2:
            return self.LearningPath(parent1.module_sequence.copy())  # No crossover possible
            
        # Use ordered crossover to preserve module relationships
        child_sequence = self._ordered_crossover(parent1, parent2)
        
        return self.LearningPath(child_sequence)
    
    def _ordered_crossover(self, parent1, parent2):
        """Ordered crossover that preserves prerequisite relationships"""
        size = min(len(parent1), len(parent2))
        
        # Select random crossover points
        start, end = sorted(random.sample(range(size), 2))
        
        # Initialize child with None values
        child = [None] * size
        
        # Copy segment from parent1
        for i in range(start, end + 1):
            child[i] = parent1[i]
        
        # Fill remaining positions with modules from parent2
        parent2_index = 0
        for i in range(size):
            if child[i] is None:
                # Find next module from parent2 that's not already in child
                while parent2_index < len(parent2):
                    module = parent2[parent2_index]
                    parent2_index += 1
                    if module not in child:
                        child[i] = module
                        break
        
        # Remove any None values (shouldn't happen with proper implementation)
        child = [module for module in child if module is not None]
        
        return child
    
    def mutate(self, path, student):
        """Enhanced mutation with multiple mutation types"""
        new_sequence = path.module_sequence.copy()
        
        if not new_sequence:
            return path
        
        mutation_type = random.random()
        
        # Swap mutation (40% chance)
        if mutation_type < 0.4 and len(new_sequence) >= 2:
            i, j = random.sample(range(len(new_sequence)), 2)
            new_sequence[i], new_sequence[j] = new_sequence[j], new_sequence[i]
        
        # Add mutation (25% chance) - add a module that addresses weak areas
        elif mutation_type < 0.65:
            available_modules = self.get_available_modules(student)
            unused_modules = [m for m in available_modules if m not in new_sequence]
            
            if unused_modules:
                # Prefer modules that address weak areas
                weak_area_modules = [m for m in unused_modules 
                                   if any(c in student.get_weak_concepts(50) for c in m.concepts)]
                
                if weak_area_modules:
                    new_module = random.choice(weak_area_modules)
                else:
                    new_module = random.choice(unused_modules)
                
                insert_pos = random.randint(0, len(new_sequence))
                new_sequence.insert(insert_pos, new_module)
        
        # Remove mutation (20% chance) - remove modules that only review strong areas
        elif mutation_type < 0.85 and len(new_sequence) > 3:
            # Identify modules that only cover strong concepts
            strong_concepts = student.get_strong_concepts(70)
            removable_modules = []
            
            for i, module in enumerate(new_sequence):
                if all(concept in strong_concepts for concept in module.concepts):
                    removable_modules.append(i)
            
            if removable_modules:
                remove_index = random.choice(removable_modules)
                new_sequence.pop(remove_index)
            else:
                # Remove random module if no obvious candidates
                new_sequence.pop(random.randint(0, len(new_sequence) - 1))
        
        # Scramble mutation (15% chance) - shuffle a segment
        else:
            if len(new_sequence) >= 4:
                start, end = sorted(random.sample(range(len(new_sequence)), 2))
                segment = new_sequence[start:end]
                random.shuffle(segment)
                new_sequence[start:end] = segment
        
        return self.LearningPath(new_sequence)
    
    def evolve(self, student, initial_path=None):
        """Main evolution function to generate optimal learning path"""
        print(f"🧬 Generating learning path for {student.name}...")
        print(f"   Population: {self.population_size}, Generations: {self.generations}")
        print(f"   Target Score: {student.target_score}, Available Time: {student.available_time_week}min")
        
        # Create initial population
        if initial_path:
            population = [initial_path]
            # Fill rest with random paths
            additional_paths = self.create_initial_population(student)
            population.extend(additional_paths[:self.population_size-1])
        else:
            population = self.create_initial_population(student)
        
        # Evaluate initial population
        for path in population:
            self.calculate_fitness(path, student)
        
        best_fitness_history = []
        
        # Evolution loop
        for generation in range(self.generations):
            new_population = []
            
            # Elitism: keep the best individual
            population.sort(key=lambda x: x.fitness, reverse=True)
            new_population.append(population[0])
            
            # Create new generation
            while len(new_population) < self.population_size:
                parent1 = self.select_parent(population)
                parent2 = self.select_parent(population)
                child = self.crossover(parent1, parent2)
                child = self.mutate(child, student)
                self.calculate_fitness(child, student)
                new_population.append(child)
            
            population = new_population
            
            # Track best fitness
            best_fitness = population[0].fitness
            best_fitness_history.append(best_fitness)
            
            # Print progress every 10 generations
            if (generation + 1) % 10 == 0:
                avg_fitness = sum(p.fitness for p in population) / len(population)
                print(f"   Generation {generation + 1}: Best = {best_fitness:.3f}, Avg = {avg_fitness:.3f}")
        
        # Return the best path
        population.sort(key=lambda x: x.fitness, reverse=True)
        best_path = population[0]
        
        print(f"✅ Evolution completed! Best path fitness: {best_path.fitness:.3f}")
        return best_path
    
    def display_path(self, path, student):
        """Display the generated learning path in a readable format"""
        print(f"\n🎯 PERSONALIZED LEARNING PATH FOR {student.name}")
        print("=" * 70)
        print(f"Target: GRE Quantitative {student.target_score}+")
        print(f"Total modules: {len(path)}")
        print(f"Estimated time: {sum(m.time_estimate for m in path.module_sequence)} minutes")
        print(f"Path fitness score: {path.fitness:.3f}")
        
        # Show how well this path addresses weak areas
        weak_areas = student.get_weak_concepts(50)
        weak_areas_covered = set()
        
        for module in path.module_sequence:
            for concept in module.concepts:
                if concept in weak_areas:
                    weak_areas_covered.add(concept)
        
        if weak_areas:
            coverage_percentage = (len(weak_areas_covered) / len(weak_areas)) * 100
            print(f"Weak areas addressed: {len(weak_areas_covered)}/{len(weak_areas)} ({coverage_percentage:.1f}%)")
        
        print("\n📚 Learning Sequence:")
        print("-" * 70)
        
        total_time = 0
        learned_concepts = set(student.known_concepts.keys())
        
        for i, module in enumerate(path.module_sequence, 1):
            total_time += module.time_estimate
            readiness = student.calculate_readiness(module)
            
            # Check if module addresses weak areas
            addresses_weak_areas = any(concept in weak_areas for concept in module.concepts)
            weak_area_indicator = "🎯" if addresses_weak_areas else "  "
            
            print(f"{i:2d}. {weak_area_indicator} {module.name}")
            print(f"     ⏱️  {module.time_estimate:3d} min | 🎯 Diff: {module.difficulty}/5 | 📊 Ready: {readiness:3.0f}%")
            print(f"     📖 Concepts: {', '.join(module.concepts)}")
            
            # Show prerequisite status
            missing_prereqs = [p for p in module.prerequisites if p not in learned_concepts]
            if missing_prereqs:
                print(f"     ⚠️  Missing prerequisites: {', '.join(missing_prereqs)}")
            
            # Update learned concepts for next module
            learned_concepts.update(module.concepts)
            print()
    
    def analyze_path_quality(self, path, student):
        """Provide detailed analysis of why this path was chosen"""
        print(f"\n🔍 PATH QUALITY ANALYSIS")
        print("=" * 50)
        
        weak_areas = student.get_weak_concepts(50)
        weak_areas_covered = set()
        total_weak_module_count = 0
        
        for module in path.module_sequence:
            module_weak_concepts = [c for c in module.concepts if c in weak_areas]
            if module_weak_concepts:
                weak_areas_covered.update(module_weak_concepts)
                total_weak_module_count += 1
        
        print(f"• Modules targeting weak areas: {total_weak_module_count}/{len(path)}")
        print(f"• Weak areas covered: {len(weak_areas_covered)}/{len(weak_areas)}")
        print(f"• Total estimated time: {path.total_time} minutes")
        print(f"• Student's available time: {student.available_time_week} minutes")
        print(f"• Time utilization: {(path.total_time/student.available_time_week*100):.1f}%")
        
        # Prerequisite analysis
        learned_concepts = set(student.known_concepts.keys())
        prerequisite_violations = 0
        
        for module in path.module_sequence:
            for prereq in module.prerequisites:
                if prereq not in learned_concepts:
                    prerequisite_violations += 1
            learned_concepts.update(module.concepts)
        
        print(f"• Prerequisite violations: {prerequisite_violations}")


# Test function
def test_genetic_algorithm():
    """Test with the student you just created interactively"""
    print("🧪 TESTING GENETIC ALGORITHM")
    print("=" * 50)
    
    # Use interactive creation instead of sample student
    from models.student import create_student_interactive
    student = create_student_interactive()
    
    # Create and run GA
    ga = LearningPathGA(population_size=50, generations=100)  # Increased for better results
    learning_path = ga.evolve(student)
    
    # Display results
    ga.display_path(learning_path, student)
    ga.analyze_path_quality(learning_path, student)
    
    return student, learning_path


if __name__ == "__main__":
    test_genetic_algorithm()