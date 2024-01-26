import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
