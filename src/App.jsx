import React, { Component, useEffect } from "react";

import "./App.css";
import Homepage from "./components/homepage.jsx";
import axios from "axios";
import Server from "./server";

const App = () => {
  useEffect(() => {
    axios
      .get(
        `${Server.baseApi}/commons/apiKey?username=chowdhuryshadman12@gmail.com`,
        {
          username: "chowdhuryshadman12@gmail.com",
        }
      )
      .then((response) => {
        localStorage.setItem("apiKey", response?.data?.apiKey);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Homepage />
    </div>
  );
};

export default App;
