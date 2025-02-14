import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Dashboard />} />
       
      </Routes>
    </>
  );
}

export default App;
