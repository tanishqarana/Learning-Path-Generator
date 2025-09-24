"""
Genetic Algorithm for generating optimal learning paths
"""

import random
import math
from .models.student import Student
from .data.gre_modules import create_gre_quantitative_module

class LearningPathGA:
    def __init__(self, population_size=50, generations=100, mutation_rate=0.1):
        self.population_size = population_size
        self.generations = generations
        self.mutation_rate = mutation_rate
        self.modules = create_gre_quantitative_module()
        
    class LearningPath:
        """Represents a candidate learning path (chromosome)"""
        def __init__(self, module_sequence):
            self.module_sequence = module_sequence  # Ordered list of modules
            self.fitness = 0  # How good this path is
            
        def __len__(self):
            return len(self.module_sequence)
        
        def __getitem__(self, index):
            return self.module_sequence[index]
        
        def __repr__(self):
            return f"Path(fitness={self.fitness:.2f}, modules={len(self)})"
    
    def create_initial_population(self, student):
        """Create initial random population of learning paths"""
        population = []
        
        for _ in range(self.population_size):
            # Filter modules based on student's known concepts
            available_modules = self.get_available_modules(student)
            
            # Create a random path (shuffle available modules)
            random_path = random.sample(available_modules, min(10, len(available_modules)))
            path = self.LearningPath(random_path)
            population.append(path)
            
        return population
    
    def get_available_modules(self, student):
        """Get modules that are appropriate for the student's current level"""
        available_modules = []
        
        for module in self.modules:
            # Check if student is ready for this module (prerequisites satisfied)
            readiness = student.calculate_readiness(module)
            if readiness >= 50:  # At least 50% ready
                available_modules.append(module)
        
        # If no modules are available, return easier modules
        if not available_modules:
            available_modules = [module for module in self.modules 
                               if module.difficulty <= 2]
        
        return available_modules
    
    def calculate_fitness(self, path, student):
        """Calculate how good this learning path is for the student"""
        if not path.module_sequence:
            return 0
            
        fitness = 0
        total_time = 0
        concepts_covered = set()
        
        # 1. Time fitness (respect student's available time)
        for module in path.module_sequence:
            total_time += module.time_estimate
        
        time_fitness = 1 - abs(total_time - student.available_time_week) / student.available_time_week
        fitness += time_fitness * 0.3  # 30% weight
        
        # 2. Concept coverage fitness (cover what student needs to learn)
        student_unknown_concepts = student.get_unknown_concepts(
            [concept for module in self.modules for concept in module.concepts]
        )
        
        for module in path.module_sequence:
            for concept in module.concepts:
                if concept in student_unknown_concepts:
                    concepts_covered.add(concept)
        
        if student_unknown_concepts:
            coverage_fitness = len(concepts_covered) / len(student_unknown_concepts)
        else:
            coverage_fitness = 1.0
            
        fitness += coverage_fitness * 0.4  # 40% weight
        
        # 3. Prerequisite fitness (respect learning order)
        prerequisite_violations = 0
        learned_concepts = set(student.known_concepts.keys())
        
        for i, module in enumerate(path.module_sequence):
            for prereq in module.prerequisites:
                if prereq not in learned_concepts:
                    prerequisite_violations += 1
            # Add this module's concepts to learned concepts
            learned_concepts.update(module.concepts)
        
        prereq_fitness = 1.0 / (1 + prerequisite_violations)
        fitness += prereq_fitness * 0.2  # 20% weight
        
        # 4. Difficulty progression fitness (smooth difficulty curve)
        difficulty_changes = 0
        for i in range(1, len(path.module_sequence)):
            diff_change = abs(path[i].difficulty - path[i-1].difficulty)
            difficulty_changes += diff_change
        
        if len(path.module_sequence) > 1:
            progression_fitness = 1.0 / (1 + difficulty_changes / (len(path.module_sequence) - 1))
        else:
            progression_fitness = 1.0
            
        fitness += progression_fitness * 0.1  # 10% weight
        
        path.fitness = max(0, fitness)
        return path.fitness
    
    def select_parent(self, population):
        """Select a parent using tournament selection"""
        tournament_size = 3
        tournament = random.sample(population, tournament_size)
        tournament.sort(key=lambda x: x.fitness, reverse=True)
        return tournament[0]
    
    def crossover(self, parent1, parent2):
        """Create a child path by combining two parents"""
        if len(parent1) < 2 or len(parent2) < 2:
            return parent1  # No crossover possible
            
        # Single-point crossover
        crossover_point = random.randint(1, min(len(parent1), len(parent2)) - 1)
        
        # Take first part from parent1
        child_sequence = parent1.module_sequence[:crossover_point]
        
        # Add modules from parent2 that aren't already included
        parent2_modules = parent2.module_sequence[crossover_point:]
        for module in parent2_modules:
            if module not in child_sequence:
                child_sequence.append(module)
        
        return self.LearningPath(child_sequence)
    
    def mutate(self, path, student):
        """Mutate a path by swapping, adding, or removing modules"""
        new_sequence = path.module_sequence.copy()
        
        # Swap mutation (most common)
        if len(new_sequence) >= 2 and random.random() < self.mutation_rate:
            i, j = random.sample(range(len(new_sequence)), 2)
            new_sequence[i], new_sequence[j] = new_sequence[j], new_sequence[i]
        
        # Add mutation (add a new module)
        if random.random() < self.mutation_rate * 0.5:
            available_modules = self.get_available_modules(student)
            unused_modules = [m for m in available_modules if m not in new_sequence]
            if unused_modules:
                new_module = random.choice(unused_modules)
                new_sequence.append(new_module)
        
        # Remove mutation (remove a module)
        if len(new_sequence) > 3 and random.random() < self.mutation_rate * 0.3:
            new_sequence.pop(random.randint(0, len(new_sequence) - 1))
        
        return self.LearningPath(new_sequence)
    
    def evolve(self, student, initial_path=None):
        """Main evolution function to generate optimal learning path"""
        print(f"🧬 Generating learning path for {student.name}...")
        print(f"   Population: {self.population_size}, Generations: {self.generations}")
        
        # Create initial population
        if initial_path:
            population = [initial_path]
            # Fill rest with random paths
            population.extend(self.create_initial_population(student)[1:])
        else:
            population = self.create_initial_population(student)
        
        # Evaluate initial population
        for path in population:
            self.calculate_fitness(path, student)
        
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
            
            # Print progress every 10 generations
            if (generation + 1) % 10 == 0:
                best_fitness = population[0].fitness
                print(f"   Generation {generation + 1}: Best fitness = {best_fitness:.3f}")
        
        # Return the best path
        population.sort(key=lambda x: x.fitness, reverse=True)
        best_path = population[0]
        
        print(f"✅ Evolution completed! Best path fitness: {best_path.fitness:.3f}")
        return best_path
    
    def display_path(self, path, student):
        """Display the generated learning path in a readable format"""
        print(f"\n🎯 PERSONALIZED LEARNING PATH FOR {student.name}")
        print("=" * 60)
        print(f"Target: GRE Quantitative {student.target_score}+")
        print(f"Total modules: {len(path)}")
        print(f"Estimated time: {sum(m.time_estimate for m in path.module_sequence)} minutes")
        print(f"Path fitness score: {path.fitness:.3f}")
        print("\n📚 Learning Sequence:")
        
        total_time = 0
        for i, module in enumerate(path.module_sequence, 1):
            total_time += module.time_estimate
            readiness = student.calculate_readiness(module)
            print(f"{i:2d}. {module.name}")
            print(f"    ⏱️  {module.time_estimate} min | 🎯 Diff: {module.difficulty}/5 | 📊 Ready: {readiness:.0f}%")
            print(f"    📖 Concepts: {', '.join(module.concepts)}")
            
            if module.prerequisites:
                print(f"    ⚠️  Prerequisites: {', '.join(module.prerequisites)}")
            print()


# Test function
def test_genetic_algorithm():
    """Test the genetic algorithm with a sample student"""
    print("🧪 TESTING GENETIC ALGORITHM")
    print("=" * 50)
    
    # Create a sample student
    from models.student import create_student_interactive
    student = create_student_interactive()
    
    # Create and run GA
    ga = LearningPathGA(population_size=30, generations=50)  # Smaller for testing
    
    # Generate learning path
    learning_path = ga.evolve(student)
    
    # Display results
    ga.display_path(learning_path, student)
    
    return student, learning_path


if __name__ == "__main__":
    test_genetic_algorithm()