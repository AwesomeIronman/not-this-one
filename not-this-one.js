// ==UserScript==
// @name         Not This One!
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides user defined posts
// @author       Cyrus Gracias
// @include      https://sanet.st/books/tag/computers-internet-programming/*
// @include      https://sanet.st/video-tutorials/*
// @include      https://sanet.st/video-courses/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  console.debug("Not This One! ran...");

  let data = {
    select_posts: "li.fffbg",
    authors: ["b/ebooks4science2018","b/kingbooks","b/wexcase","b/mecury-books","b/wowbooks", "b/booknew"],
    keywords: ["arduino","opencv","autodesk","azure","blender","swift","wordpress", "excel", "autocad","unity"],
    style: "display: none"
  };
  let posts = document.querySelectorAll(data.select_posts);

  function hidePost(post) {
    post.setAttribute("style", "display:none");
  }
  function filterAuthors(post, post_author, post_title) {
    if (data.authors.includes(post_author)) {
      console.debug(`Blocking ${post_author}: ${post_title}`);
      hidePost(post);
    }
  }
  function filterTitles(post, post_title, post_author) {
    let arr_title = post_title.toLowerCase().trim().split(" ").filter(n => n);
    data.keywords.forEach(function (word) {
      if (arr_title.indexOf(word) != -1) {
        console.debug(`Blocking ${post_author}: ${post_title}`);
        hidePost(post);
      }
    });
  }

  posts.forEach(post => {
    let post_author = post.querySelector(".bloglink").innerHTML;
    let post_title = post.querySelector("a.item_caption > span").innerHTML;
    filterAuthors(post, post_author, post_title);
    filterTitles(post, post_title, post_author);
  });
})();

