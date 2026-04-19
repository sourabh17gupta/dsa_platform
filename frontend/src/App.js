import { Route, Routes } from "react-router-dom";
import Login     from "./Pages/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login"     element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;