import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes></Routes>
      </Router>
    </div>
  );
}

export default App;
