import Home from "./pages/home";
import Contributors from "./pages/contributors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Redirect from "./pages/redirect";
import Tasks from "./pages/tasks";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contributors" element={<Contributors />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
