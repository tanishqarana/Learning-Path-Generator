// Simple authentication service for demo purposes
// In a real app, this would integrate with your backend auth system

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

class AuthService {
  private currentUser: User | null = null;
  private token: string | null = null;

  // Mock login - in real app, this would call your backend
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, validate with backend
    if (email === 'admin@learnpath.com' && password === 'admin') {
      this.currentUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@learnpath.com',
        role: 'admin'
      };
      this.token = 'mock-jwt-token';
    } else {
      this.currentUser = {
        id: '2', 
        name: 'Demo Student',
        email: email,
        role: 'student'
      };
      this.token = 'mock-jwt-token';
    }
    
    this.saveToStorage();
    return this.currentUser;
  }

  // Mock logout
  async logout(): Promise<void> {
    this.currentUser = null;
    this.token = null;
    this.clearStorage();
  }

  // Get current user
  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.loadFromStorage();
    }
    return this.currentUser;
  }

  // Get auth token
  getToken(): string | null {
    if (!this.token) {
      this.loadFromStorage();
    }
    return this.token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  // Save to localStorage
  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      localStorage.setItem('token', this.token || '');
    }
  }

  // Load from localStorage
  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userStr && token) {
        this.currentUser = JSON.parse(userStr);
        this.token = token;
      }
    }
  }

  // Clear storage
  private clearStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }

  // Mock password reset
  async resetPassword(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Password reset email sent to ${email}`);
  }

  // Mock signup
  async signup(userData: {
    name: string;
    email: string;
    password: string;
    role?: 'student' | 'admin';
  }): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.currentUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'student'
    };
    this.token = 'mock-jwt-token';
    
    this.saveToStorage();
    return this.currentUser;
  }
}

export const authService = new AuthService();