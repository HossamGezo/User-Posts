let users = document.querySelector(".all-posts__users");
let posts = document.querySelector(".all-posts__posts");
let allPosts = document.querySelector(".all-posts");
// Global Variable I Will Use It At 54th Line Then 67th Line
let child;

// ---------- Get Request Posts Function ----------
function getRequestPosts(userId) {
  let request = new XMLHttpRequest();
  request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  request.responseType = "json";
  request.send();
  posts.innerHTML = "";
  request.onload = function () {
    if (this.status >= 200 && this.status < 300 && this.readyState === 4) {
      let postsArray = this.response;
      for (let post of postsArray) {
        posts.innerHTML += `
          <div class="post">
            <h4 class="post__title">
              ${post.title}
            </h4>
            <div class="post__body">
              ${post.body}
            </div>
          </div>
        `;
      }
    }
  }
}

// ---------- Get Request Users Function ----------
function getRequestUsers() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.send();
  request.onload = function () {
    if (this.status >= 200 && this.status < 300 && this.readyState === 4) {
      let usersArray = JSON.parse(request.responseText);
      for (let user of usersArray) {
        users.innerHTML += `
          <div class="user ${user.id === 1 ? "active" : ""}" onclick="userClicked(${user.id}, this)">
            <h3 class="user__name">
              ${user.name}
            </h3>
            <p class="user__email">
              ${user.email}
            </p>
          </div>
        `;
      }
      // Get All Users
      child = users.querySelectorAll(".user");
      child[0].click();
    }
  }
}

getRequestUsers();

// ---------- User Clicked Function ----------

function userClicked(userId, ele) {
  getRequestPosts(userId);
  // Remove All Active From Users
  child.forEach((user) => {
    user.classList.remove("active");
  });
  // Add Active Class To Choosen Element
  ele.classList.add("active");
}