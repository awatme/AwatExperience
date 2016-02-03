/**
 * Created by mjafar on 2015/07/03.
 */

function Experience (name, username, timeStamp, maxNumberOfTweetsOnTimeline, timeout, tweetPrefab, tweetContainer, tweets) {
    var numberOfTweetsOnTimeline = 0;
    var shuffledTweets = tweets.slice(0); // Copy
    var shownTweets = 0;

    functions = {
        start: function () {
            functions.shuffle();
            functions.addTweet();
            setInterval(functions.addTweet, timeout);
        },

        shuffle: function () {
            for (var i = shuffledTweets.length; i;) {
                var j = Math.floor(Math.random() * i);
                --i;
                var x = shuffledTweets[i];
                shuffledTweets[i] = shuffledTweets[j];
                shuffledTweets[j] = x;
            }
        },

        addTweet: function () {
            if (shownTweets == tweets.length) {
                shownTweets = 0;
                functions.shuffle();
            }
            var tweetText = shuffledTweets[shownTweets++];
            var removeLast = numberOfTweetsOnTimeline >= maxNumberOfTweetsOnTimeline;
            var $tweet = $(tweetPrefab).clone();
            $tweet.removeClass('hide').removeClass('prefab');
            $tweet.find('p#tweet').html(tweetText);
            $tweet.find('.name_label').html(name);
            $tweet.find('.timestamp_label').html(timeStamp);
            $tweet.find('.username_label').html('<a href="https://twitter.com/'+username+'" target="_blank">@' + username + '</a>');
            var $container = $(tweetContainer);
            numberOfTweetsOnTimeline++;
            var show = function() {
                $tweet.prependTo($container).fadeOut(0).fadeIn(600);
            };
            if (removeLast) {
                $lastTweet = $container.children().not(tweetPrefab).last();
                $lastTweet.fadeOut(300, function () {
                    $lastTweet.remove();
                    show();
                });
                numberOfTweetsOnTimeline--;
            } else {
                show();
            }

        }
    };

    return functions;
}
