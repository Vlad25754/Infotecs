import React from "react";
import ReactDOM from "react-dom";
import { App } from "@/app/App";
import { QueryProvider } from "@/app/providers/query";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

ReactDOM.render(QueryProvider(<App />), root);
