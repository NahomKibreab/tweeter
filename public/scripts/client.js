/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // Test / driver code (temporary). Eventually will get this from the server.
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
    }
  };

  renderTweets(data);

  // Listener for Submit Event
  $("form").submit(function (event) {
    event.preventDefault();
  });
});
