import { Link } from "react-router-dom"
import Navbar from "../Component/Navbar"
import {
  AiOutlineFire,
  AiOutlineRight,
  AiOutlineCheck,
  AiOutlineCode,
} from "react-icons/ai"
import { BsCodeSlash, BsLightningCharge, BsGraphUp } from "react-icons/bs"
import { MdOutlineTimer } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { AiOutlineTrophy } from "react-icons/ai"

// ── Static Data ──────────────────────────────────────────────

const stats = [
  { label: "Problems",          value: "3,547", icon: <BsCodeSlash size={18} />,    color: "text-[#ffa116]" },
  { label: "Active Users",      value: "128K",  icon: <FiUsers size={18} />,         color: "text-[#00b8a3]" },
  { label: "Submissions Today", value: "94K",   icon: <BsGraphUp size={18} />,       color: "text-[#5c6bc0]" },
  { label: "Companies",         value: "500+",  icon: <AiOutlineTrophy size={18} />, color: "text-[#ef6c00]" },
]

const categories = [
  { name: "Arrays",              count: 412, icon: "[ ]", bg: "rgba(255,161,22,0.1)",  border: "rgba(255,161,22,0.25)", text: "#ffa116" },
  { name: "Strings",             count: 298, icon: '" "', bg: "rgba(0,184,163,0.1)",   border: "rgba(0,184,163,0.25)",  text: "#00b8a3" },
  { name: "Dynamic Programming", count: 234, icon: "◈",   bg: "rgba(92,107,192,0.1)",  border: "rgba(92,107,192,0.25)", text: "#5c6bc0" },
  { name: "Trees",               count: 189, icon: "⌥",   bg: "rgba(239,108,0,0.1)",   border: "rgba(239,108,0,0.25)",  text: "#ef6c00" },
  { name: "Graphs",              count: 167, icon: "◉",   bg: "rgba(233,30,99,0.1)",   border: "rgba(233,30,99,0.25)",  text: "#e91e63" },
  { name: "Sorting",             count: 143, icon: "↕",   bg: "rgba(76,175,80,0.1)",   border: "rgba(76,175,80,0.25)",  text: "#4caf50" },
]

const daily = {
  id: 1832,
  title: "Check if the Sentence Is Pangram",
  difficulty: "Easy",
  tags: ["Hash Table", "String"],
  acceptance: "74.3%",
  submissions: "485K",
}

const difficulties = [
  { level: "Easy",   solved: 842,  total: 1200, color: "#00b8a3", pct: 70 },
  { level: "Medium", solved: 1243, total: 1800, color: "#ffa116", pct: 69 },
  { level: "Hard",   solved: 412,  total: 547,  color: "#ef4444", pct: 75 },
]

const recent = [
  { id: 1,   title: "Two Sum",                         difficulty: "Easy",   status: "Solved",    lang: "Python", time: "2h ago" },
  { id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy",   status: "Solved",    lang: "C++",    time: "5h ago" },
  { id: 53,  title: "Maximum Subarray",                difficulty: "Medium", status: "Attempted", lang: "Java",   time: "1d ago" },
  { id: 200, title: "Number of Islands",               difficulty: "Medium", status: "Solved",    lang: "Python", time: "2d ago" },
]

// ── Helpers ──────────────────────────────────────────────────

const diffStyle = {
  Easy:   "text-[#00b8a3] bg-[#00b8a3]/10",
  Medium: "text-[#ffa116] bg-[#ffa116]/10",
  Hard:   "text-red-400 bg-red-500/10",
}

const DiffBadge = ({ level }) => (
  <span className={`rounded px-2 py-0.5 text-xs font-medium ${diffStyle[level]}`}>{level}</span>
)

// ── Component ────────────────────────────────────────────────

const Home = () => (
  <div className="min-h-screen bg-[#1a1a1a] text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
   

    <main className="mx-auto max-w-screen-xl px-4 md:px-6 pb-20">

      {/* HERO */}
      <section className="flex flex-col items-center text-center gap-5 py-16 md:py-24">

        <span className="inline-flex items-center gap-2 rounded-full border border-[#ffa116]/30 bg-[#ffa116]/10 px-4 py-1.5 text-xs font-medium text-[#ffa116]">
          <AiOutlineFire size={13} /> Daily Challenge is Live
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Level Up Your <br />
          <span className="text-[#ffa116]">Coding Skills</span>
        </h1>

        <p className="max-w-lg text-[#ababab] text-base md:text-lg leading-relaxed">
          Practice problems, ace interviews, and compete with developers worldwide.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/problems">
            <button className="flex items-center gap-2 rounded-lg bg-[#ffa116] px-6 py-2.5 text-sm font-semibold text-black hover:bg-[#ffb84d] transition-colors">
              Start Solving <AiOutlineRight size={13} />
            </button>
          </Link>
          <Link to="/problems">
            <button className="flex items-center gap-2 rounded-lg border border-[#3e3e3e] bg-[#282828] px-6 py-2.5 text-sm font-medium text-[#ababab] hover:text-white hover:border-[#5e5e5e] transition-colors">
              <BsLightningCharge size={13} /> Daily Challenge
            </button>
          </Link>
        </div>

        {/* Code snippet */}
        <div className="w-full max-w-md rounded-xl border border-[#3e3e3e] bg-[#282828] p-4 text-left mt-2"
             style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <div className="flex gap-1.5 mb-3">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-[#ffa116]/60" />
            <span className="h-3 w-3 rounded-full bg-[#00b8a3]/60" />
          </div>
          <div className="text-xs leading-6">
            <p><span className="text-[#5c6bc0]">def </span><span className="text-[#ffa116]">twoSum</span><span className="text-white">(nums, target):</span></p>
            <p className="pl-5"><span className="text-[#5c6bc0]">seen </span><span className="text-white">= {"{}"}</span></p>
            <p className="pl-5"><span className="text-[#5c6bc0]">for </span><span className="text-white">i, num </span><span className="text-[#5c6bc0]">in </span><span className="text-[#00b8a3]">enumerate</span><span className="text-white">(nums):</span></p>
            <p className="pl-10"><span className="text-[#5c6bc0]">if </span><span className="text-white">target - num </span><span className="text-[#5c6bc0]">in </span><span className="text-white">seen:</span></p>
            <p className="pl-16"><span className="text-[#5c6bc0]">return </span><span className="text-white">[seen[target - num], i]</span></p>
            <p className="pl-10"><span className="text-white">seen[num] = i</span></p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-[#3e3e3e] bg-[#282828] p-4">
            <span className={s.color}>{s.icon}</span>
            <p className="text-2xl font-bold mt-2 mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</p>
            <p className="text-xs text-[#6b6b6b]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left — 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Topic Categories */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Explore by Topic</h2>
              <Link to="/problems" className="flex items-center gap-1 text-xs text-[#ffa116] hover:underline">
                View all <AiOutlineRight size={11} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((c) => (
                <Link to={`/problems?tag=${c.name.toLowerCase()}`} key={c.name}>
                  <div className="rounded-xl border p-4 cursor-pointer transition-transform hover:scale-[1.02]"
                       style={{ background: c.bg, borderColor: c.border }}>
                    <div className="text-xl mb-2" style={{ fontFamily: "monospace", color: c.text }}>{c.icon}</div>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5">{c.count} problems</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Daily Challenge */}
          <section className="rounded-xl border border-[#ffa116]/30 bg-[#ffa116]/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <AiOutlineFire size={15} className="text-[#ffa116]" />
              <span className="text-xs font-semibold text-[#ffa116] uppercase tracking-wide">Daily Challenge</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-[#6b6b6b]">
                <MdOutlineTimer size={13} /> Resets in 8h 42m
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs text-[#6b6b6b] mb-1">#{daily.id}</p>
                <h3 className="text-base font-semibold text-white mb-2">{daily.title}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <DiffBadge level={daily.difficulty} />
                  {daily.tags.map((t) => (
                    <span key={t} className="rounded px-2 py-0.5 text-xs bg-[#3e3e3e] text-[#ababab]">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-3 text-xs text-[#6b6b6b]">
                  <span>Acceptance: <span className="text-white">{daily.acceptance}</span></span>
                  <span>Submissions: <span className="text-white">{daily.submissions}</span></span>
                </div>
              </div>
              <Link to={`/problems/${daily.id}`}>
                <button className="shrink-0 flex items-center gap-1.5 rounded-lg bg-[#ffa116] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffb84d] transition-colors">
                  <AiOutlineCode size={15} /> Solve Now
                </button>
              </Link>
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Recent Activity</h2>
              <Link to="/dashboard" className="flex items-center gap-1 text-xs text-[#ffa116] hover:underline">
                View all <AiOutlineRight size={11} />
              </Link>
            </div>
            <div className="rounded-xl border border-[#3e3e3e] bg-[#282828] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#3e3e3e] text-[#6b6b6b] text-xs">
                    <th className="text-left px-4 py-3 font-medium">Problem</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Difficulty</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Lang</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((p) => (
                    <tr key={p.id} className="border-b border-[#3e3e3e] last:border-0 hover:bg-[#1e1e1e] transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <span className="text-[#6b6b6b] text-xs mr-1">#{p.id}</span>
                        <Link to={`/problems/${p.id}`} className="text-white hover:text-[#ffa116] transition-colors">{p.title}</Link>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell"><DiffBadge level={p.difficulty} /></td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="rounded px-2 py-0.5 text-xs bg-[#3e3e3e] text-[#ababab] font-mono">{p.lang}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-xs font-medium ${p.status === "Solved" ? "text-[#00b8a3]" : "text-[#ffa116]"}`}>
                          {p.status === "Solved" && <AiOutlineCheck size={11} />} {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-[#6b6b6b] hidden sm:table-cell">{p.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-5">

          {/* Difficulty Breakdown — expanded with extra detail */}
          <div className="rounded-xl border border-[#3e3e3e] bg-[#282828] p-5 flex flex-col gap-5">
            <h2 className="text-base font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Difficulty Breakdown</h2>

            <div className="flex flex-col gap-5">
              {difficulties.map((d) => (
                <div key={d.level}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="text-[#ababab]">{d.level}</span>
                    <span className="font-mono text-white font-medium">
                      {d.solved}<span className="text-[#6b6b6b] font-normal">/{d.total}</span>
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#3e3e3e] overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: d.color }} />
                  </div>
                  <p className="text-xs text-[#6b6b6b] mt-1.5">{d.pct}% completion rate</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#3e3e3e] pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#6b6b6b]">Total solved</span>
                <span className="font-mono text-white font-medium">
                  {difficulties.reduce((a, d) => a + d.solved, 0).toLocaleString()}
                  <span className="text-[#6b6b6b] font-normal">/{difficulties.reduce((a, d) => a + d.total, 0).toLocaleString()}</span>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6b6b6b]">Solved globally today</span>
                <span className="font-mono text-white font-medium">2,497</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
)

export default Home