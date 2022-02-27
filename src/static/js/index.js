import Router from "./Router/index.js";

console.log("working");

const routerList = [
  { path: "/page1", isMatch: false },
  { path: "/page2", isMatch: false },
  { path: "/page3", isMatch: false },
  { path: "/page4", isMatch: false },
];

const app = document.querySelector("#main");
const router = new Router(routerList, app);
