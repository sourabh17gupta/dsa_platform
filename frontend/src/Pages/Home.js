import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  AiOutlineFire,
  AiOutlineRight,
  AiOutlineCode,
} from "react-icons/ai"
import { BsCodeSlash, BsLightningCharge, BsGraphUp } from "react-icons/bs"
import { MdOutlineTimer } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { AiOutlineTrophy } from "react-icons/ai"
import { fetchDashboardData } from "../Redux/Slices/DashboardSlice"
import { getSubmissionByUser } from "../api/Services/dashboardApi"
import { getAllQuestion } from "../api/Services/QuestionApi/getAllQuestion"

const stats = [
  { label: "Problems",          value: "3,547", icon: <BsCodeSlash size={18} />,    color: "text-violet-400" },
  { label: "Active Users",      value: "128K",  icon: <FiUsers size={18} />,         color: "text-emerald-400" },
  { label: "Submissions Today", value: "94K",   icon: <BsGraphUp size={18} />,       color: "text-amber-400" },
  { label: "Companies",         value: "500+",  icon: <AiOutlineTrophy size={18} />, color: "text-red-400" },
]

const daily = {
  id: "69cd1ccffd53f4403f558f20",
  title: "Check if the Sentence Is Pangram",
  difficulty: "Easy",
  tags: ["Hash Table", "String"],
  acceptance: "74.3%",
  submissions: "485K",
}

const diffStyle = {
  Easy:   "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30",
  Medium: "text-amber-400 bg-amber-500/10 border border-amber-500/30",
  Hard:   "text-red-400 bg-red-500/10 border border-red-500/30",
}

const DiffBadge = ({ level }) => (
  <span className={`rounded-full px-3 py-0.5 text-xs font-mono font-medium capitalize ${diffStyle[level]}`}>
    {level}
  </span>
)

const Home = () => {
  const navigate  = useNavigate()
  const dispatch  = useDispatch()

  const { question }           = useSelector((state) => state.question)
  const { questions }          = useSelector((s) => s.dashboard)
  const { user }               = useSelector((s) => s.profile)

  // Same as Dashboard.js — local state for all user submissions
  const [sub, setSub] = useState([])

  // Fetch questions on mount — both slices so problem list and solved counts load immediately
  useEffect(() => {
    dispatch(getAllQuestion())      // populates s.question → problem rows
    dispatch(fetchDashboardData()) // populates s.dashboard.questions → solvedByDiff
  }, [dispatch])

  // Fetch all submissions for this user (same as Dashboard.js)
  useEffect(() => {
    getSubmissionByUser()
      .then((res) => setSub(res.submissions || []))
      .catch((err) => console.error(err))
  }, [])

  const questionList = Array.isArray(question)  ? question  : []
  const dashQuestions = Array.isArray(questions) ? questions : []

  // Exact same logic as Dashboard.js ─────────────────────────────────────────

  const solvedIds = useMemo(() => {
    const validQuestionIds = new Set(dashQuestions.map((q) => String(q._id)))
    return new Set(
      sub
        .filter((s) => s.status === "Accepted" && validQuestionIds.has(String(s.questionId)))
        .map((s) => String(s.questionId))
    )
  }, [sub, dashQuestions])

  const totalByDiff = useMemo(() => {
    const m = { easy: 0, medium: 0, hard: 0 }
    questionList.forEach((q) => { m[q.type] = (m[q.type] || 0) + 1 })
    return m
  }, [questionList])

  const solvedByDiff = useMemo(() => {
    const m = { easy: 0, medium: 0, hard: 0 }
    dashQuestions.forEach((q) => {
      if (solvedIds.has(String(q._id))) m[q.type] = (m[q.type] || 0) + 1
    })
    return m
  }, [dashQuestions, solvedIds])

  // ───────────────────────────────────────────────────────────────────────────

  const totalAll  = totalByDiff.easy + totalByDiff.medium + totalByDiff.hard
  const solvedAll = solvedByDiff.easy + solvedByDiff.medium + solvedByDiff.hard

  const diffRows = [
    { level: "Easy",   solved: solvedByDiff.easy,   total: totalByDiff.easy,   color: "#4ade80", textColor: "text-emerald-400" },
    { level: "Medium", solved: solvedByDiff.medium, total: totalByDiff.medium, color: "#f59e0b", textColor: "text-amber-400"  },
    { level: "Hard",   solved: solvedByDiff.hard,   total: totalByDiff.hard,   color: "#ef4444", textColor: "text-red-400"    },
  ]

  // Derive unique topics dynamically from questionList
  const topicList = useMemo(() => {
    const map = {}
    questionList.forEach((q) => {
      if (q.topic) map[q.topic] = (map[q.topic] || 0) + 1
    })
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }))
  }, [questionList])

  // Cycle through violet shades for topic cards
  const topicColors = [
    { bg: "bg-violet-500/10",  border: "border-violet-500/20",  text: "text-violet-400"  },
    { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
    { bg: "bg-amber-500/10",   border: "border-amber-500/20",   text: "text-amber-400"   },
    { bg: "bg-red-500/10",     border: "border-red-500/20",     text: "text-red-400"     },
    { bg: "bg-sky-500/10",     border: "border-sky-500/20",     text: "text-sky-400"     },
    { bg: "bg-pink-500/10",    border: "border-pink-500/20",    text: "text-pink-400"    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      <div className="w-full px-6 py-10 max-w-screen-xl mx-auto">

        {/* Hero */}
        <section className="flex flex-col items-center text-center gap-5 py-16 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-mono text-violet-400">
            <AiOutlineFire size={13} /> Daily Challenge is Live
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white font-mono">
            Level Up Your <br />
            <span className="text-violet-400">Coding Skills</span>
          </h1>

          <p className="max-w-lg text-slate-500 text-base md:text-lg leading-relaxed font-mono">
            Practice problems, ace interviews, and compete with developers worldwide.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/problemset">
              <button className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors cursor-pointer font-mono">
                Start Solving <AiOutlineRight size={13} />
              </button>
            </Link>
          </div>

          {/* Code snippet */}
          <div className="w-full max-w-md rounded-xl border border-[#1e1e2e] bg-[#111118] p-4 text-left mt-2 font-mono">
            <div className="flex gap-1.5 mb-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-amber-500/60" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="text-xs leading-6">
              <p><span className="text-violet-400">def </span><span className="text-amber-400">twoSum</span><span className="text-slate-300">(nums, target):</span></p>
              <p className="pl-5"><span className="text-violet-400">seen </span><span className="text-slate-300">= {"{}"}</span></p>
              <p className="pl-5"><span className="text-violet-400">for </span><span className="text-slate-300">i, num </span><span className="text-violet-400">in </span><span className="text-emerald-400">enumerate</span><span className="text-slate-300">(nums):</span></p>
              <p className="pl-10"><span className="text-violet-400">if </span><span className="text-slate-300">target - num </span><span className="text-violet-400">in </span><span className="text-slate-300">seen:</span></p>
              <p className="pl-16"><span className="text-violet-400">return </span><span className="text-slate-300">[seen[target - num], i]</span></p>
              <p className="pl-10"><span className="text-slate-300">seen[num] = i</span></p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-4">
              <span className={s.color}>{s.icon}</span>
              <p className="text-2xl font-bold mt-2 mb-1 text-white font-mono">{s.value}</p>
              <p className="text-xs text-slate-600 font-mono">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Explore by Topic */}
            {topicList.length > 0 && (
              <section>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1e1e2e]">
                  <h2 className="text-base font-extrabold tracking-tight text-white font-mono">Explore by Topic</h2>
                  <Link to="/problemset" className="flex items-center gap-1 text-xs text-violet-400 font-mono hover:text-violet-300">
                    View all <AiOutlineRight size={11} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {topicList.map((t, i) => {
                    const c = topicColors[i % topicColors.length]
                    return (
                      <div
                        key={t.name}
                        onClick={() => navigate(`/problemset?tag=${encodeURIComponent(t.name)}`)}
                        className={`rounded-xl border ${c.bg} ${c.border} p-4 cursor-pointer
                                    transition-all duration-200 hover:scale-[1.02] hover:brightness-110`}
                      >
                        <p className={`text-xs font-mono font-bold mb-1 uppercase tracking-widest ${c.text}`}>
                          {"{"}
                          {t.name.slice(0, 2).toUpperCase()}
                          {"}"}
                        </p>
                        <p className="text-sm font-semibold text-white font-mono truncate">{t.name}</p>
                        <p className="text-[11px] text-slate-600 font-mono mt-0.5">{t.count} problems</p>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Problem List Preview */}
            <section>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1e1e2e]">
                <h2 className="text-base font-extrabold tracking-tight text-white font-mono">Problems</h2>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2e] rounded-full px-3 py-1 font-mono text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {totalByDiff.easy} Easy
                  </span>
                  <span className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2e] rounded-full px-3 py-1 font-mono text-xs text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {totalByDiff.medium} Medium
                  </span>
                  <span className="flex items-center gap-2 bg-[#111118] border border-[#1e1e2e] rounded-full px-3 py-1 font-mono text-xs text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {totalByDiff.hard} Hard
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-[50px_1fr_130px] px-4 py-2 font-mono text-[11px] tracking-widest text-slate-600 uppercase border-b border-[#1e1e2e] mb-1">
                <span>#</span>
                <span>Title</span>
                <span>Difficulty</span>
              </div>

              <div className="flex flex-col gap-1">
                {questionList.slice(0, 5).map((q, index) => (
                  <div
                    key={q._id}
                    onClick={() => navigate(`/question/${q._id}`)}
                    className="grid grid-cols-[50px_1fr_130px] items-center px-4 py-3
                               bg-[#111118] border border-transparent rounded-xl cursor-pointer
                               transition-all duration-200
                               hover:bg-[#1a1a2e] hover:border-violet-600
                               hover:translate-x-1 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]
                               group"
                  >
                    <span className="font-mono text-sm text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-violet-300 transition-colors font-mono truncate pr-2">
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
                ))}
              </div>

              {questionList.length > 5 && (
                <Link to="/problemset">
                  <div className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#1e1e2e] bg-[#111118] text-violet-400 font-mono text-xs hover:border-violet-600 hover:bg-[#1a1a2e] transition-all cursor-pointer">
                    View all {questionList.length} problems <AiOutlineRight size={11} />
                  </div>
                </Link>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-5">

            {/* Difficulty Breakdown */}
            <div className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-5 flex flex-col gap-4">
              <h2 className="text-sm font-extrabold tracking-tight text-white font-mono">Difficulty Breakdown</h2>

              {diffRows.map((d) => {
                const pct = d.total > 0 ? Math.round((d.solved / d.total) * 100) : 0
                return (
                  <div key={d.level}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-mono font-medium ${d.textColor}`}>{d.level}</span>
                      <span className="font-mono text-xs text-white font-medium">
                        {d.solved}
                        <span className="text-slate-600 font-normal">/{d.total}</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#1e1e2e] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: d.color }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 font-mono">{pct}% solved</p>
                  </div>
                )
              })}

              <div className="border-t border-[#1e1e2e] pt-3 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-600">Total solved</span>
                  <span className="text-white font-medium">
                    {solvedAll}
                    <span className="text-slate-600 font-normal">/{totalAll}</span>
                  </span>
                </div>
                {totalAll > 0 && (
                  <div className="h-1.5 w-full rounded-full bg-[#1e1e2e] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all duration-700"
                      style={{ width: `${Math.round((solvedAll / totalAll) * 100)}%` }}
                    />
                  </div>
                )}
              </div>

              <Link to="/problemset">
                <button className="w-full border border-[#1e1e2e] bg-transparent font-mono text-xs px-4 py-2 rounded-md text-violet-400 hover:border-violet-500 hover:bg-violet-500/5 transition-all cursor-pointer">
                  Browse All Problems
                </button>
              </Link>
            </div>

            {/* User card */}
            {user && (
              <div className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-5 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 text-xl font-bold font-mono">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h3 className="text-white text-sm font-semibold font-mono">{user?.name || "User"}</h3>
                  <p className="text-slate-600 text-xs mt-0.5 font-mono">{user?.email || ""}</p>
                </div>
                <Link to="/dashboard" className="w-full">
                  <button className="w-full border border-[#1e1e2e] font-mono text-xs px-4 py-2 rounded-md text-violet-400 hover:border-violet-500 hover:bg-violet-500/5 transition-all cursor-pointer">
                    View Dashboard <AiOutlineRight size={11} className="inline" />
                  </button>
                </Link>
              </div>
            )}

          </div>
        </div>

        <p className="text-center text-slate-700 font-mono text-xs mt-12">
          {`// ${totalAll} problems and counting`}
        </p>
      </div>
    </div>
  )
}

export default Home