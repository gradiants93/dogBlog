import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import EditPosts from "./pages/editposts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Blog from "./pages/blog";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/edit" element={<EditPosts />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
      {/* <EditPosts /> */}
    </div>
  );
}

export default App;
