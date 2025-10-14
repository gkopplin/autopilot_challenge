interface Step1NameProps {
  value: string
  onChange: (val: string) => void
  onNext: () => void
}

export default function Step1Name({ value, onChange, onNext }: Step1NameProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Get Started
      </h2>

      <div className="w-60 flex flex-col">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Enter your name"
          className="border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition px-[6px] py-[6px] mb-[20px] rounded-[6px]"
        />

        <button
          onClick={onNext}
          className="font-semibold rounded-2xl shadow hover:bg-sky-300 hover:cursor-pointer transition-colors py-[6px] px-[6px]"
        >
          Continue
        </button>


      </div>
    </div>
  )
}
