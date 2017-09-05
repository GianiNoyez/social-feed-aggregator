var mongoose = require('mongoose')

var exports = module.exports = {
    YoutubeVideo: function (){
        return mongoose.model('YoutubeVideo', {
            url: String,
            channelId: String
        })
    }
}