"""
FastAPI server for the Learning Path Generator - FIXED VERSION
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional, Any

from genetic_algorithm import LearningPathGA
from models.student import Student
from data.gre_modules import create_gre_quantitative_modules

app = FastAPI(title="Learning Path Generator API", version="1.0.0")

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentRequest(BaseModel):
    name: str
    target_score: int
    available_time_week: int
    known_concepts: Dict[str, float]  # {"algebra": 75, "geometry": 45}
    preferred_difficulty_pace: str = "medium"
    learning_style: str = "balanced"
    goal: str = "gre_quantitative"

class ModuleResponse(BaseModel):
    id: int
    name: str
    difficulty: int
    time_estimate: int
    concepts: List[str]
    prerequisites: List[str]
    readiness: float

class LearningPathResponse(BaseModel):
    student_name: str
    target_score: int
    total_modules: int
    total_time: int
    fitness_score: float
    weak_areas_covered: str
    estimated_weeks: int
    modules: List[ModuleResponse]

class StudentProfileResponse(BaseModel):
    name: str
    target_score: int
    recommended_study_approach: str
    estimated_preparation_time: str
    strong_areas: List[str]
    weak_areas: List[str]
    overall_proficiency: float

@app.get("/")
async def root():
    return {"message": "Learning Path Generator API", "status": "running"}

@app.post("/generate-path", response_model=LearningPathResponse)
async def generate_learning_path(student_data: StudentRequest):
    """Generate a personalized learning path using Genetic Algorithm"""
    try:
        # Create student object with correct constructor
        student = Student(
            name=student_data.name,
            goal=student_data.goal,
            target_score=student_data.target_score
        )
        
        # Set student attributes
        student.known_concepts = student_data.known_concepts
        student.available_time_week = student_data.available_time_week
        student.preferred_difficulty_pace = student_data.preferred_difficulty_pace
        student.learning_style = student_data.learning_style
        
        print(f"🎯 Generating path for {student.name}, target: {student.target_score}")
        print(f"📊 Known concepts: {len(student.known_concepts)}")
        print(f"⏰ Available time: {student.available_time_week} min/week")
        
        # Generate learning path - FIXED: Use your actual GA interface
        ga = LearningPathGA(
            population_size=50, 
            generations=100,
            mutation_rate=0.1
        )
        
        best_path = ga.evolve(student)
        
        if not best_path:
            raise HTTPException(status_code=500, detail="Failed to generate learning path")
        
        # Prepare response - FIXED: Use module_sequence instead of modules
        module_responses = []
        for module in best_path.module_sequence:  # CHANGED: module_sequence instead of modules
            readiness = student.calculate_readiness(module)
            module_responses.append(ModuleResponse(
                id=module.id,  # CHANGED: Direct access to id
                name=module.name,
                difficulty=module.difficulty,
                time_estimate=module.time_estimate,
                concepts=module.concepts,
                prerequisites=getattr(module, 'prerequisites', []),
                readiness=readiness
            ))
        
        # Calculate weak areas coverage
        weak_areas = student.get_weak_concepts(50)
        weak_covered = sum(1 for area in weak_areas 
                          if any(area in module.concepts for module in best_path.module_sequence))  # CHANGED
        weak_coverage = f"{weak_covered}/{len(weak_areas)}"
        
        # Calculate estimated weeks
        total_time = sum(module.time_estimate for module in best_path.module_sequence)  # CHANGED
        weekly_time = student.available_time_week
        estimated_weeks = max(1, total_time // weekly_time) if weekly_time > 0 else 1
        
        return LearningPathResponse(
            student_name=student.name,
            target_score=student.target_score,
            total_modules=len(best_path.module_sequence),  # CHANGED
            total_time=total_time,
            fitness_score=getattr(best_path, 'fitness', 0.8),
            weak_areas_covered=weak_coverage,
            estimated_weeks=estimated_weeks,
            modules=module_responses
        )
        
    except Exception as e:
        import traceback
        print(f"❌ Error generating path: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error generating path: {str(e)}")

@app.get("/student/profile", response_model=StudentProfileResponse)
async def get_student_profile(name: str, target_score: int):
    """Get analysis of student's profile"""
    try:
        # Create a sample student for analysis
        student = Student(name=name, goal="gre_quantitative", target_score=target_score)
        
        # This would normally come from your assessment system
        # For now, using sample data
        sample_concepts = {
            "algebra": 75, "geometry": 45, "arithmetic": 85, 
            "word_problems": 60, "data_interpretation": 70
        }
        student.known_concepts = sample_concepts
        
        # Analyze profile
        strong_areas = student.get_strong_concepts(70)
        weak_areas = student.get_weak_concepts(50)
        overall_proficiency = sum(student.known_concepts.values()) / len(student.known_concepts) if student.known_concepts else 0
        
        # Determine study approach based on profile
        if len(weak_areas) > len(strong_areas):
            approach = "Focus on weak areas first with foundational modules"
        else:
            approach = "Balanced approach with reinforcement of strong areas"
            
        # Estimate preparation time based on target score gap
        base_score = overall_proficiency * 170 / 100  # Convert to GRE scale
        score_gap = max(0, target_score - base_score)
        
        if score_gap > 20:
            prep_time = "16-20 weeks"
        elif score_gap > 10:
            prep_time = "12-16 weeks" 
        else:
            prep_time = "8-12 weeks"
        
        return StudentProfileResponse(
            name=name,
            target_score=target_score,
            recommended_study_approach=approach,
            estimated_preparation_time=prep_time,
            strong_areas=strong_areas,
            weak_areas=weak_areas,
            overall_proficiency=round(overall_proficiency, 1)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing profile: {str(e)}")

@app.get("/modules/list")
async def list_all_modules():
    """Get list of all available modules"""
    try:
        modules = create_gre_quantitative_modules()
        
        return {
            "total_modules": len(modules),
            "modules": [
                {
                    "id": module.id,
                    "name": module.name,
                    "difficulty": module.difficulty,
                    "time_estimate": module.time_estimate,
                    "concepts": module.concepts,
                    "prerequisites": getattr(module, 'prerequisites', []),
                }
                for module in modules
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading modules: {str(e)}")

@app.post("/student/assess")
async def assess_student_knowledge(known_concepts: Dict[str, float]):
    """Assess student's knowledge and return analysis"""
    try:
        student = Student(name="Assessment Student", goal="gre_quantitative", target_score=160)
        student.known_concepts = known_concepts
        
        strong_areas = student.get_strong_concepts(70)
        weak_areas = student.get_weak_concepts(50)
        overall_proficiency = sum(student.known_concepts.values()) / len(student.known_concepts)
        
        return {
            "strong_areas": strong_areas,
            "weak_areas": weak_areas, 
            "overall_proficiency": round(overall_proficiency, 1),
            "recommendations": f"Focus on {len(weak_areas)} weak areas while maintaining {len(strong_areas)} strong areas"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in assessment: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test if modules can be loaded
        modules = create_gre_quantitative_modules()
        return {
            "status": "healthy",
            "modules_loaded": len(modules),
            "database": "connected"  # You could add actual DB check here
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)