import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import ToDo from "./Components/ToDo/ToDo";

function App() {
  return <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<RequireAuth><ToDo/></RequireAuth>}/>
      <Route path="/to-do-app" element={<ToDo/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  </div>;
}

export default App;
