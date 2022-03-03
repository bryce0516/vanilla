const nav = document.querySelector(".Breadcrumb");
const main = document.querySelector(".App");
const body = document.body;
let nodes = document.querySelector(".Nodes");
let status = 0;
async function get(url) {
  const response = await fetch(`${url}`);
  const data = await response.json();
  console.log("get ===>", data);
  return data;
}

async function rootInit(url) {
  nodes.innerHTML = "";
  const result = await get(url);
  let node = result.map((element) => {
    console.log("node", element);
    if (element.type === "DIRECTORY") {
      return `<div class="Node">
        <img id="${element.id}" 
        src="./assets/directory.png" 
        alt="${element.filePath === null ? "none" : element.filePath}">
        <div>${element.name}</div>
      </div>`;
    } else if (element.type === "FILE") {
      return `<div class="Node">
        <img id="${element.id}" 
        src="./assets/file.png" 
        alt="${element.filePath === null ? "none" : element.filePath}">
        <div>${element.name}</div>
      </div>`;
    }
  });
  console.log("this is node", node);
  if (status === 0) {
    node.map((element) => {
      nodes.innerHTML += element;
    });
  } else if (status > 0) {
    node.unshift(`<div class="Node">
      <img id="0" src="./assets/prev.png" alt="before">
    </div>`);
    node.map((element) => {
      nodes.innerHTML += element;
    });
  }
}

function closeModal(props) {
  console.log("closemodal wokring", JSON.parse(props));

  // for(const [key, value] of props) {
  //   console.log(key, value)
  // }

  // console.log(JSON.parse(props))
  // body.children[body.children.length -1].remove()
}

nodes.addEventListener("click", async (e) => {
  const el = e.target;
  console.log("nodes ==> ", el);
  if (el.tagName === "IMG") {
    let attribute = el.getAttribute("alt");
    if (status === 0 && attribute === "none") {
      rootInit(
        `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${el.id}`
      );
      status += 1;
    } else if (status > 0 && attribute === "before") {
      rootInit(
        `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev`
      );
      status -= 1;
    } else if (attribute !== "" && attribute) {
      console.log("image working");
      const imageUrl = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${attribute}`;
      body.innerHTML += `<div class="Modal ImageViewer" onClick="closeModal('${el}')">
        <div class="content">
        <img src="${imageUrl}" alt="modal">
      </div>`;

      // modalContainer.addEventListener("click", bodyClick)
    }
  }
});

// function bodyClick(e) {
//   const el = e.target;
//   console.log('mina ==>',el)
//   if (el.tagName !== "IMG") {
//     body.children[body.children.length -1].remove()
//     // let attribute = el.getAttribute('alt')
//     // if(attribute === "modal") {
//     //   body.children[body.children.length -1].remove()
//     // }
//     body.removeEventListener("click", bodyClick)
//   }
// }

rootInit("https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev");
