import Api from "../Api/index";
export default class Router {
  constructor(routerList, _app) {
    this.routerList = routerList;
    this._app = _app;

    this.navigateTo = (url) => {
      history.pushState(null, null, url);
      console.log("navigateTo working", url);
      this._init();
    };

    window.addEventListener("popstate", this._init());
    // document.addEventListener("DOMContentLoaded", () => {
    //   document.body.addEventListener("click", (e) => {
    //     console.log("DOMContentLoaded,, clickevent", e);
    //   });

    //   this._init();
    // });
  }

  _init = async () => {
    this.routerList.map((element, index) => {
      if (location.pathname === "/") {
        this.routerList[0].isMathch = true;
      } else if (
        location.pathname !== "/" &&
        element.push.indexOf(location.pathname) === 0
      ) {
        this.routerList[index].isMathch = true;
      } else {
        element.isMathch = false;
      }
    });

    const currentRouter = this.routerList.find(
      (element) => element.isMathch === true
    );
    console.log("this is currenRouter", currentRouter);
    if (currentRouter.id === 0) {
      const data = await Api.get("https://jsonplaceholder.typicode.com/users", {
        method: "GET",
      });
      console.log("this is data,", data);
    }
  };
}
