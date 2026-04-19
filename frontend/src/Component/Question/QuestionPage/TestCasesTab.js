// src/components/QuestionPage/TestCasesTab.jsx
import { useState } from "react"

export default function TestCasesTab({ testcases }) {
  const [active, setActive] = useState(0)

  return (
    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[11px] tracking-widest text-slate-500 uppercase">Test Cases</h3>
        <span className="font-mono text-[11px] text-slate-600">{testcases.length} total</span>
      </div>

      {/* Case selector */}
      <div className="flex gap-2 flex-wrap">
        {testcases.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all
              ${active === i
                ? "bg-violet-500/15 border-violet-500 text-violet-300"
                : "bg-[#111118] border-[#1e1e2e] text-slate-500 hover:text-slate-300 hover:border-slate-500"
              }`}
          >
            Case {i + 1}
          </button>
        ))}
      </div>

      {/* Active case */}
      {testcases[active] && (
        <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-4 flex flex-col gap-4">
          <div>
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Input</span>
            <pre className="font-mono text-sm text-slate-300 mt-1.5 bg-[#0a0a0f] rounded-lg p-3 overflow-x-auto">
              {testcases[active].input}
            </pre>
          </div>
          <div>
            <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Expected Output</span>
            <pre className="font-mono text-sm text-emerald-400 mt-1.5 bg-[#0a0a0f] rounded-lg p-3 overflow-x-auto">
              {testcases[active].output}
            </pre>
          </div>
          {testcases[active].explanation && (
            <div>
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Explanation</span>
              <p className="font-mono text-xs text-slate-500 mt-1.5">{testcases[active].explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}