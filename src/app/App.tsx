import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./providers/router";
import "antd/dist/reset.css";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
