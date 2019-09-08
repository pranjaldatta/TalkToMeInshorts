#!/usr/bin/env node
const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command("talkingShorts" , "Fetch shorts from Inshorts and read them")
    .alias({
        "c" : "category",
        "n" : "num",
        "o" : "config",
        "k" : "keys",
        "s" : "save"
    })
    .describe({
        "category" : "The category of the short(s). Eg: politics etc",
        "num" : "The Number of shorts to be fetched",
        "config" : "JSON file from which AWS creds are to be fetched",
        "keys" : "JS file which holds the AWS creds",
        "save" : "Location where the Audio(s) needs to be saved"
    })
    .demandOption(["category" , "num", "save"])
    .help("h")
    .alias("h" , "help")
    .argv;

const service = require("./services/PollyService")

if(argv.config == undefined) {
    const creds = require(argv.keys)
    service.talkingShorts(null , creds, argv.category, argv.num, argv.save)
           .then(function() {
               console.log("Success")
           })
           .catch(function(err) {
               console.log(err)
           })
}else{
    console.log("Loading from config")
    service.talkingShorts(argv.config, null, argv.category, argv.num, argv.save)
           .then(function() {
               console.log("Success")
           })
           .catch(function(err) {
               console.log(err)
           })
}


