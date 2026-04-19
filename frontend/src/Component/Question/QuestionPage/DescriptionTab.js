// src/components/QuestionPage/DescriptionTab.jsx
const difficultyStyle = {
  easy:   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  medium: "bg-amber-500/10   text-amber-400   border border-amber-500/25",
  hard:   "bg-red-500/10     text-red-400     border border-red-500/25",
}

export default function DescriptionTab({ questionData, testcases }) {
  return (
    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-5 lg:gap-6">

      {/* Title + badges */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="font-mono text-xs text-slate-600">#{questionData.questionNumber}</span>
          <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] capitalize ${difficultyStyle[questionData.type]}`}>
            {questionData.type}
          </span>
          <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20
                           px-2.5 py-0.5 rounded-full font-mono text-[11px] capitalize">
            {questionData.topic}
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">{questionData.heading}</h2>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed">{questionData.description}</p>

      {/* Examples */}
      {testcases.slice(0, 2).map((tc, i) => (
        <div key={tc._id || i}>
          <h3 className="font-mono text-[11px] tracking-widest text-slate-500 uppercase mb-2">Example {i + 1}</h3>
          <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-4 flex flex-col gap-3">
            <div>
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Input</span>
              <pre className="font-mono text-sm text-slate-300 mt-1.5 bg-[#0a0a0f] rounded-lg p-2.5 overflow-x-auto">{tc.input}</pre>
            </div>
            <div>
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Output</span>
              <pre className="font-mono text-sm text-emerald-400 mt-1.5 bg-[#0a0a0f] rounded-lg p-2.5 overflow-x-auto">{tc.output}</pre>
            </div>
            {tc.explanation && (
              <div>
                <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Explanation</span>
                <p className="font-mono text-xs text-slate-500 mt-1.5">{tc.explanation}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Constraints */}
      <div>
        <h3 className="font-mono text-[11px] tracking-widest text-slate-500 uppercase mb-2">Constraints</h3>
        <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl px-4 py-3">
          <code className="font-mono text-xs text-amber-300 whitespace-pre-wrap">{questionData.constraints}</code>
        </div>
      </div>
    </div>
  )
}