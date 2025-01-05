// Importing el LoginForm component
import LoginForm from '@/app/components/LoginForm'

// El main LoginPage component
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-1000 to-black-800">
      {/* El container el kbeer el bey7ot el form */}
      <div className="max-w-md w-full space-y-8 p-10 bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg">
        <div className="text-center">
          {/* El title beta3 el login page */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          {/* El description beta3 el login */}
          <p className="mt-2 text-center text-sm text-gray-300">
            Sign in to your account
          </p>
        </div>
        {/* Hena el LoginForm */}
        <LoginForm />
      </div>
    </div>
  )
}
