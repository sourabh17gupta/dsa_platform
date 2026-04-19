// src/components/QuestionPage/NavBar.jsx
import { useNavigate } from "react-router-dom"

const difficultyStyle = {
  easy:   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  medium: "bg-amber-500/10   text-amber-400   border border-amber-500/25",
  hard:   "bg-red-500/10     text-red-400     border border-red-500/25",
}

const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python",     value: "python"     },
  { label: "C++",        value: "cpp"        },
  { label: "Java",       value: "java"       },
]

export default function NavBar({
  questionData, language, code,
  submitLoading, mobilePanel,
  onLanguageChange, onSubmit, onMobilePanel,
}) {
  const navigate = useNavigate()

  return (
    <header className="shrink-0 h-12 bg-[#0d0d14] border-b border-[#1e1e2e]
                       flex items-center justify-between px-3 sm:px-4 lg:px-5 gap-2 z-20">
      {/* Left */}
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
        <button
          onClick={() => navigate("/problemset")}
          className="shrink-0 flex items-center gap-1 text-slate-500 hover:text-slate-300 font-mono text-xs transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span className="hidden sm:block">Problems</span>
        </button>

        <span className="text-[#2a2a3e] shrink-0 hidden sm:block">|</span>
        <span className="font-mono text-xs text-slate-600 shrink-0 hidden sm:block">#{questionData.questionNumber}</span>

        <span className="font-semibold text-xs sm:text-sm text-white truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none">
          {questionData.heading}
        </span>

        <span className={`shrink-0 hidden sm:inline-flex px-2 py-0.5 rounded-full font-mono text-[11px] capitalize
          ${difficultyStyle[questionData.type]}`}>
          {questionData.type}
        </span>

        <span className="shrink-0 hidden lg:inline-flex bg-violet-500/10 text-violet-400
                         border border-violet-500/25 px-2 py-0.5 rounded-full font-mono text-[11px] capitalize">
          {questionData.topic}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Mobile panel toggle */}
        <div className="flex lg:hidden bg-[#111118] border border-[#1e1e2e] rounded-lg overflow-hidden">
          {["left", "right"].map((panel) => (
            <button
              key={panel}
              onClick={() => onMobilePanel(panel)}
              className={`px-2.5 py-1.5 font-mono text-[11px] transition-colors
                ${mobilePanel === panel ? "bg-violet-600/20 text-violet-300" : "text-slate-600 hover:text-slate-400"}`}
            >
              {panel === "left" ? "Info" : "Code"}
            </button>
          ))}
        </div>

        {/* Language selector (desktop) */}
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="hidden sm:block bg-[#111118] border border-[#1e1e2e] text-slate-300
                     font-mono text-xs rounded-lg px-2 py-1.5
                     focus:outline-none focus:border-violet-500 cursor-pointer transition-colors"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={submitLoading || !code.trim()}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     text-white font-mono text-xs font-semibold
                     px-3 py-1.5 rounded-lg transition-all duration-150
                     shadow-[0_0_14px_rgba(16,185,129,0.2)] hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]"
        >
          {submitLoading ? (
            <>
              <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <span className="hidden sm:block">Running...</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
              Submit
            </>
          )}
        </button>
      </div>
    </header>
  )
}