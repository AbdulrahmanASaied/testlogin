import { create } from 'zustand'
// Zustand library 3shan n-handle state management fel app bta3na be tari2a baseeta

import { persist } from 'zustand/middleware'
// Middleware ely y-khaleena n-save el state fi localStorage aw sessionStorage, 
// 3shan el user data ma-tt-msa7sh lama y-refresh.

interface AuthState {
  token: string | null
  userId: string | null
  userName: string | null
  setAuth: (token: string, userId: string, userName: string) => void
  clearAuth: () => void
}
// Interface bt-define el structure elly el store lazm y-shteghal 3aleeh: 
// token, userId, userName, w methods setAuth & clearAuth.

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      userName: null,
      // Initial state: kul haga null, 3shan mafeesh user logged in.

      setAuth: (token, userId, userName) => set({ token, userId, userName }),
      // Function bt-allow user login: bt-update el token, userId, w userName 
      // 3shan y-khaleeh authenticated.

      clearAuth: () => set({ token: null, userId: null, userName: null }),
      // Function bt-reset kul el auth data 3shan y-khaleeh logged out.
    }),
    {
      name: 'auth-storage',
      // Name elly n-storage bey-create fi localStorage (3shan y7faz el data).
    }
  )
)
// useAuthStore: Store we function bt-handle state management for user authentication. 
// Persistence enabled (state yfdal mawgoud ba3d reload).
