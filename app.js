var express = require("express");
var app = express();
var request = require("request");
app.use(express.static("public"));
app.set("view engine", "ejs");

var Twitter = require('twitter');
var ta = require("time-ago");

var client = new Twitter({
  consumer_key: '29LFqDOPAsRswd7joF2iMQkNJ',
  consumer_secret: 'CoAnEYFMBMSqHMdtRngaK18ijJAXAEKJ5lmSc9al8rIQbg2Ypq',
  access_token_key: '18216565-8Z1suEwfZM4CtadZ7cNpHFd2bM81pFh2oGBfeT6Sn',
  access_token_secret: '9M5FSMkonp5T6S1EBEhvV3cPv0T5zNN1DilWNeSbixZAX'
});

app.get("/", function(req, res){
    var params = {screen_name: 'realDonaldTrump', tweet_mode: 'extended', count: 1};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        var tweet = tweets[0]["full_text"];
        var tweetLowerCase = tweet.toLowerCase();
        var tweetTime = tweets[0]["created_at"];
        var timeSince = ta.ago(tweetTime);
        var trumpImg = "";
        if(tweetLowerCase.includes("fake news") == true || tweetLowerCase.includes("witch hunt") == true || tweetLowerCase.includes("democrats") == true) {
          trumpImg = "images/anger.png";
        } else if(tweetLowerCase.includes("looking forward") == true || tweetLowerCase.includes("foxandfriends") == true){
          trumpImg = "images/deal.png";
        } else {
          trumpImg = "images/1f60f.svg";
        }
        res.render("landing", {timeSince: timeSince, tweet: tweet, trumpImg: trumpImg});
      }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Trump App has started!");
});