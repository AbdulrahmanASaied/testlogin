// Importing el libraries w el components el lazma
'use client'

import { useState } from 'react' // useState 3ashan net7akam fe el state beta3 el component
import { useRouter } from 'next/navigation' // useRouter 3ashan el navigation
import { motion } from 'framer-motion' // motion 3ashan el animations
import { useAuthStore } from '@/app/store/authStore' // el custom hook el bey7awwel y7ot el auth state
import { authenticatedFetch } from '@/app/utils/api' // el function el bet3mel fetch bel authorization
import { FiEye, FiEyeOff } from 'react-icons/fi' // el icons beta3 el show/hide el password

export default function LoginForm() {
  // El state hooks 3ashan net7akam fe el fields w el status
  const [email, setEmail] = useState('') // El state beta3 el email
  const [password, setPassword] = useState('') // El state beta3 el password
  const [error, setError] = useState('') // El state beta3 el error messages
  const [isSubmitting, setIsSubmitting] = useState(false) // 3ashan n3rf el form ybe3t wla la2
  const [showPassword, setShowPassword] = useState(false) // 3ashan toggel el password visibility
  const router = useRouter() // 3ashan nel3ab m3a el navigation ba3d ma el login ykhlas
  const setAuth = useAuthStore((state) => state.setAuth) // El custom hook 3ashan n7ot el auth state

  // Function 3ashan net2aked mn el email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Regular expression 3ashan net2aked mn format el email
  }

  // El check 3ashan net2aked mn el form kolo sah (email, password, w email sah)
  const isFormValid = email && password && isValidEmail(email)

  // Function el submit beta3 el form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // El default submit ma yenfa3sh
    setError('') // Na2i el error el qadim
    setIsSubmitting(true) // 7ott el status 3ala submitting

    try {
      // El fetch request 3ashan nlogin
      const loginResponse = await authenticatedFetch('https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token', {
        method: 'POST',
        body: JSON.stringify({ email, password, isEmployee: true }), // Hott el email w password fe el body
      })

      if (!loginResponse.ok) {
        throw new Error('Invalid credentials') // Law el login fail, throw error
      }

      const { token } = await loginResponse.json() // 3ashan n3mel extract lel token mn el response

      // El fetch request 3ashan n5od el user info
      const userInfoResponse = await authenticatedFetch('https://api-yeshtery.dev.meetusvr.com/v1/user/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Hott el token fe el headers
        },
      })

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info') // Law el fetch beta3 el info fail, throw error
      }

      const { id, name } = await userInfoResponse.json() // 3ashan n3mel extract lel user info

      // Hott el auth state w roo7 lel dashboard
      setAuth(token, id, name)
      router.push('/dashboard') // Ro7 3ala el dashboard ba3d ma login ykhlas
    } catch (error) {
      console.error('Login Error:', error) // Console log lel error
      setError('Login failed. Please check your credentials and try again.') // 7ott el error message
    } finally {
      setIsSubmitting(false) // 7ott el status back lel false ba3d el request
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit} // el form submit
      className="mt-8 space-y-6"
      initial={{ opacity: 0, y: 20 }} // Animation 3ashan el form yibda2
      animate={{ opacity: 1, y: 0 }} // Animation 3ashan yedee el form opacity 1
      transition={{ duration: 0.5 }} // El time el animation y5od
    >
      <div className="space-y-4">
        {/* Email input field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }} // El delay 3ashan yeb2a smooth animation
        >
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-white-500 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 focus:z-10 sm:text-sm transition-all duration-300 ease-in-out bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"
            placeholder="Email address"
            value={email} // El value m3tag el email
            onChange={(e) => setEmail(e.target.value)} // Update el email state
          />
        </motion.div>

        {/* Password input field */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Animation delay
        >
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'} // Toggle el password visibility
              autoComplete="current-password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-white-500 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-500 focus:z-10 sm:text-sm transition-all duration-300 ease-in-out bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"
              placeholder="Password"
              value={password} // El value beta3 el password
              onChange={(e) => setPassword(e.target.value)} // Update el password state
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />} {/* Show/hide password icon */}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Submit button */}
      <div>
        <motion.button
          type="submit"
          disabled={!isFormValid || isSubmitting} // Disable el button law el form mesh sah wla lw beye7sal submitting
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-l font-medium rounded-full text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }} // Animation 3ashan ytkber lw hawar el button
          whileTap={{ scale: 0.95 }} // Animation 3ashan y2allas lw 3amalt click
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'} {/* T7ot loading aw text normal */}
        </motion.button>
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          className="text-red-500 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} // Fade in el error message
          transition={{ duration: 0.3 }} // Animation time lel error message
        >
          {error} {/* Error text */}
        </motion.div>
      )}
    </motion.form>
  )
}
