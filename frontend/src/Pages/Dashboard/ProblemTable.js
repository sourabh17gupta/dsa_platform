import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DIFF = {
  easy:   { text: "text-green-400",  bg: "bg-green-400/10"  },
  medium: { text: "text-yellow-400", bg: "bg-yellow-400/10" },
  hard:   { text: "text-pink-400",   bg: "bg-pink-400/10"   },
};

const PAGE_SIZE = 10;

export default function ProblemTable({ questions = [], solvedIds = new Set() }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);

  const filtered = useMemo(() =>
    questions.filter((q) => {
      const matchDiff   = filter === "All" || q.type === filter;
      const matchSearch = q.heading.toLowerCase().includes(search.toLowerCase());
      return matchDiff && matchSearch;
    }), [questions, filter, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const filterBtnClass = (f) =>
    `px-4 py-1.5 rounded-xl text-xs font-semibold border transition ${
      filter === f
        ? f === "All"
          ? "bg-violet-500 border-violet-500 text-white"
          : f === "easy"
          ? "bg-green-400/10 border-green-400 text-green-400"
          : f === "medium"
          ? "bg-yellow-400/10 border-yellow-400 text-yellow-400"
          : "bg-pink-400/10 border-pink-400 text-pink-400"
        : "bg-transparent border-[#3a3a40] text-[#6b7280] hover:border-[#6b7280] hover:text-white"
    }`;

  return (
    <div>
      {/* ── Filters ── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search problems…"
          className="flex-1 min-w-[160px] px-4 py-2.5 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
        />
        <div className="flex gap-2">
          {["All","easy","medium","hard"].map((f) => (
            <button key={f} onClick={() => { setFilter(f); setPage(1); }} className={filterBtnClass(f)}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-2xl border border-[#3a3a40]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#3a3a40]">
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] w-10">✓</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280] w-12">#</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Title</th>
              <th className="text-left px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((q, i) => {
              const diff   = DIFF[q.type] || DIFF.medium;
              const solved = solvedIds.has(String(q._id));
              return (
                <tr
                  key={q._id}
                  onClick={() => navigate(`/question/${q._id}`)}
                  className="border-b border-[#1e1e22] hover:bg-[#1e1e22] cursor-pointer transition group"
                >
                  <td className="px-4 py-3.5">
                    {solved ? (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-400/10 text-green-400 text-xs font-bold">✓</span>
                    ) : (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#2a2a2e] border border-[#3a3a40]" />
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-[#6b7280]">{(page - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="px-4 py-3.5 text-[#afb2bf] group-hover:text-white transition font-medium">{q.heading}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${diff.text} ${diff.bg}`}>
                      {q.type}
                    </span>
                  </td>
                </tr>
              );
            })}

            {paginated.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-[#6b7280] text-sm">
                  No problems found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-sm text-[#9ca3af] hover:border-violet-500 hover:text-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>
          <span className="text-sm text-[#6b7280]">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-sm text-[#9ca3af] hover:border-violet-500 hover:text-violet-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}