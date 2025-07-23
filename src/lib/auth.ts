// Simple authentication utility for demo purposes
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Password should be at least 8 characters and contain letters and numbers
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
};

export const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - in real app this would be done server-side
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  if (!validatePassword(password)) {
    throw new Error('Password must be at least 8 characters with letters and numbers');
  }

  // Demo credentials
  if (email === 'admin@parcels.com' && password === 'admin123') {
    return {
      id: '1',
      email: 'admin@parcels.com',
      name: 'Admin User',
      role: 'admin'
    };
  }
  
  throw new Error('Invalid credentials');
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};