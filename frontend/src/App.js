import { Route,Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup"
import GoogleSuccess from "./Component/GoogleSuccess";
import ForgotPassword from "./Pages/ForgetPassword";
import UpdatePassword from "./Pages/UpdatePassword";

function App() {
  
  return (
   <div>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/auth/success" element={<GoogleSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/update-password/:token" element={<UpdatePassword />}/>
    </Routes>

   </div>
  );
}

export default App;
