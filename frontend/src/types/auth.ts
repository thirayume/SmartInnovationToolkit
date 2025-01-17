// src/types/auth.ts
export interface LoginResponse {
	success: boolean;
	data?: {
	  token: string;
	  user: User;  // You can define a User interface too
	};
	error?: string;
      }
      
      export interface User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	// Add other user properties as needed
      }
      
      // You can also add other auth-related interfaces here
      export interface LoginRequest {
	email: string;
	password: string;
      }