var mongoose = require('mongoose')

var exports = module.exports = {
    YoutubeChannel: function (){
        return mongoose.model('YoutubeChannel', {
            url: String,
            channelId: String
        })
    }
}