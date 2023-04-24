const data = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};

//main comments-wrp (comments container)
const commentsWrp = document.querySelector("main .comments-wrp");
// console.log(commentsWrp);

// template comment-wrp
const commentWrp =
  document.getElementsByTagName("template")[1].content.firstElementChild;
// console.log(commentWrp);

//template comment
const comment = commentWrp.firstElementChild;
// console.log(comment);

// template replies
const repleis =
  document.getElementsByTagName("template")[1].content.firstElementChild
    .children[1];
// console.log(repleis);

function commentBuilder(
  id,
  username,
  userImg,
  publishedTime,
  commentCount,
  commentText,
  cmRepleis
) {
  //*********************************** */
  const commentTemplate = document.querySelector(".comment-template");
  let commentPrototype = commentTemplate.content.cloneNode(true);

  //   console.log(commentPrototype);
  //*********************************** */
  //   let cmWrp = commentWrp.cloneNode(true);
  //   let renderingCmt = comment.cloneNode(true);
  //   let repleisContainer = repleis.cloneNode(true);
  //   commentsWrp.appendChild(cmWrp);
  //   console.log("cm wrapper added to comments wrapper");
  //   console.log(
  //     id,
  //     username,
  //     userImg,
  //     publishedTime,
  //     commentCount,
  //     commentText,
  //     cmRepleis
  //   );
  if (true) {
    // console.log("IMPORTANT ", id, commentText);
    commentPrototype.querySelector(".usr-name").textContent = username;
    commentPrototype.querySelector(".usr-img").src = userImg;
    commentPrototype.querySelector(".cmnt-at").textContent = publishedTime;
    commentPrototype.querySelector(".score-number").textContent = commentCount;
    commentPrototype.querySelector(".c-body").textContent = commentText;

    // console.log(commentPrototype);
    commentsWrp.appendChild(commentPrototype);
    // console.log(commentsWrp.children);

    // renderingCmt.children[2].children[0].src = userImg;
    // renderingCmt.children[2].children[1].textContent = username;
    // renderingCmt.children[2].children[2].textContent = publishedTime;
    // renderingCmt.children[0].children[1].textContent = commentCount;
    // renderingCmt.children[3].children[1].textContent = id + commentText;
    // cmWrp.appendChild(renderingCmt);
    // console.log("render cmt added to cm wrapper");
  }
  console.log(cmRepleis.length);
  if (cmRepleis.length !== 0) {
    // cmWrp.appendChild(repleisContainer);
    // console.log("reply container added to cm wrapper");
    // let replyContainerPrototype = document.querySelector(".replies");
    //   .cloneNode(true);
    // console.log(replyContainerPrototype);
    // commentPrototype.appendChild(replyContainerPrototype);
    let replyContainer = document.querySelectorAll(
      "main .comment-wrp .replies"
    );
    // console.log(replyContainer);
    for (let r of cmRepleis) {
      let replyPrototype = commentTemplate.content.cloneNode(true);
      //   console.log(replyPrototype);
      //   let reply = comment.cloneNode(true);
      replyPrototype.querySelector(".usr-name").textContent = r.user.username;
      replyPrototype.querySelector(".usr-img").src = r.user.image.webp;
      replyPrototype.querySelector(".cmnt-at").textContent = r.createdAt;
      replyPrototype.querySelector(".score-number").textContent = r.score;
      replyPrototype.querySelector(".c-body").textContent = r.content;
      replyPrototype.querySelector(".reply-to").textContent =
        "@" + r.replyingTo;
      //   reply.children[2].children[0].src = r.user.image.webp;
      //   reply.children[2].children[1].tex = r.user.username;
      //   reply.children[2].children[2].textContent = r.createdAt;
      //   reply.children[0].children[1].textContent = r.score;
      //   reply.children[3].children[1].textContent = r.content;
      //   reply.children[3].children[0].textContent = "@" + r.id + r.replyingTo;
      //   repleisContainer.appendChild(reply);
      //   replyContainerPrototype.appendChild(replyPrototype);
      replyContainer[replyContainer.length - 1].appendChild(replyPrototype);
      //   console.log("reply added to reply container");
    }
  }
}

/* ****** rendering comments ****** */
localStorage.setItem("data", JSON.stringify(data.comments));
for (
  let cm = JSON.parse(localStorage.getItem("data")), i = 0;
  i < cm.length;
  i++
) {
  console.log(cm[i]);
  commentBuilder(
    cm[i].id,
    cm[i].user.username,
    cm[i].user.image.webp,
    cm[i].createdAt,
    cm[i].score,
    cm[i].content,
    cm[i].replies
  );
}

/* ****** function for adding click event on send buttons ****** */
function addClickEventOnSendBtn(element) {
  const sendBtn = element.querySelector(".bu-primary");
  console.log(sendBtn);
  sendBtn.addEventListener("click", (event) => {
    console.log("hiiiiiii");
    let newComment = {
      content: sendBtn.previousElementSibling.value,
      createdAt: "Now",
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };
    const commentTemplate = document.querySelector(".comment-template");
    let commentPrototype = commentTemplate.content.cloneNode(true);
    commentPrototype.querySelector(".usr-name").textContent =
      newComment.user.username;
    commentPrototype.querySelector(".usr-img").src = newComment.user.image.webp;
    commentPrototype.querySelector(".cmnt-at").textContent = "Now";
    commentPrototype.querySelector(".score-number").textContent = 0;
    commentPrototype.querySelector(".c-body").textContent = newComment.content;

    if (
      sendBtn.parentNode.parentNode ===
      document.querySelector(".comment-section")
    ) {
      console.log("main", sendBtn);
      let targetNode = sendBtn.parentNode.previousElementSibling;
      targetNode.appendChild(commentPrototype);
      sendBtn.previousElementSibling.value = "";
    } else {
      console.log("not main", sendBtn);
      let targetNode = sendBtn.parentNode.parentNode;
      targetNode.appendChild(commentPrototype);
      targetNode.removeChild(targetNode.querySelector(".reply-input"));
    }
  });
}

/* ****** adding highest level send-button click event ****** */
addClickEventOnSendBtn(document.querySelector(".comment-section .reply-input"));

/* ****** function for adding click event on reply buttons(plus dding new send btns click event) ****** */
function addClickEventOnReplyBtns() {
  const replyBtns = document.querySelectorAll(".reply");
  const replyTemplate = document.querySelector(".reply-input-template");
  replyBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const replyBox = replyTemplate.content.cloneNode(true);
      let targetNode = btn.parentNode.parentNode.nextElementSibling;
      if (!targetNode.querySelector(".reply-input")) {
        targetNode.appendChild(replyBox);
      }
      console.log(targetNode.querySelector(".reply-input"));
      addClickEventOnSendBtn(targetNode.querySelector(".reply-input"));
    });
  });
}
addClickEventOnReplyBtns();

// const replyBtn = document.querySelectorAll(".reply");
// const replyTemplate = document.querySelector(".reply-input-template");
// replyBtn.forEach((element) => {
//   element.addEventListener("click", (event) => {
//     console.log("click event");
//     console.log(event.srcElement.parentNode.parentNode.nextElementSibling);
//     let replyBox = replyTemplate.content.cloneNode(true);
//     event.srcElement.parentNode.parentNode.nextElementSibling.appendChild(
//       replyBox
//     );
//   });
//   addClickEventOnSendBtn();
// });
