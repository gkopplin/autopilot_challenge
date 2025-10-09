interface StepProps {
  value: string
  onChange: (val: string) => void
  onNext: () => void
}

export default function Step1Name({ value, onChange, onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">What’s your name?</h2>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter your name"
        className="w-[240px] px-5 py-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <button
        onClick={onNext}
        className="w-[240px] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
      >
        Continue
      </button>
    </div>
  )
}
