import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Onboarding() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('userName', name)
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Header section */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
        <div className="z-10 max-w-md px-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Investing Made Easy</h1>
          <p className="text-lg text-gray-600 mb-8">
            Create your profile and start tracking your portfolio in minutes.
          </p>
        </div>
      </div>

      <div className="px-6 py-8 bg-white text-center">
        <p>
          Add graphics and text about the product here.
        </p>
      </div>

      {/* Form section */}
      <div className="flex-shrink px-6 pb-12 pt-10 bg-white">
        <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create your account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-8">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Your Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-[240px] px-5 py-3 border border-gray-300 rounded-2xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-[240px] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
          >
            Continue
          </button>
        </form>


        </div>
      </div>
    </div>
  )
}
