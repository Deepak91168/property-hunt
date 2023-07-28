import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Offers } from "./pages/Offers";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { CreateListing } from "./pages/CreateListing";
import { NavBar } from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import { EditListing } from "./pages/EditListing";
import { SingleItem } from "./pages/SingleItem";
import { About } from "./pages/About";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import { Footer } from "./components/Footer";
import Theme from "./components/Theme";

import ThemeContext from "./context/ThemeContext";

function App() {
  const [themeToggle, setThemeToggle] = useState(false);
  return (
    <div className={`${themeToggle ? "bg-[#303030]" : ""}`}>
      <ThemeContext.Provider value={themeToggle}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/singin" element={<SignIn />} />
            <Route path="/singup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/offers" element={<Offers />} />
            <Route path="createlisting" element={<PrivateRoute />}>
              <Route path="/createlisting" element={<CreateListing />} />
            </Route>
            <Route path="edit-listing" element={<PrivateRoute />}>
              <Route
                path="/edit-listing/:listingID"
                element={<EditListing />}
              />
            </Route>
            <Route
              path="/category/:categorytype/:listingID"
              element={<SingleItem />}
            />
          </Routes>
        </Router>

        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeContext.Provider>
      <Theme onTheme={themeToggle} onClickTheme={setThemeToggle} />
    </div>
  );
}

export default App;
