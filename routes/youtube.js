var express = require('express');
var router = express.Router();
const Youtube = require("youtube-api")

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data = null;
    
    Youtube.authenticate({
        type: "key"
      , key: "AIzaSyA7JDsPsjSbDcVTtFZVH8_ZKNBzZ4G0PvQ"
    });

    //,contentDetails,statistics 
    // with id

    Youtube.playlistItems.list({part:'snippet,contentDetails', playlistId: 'UUXuqSBlHAE6Xw-yeJA0Tunw', maxResults: 10, order: 'videoPublishedAt'}, function(err, resp){
        if(err){
            console.log(err)
            return;
        }

        for(var i = 0; i < resp.items.length; i++){
            if(resp.items[i].id.kind === 'youtube#playlistItem'){
                console.log('['+ i +'] https://www.youtube.com/watch?v=' + resp.items[i].id.videoId + '\t '  + resp.items[i].snippet.publishedAt + '\t ' + resp.items[i].snippet.title)
            }
        }
        data = resp.items;
        //console.log(resp.items)
        res.render('youtube/index', { data });
    });  
});

module.exports = router;
