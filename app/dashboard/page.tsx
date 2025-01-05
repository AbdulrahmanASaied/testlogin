'use client' // 3shan el file ysh8al client-side rendering fi Next.js

import { useEffect, useState } from 'react' // State w effects mn React
import { useRouter } from 'next/navigation' // 3shan n-move ben el pages programmatically
import { motion } from 'framer-motion' // Animations smooth lel UI
import { useAuthStore } from '@/app/store/authStore' // Store lel auth state

export default function DashboardPage() {
  // Router 3shan el navigation
  const router = useRouter()

  // State w functions mn auth store
  const { userId, userName, clearAuth } = useAuthStore()

  // States lel date, time, w greeting
  const [currentDate, setCurrentDate] = useState<string>('')
  const [currentTime, setCurrentTime] = useState<string>('')
  const [greeting, setGreeting] = useState<string>('')

  // Function 3shan ngeeb el greeting bhasb el sa3a elaan
  const getGreeting = (hours: number): string => {
    if (hours >= 5 && hours < 12) {
      return 'Good Morning' // Sa3at el sob7
    } else if (hours >= 12 && hours < 17) {
      return 'Good Afternoon' // El dohr
    } else if (hours >= 17 && hours < 21) {
      return 'Good Evening' // El masa2
    } else {
      return 'Good Day' // Lo el wa2t 3'amad
    }
  }

  // useEffect 3shan n-update el date, time, w greeting kol sanaeya
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date()

      // Formatting lel date: 'Monday, 5 Jun'
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      }
      const formattedDate = date.toLocaleDateString('en-GB', dateOptions)
      setCurrentDate(formattedDate)

      // Formatting lel time: '12:34:56 PM'
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      const formattedTime = date.toLocaleTimeString('en-GB', timeOptions)
      setCurrentTime(formattedTime)

      // Update el greeting bhasb el current sa3a
      const currentHour = date.getHours()
      setGreeting(getGreeting(currentHour))
    }, 1000) // Update kol 1 second

    return () => clearInterval(intervalId) // Cleanup lo el component et-shal
  }, [])

  // useEffect lo el user mish logged in, y-ro7 login page
  useEffect(() => {
    if (!userId || !userName) {
      router.push('/login') // Redirect lel login
    }
  }, [userId, userName, router])

  // Function 3shan el user y3ml logout
  const handleLogout = () => {
    clearAuth() // Clear el auth data
    router.push('/login') // Redirect lel login page
  }

  // Return null lo mafesh user data
  if (!userId || !userName) {
    return null
  }

  return (
    <div className="min-h-screen text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Animation start state
        animate={{ opacity: 1, y: 0 }} // Animation end state
        transition={{ duration: 0.5 }} // Duration el animation
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black-800 p-6 rounded-lg shadow-lg flex items-center space-x-4"
        >
          <div className="w-16 h-16 bg-gray-600 rounded-full flex-shrink-0" /> {/* Placeholder lel profile pic */}
          <div>
            <h2 className="text-xl font-semibold">{greeting}, {userName}</h2> {/* Greeting + userName */}
            <p className="text-gray-400">User ID: {userId}</p> {/* User ID */}
          </div>
        </motion.div>

        {/* Date w Time Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-start space-x-4 mt-4"
        >
          <p className="text-lg font-semibold text-gray-400">Today is: {currentDate}</p> {/* El yom */}
          <p className="text-lg font-semibold text-gray-400">{currentTime}</p> {/* El wa2t */}
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-black-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <h3 className="text-lg font-semibold">Settings</h3>
          <div className="space-y-2">
            <button
              onClick={handleLogout} // Log out action
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-500 rounded-md text-white font-semibold transition duration-300 ease-in-out"
            >
              Log Out
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
