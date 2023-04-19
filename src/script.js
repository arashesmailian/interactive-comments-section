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
  let commentPrototype = commentTemplate.content.cloneNode(true)
  console.log(commentPrototype);
  //*********************************** */
  let cmWrp = commentWrp.cloneNode(true);
  let renderingCmt = comment.cloneNode(true);
  let repleisContainer = repleis.cloneNode(true);
  commentsWrp.appendChild(cmWrp);
  console.log("cm wrapper added to comments wrapper");
  //   console.log(
  //     id,
  //     username,
  //     userImg,
  //     publishedTime,
  //     commentCount,
  //     commentText,
  //     cmRepleis
  //   );
  if (id) {
    console.log("IMPORTANT ", id, commentText);
    console.log(renderingCmt.children[2].children[0]);
    renderingCmt.children[2].children[0].src = userImg;
    renderingCmt.children[2].children[1].textContent = username;
    renderingCmt.children[2].children[2].textContent = publishedTime;
    renderingCmt.children[0].children[1].textContent = commentCount;
    renderingCmt.children[3].children[1].textContent = id + commentText;
    cmWrp.appendChild(renderingCmt);
    console.log("render cmt added to cm wrapper");
  }
  if (cmRepleis.length !== 0) {
    cmWrp.appendChild(repleisContainer);
    console.log("reply container added to cm wrapper");
    for (let r of cmRepleis) {
      let reply = comment.cloneNode(true);
      reply.children[2].children[0].src = r.user.image.webp;
      reply.children[2].children[1].tex = r.user.username;
      reply.children[2].children[2].textContent = r.createdAt;
      reply.children[0].children[1].textContent = r.score;
      reply.children[3].children[1].textContent = r.content;
      reply.children[3].children[0].textContent = "@" + r.id + r.replyingTo;
      repleisContainer.appendChild(reply);
      console.log("reply added to reply container");
    }
  } else {
    console.log("no reply");
    // cmWrp.removeChild(repleisContainer)
    // commentsWrp.removeChild(cmWrp)
  }
}

for (let cm of data.comments) {
  console.log(cm);
  commentBuilder(
    cm.id,
    cm.user.username,
    cm.user.image.webp,
    cm.createdAt,
    cm.score,
    cm.content,
    cm.replies
  );
}
