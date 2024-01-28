import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import ArticlePage from "../pages/ArticlePage";
import EditArticlePage from "../pages/EditArticlePage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/settings" element={<SettingsPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/editor" element={<EditArticlePage createNew />} />
        <Route path="/editor/:slug" element={<EditArticlePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
