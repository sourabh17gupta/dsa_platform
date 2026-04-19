import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../Redux/Slices/DashboardSlice";
import { setUser } from "../../Redux/Slices/ProfileSlice";
import { getMe, getSubmissionsByQuestion, getSubmissionByUser } from "../../api/Services/dashboardApi";
import StatsRing       from "./StatsRing";
import ActivityHeatmap from "./ActivityHeatmap";
import ProblemTable    from "./ProblemTable";

export default function Dashboard() {
  const dispatch  = useDispatch();
  const { user }  = useSelector((s) => s.profile);
  const { questions, loading } = useSelector((s) => s.dashboard);

  // sub = ALL submissions for this user (used for recent list, heatmap, streak, submits count)
  const [sub, setSub] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  // 1️⃣ If user not in Redux/localStorage, fetch from /api/auth/me
  useEffect(() => {
    if (!user) {
      setUserLoading(true);
      getMe()
        .then((res) => {
          if (res.success) dispatch(setUser(res.user));
        })
        .catch((err) => console.error("getMe failed:", err))
        .finally(() => setUserLoading(false));
    }
  }, [user, dispatch]);

  // 2️⃣ Fetch all questions
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // 3️⃣ Fetch ALL submissions for this user in one call
  //    Used for: heatmap, streak, submits count, recent submissions, solvedIds
  useEffect(() => {
    const fetchUserSubmissions = async () => {
      try {
        const res = await getSubmissionByUser();
        setSub(res.submissions || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserSubmissions();
  }, []);

  // ── Derived stats ─────────────────────────────────────────────────────────

  // Which question IDs has the user ever had an "Accepted" submission for?
  // ⚠️ IMPORTANT: Only count questionIds that exist in the current questions list.
  // Orphaned submissions (questionId no longer in DB / mismatched IDs) are excluded.
  const solvedIds = useMemo(() => {
    const validQuestionIds = new Set(questions.map((q) => String(q._id)));
    return new Set(
      sub
        .filter((s) => s.status === "Accepted" && validQuestionIds.has(String(s.questionId)))
        .map((s) => String(s.questionId))
    );
  }, [sub, questions]);

  const totalByDiff = useMemo(() => {
    const m = { easy: 0, medium: 0, hard: 0 };
    questions.forEach((q) => { m[q.type] = (m[q.type] || 0) + 1; });
    return m;
  }, [questions]);

  const solvedByDiff = useMemo(() => {
    const m = { easy: 0, medium: 0, hard: 0 };
    questions.forEach((q) => {
      if (solvedIds.has(String(q._id))) m[q.type] = (m[q.type] || 0) + 1;
    });
    return m;
  }, [questions, solvedIds]);

  // Streak: consecutive days (going back from today) where user made any submission
  const streak = useMemo(() => {
    const days = new Set(
      sub.map((s) => new Date(s.createdAt).toISOString().split("T")[0])
    );
    let count = 0;
    const d = new Date();
    // Start from today; if today has no submission, check yesterday (grace period)
    while (days.has(d.toISOString().split("T")[0])) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [sub]);

  // Recent 5 submissions — newest first, orphaned questionIds excluded
  const recentSubmissions = useMemo(() => {
    const validQuestionIds = new Set(questions.map((q) => String(q._id)));
    return [...sub]
      .filter((s) => validQuestionIds.has(String(s.questionId)))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [sub, questions]);

  const totalSolved = solvedIds.size;
  const totalQ      = questions.length;
  const overallPct  = totalQ > 0 ? Math.round((totalSolved / totalQ) * 100) : 0;

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading || userLoading || !questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black gap-4">
        <div className="w-9 h-9 rounded-full border-2 border-[#2a2a2e] border-t-violet-500 animate-spin" />
        <p className="text-[#6b7280] text-sm">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5">

        {/* ══ LEFT SIDEBAR ══════════════════════════════════════════════════ */}
        <aside className="w-full lg:w-72 flex flex-col gap-4 flex-shrink-0">

          {/* Profile card */}
          <div className="bg-[#2a2a2e] rounded-3xl px-6 py-7 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-violet-900/40">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-white text-lg font-bold">{user?.name || "User"}</h2>
              <p className="text-[#6b7280] text-xs mt-0.5">{user?.email || ""}</p>
            </div>

            {/* Stats strip */}
            <div className="w-full grid grid-cols-3 bg-[#1e1e22] rounded-2xl py-3 mt-1">
              <div className="flex flex-col items-center gap-0.5 border-r border-[#3a3a40]">
                <span className="text-white text-lg font-bold">{totalSolved}</span>
                <span className="text-[#6b7280] text-[10px] uppercase tracking-wide">Solved</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 border-r border-[#3a3a40]">
                <span className="text-white text-lg font-bold">{streak}</span>
                <span className="text-[#6b7280] text-[10px] uppercase tracking-wide">Streak</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                {/* FIX: use sub.length (all user submissions) not allSubmissions.length */}
                <span className="text-white text-lg font-bold">{sub.length}</span>
                <span className="text-[#6b7280] text-[10px] uppercase tracking-wide">Submits</span>
              </div>
            </div>
          </div>

          {/* Difficulty rings */}
          <div className="bg-[#2a2a2e] rounded-3xl px-6 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280] mb-5">
              Solved by Difficulty
            </p>
            <div className="flex justify-around mb-5">
              <StatsRing solved={solvedByDiff.easy}   total={totalByDiff.easy}   color="#4ade80" label="Easy"   />
              <StatsRing solved={solvedByDiff.medium} total={totalByDiff.medium} color="#facc15" label="Medium" />
              <StatsRing solved={solvedByDiff.hard}   total={totalByDiff.hard}   color="#f472b6" label="Hard"   />
            </div>
            <div>
              <div className="flex justify-between text-xs text-[#6b7280] mb-1.5">
                <span>Overall Progress</span>
                <span>{totalSolved}/{totalQ} ({overallPct}%)</span>
              </div>
              <div className="h-2 bg-[#1e1e22] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 transition-all duration-1000"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recent submissions */}
          <div className="bg-[#2a2a2e] rounded-3xl px-6 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280] mb-4">
              Recent Submissions
            </p>
            <div className="flex flex-col gap-1">
              {recentSubmissions.length === 0 && (
                <p className="text-xs text-[#6b7280] text-center py-4">No submissions yet</p>
              )}
              {recentSubmissions.map((s, i) => {
                // FIX: compare as strings on both sides
                const qName = questions.find(
                  (q) => String(q._id) === String(s.questionId)
                )?.heading || "Unknown";
                const isAc = s.status === "Accepted";
                return (
                  <div
                    key={s._id || i}
                    className="flex items-center gap-2 py-2 border-b border-[#1e1e22] last:border-none"
                  >
                    <span className={`text-sm font-bold ${isAc ? "text-green-400" : "text-pink-400"}`}>
                      {isAc ? "✓" : "✗"}
                    </span>
                    <span className="flex-1 text-xs text-[#9ca3af] truncate">{qName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isAc ? "bg-green-400/10 text-green-400" : "bg-pink-400/10 text-pink-400"
                      }`}
                    >
                      {isAc ? "AC" : s.status === "Wrong Answer" ? "WA"
                             : s.status === "Compilation Error" ? "CE"
                             : s.status === "Time Limit Exceeded" ? "TLE"
                             : "ERR"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══════════════════════════════════════════════════ */}
        <main className="flex-1 flex flex-col gap-4 min-w-0">
          {/* FIX: pass sub (all user submissions) to heatmap */}
          <ActivityHeatmap submissions={sub} />
          <div className="bg-[#2a2a2e] rounded-3xl px-6 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280] mb-5">
              Problems
            </p>
            <ProblemTable questions={questions} solvedIds={solvedIds} />
          </div>
        </main>

      </div>
    </div>
  );
}