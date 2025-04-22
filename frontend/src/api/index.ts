/**
 * API client for the backend
 */

// Define base URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Default request options
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

// Base fetch function with error handling
async function fetchFromAPI<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API error: ${response.status} ${response.statusText}`);
    }

    // Parse and return the response data
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// API methods
export const api = {
  // GET request
  get: <T = any>(endpoint: string, options: RequestInit = {}) => 
    fetchFromAPI<T>(endpoint, { ...options, method: 'GET' }),
  
  // POST request
  post: <T = any>(endpoint: string, data: any, options: RequestInit = {}) => 
    fetchFromAPI<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: JSON.stringify(data), 
    }),
  
  // PUT request
  put: <T = any>(endpoint: string, data: any, options: RequestInit = {}) => 
    fetchFromAPI<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: JSON.stringify(data), 
    }),
  
  // DELETE request
  delete: <T = any>(endpoint: string, options: RequestInit = {}) => 
    fetchFromAPI<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api; 