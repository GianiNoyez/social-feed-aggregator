var express = require('express');
var mongoose = require("mongoose")
var Youtube = require("youtube-api")

var router = express.Router();

var youtubeChannelModel = require('../models/youtubeChannelModel')
var youtubeChannel = youtubeChannelModel.YoutubeChannel();

mongoose.connect('mongodb://localhost/social_feed_aggregator')

Youtube.authenticate({
    type: "key"
  , key: ""
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data = [];
    
    youtubeChannel.find({}, function(err, channels){
        channels.forEach(function(channel){
            var channelId = channel.channelId;
            Youtube.search.list({part: 'snippet', channelId: channelId, order: 'date', maxResults: '25'}, function(err, resp){
                resp.items.forEach(function(item){
                    var video = { url: "https://www.youtube.com/watch?v=" + item.id.videoId, thumbnail: item.snippet.thumbnails.high.url, title: item.snippet.title}
                    data.push(video);
                });
                res.render('youtube/index', { data });      
            });
        });
        console.log(data)
        // res.render('youtube/index', { data });
    });
    
});

router.post('/addChannel', function(req, res, next){
    if(req.body.channel){

        var url = req.body.channel;

        if (url.indexOf('/user/') > -1)
        {
            var username = url.split("/user/")[1];
            
            Youtube.channels.list({part: 'snippet', forUsername: username}, function(err, resp){       
                var channelId = resp.items[0].id;
                res.send(createChannelDocument(url, channelId))
            })
        } else if(url.indexOf('/channel/') > -1){
            var channelId = url.split("/channel/")[1];
            res.send(createChannelDocument(url, channelId))
        }

    }
})

var saveVideos = function(channelId){
    Youtube.search.list({part: 'snippet', channelId: channelId, order: 'date', maxResults: '25'}, function(err, resp){
        
        console.log(resp)
        
        //resp.items.forEach(function(item){
            //var video = { url: "https://www.youtube.com/watch?v=" + item.id.videoId, thumbnail: item.snippet.thumbnails.high.url, title: item.snippet.title}
            //data.push(video);
        //});
        //res.render('youtube/index', { data });      
    });
}

var createChannelDocument = function(url, channelId){
    youtubeChannel.create({
        url: url,
        channelId: channelId
    }, function(err, placeholder){
        if(err){
            console.log(err)
            return false;
        }
        return true
    })
}

module.exports = router;
