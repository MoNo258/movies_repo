import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "theme-ui";
import "./index.css";
import { theme } from "./theme";
import Home from "./Views/Home/Home";

const App = () => {
  return (
    <div className="body-wrapper">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/list" element={<List />} />
          <Route path="/:id" element={<SingleView />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
