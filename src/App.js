import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Banner from "./components/layout/Banner";
import Sidebar from "./components/layout/Sidebar";
import Sidebar_bot from "./components/layout/Sidebar-bot";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ListQuestion from "./pages/Question";
import Register from "./pages/Register";
import Introduce from "./pages/Introduce";
import User from "./pages/User";
import Document from "./pages/Document";
import SituationByCate from "./components/situation/SituationByCate";
function App() {
  
  return (
    <>
      <div className="App">
        <Router>
          <div className="wrapper">
            <Sidebar />
            <div className="content">
              <Header />
              <Banner />
              <div className="body">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Introduce" element={<Introduce />} />
                  <Route path="/Register" element={<Register />} />
                  <Route path="/department/:id" element={<SituationByCate />} />
                  <Route path="/Situation" element={<ListQuestion />} />
                  <Route path="/User" element={<User />} />
                  <Route path="/Document" element={<Document />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />
          <Sidebar_bot />
        </Router>
      </div>
    </>
  );
}

export default App;
