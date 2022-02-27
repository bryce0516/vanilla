class Api {
  static async get(url, option) {
    try {
      const response = await fetch(url, option);

      const data = response.json();

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      console.log("fetch get has error occurred", error);
    }
  }
}

class Router {
  constructor(routerList, nodes) {
    this.routerList = routerList;

    this.nodes = nodes;

    console.log("this nodes ===>", this.nodes);

    // let child0 = this.nodes.children[0]

    // let child1 = this.nodes.children[1]

    // let child2 = this.nodes.children[2]

    // child0.style.display = 'none'

    // this.nodes.removeChild(child1)

    // this.nodes.removeChild(child2)

    this.navigateTo = (url) => {
      history.pushState(null, null, url);

      this.init();
    };

    window.addEventListener("popstate", this.init());
  }

  init = async () => {
    this.routerList.map((element, index) => {
      console.log("pathname", location.pathname);

      if (location.pathname === "/web/") {
        element.isMatch = false;
      } else if (
        location.pathname !== "/web/" &&
        element.name.indexOf(location.pathname) === 0
      ) {
        this.routerList[index] = true;
      } else {
        element.isMatch = false;
      }

      new Icon(element, this.nodes);
    });

    const currentRouter = this.routerList.find(
      (element) => element.isMatch === true
    );

    console.log("init", this.routerList, currentRouter);
  };
}

class Icon {
  constructor({ id, name, isMatch, filePath, parent, type }, nodes) {
    this.id = id;

    this.name = name;

    this.isMatch = isMatch;

    this.filePath = filePath;

    this.parent = parent;

    this.type = type;

    this.nodes = nodes;

    let newDirectory = document.createElement("div");

    let newImage = document.createElement("img");

    newImage.setAttribute("src", "./assets/directory.png");

    newDirectory.setAttribute("class", "Node");

    let newText = document.createTextNode(`${this.name}`);

    newDirectory.appendChild(newImage);

    newDirectory.appendChild(newText);

    this.nodes.appendChild(newDirectory);

    this.node = this.nodes.children;

    console.log("this is node child", this.node);

    newDirectory.addEventListener("click", () => this.handleClick(this.id));
  }

  handleClick = (id) => {
    // location.href = location.href + id

    console.log(location.href + id);
  };
}

const result = await Api.get(
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev",
  { method: "GET" }
);

const nodes = document.querySelector(".Nodes");

const main = document.querySelector(".App");

const routerList = result.map(
  (element, index) => (element = { ...element, isMatch: false })
);

new Router(routerList, nodes, main);
