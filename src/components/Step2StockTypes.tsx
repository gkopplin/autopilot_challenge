import clsx from 'clsx'
// import { CheckIcon } from '@heroicons/react/24/solid'

interface StepProps {
  selected: string[]
  onToggle: (type: string) => void
  onNext: () => void
}

export default function Step2StockTypes({ selected, onToggle, onNext }: StepProps) {
  const availableStockTypes = ['Tech', 'Finance', 'Healthcare', 'Energy', 'Consumer']

  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Preferred stock types</h2>

      <div className="grid grid-cols-2 gap-4 w-full justify-center">
        {availableStockTypes.map(type => {
          const isSelected = selected.includes(type)
          return (
            <div key={type} className="relative w-[110px] h-14 m-[5px]">
              {/* Hidden accessible checkbox */}
              <input
                type="checkbox"
                id={type}
                checked={isSelected}
                onChange={() => onToggle(type)}
                className="sr-only"
              />
              <label
                htmlFor={type}
                className={clsx(
                  'flex items-center justify-center h-full w-full border cursor-pointer transition transform hover:scale-105 rounded-[6px]',
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:shadow-sm'
                )}
              >
                {isSelected && (<span className="text-indigo-600 font-bold text-xs">✓</span>)}
                {type}
              </label>
            </div>
          )
        })}
      </div>

      <button
        onClick={onNext}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 w-[240px] py-[6px] px-[6px] mt-[20px] rounded-[6px]"
      >
        Continue
      </button>
    </div>
  )
}
