import { useAuthStore } from '@/app/store/authStore'
// Import el authStore 3shan n-access el authentication state (token w clearAuth function).

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
// Function async bt-handle API requests while ensuring authentication.
// Parameters:
// - url: el endpoint bta3 el API.
// - options: request configuration (method, headers, etc.).

  const token = useAuthStore.getState().token
  // Gybna el token mn el auth store, 3shan n-add authorization header lw user authenticated.

  const headers = new Headers(options.headers)
  // Create Headers object mn el headers elly gayeen fi options.

  headers.set('Content-Type', 'application/json')
  // Default Content-Type header 3shan el server y-fhem el data b-format JSON.

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
    // Add Authorization header lw el token mawgood, 
    // da b-yshta3'al 3ala secured endpoints bta3 el API.
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })
  // Execute el API request: 
  // - headers updated.
  // - options merged ma3 el default headers.

  if (response.status === 401) {
    // Handle unauthorized requests:
    useAuthStore.getState().clearAuth()
    // Call clearAuth function 3shan n-clear authentication details mn el store.

    throw new Error('Unauthorized')
    // Throw error 3shan n-signal en el request fail la2eno mafeesh valid token.
  }

  return response
  // Return el response mn el API lw mafeesh errors.
}
