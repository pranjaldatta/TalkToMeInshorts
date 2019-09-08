/**
 * A sample runner file for those who dont want to use the CLI
 * 
 */

var service = require("./PollyService");

const  creds = require("../assets/keys") //import your own .js file that stores credential data

// or add manually although this is not recommended
const cred = {
    "accessKey" : creds.awsPollyAuth.accessKey,
    "secretAccessKey" : creds.awsPollyAuth.secretAccessKey,
    "region" : creds.awsPollyAuth.region
}

service.talkingShorts(null, cred , "entertainment" , 2, "../test_audio/")


