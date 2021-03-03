import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Header";
import Movie from "./Movie";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Movie />
  </React.StrictMode>,

  document.getElementById("main")
);

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,

  document.getElementById("header")
);

ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>,

  document.getElementById("sidenav")
);

document.getElementById("closeEdit").onclick = function () {
  document.getElementById("wrapper").style.opacity = "0";
  document.getElementById("wrapper").style.visibility = "hidden";
};
