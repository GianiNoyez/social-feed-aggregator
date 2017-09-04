var express = require('express');
var router = express.Router();
const Youtube = require("youtube-api")

/* GET users listing. */
router.get('/', function(req, res, next) {
    var data = null;
    
    Youtube.authenticate({
        type: "key"
      , key: ""
    });

    //,contentDetails,statistics 
    // with id

    Youtube.search.list({part:'snippet', q: 'ariana grande', maxResults: 50, order: 'date'}, function(err, resp){
        if(err){
            console.log(err)
            return;
        }

        for(var i = 0; i < resp.items.length; i++){
            if(resp.items[i].id.kind === 'youtube#video'){
                console.log('['+ i +'] https://www.youtube.com/watch?v=' + resp.items[i].id.videoId + '\t '  + resp.items[i].snippet.publishedAt + '\t ' + resp.items[i].snippet.title)
            }
        }
        data = resp.items;
        console.log(data[0].snippet.thumbnails)
        res.render('youtube/index', { data });
    });

    
});

module.exports = router;
