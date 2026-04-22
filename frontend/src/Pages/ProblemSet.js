import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getAllQuestion } from "../api/Services/QuestionApi/getAllQuestion"

function ProblemSet() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { question, loading } = useSelector((state) => state.question)

  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  // Read topic from URL — e.g. /problemset?tag=HashMap
  const topicFilter = searchParams.get("tag") || ""

  const clearTopic = () => setSearchParams({})

  useEffect(() => {
    dispatch(getAllQuestion())
  }, [dispatch])

  const questionList = Array.isArray(question) ? question : []

  const filtered = questionList.filter((q) => {
    const matchType   = filter === "all" || q.type === filter
    const matchSearch = q.heading.toLowerCase().includes(search.toLowerCase())
    const matchTopic  = !topicFilter || (q.topic && q.topic.toLowerCase() === topicFilter.toLowerCase())
    return matchType && matchSearch && matchTopic
  })

  const counts = {
    easy:   questionList.filter((q) => q.type === "easy").length,
    medium: questionList.filter((q) => q.type === "medium").length,
    hard:   questionList.filter((q) => q.type === "hard").length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex items-center gap-3 text-violet-400 font-mono text-lg">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Loading questions...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      <div className="w-full px-6 py-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Problems</h1>
            {topicFilter && (
              <span className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-3 py-1">
                <span className="font-mono text-xs text-violet-400">{topicFilter}</span>
                <button
                  onClick={clearTopic}
                  className="text-violet-400 hover:text-white font-mono text-xs leading-none cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2e] rounded-full px-4 py-1.5 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#00e5a0]" />
              {counts.easy} Easy
            </span>
            <span className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2e] rounded-full px-4 py-1.5 font-mono text-xs text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              {counts.medium} Medium
            </span>
            <span className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2e] rounded-full px-4 py-1.5 font-mono text-xs text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_#ef4444]" />
              {counts.hard} Hard
            </span>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>

            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#111118] border border-[#1e1e2e] text-slate-200 placeholder-slate-600
                         font-mono text-sm rounded-lg pl-9 pr-4 py-2.5 w-64
                         focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {[
              { label: "All",    value: "all",    active: "bg-violet-500/10 border-violet-500 text-violet-400" },
              { label: "Easy",   value: "easy",   active: "bg-emerald-500/10 border-emerald-500 text-emerald-400" },
              { label: "Medium", value: "medium", active: "bg-amber-500/10 border-amber-500 text-amber-400" },
              { label: "Hard",   value: "hard",   active: "bg-red-500/10 border-red-500 text-red-400" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`border font-mono text-xs px-4 py-2 rounded-md transition-all duration-150 cursor-pointer
                  ${
                    filter === f.value
                      ? f.active
                      : "bg-[#111118] border-[#1e1e2e] text-slate-500 hover:border-slate-500 hover:text-slate-300"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table Head ── */}
        <div className="grid grid-cols-[60px_1fr_140px] px-4 py-2 font-mono text-[11px] tracking-widest text-slate-600 uppercase border-b border-[#1e1e2e] mb-1">
          <span>#</span>
          <span>Title</span>
          <span>Difficulty</span>
        </div>

        {/* ── Rows ── */}
        <div className="flex flex-col gap-1">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-600 font-mono py-16">
              {topicFilter ? `// No questions found for "${topicFilter}".` : "// No questions found."}
            </p>
          ) : (
            filtered.map((q, index) => (
              <div
                key={q._id}
                onClick={() => navigate(`/question/${q._id}`)}
                className="grid grid-cols-[60px_1fr_140px] items-center px-4 py-4
                           bg-[#111118] border border-transparent rounded-xl cursor-pointer
                           transition-all duration-200
                           hover:bg-[#1a1a2e] hover:border-violet-600
                           hover:translate-x-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]
                           group"
              >
                <span className="font-mono text-sm text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-[15px] font-semibold text-slate-200 group-hover:text-violet-300 transition-colors">
                  {q.heading}
                </span>

                <span
                  className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-mono text-xs font-medium capitalize w-fit
                  ${q.type === "easy"   ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : ""}
                  ${q.type === "medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"       : ""}
                  ${q.type === "hard"   ? "bg-red-500/10 text-red-400 border border-red-500/30"             : ""}
                `}
                >
                  {q.type}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <p className="text-center text-slate-700 font-mono text-xs mt-8">
            Showing {filtered.length} of {questionList.length} problems
          </p>
        )}
      </div>
    </div>
  )
}

export default ProblemSet