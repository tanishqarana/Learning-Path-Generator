'''Mathematics
This test is roughly 3 hours long and consists of about 66 questions on the content of various undergraduate courses in mathematics. Most of the test assesses your knowledge of calculus, linear algebra, abstract algebra, and number theory.
 '''
 
class Module :
    def __init__(self, id, name, difficulty, time_estimate, concepts = None, topics = None):
        self.id = id
        self.name = name
        self.difficulty = difficulty 
        self.time_estimate = time_estimate
        
        if concepts == None :
            self.concepts = []
        else :
            self.concepts = concepts
            
        if topics is None :
           self.topics = []
        else :
            self.topics = topics
            
        self.prerequisites = []
        
    def add_prerequisite(self, concept):
        if concept not in self.prerequisites:
            self.prerequisites.append(concept)
    
    def __str__(self):
        return f"Module({self.id}: {self.name})"
    
    def __repr__(self):
        return f"Module(id={self.id}, name='{self.name}')"
    
    
        
    
 