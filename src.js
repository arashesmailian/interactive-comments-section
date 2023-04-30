const { format, render } = timeago; //timeago library

// const data = {

//   currentUser: {
//     image: {
//       png: "./images/avatars/image-juliusomo.png",
//       webp: "./images/avatars/image-juliusomo.webp",
//     },
//     username: "juliusomo",
//   },
//   comments: [
//     {
//       id: 1,
//       parent: 0,
//       content:
//         "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
//       createdAt: "1 month ago",
//       score: 2,
//       user: {
//         image: {
//           png: "./images/avatars/image-amyrobson.png",
//           webp: "./images/avatars/image-amyrobson.webp",
//         },
//         username: "amyrobson",
//       },
//       replies: [],
//     },
//     {
//       id: 2,
//       parent: 0,
//       content:
//         "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
//       createdAt: "2 weeks ago",
//       score: 5,
//       user: {
//         image: {
//           png: "./images/avatars/image-maxblagun.png",
//           webp: "./images/avatars/image-maxblagun.webp",
//         },
//         username: "maxblagun",
//       },
//       replies: [
//         {
//           id: 1,
//           parent: 2,
//           content:
//             "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
//           createdAt: "1 week ago",
//           score: 4,
//           replyingTo: "maxblagun",
//           user: {
//             image: {
//               png: "./images/avatars/image-ramsesmiron.png",
//               webp: "./images/avatars/image-ramsesmiron.webp",
//             },
//             username: "ramsesmiron",
//           },
//         },
//         {
//           id: 2,
//           parent: 2,
//           content:
//             "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
//           createdAt: "2 days ago",
//           score: 2,
//           replyingTo: "ramsesmiron",
//           user: {
//             image: {
//               png: "./images/avatars/image-juliusomo.png",
//               webp: "./images/avatars/image-juliusomo.webp",
//             },
//             username: "juliusomo",
//           },
//         },
//       ],
//     },
//   ],
// };

// import importedData from "./data.json";

// console.log(importedData);
const data = JSON.parse(localStorage.getItem("data"));

function appendFrag(frag, parent) {
  let returnFrag = Array.prototype.slice.call(frag.childNodes, 0)[1];
  parent.appendChild(frag);
  return returnFrag;
}

function addCm(content, parentId, replyto = undefined) {
  let parentObject =
    parentId === 0
      ? data.comments
      : data.comments.filter((cm) => cm.id === parentId)[0].replies;
  let newCm = {
    parent: parentId,
    id:
      parentObject.length === 0
        ? 1
        : parentObject[parentObject.length - 1].id + 1,
    content: content,
    createdAt:
      new Date().getTime() - Number(cmSectionDiv.getAttribute("datetime")),
    replyingTo: replyto,
    score: 0,
    repleis: parentId === 0 ? [] : undefined,
    user: data.currentUser,
  };
  parentObject.push(newCm);
  renderCms();
}

function createCmNode(cmObject) {
  const cmTemp = document.querySelector(".comment-template");
  let cmNode = cmTemp.content.cloneNode(true);
  cmNode.querySelector(".usr-name").textContent = cmObject.user.username;
  cmNode.querySelector(".usr-img").src = cmObject.user.image.webp;
  cmNode.querySelector(".c-body").textContent = cmObject.content;
  cmNode.querySelector(".score-number").textContent = cmObject.score;
  cmNode.querySelector(".cmnt-at").textContent = cmObject.createdAt;
  if (cmObject.replyingTo != undefined) {
    cmNode.querySelector(".reply-to").textContent = "@" + cmObject.replyingTo;
  }
  cmNode.querySelector(".score-plus").addEventListener("click", () => {
    cmObject.score++;
    renderCms();
  });

  cmNode.querySelector(".score-minus").addEventListener("click", () => {
    cmObject.score = cmObject.score > 0 ? cmObject.score - 1 : 0;
    renderCms();
  });

  if (cmObject.user.username === data.currentUser.username) {
    cmNode.querySelector(".comment").classList.add("current-user");
    cmNode.querySelector(".delete").addEventListener("click", () => {
      openModal(cmObject);
    });
    cmNode.querySelector(".edit").addEventListener("click", (event) => {
      const textPath = event.composedPath()[3].querySelector(".c-body");
      if (
        textPath.getAttribute("contenteditable") === false ||
        textPath.getAttribute("contenteditable") === null
      ) {
        textPath.setAttribute("contenteditable", true);
        textPath.focus();
      } else {
        textPath.removeAttribute("contenteditable");
      }
    });
  }
  return cmNode;
}

function createReplyInput(parentNode, parentId, replyto = undefined) {
  //lets first check if we already have reply-input, remove them all then add new one
  if (parentNode.querySelector(".reply-input")) {
    parentNode.querySelectorAll(".reply-input").forEach((element) => {
      element.remove();
    });
  }
  const replyTemplate = document.querySelector(".reply-input-template");
  const inputNode = replyTemplate.content.cloneNode(true);
  const addedNode = appendFrag(inputNode, parentNode);
  addedNode.querySelector(".cmnt-input").focus(); // focusing when created
  addedNode.querySelector(".bu-primary").addEventListener("click", (event) => {
    const replyBody = event
      .composedPath()[1]
      .querySelector(".cmnt-input").value;
    if (replyBody != 0) {
      addCm(replyBody, parentId, replyto);
    }
  });
}

function appendCm(parentNode, cmNode, parentId) {
  const addedCmNode = appendFrag(cmNode, parentNode);
  addedCmNode.querySelector(".reply").addEventListener("click", (event) => {
    if (parentNode.classList.contains("replies")) {
      // parent isn't a first level comment( parent is a reply to a comment)
      createReplyInput(
        parentNode,
        parentId,
        addedCmNode.querySelector(".usr-name").textContent
      );
    } else {
      // parent is a first level comment(it's parentId is 0)
      createReplyInput(
        addedCmNode.querySelector(".replies"),
        parentId,
        addedCmNode.querySelector(".usr-name").textContent
      );
    }
  });
}

function renderCms(
  cmList = data.comments.sort((a, b) => b.score - a.score),
  parentNode = document.querySelector(".comments-wrp")
) {
  parentNode.innerHTML = "";

  cmList.forEach((cm) => {
    //we have set parentId's to be unique so when we want to add replies to a comment it won't be added to another one
    const parentId = cm.parent == 0 ? cm.id : cm.parent;
    const cmNode = createCmNode(cm);
    //setting created time every time we call renderCms function
    cmNode.querySelector(".cmnt-at").textContent = format(
      Number(cm.createdAt) + Number(cmSectionDiv.getAttribute("datetime"))
    );
    if ("replies" in cm && cm.replies.length > 0) {
      renderCms(cm.replies, cmNode.querySelector(".replies"));
    }
    appendCm(parentNode, cmNode, parentId);
  });
}

///
// function setStorage(data) {
//   localStorage.setItem("data", JSON.stringify(data));
//   fetch("http://localhost:5500/data.json", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// }
///

function deleteCm(cmObject) {
  cmObject.parent === 0
    ? (data.comments = data.comments.filter((cm) => cm !== cmObject))
    : (data.comments.filter((cm) => cm.id === cmObject.parent)[0].replies =
        data.comments
          .filter((e) => e.id === cmObject.parent)[0]
          .replies.filter((r) => r !== cmObject));
  renderCms();
}

function openModal(cmObject) {
  const modalContainer = document.querySelector(".modal-wrp");
  modalContainer.classList.remove("invisible");
  modalContainer.querySelector(".yes").addEventListener("click", () => {
    deleteCm(cmObject);
    modalContainer.classList.add("invisible");
  });
  modalContainer.querySelector(".no").addEventListener("click", () => {
    modalContainer.classList.add("invisible");
  });
}

// ****** main script ******

//setting datetime attribute for higher order div. because we need this time change created time every render
const cmSectionDiv = document.querySelector(".comment-section");
cmSectionDiv.setAttribute("datetime", new Date().getTime());

renderCms(); //first renders all comments
document.querySelector(".bu-primary").addEventListener("click", (event) => {
  if (event.target.previousElementSibling.value != 0) {
    addCm(event.target.previousElementSibling.value, 0);
    event.target.previousElementSibling.value = "";
  }
});
