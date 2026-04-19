// src/Component/Question/QuestionPage/ResultTab.jsx
export default function ResultTab({
  submitResult,
  submitLoading,
  isAccepted,
  status,
  resultMessage,
  onGoToDescription,
  onGoToEditor,
}) {
  if (submitLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <svg className="animate-spin w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="font-mono text-sm text-slate-500 tracking-widest uppercase">
          Judging your code...
        </p>
      </div>
    );
  }

  if (!submitResult) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <p className="font-mono text-sm text-slate-600">// No submission yet</p>
        <button onClick={onGoToEditor} className="lg:hidden mt-2 text-violet-400 underline">
          → Go to Editor
        </button>
      </div>
    );
  }

  // dynamic styles
  const statusColors = {
    Accepted: "text-emerald-400",
    "Wrong Answer": "text-red-400",
    "Time Limit Exceeded": "text-orange-400",
    "Compilation Error": "text-yellow-400",
    "Runtime Error": "text-purple-400",
  };

  const borderColors = {
    Accepted: "border-emerald-500/25 bg-emerald-500/8",
    "Wrong Answer": "border-red-500/25 bg-red-500/8",
    "Time Limit Exceeded": "border-orange-500/25 bg-orange-500/8",
    "Compilation Error": "border-yellow-500/25 bg-yellow-500/8",
    "Runtime Error": "border-purple-500/25 bg-purple-500/8",
  };

  return (
    <div className="flex flex-col gap-5">
      {/* STATUS BANNER */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${borderColors[status]}`}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isAccepted ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}
        >
          {isAccepted ? (
            <span className="text-emerald-400">✓</span>
          ) : (
            <span className="text-red-400">✕</span>
          )}
        </div>

        <div>
          <p className={`font-mono font-bold text-base ${statusColors[status]}`}>{status}</p>

          <p className="font-mono text-xs mt-0.5 text-slate-400">
            {status === "Accepted" && "All test cases passed"}
            {status === "Wrong Answer" && "Incorrect output"}
            {status === "Time Limit Exceeded" && "Execution timed out"}
            {status === "Compilation Error" && "Code failed to compile"}
            {status === "Runtime Error" && "Program crashed during execution"}
          </p>
        </div>
      </div>

      {/* FAILED DETAILS */}
      {!isAccepted && submitResult?.result && (
        <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-4 flex flex-col gap-4">
          {submitResult.result.input && (
            <div>
              <span className="text-xs text-slate-500">Input</span>
              <pre className="text-sm text-slate-300">{submitResult.result.input}</pre>
            </div>
          )}

          {submitResult.result.expected && (
            <div>
              <span className="text-xs text-slate-500">Expected</span>
              <pre className="text-sm text-emerald-400">{submitResult.result.expected}</pre>
            </div>
          )}

          {submitResult.result.output && (
            <div>
              <span className="text-xs text-slate-500">Your Output</span>
              <pre className="text-sm text-red-400">{submitResult.result.output}</pre>
            </div>
          )}

          {submitResult.result.error && (
            <div>
              <span className="text-xs text-slate-500">Error</span>
              <pre className="text-xs text-red-400 whitespace-pre-wrap">
                {submitResult.result.error}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* MESSAGE */}
      {resultMessage && (
        <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl p-4">
          <p className="text-xs text-slate-400">{resultMessage}</p>
        </div>
      )}

      {!isAccepted && (
        <button onClick={onGoToDescription} className="text-violet-400 underline text-xs">
          ← Review problem
        </button>
      )}
    </div>
  );
}