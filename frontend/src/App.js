import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup"
import GoogleSuccess from "./Component/GoogleSuccess";
import ForgotPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import Home from "./Pages/Home";
import ProblemSet from "./Pages/ProblemSet";
import QuestionPage from "./Pages/QuestionPage";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Navbar from "./Component/Navbar"
function App() {
  return (
   <div>
     <Navbar />
    <Routes>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/auth/success" element={<GoogleSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/update-password/:token" element={<UpdatePassword />}/>
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