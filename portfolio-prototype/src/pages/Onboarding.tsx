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
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 w-full max-w-5xl">
        {/* Hero / Header section */}
        <div className="flex flex-col items-center justify-center text-center max-w-md">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Investing Made Easy
          </h1>
          <p className="text-lg text-gray-600">
            Create your profile and start tracking your portfolio in minutes.
          </p>
        </div>

        {/* Current Step / Form */}
        <div className="max-w-md w-full p-8 shadow-xl flex flex-col items-center">
          {steps[currentStep]}
        </div>
      </div>
    </div>
  )
}

