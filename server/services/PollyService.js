var aws = require('aws-sdk');
var fs = require('fs')
var scrapper = require("../scrapper/scrape");
var awsKeys = require("../assets/keys")
try {
    aws.config.accessKeyId = awsKeys.awsPollyAuth.accessKey
    aws.config.secretAccessKey = awsKeys.awsPollyAuth.secretAccessKey
}catch(err){
    console.log(err)
}


const polly = new aws.Polly()

/**
 * @public
 * @property {Object} shorts
 * @property {function} callGetshorts
 * @property {Object} audioStreams
 * @param {Number} numShorts
 * @param {String} catagory
 * 
 * 
 * @private
 * @property {Object} _pollyParams
 */

var shorts = null
var _pollyParams = {
    "OutputFormat" : "mp3",
    "TextType" : "text",
    "VoiceId" :"Joanna",
    "Text" : ""    
}
var  audioStreams = []


async function callGetShorts(category , numShorts) {
    scrapper.lookIn(category ,  numShorts)
    shorts = await scrapper.getShorts()
    
    for(let i = 0 ; i < shorts.length ; i++) {
        _pollyParams.Text = "<speak>" + shorts[i].title + "<break>" + shorts[i].content + "</speak>"
        console.log(shorts[i].content)
        polly.synthesizeSpeech(_pollyParams , function(err , data) {
            if(err) {
                console.log(err)
            }else {
                audioStreams.push(data.AudioStream)
            }
        })
        
        
    }

    return audioStreams
}



module.exports.talkingShorts = callGetShorts;












































// var params = {
//     "OutputFormat" : "mp3",
//     "Text" : "Hello! i am Joanna from amazon! Jeff says Hi!",
//     "TextType" : "text",
//     "VoiceId" : "Joanna"
// }

// polly.synthesizeSpeech(params , function(err ,data) {
//     if(err){
//         console.log(err)
//     }else {
//         fs.writeFile("output.mp3" , data.AudioStream , function(err) {
//             if(err){
//                 console.log(err)
//             }else {
//                 console.log("Success")
//             }
//         })
//     }
// })