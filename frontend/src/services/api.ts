// API service using native fetch instead of axios
import Cookies from 'js-cookie';

// Get the base URL from the environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Handle API response and parse JSON
 */
async function handleResponse<T>(response: Response): Promise<T> {
  // First check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    // Try to parse error response as JSON
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    } catch {
      // If parsing fails, throw a generic error with the status
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
  }
  
  // For 204 No Content responses, return null
  if (response.status === 204) {
    return null as T;
  }
  
  // Parse JSON response
  return response.json();
}

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
  credentials: RequestCredentials;
  mode: RequestMode;
}

/**
 * Main API object with methods for HTTP requests
 */
const api = {
  /**
   * Make a GET request
   */
  get: async <T>(endpoint: string, params?: Record<string, string | undefined>): Promise<T> => {
    // Build URL with query parameters if provided
    let url = `${BASE_URL}${endpoint}`;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value);
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    // Prepare request options
    const options: RequestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in cross-origin requests
      mode: 'cors',
    };
    
    // Add Authorization header if token exists
    const token = Cookies.get('token');
    
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make request and handle response
    const response = await fetch(url, options);
    return handleResponse<T>(response);
  },
  
  /**
   * Make a POST request
   */
  post: async <T>(endpoint: string, data?: Record<string, unknown>): Promise<T> => {
    const url = `${BASE_URL}${endpoint}`;
    
    // Try application/json first
    try {
      const options: RequestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      };
      
      if (data) {
        options.body = JSON.stringify(data);
      }
      
      const token = Cookies.get('token');
      if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(url, options);
      return handleResponse<T>(response);
    } catch {
      // Try form data instead
      const formData = new URLSearchParams();
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, String(value));
          }
        });
      }
      
      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        credentials: 'include',
        mode: 'cors',
      };
      
      const token = Cookies.get('token');
      if (token && options.headers) {
        // Ensure headers is a Record<string, string> before setting Authorization
        const headers = options.headers as Record<string, string>;
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(url, options);
      return handleResponse<T>(response);
    }
  },
  
  /**
   * Make a PATCH request
   */
  patch: async <T>(endpoint: string, data?: Record<string, unknown>): Promise<T> => {
    const url = `${BASE_URL}${endpoint}`;
    
    // Prepare request options
    const options: RequestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in cross-origin requests
      mode: 'cors',
    };
    
    // Add request body if data provided
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    // Add Authorization header if token exists
    const token = Cookies.get('token');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make request and handle response
    const response = await fetch(url, options);
    return handleResponse<T>(response);
  },
  
  /**
   * Make a DELETE request
   */
  delete: async <T>(endpoint: string): Promise<T> => {
    const url = `${BASE_URL}${endpoint}`;
    
    // Prepare request options
    const options: RequestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies in cross-origin requests
      mode: 'cors',
    };
    
    // Add Authorization header if token exists
    const token = Cookies.get('token');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Make request and handle response
    const response = await fetch(url, options);
    return handleResponse<T>(response);
  }
};

export default api; 