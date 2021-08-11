/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const createTweetElement = (data) => {
    const $tweet = $(`
    <article class="tweet">
        <header>
          <div>
            <img src='${data.user.avatars}'/>
            <span>${data.user.name}</span>
          </div>
          <span>${data.user.handle}</span>
        </header>
          <textarea class="tweet-text">${data.content.text}</textarea>
        <footer>
          <span>${timeago.format(data.created_at)}</span>
          <div>
            <button class="icons">
              <i class="fas fa-flag"></i>
            </button>
            <button>
              <i class="fas fa-retweet"></i>
            </button>
            <button>
              <i class="fas fa-heart"></i>
            </button>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
