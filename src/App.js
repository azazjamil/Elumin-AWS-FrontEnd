import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from "./components/table";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Auth />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
          {/* <Route path="/table" element={<Table />}></Route> */}
          <Route path="/formData" element={<Table />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
