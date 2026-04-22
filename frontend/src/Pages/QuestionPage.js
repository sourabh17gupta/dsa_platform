import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getSingleQuestion } from "../api/Services/QuestionApi/getSingleQuestion";
import { submitCode }         from "../api/Services/QuestionApi/submitCode";
import { getSubmissions }     from "../api/Services/QuestionApi/getSubmission";

import NavBar         from "../Component/Question/QuestionPage/NavBar";
import DescriptionTab from "../Component/Question/QuestionPage/DescriptionTab";
import TestCasesTab   from "../Component/Question/QuestionPage/TestCasesTab";
import ResultTab      from "../Component/Question/QuestionPage/ResultTab";
import SubmissionsTab from "../Component/Question/QuestionPage/SubmissionsTab";
import EditorPanel    from "../Component/Question/QuestionPage/EditorPanel";

const LANGUAGES = [
  { label: "JavaScript", value: "javascript", id: 63 },
  { label: "Python",     value: "python",     id: 71 },
  { label: "C++",        value: "cpp",        id: 54 },
  { label: "Java",       value: "java",       id: 62 },
];

const CODE_TEMPLATES = {
  javascript: `/**\n * @param {number} a\n * @param {number} b\n * @return {number}\n */\nfunction solve(a, b) {\n  // Write your solution here\n\n}`,
  python:     `class Solution:\n    def solve(self, a: int, b: int) -> int:\n        # Write your solution here\n        pass`,
  cpp:        `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    // Write your solution here\n\n    return 0;\n}`,
  java:       `import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n\n        // Write your solution here\n\n    }\n}`,
};

const TABS = [
  { key: "description", label: "Description" },
  { key: "testcases",   label: "Test Cases"  },
  { key: "result",      label: "Result"      },
  { key: "submissions", label: "Submissions" },
];

export default function QuestionPage() {
  const { id }   = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    questionData, testcases, loading,
    submitResult, submitLoading, status, isAccepted,
    submissions, submissionsLoading,
  } = useSelector((state) => state.singleQuestion);

  const [language,    setLanguage]    = useState("javascript");
  const [code,        setCode]        = useState(CODE_TEMPLATES["javascript"]);
  const [activeTab,   setActiveTab]   = useState("description");
  const [mobilePanel, setMobilePanel] = useState("left");

  // ✅ Only fetch question on mount — NO submission fetch here
  useEffect(() => {
    if (id) dispatch(getSingleQuestion(id))
  }, [id, dispatch])

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey)
    if (tabKey === "submissions" && id) {
      dispatch(getSubmissions(id))
    }
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setCode(CODE_TEMPLATES[lang])
  }

  const handleSubmit = () => {
    if (!code.trim()) return
    const lang = LANGUAGES.find((l) => l.value === language)
    dispatch(submitCode(id, code, lang.id))
    setActiveTab("result")
    setMobilePanel("left")
  }

  const resultMessage = submitResult?.message || null

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-violet-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <p className="text-violet-400 font-mono text-sm tracking-widest uppercase">Loading problem...</p>
        </div>
      </div>
    )
  }

  if (!questionData) {
    return (
      <div className="min-h-screen w-full bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center flex flex-col gap-3">
          <p className="text-slate-500 font-mono text-sm">// Question not found</p>
          <button
            onClick={() => navigate("/problemset")}
            className="font-mono text-xs text-violet-400 hover:text-violet-300 underline underline-offset-4"
          >
            ← Back to Problems
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-[#0a0a0f] text-slate-200 flex flex-col overflow-hidden">

      <NavBar
        questionData={questionData}
        language={language}
        code={code}
        submitLoading={submitLoading}
        mobilePanel={mobilePanel}
        onLanguageChange={handleLanguageChange}
        onSubmit={handleSubmit}
        onMobilePanel={setMobilePanel}
      />

      <div className="flex-1 flex overflow-hidden">

        {/* LEFT PANEL */}
        <div className={`
          flex-col border-r border-[#1e1e2e] overflow-hidden
          w-full lg:w-[42%] xl:w-[38%] 2xl:w-[35%]
          ${mobilePanel === "left" ? "flex" : "hidden"} lg:flex
        `}>

          {/* Tabs */}
          <div className="shrink-0 flex bg-[#0d0d14] border-b border-[#1e1e2e] overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}  
                className={`relative shrink-0 px-3 sm:px-4 py-3 font-mono text-xs transition-colors
                  ${activeTab === tab.key ? "text-white" : "text-slate-600 hover:text-slate-400"}`}
              >
                {tab.label}

                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 rounded-t-full"/>
                )}

                {tab.key === "result" && submitResult && (
                  <span className={`absolute top-2 right-1 w-1.5 h-1.5 rounded-full
                    ${isAccepted ? "bg-emerald-400" : "bg-red-400"}`}
                  />
                )}

                {tab.key === "submissions" && submissions.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1
                                   bg-violet-600 rounded-full font-mono text-[9px] text-white
                                   flex items-center justify-center">
                    {submissions.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "description" && (
              <DescriptionTab questionData={questionData} testcases={testcases} />
            )}
            {activeTab === "testcases" && (
              <TestCasesTab testcases={testcases} />
            )}
            {activeTab === "result" && (
              <div className="p-4 sm:p-5 lg:p-6">
                <ResultTab
                  submitResult={submitResult}
                  submitLoading={submitLoading}
                  isAccepted={isAccepted}
                  status={status}
                  resultMessage={resultMessage}
                  onGoToDescription={() => handleTabChange("description")}
                  onGoToEditor={() => setMobilePanel("right")}
                />
              </div>
            )}
            {activeTab === "submissions" && (
              <SubmissionsTab
                submissions={submissions}
                submissionsLoading={submissionsLoading}
              />
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={`
          ${mobilePanel === "right" ? "flex" : "hidden"} lg:flex lg:flex-1
          flex-col overflow-hidden
        `}>
          <EditorPanel
            language={language}
            code={code}
            codeTemplate={CODE_TEMPLATES[language]}
            onLanguageChange={handleLanguageChange}
            onCodeChange={setCode}
          />
        </div>
      </div>
    </div>
  )
}