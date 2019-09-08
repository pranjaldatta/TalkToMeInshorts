var aws = require('aws-sdk');
var fs = require('fs')
var scrapper = require("../scrapper/scrape");
var awsKeys = require("../assets/keys")





/**
 * @public
 * @property {Object} shorts
 * An Object that stores the retrived shorts
 * @private
 * @property {Object} _pollyParams
 * The predefined parameters for the Amazon Polly service. Will try to add customization options in next iterations
  */

var shorts = null
var _pollyParams = {
    "OutputFormat" : "mp3",
    "TextType" : "text",
    "VoiceId" :"Joanna",
    "Text" : ""    
}


/**
 * 
 * @param {String} configJSON 
 * Path to JSON file holding Amazon AWS credentials in predefined format. Check AWS docs for furthur info
 * @param {Object} creds
 * Holds AWS credentials in key:value mapping 
 * @param {String} category
 * Category of Shorts to fetch. Available categories: national, business, world, politics, technology, startup,entertainment, misc, hatke, science, automobile 
 * @param {Number} numShorts
 * Number of Shorts to fetch 
 * @param {String} saveIn
 * Path to destination where the files need to be saved 
 */

async function callGetShorts(configJSON = null , creds , category , numShorts, saveIn) {
    
    try {
        try{
        if(configJSON == null){
            aws.config.accessKeyId = creds.accessKey
            aws.config.secretAccessKey = creds.secretAccessKey
            aws.config.region = creds.region
        }if(creds == null) {
            aws.config.loadFromPath(configJSON)
        }
    }
        catch{
            throw new Error("wrong path to config/wrong config supplied")
        }
    }catch(err){
        console.log("Error at AWS config : ", err)
    }


    const polly = new aws.Polly()
    
    
    
    scrapper.lookIn(category ,  numShorts)
    shorts = await scrapper.getShorts()

    for(let i = 0 ; i < shorts.length ; i++) {
        
        _pollyParams.Text = shorts[i].title + "    " + shorts[i].content 
        console.log("Synthesizing for %d short", (i+1))
        polly.synthesizeSpeech(_pollyParams , function(err , data) {
            
            if(err) {
                console.log(err)
            }else {
                try {
                    fs.writeFileSync(saveIn + "output" + i + ".mp3" , data.AudioStream)
                }
                catch(err) {
                    console.log("Error at saving : " , err)
                }
            }          
        })
    }

}



module.exports.talkingShorts = callGetShorts;