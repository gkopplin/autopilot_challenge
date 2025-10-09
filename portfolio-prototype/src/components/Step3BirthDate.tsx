interface StepProps {
  month: string
  year: string
  onMonthChange: (val: string) => void
  onYearChange: (val: string) => void
  onNext: () => void
}

export default function Step3BirthDate({ month, year, onMonthChange, onYearChange, onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Your birth month & year</h2>
      <div className="flex space-x-3">
        <input
          type="number"
          placeholder="Month (1-12)"
          value={month}
          onChange={e => onMonthChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          min={1}
          max={12}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={e => onYearChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          min={1900}
          max={new Date().getFullYear()}
        />
      </div>
      <button
        onClick={onNext}
        className="w-[240px] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105"
      >
        Finish
      </button>
    </div>
  )
}
