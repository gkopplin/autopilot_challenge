import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Step1Name from '../components/Step1Name'
import Step2StockTypes from '../components/Step2StockTypes'
import Step3BirthDate from '../components/Step3BirthDate'

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [name, setName] = useState('')
  const [stockTypes, setStockTypes] = useState<string[]>([])
  const [birthMonth, setBirthMonth] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const steps = [
    <Step1Name value={name} onChange={setName} onNext={() => setCurrentStep(1)} />,
    <Step2StockTypes
      selected={stockTypes}
      onToggle={type =>
        setStockTypes(prev => (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]))
      }
      onNext={() => setCurrentStep(2)}
    />,
    <Step3BirthDate
      month={birthMonth}
      year={birthYear}
      onMonthChange={setBirthMonth}
      onYearChange={setBirthYear}
      onNext={() => {
        localStorage.setItem(
          'userProfile',
          JSON.stringify({ name, stockTypes, birthMonth, birthYear })
        )
        navigate('/dashboard')
      }}
    />,
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
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

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        {steps[currentStep]}
      </div>
    </div>
  )
}

