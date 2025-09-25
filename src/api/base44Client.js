import { createClient } from '@base44/sdk';

// Create a client with authentication required
export const base44 = createClient({
  appId: import.meta.env.VITE_APP_ID,
  requiresAuth: true
});
