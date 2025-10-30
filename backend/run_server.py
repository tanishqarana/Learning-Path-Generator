#!/usr/bin/env python3
"""
FastAPI Server Runner
"""

import uvicorn
import os
import sys

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("🚀 Starting Learning Path Generator API Server...")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🛑 Press Ctrl+C to stop the server")
    
    uvicorn.run(
        "main:app",  # Import string for reload to work
        host="0.0.0.0",
        port=8000,
        reload=True,  # Enable auto-reload during development
        reload_dirs=["."],  # Watch current directory for changes
        log_level="info"
    )