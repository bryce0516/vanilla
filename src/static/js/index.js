import Router from "./Router/index.js";

console.log("working");

const routerList = [
  { id: 0, path: "/page1", isMatch: false },
  { id: 1, path: "/page2", isMatch: false },
  { id: 2, path: "/page3", isMatch: false },
  { id: 3, path: "/page4", isMatch: false },
];

const app = document.querySelector("#main");
const router = new Router(routerList, app);
