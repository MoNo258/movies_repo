import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "theme-ui";
import UsersLists from "./Components/UsersLists";
import "./index.css";
import { theme } from "./theme";
import Home from "./Views/Home/Home";
import { SingleView } from "./Views/SingleView";

const App = () => {
  return (
    <div className="body-wrapper">
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<SingleView />} />
              <Route path="/list" element={<UsersLists />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </ThemeProvider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
