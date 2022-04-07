import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import Posts from "./components/posts";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Posts />
    </div>
  );
}

export default App;
