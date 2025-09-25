import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: import.meta.env.VITE_APP_ID, 
  requiresAuth: true
});
  requiresAuth: true // Ensure authentication is required for all operations
});
