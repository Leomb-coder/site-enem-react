import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import Prova from './Prova';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/prova/:id' element={<Prova />} />
    </Routes>
  </Router>
);