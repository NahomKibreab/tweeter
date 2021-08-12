/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  // Test / driver code (temporary). Eventually will get this from the server.
  // Fake data taken from initial-tweets.json

  // protecting from XSS attack
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    const $tweet = $(`
    <article class="tweet">
        <header>
          <div>
            <img src='${escape(data.user.avatars)}'/>
            <span>${escape(data.user.name)}</span>
          </div>
          <span>${escape(data.user.handle)}</span>
        </header>
          <textarea class="tweet-text">${escape(data.content.text)}</textarea>
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
    const $tweetContainer = $("#tweets-container");
    $tweetContainer.empty();
    for (const tweet of tweets) {
      // $tweetContainer.prepend(createTweetElement(tweet));
      $tweetContainer.prepend(createTweetElement(tweet));
    }
  };

  // request json file as a return value
  const fetch = () => {
    $.getJSON("/tweets", (data) => {
      renderTweets(data);
    });
  };

  // Listener for Submit Event
  $("form").submit(function (event) {
    event.preventDefault();

    // check if the textarea is not empty or not exceeded 140 characters
    const textLength = $(this).find("textarea").val().length;
    if (textLength <= 0 || textLength > 140) {
      if (textLength >= 140) {
        return alert("Tweet content is too long ");
      }
      return alert("Tweet is not present.");
    }
    $.post("/tweets/", $(this).serialize(), () => {
      fetch();
    });
    $(this).find("textarea").val("");
  });

  // initial loading the tweets
  fetch();
});
