// src/components/QuestionPage/EditorPanel.jsx
import Editor from "@monaco-editor/react"

const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python",     value: "python"     },
  { label: "C++",        value: "cpp"        },
  { label: "Java",       value: "java"       },
]

const FILE_EXT = { javascript: "js", python: "py", cpp: "cpp", java: "java" }

export default function EditorPanel({ language, code, codeTemplate, onLanguageChange, onCodeChange }) {
  return (
    <div className="flex-col overflow-hidden bg-[#0d0d14] flex flex-1">

      {/* Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-[#1e1e2e]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/50" />
          <span className="w-3 h-3 rounded-full bg-amber-500/50" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/50" />
        </div>

        <div className="flex items-center gap-3">
          {/* Language selector — mobile only (desktop is in navbar) */}
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="sm:hidden bg-[#0a0a0f] border border-[#1e1e2e] text-slate-300
                       font-mono text-xs rounded-lg px-2 py-1
                       focus:outline-none focus:border-violet-500 cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <span className="font-mono text-[11px] text-slate-600">solution.{FILE_EXT[language]}</span>
        </div>

        <span className="font-mono text-[10px] text-slate-700 hidden sm:block">Monaco Editor</span>
      </div>

      {/* Monaco */}
      <div className="flex-1 overflow-hidden min-h-[50vh] lg:min-h-0">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(val) => onCodeChange(val || "")}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
            tabSize: 2,
            wordWrap: "on",
          }}
        />
      </div>

      {/* Status bar */}
      <div className="shrink-0 flex items-center justify-between px-4 py-1.5 bg-[#0a0a0f] border-t border-[#1e1e2e]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-slate-700">
            {LANGUAGES.find((l) => l.value === language)?.label}
          </span>
          <span className="font-mono text-[11px] text-slate-700">
            {code.split("\n").length} lines
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-700 italic">
          {code === codeTemplate ? "Template loaded — start coding" : "Editing..."}
        </span>
      </div>
    </div>
  )
}