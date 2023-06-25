import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Table } from "./components/table";
import { Login } from "./components/login";
import { useState } from "react";
function App() {
  const [userInfo, setUserInfo] = useState();
  return (
    <div className="App">
      <div className="container main">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />}></Route>
            <Route
              path="/login"
              element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}
            ></Route>
            <Route
              path="/form"
              element={<Table userInfo={userInfo} setUserInfo={setUserInfo} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
