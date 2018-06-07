import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
// 引入样式
import "./css/style.css";

// 手动挂载React
render(<Router />, document.querySelector("#main"));
