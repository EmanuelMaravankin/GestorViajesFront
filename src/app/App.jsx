import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./Routing";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../hooks/useAuth.jsx";
import PWAInstallPrompt from "../components/PWAInstallPrompt";

function App() {
  return (
    <AuthProvider>
      <div className="Container">
        <BrowserRouter>
          <NavBar />
          <div className="pt-16">
            <Routing />
          </div>
          <PWAInstallPrompt />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
