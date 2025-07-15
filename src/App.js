import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Registerpage from "./pages/Registerpage/Registerpage";
import Forgotpasswordpage from "./pages/Forgotpasswordpage/Forgotpasswordpage";
import Dashboardpage from "./pages/Dashboardpage/Dashboardpage";
import ProtectedRoute from "./pages/components/protectedRoute";
import NotFoundPage from "./pages/components/NotfoundPage";

import MostrarOcultar from "./pages/playground/Usetogle";
import Temporizador from "./pages/playground/Useinterval";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/forgot" element={<Forgotpasswordpage />} />

        {/*Privadas*/}
        <Route path="/Dashboardpage" element={<ProtectedRoute> <Dashboardpage /> </ProtectedRoute> } />
        <Route path="*" element={<NotFoundPage />} />

      
        <Route path="/Usetogle" element={<MostrarOcultar />} />
        <Route path="/Useinterval" element={<Temporizador />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
