import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./routes/Routing";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="Container">
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
