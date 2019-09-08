/**
 * @private
 * Reuired imports
 */
var cheerio = require('cheerio');
var requests = require('request');
var rp = require('request-promise');


'use strict'

/**
 * @private
 * @property {String} _baseUrl 
 * @property {Map} _topics
 * @property {String} _mainUrl
 * @property {Function} lookIn
 * @property {Number} numShorts
 */

var _baseUrl = "https://www.inshorts.com/en/read"
var _topics = {
    "national" : "national",
    "business" : "business",
    "sports" : "sports",
    "world" : "world",
    "politics" : "politics",
    "technology" : "technology",
    "startup" : "startup",
    "entertainment" : "entertainment",
    "misc" : "miscellaneous",
    "hatke" : "hatke",
    "science" : "science",
    "automobile" : "automobile"
}
var _mainUrl = ""
var _numShorts = 0

function lookIn(str , num){

    try{
        str = str.toLowerCase()
        _mainUrl = _baseUrl + "/" + _topics[str]
        _numShorts = num
    }
    catch{
        throw new Error("Invalid Category. Available categoris include : national, business, world, politics, technology, startup,\nentertainment, misc, hatke, science, automobile")

    }

    
}


/**
 * @public
 * @property {Function} getShorts
 * @param {String} topic
 * @param {Number} numShorts
 * @property {Object} shortsDict //returns object containing Title,author,content
 */



async function getShorts(){
    var count
    var shortsDict = []
    var short = {
        "title" : "",
        "content" :"",
        "author": ""
    }

    await rp(_mainUrl)
        .then(async function(html) {
            var $ = cheerio.load(html)
            var cardStack = $(".card-stack")

            await cardStack.find("div[class='news-card z-depth-1']").each(function(i, elm) {
                
                short["title"] = $(this).find("a[class='clickable']").text().trim()
                short["content"] = $(this).find("div[itemprop='articleBody']").text()
                short["author"] = "by " + $(this).find("div[class='news-card-author-time news-card-author-time-in-content']").find("span[class='author']").text()

                count = shortsDict.push(short)

                short = {
                    "title" : "",
                    "content" : "",
                    "author" : ""
                }

                if(count >= _numShorts){
                    return false;
                }

            })
        })
        .catch(function(err) {
            console.log(err)
        })
    
    
    
    
    return shortsDict;
}

//exporting functions
module.exports.lookIn = lookIn;
module.exports.getShorts = getShorts;



