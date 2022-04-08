import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import { Link, Outlet } from "react-router-dom";
import Home from "./pages";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
