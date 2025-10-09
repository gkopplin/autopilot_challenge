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
      <div className="grid grid-cols-2 gap-3 w-full justify-center">
        {availableStockTypes.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => onToggle(type)}
            className={`py-2 px-4 rounded-2xl border w-[110px] ${
              selected.includes(type)
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300'
            } hover:shadow-md transition`}
          >
            {type}
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-[240px] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
      >
        Continue
      </button>
    </div>
  )
}
