import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProblemSet from "./Pages/ProblemSet";
import QuestionPage from "./Pages/QuestionPage";

import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
   <div>
    <Routes>
      
      <Route
          path="/login"
          element={
            <Login/>
          }
        />
      <Route
          path="/problemset"
          element={
            <ProblemSet/>
          }
        />
      <Route
          path="/question/:id"
          element={
            <QuestionPage/>
          }
        />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;