"""
Database models for MongoDB (using PyMongo)
"""

from datetime import datetime
from bson import ObjectId

class StudentModel:
    """Student data model for database storage"""
    
    @staticmethod
    def to_dict(student):
        """Convert Student object to database dictionary"""
        return {
            '_id': ObjectId() if not hasattr(student, 'db_id') else student.db_id,
            'student_id': student.student_id,
            'name': student.name,
            'goal': student.goal,
            'target_score': student.target_score,
            'known_concepts': student.known_concepts,
            'available_time_week': student.available_time_week,
            'preferred_difficulty_pace': student.preferred_difficulty_pace,
            'learning_style': student.learning_style,
            'completed_modules': student.completed_modules,
            'struggling_concepts': student.struggling_concepts,
            'module_performance': getattr(student, 'module_performance', {}),
            'created_at': datetime.now(),
            'updated_at': datetime.now(),
            'current_path': getattr(student, 'current_path', None),
            'learning_history': getattr(student, 'learning_history', [])
        }
    
    @staticmethod
    def from_dict(data):
        """Create Student object from database dictionary"""
        from models.student import Student
        
        student = Student(
            student_id=data['student_id'],
            name=data['name'],
            goal=data['goal'],
            target_score=data['target_score']
        )
        
        # Set database ID for updates
        student.db_id = data['_id']
        
        # Restore all attributes
        student.known_concepts = data.get('known_concepts', {})
        student.available_time_week = data.get('available_time_week', 0)
        student.preferred_difficulty_pace = data.get('preferred_difficulty_pace', 'medium')
        student.learning_style = data.get('learning_style', 'balanced')
        student.completed_modules = data.get('completed_modules', [])
        student.struggling_concepts = data.get('struggling_concepts', [])
        student.module_performance = data.get('module_performance', {})
        student.current_path = data.get('current_path')
        student.learning_history = data.get('learning_history', [])
        
        return student

class ExamModel:
    """Mock exam data model"""
    
    @staticmethod
    def to_dict(exam_result):
        return {
            '_id': ObjectId(),
            'student_id': exam_result['student_id'],
            'exam_type': exam_result['exam_type'],
            'score': exam_result['score'],
            'section_scores': exam_result['section_scores'],
            'time_spent': exam_result['time_spent'],
            'questions_attempted': exam_result['questions_attempted'],
            'weak_areas': exam_result['weak_areas'],
            'exam_date': datetime.now(),
            'detailed_breakdown': exam_result.get('detailed_breakdown', {})
        }

class LearningPathModel:
    """Learning path data model"""
    
    @staticmethod
    def to_dict(path, student_id):
        return {
            '_id': ObjectId(),
            'student_id': student_id,
            'module_sequence': [module.id for module in path.module_sequence],
            'fitness_score': path.fitness,
            'total_time': sum(module.time_estimate for module in path.module_sequence),
            'modules_count': len(path.module_sequence),
            'created_at': datetime.now(),
            'generation_parameters': {
                'population_size': getattr(path, 'population_size', 50),
                'generations': getattr(path, 'generations', 100)
            }
        }