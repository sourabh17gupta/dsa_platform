import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import ProblemSet from "./Pages/ProblemSet";
import QuestionPage from "./Pages/QuestionPage";
function App() {
  
  return (
   <div>
    <Routes>
      
      <Route
          path="login"
          element={
            <Login/>
          }
        />
      <Route
          path="problemset"
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
      

    </Routes>

   </div>
  );
}

export default App;