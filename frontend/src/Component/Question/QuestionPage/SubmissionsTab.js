import { useDispatch, useSelector } from "react-redux";
import { getSubmissionDetail } from "../../../api/Services/QuestionApi/getSubmissionDetail";
import { useState } from "react";
const STATUS_STYLE = {
  Accepted:              "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  "Wrong Answer":        "text-red-400     bg-red-500/10     border-red-500/25",
  "Time Limit Exceeded": "text-amber-400   bg-amber-500/10   border-amber-500/25",
  "Runtime Error":       "text-orange-400  bg-orange-500/10  border-orange-500/25",
  "Compilation Error":   "text-rose-400    bg-rose-500/10    border-rose-500/25",
};

const LANG_LABEL = { 63: "JavaScript", 71: "Python", 54: "C++", 62: "Java" };

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function StatusBadge({ status }) {
  const style = STATUS_STYLE[status] || "text-slate-400 bg-slate-500/10 border-slate-500/25";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1
                      rounded-full font-mono text-xs font-medium border ${style}`}>
      {status === "Accepted" ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7"/>
        </svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      )}
      {status}
    </span>
  );
}

function SubmissionDetail({ detail, loading }) {
  if (loading) {
    return (
      <div className="mt-3 flex items-center gap-2 py-4 justify-center">
        <svg className="animate-spin w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span className="font-mono text-xs text-slate-500">Loading details...</span>
      </div>
    );
  }

  if (!detail) return null;

  return (
    <div className="mt-3 flex flex-col gap-3 border-t border-[#1e1e2e] pt-3">
      {/* Code */}
      {detail.code && (
        <div>
          <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest block mb-1.5">
            Submitted Code
          </span>
          <pre className="font-mono text-xs text-slate-300 bg-[#0a0a0f] rounded-lg p-3
                          overflow-x-auto max-h-48 overflow-y-auto border border-[#1e1e2e]
                          whitespace-pre-wrap">
            {detail.code}
          </pre>
        </div>
      )}

      {/* Testcase info */}
      {detail.testcase?.testcaseId && (
        <div className="grid grid-cols-1 gap-2">
          {detail.testcase.testcaseId.input && (
            <div>
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest block mb-1">
                Input
              </span>
              <pre className="font-mono text-xs text-slate-300 bg-[#0a0a0f] rounded-lg p-2.5 overflow-x-auto">
                {detail.testcase.testcaseId.input}
              </pre>
            </div>
          )}
          {detail.testcase.testcaseId.output && (
            <div>
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest block mb-1">
                Expected Output
              </span>
              <pre className="font-mono text-xs text-emerald-400 bg-[#0a0a0f] rounded-lg p-2.5 overflow-x-auto">
                {detail.testcase.testcaseId.output}
              </pre>
            </div>
          )}
          {detail.testcase.currOutput && (
            <div>
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest block mb-1">
                Your Output
              </span>
              <pre className="font-mono text-xs text-red-400 bg-[#0a0a0f] rounded-lg p-2.5 overflow-x-auto">
                {detail.testcase.currOutput}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SubmissionCard({ sub, isOpen, onToggle, detail, detailLoading }) {
  const isAccepted = sub.status === "Accepted";
  const passRate = sub.totalCases > 0
    ? Math.round((sub.totalPassCases / sub.totalCases) * 100)
    : 0;

  return (
    <div className={`bg-[#111118] border rounded-xl overflow-hidden transition-colors
      ${isAccepted ? "border-emerald-500/15" : "border-[#1e1e2e]"}
      ${isOpen ? "border-violet-500/30" : "hover:border-[#2a2a3e]"}
    `}>
      {/* Clickable header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex flex-col gap-3 text-left hover:bg-[#14141f] transition-colors"
      >
        {/* Row 1: status + time + chevron */}
        <div className="flex items-center justify-between gap-2">
          <StatusBadge status={sub.status} />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-slate-600">{timeAgo(sub.createdAt)}</span>
            <svg
              className={`w-4 h-4 text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        {sub.totalCases > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                Test Cases
              </span>
              <span className={`font-mono text-[11px] font-medium
                ${isAccepted ? "text-emerald-400" : "text-slate-400"}`}>
                {sub.totalPassCases}/{sub.totalCases} passed
              </span>
            </div>
            <div className="h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500
                  ${isAccepted ? "bg-emerald-500" : passRate > 50 ? "bg-amber-500" : "bg-red-500"}`}
                style={{ width: `${passRate}%` }}
              />
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor"
                 strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            <span className="font-mono text-xs text-slate-500">
              {LANG_LABEL[sub.languageId] || `Lang ${sub.languageId}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor"
                 strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <span className="font-mono text-xs text-slate-500">
              {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Error snippet */}
        {sub.error && sub.error.trim() && (
          <pre className="font-mono text-[11px] text-red-400/80 bg-[#0a0a0f]
                          rounded-lg p-2.5 overflow-x-auto whitespace-pre-wrap
                          max-h-16 overflow-y-auto border border-red-500/10 text-left">
            {sub.error}
          </pre>
        )}
      </button>

      {/* Expandable detail */}
      {isOpen && (
        <div className="px-4 pb-4">
          <SubmissionDetail detail={detail} loading={detailLoading} />
        </div>
      )}
    </div>
  );
}

export default function SubmissionsTab({ submissions, submissionsLoading }) {
  const dispatch = useDispatch();
  const { submissionDetail, submissionDetailLoading } = useSelector(
    (state) => state.singleQuestion
  );

  const [openId, setOpenId] = useState(null);

  const handleToggle = (sub) => {
    if (openId === sub._id) {
      // Close
      setOpenId(null);
    } else {
      // Open + fetch detail
      setOpenId(sub._id);
      dispatch(getSubmissionDetail(sub._id));
    }
  };

  if (submissionsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <svg className="animate-spin w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="font-mono text-sm text-slate-500 tracking-widest uppercase">
          Loading submissions...
        </p>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-[#111118] border border-[#1e1e2e]
                        flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor"
               strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1
                     1 0 01.707.293l5.414 5.414A1 1 0 0120 9.414V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <p className="font-mono text-sm text-slate-500">// No submissions yet</p>
        <p className="font-mono text-xs text-slate-700 leading-relaxed">
          Submit your solution to see<br/>your history here
        </p>
      </div>
    );
  }

  const accepted = submissions.filter((s) => s.status === "Accepted").length;
  const total    = submissions.length;

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-4">

     

      {/* List — most recent first (already sorted by backend) */}
      <div className="flex flex-col gap-3">
        {submissions.map((sub) => (
          <SubmissionCard
            key={sub._id}
            sub={sub}
            isOpen={openId === sub._id}
            onToggle={() => handleToggle(sub)}
            detail={openId === sub._id ? submissionDetail : null}
            detailLoading={openId === sub._id ? submissionDetailLoading : false}
          />
        ))}
      </div>
    </div>
  );
}