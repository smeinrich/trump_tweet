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
    var params = {screen_name: 'realDonaldTrump', tweet_mode: 'extended', count: 5};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        var tweet = [tweets[0]["full_text"], tweets[1]["full_text"], tweets[2]["full_text"], tweets[3]["full_text"], tweets[4]["full_text"]];
        var tweetTime = [tweets[0]["created_at"], tweets[1]["created_at"], tweets[2]["created_at"], tweets[3]["created_at"], tweets[4]["created_at"]];
        var timeSince = [ta.ago(tweetTime[0]), ta.ago(tweetTime[1]), ta.ago(tweetTime[2]), ta.ago(tweetTime[3]), ta.ago(tweetTime[4])];
        var trumpImg = "images/anger.png";
        res.render("landing", {
          timeSince1: timeSince[0], timeSince2: timeSince[1], timeSince3: timeSince[2], timeSince4: timeSince[3], timeSince5: timeSince[4], 
          tweet1: tweet[0], tweet2: tweet[1], tweet3: tweet[2], tweet4: tweet[3], tweet5: tweet[4],
          trumpImg: trumpImg
        });



        // var tweetLowerCase = tweet.toLowerCase();
        // if(tweetLowerCase.includes("fake news") == true || tweetLowerCase.includes("witch hunt") == true || tweetLowerCase.includes("democrats") == true) {
        //   trumpImg = "images/anger.png";
        // } else if(tweetLowerCase.includes("looking forward") == true || tweetLowerCase.includes("foxandfriends") == true){
        //   trumpImg = "images/deal.png";
        // } else {
        //   trumpImg = "images/anger.png";
        // }
        // res.render("landing", {timeSince: timeSince, tweet: tweet, trumpImg: trumpImg});
      }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Trump App has started!");
});