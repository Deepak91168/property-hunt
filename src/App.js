import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Offers } from "./pages/Offers";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { NavBar } from "./components/NavBar";
function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/singin" element={<SignIn />} />
          <Route path="/singup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
