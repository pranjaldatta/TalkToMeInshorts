var service = require("./PollyService");
var fs = require("fs")
var obj = null

async function hello(){
 obj = await service.talkingShorts("entertainment" , 2)

console.log(obj)

for(let i = 0 ; i < obj.length ; i++){
    fs.writeFile("output"+i+".mp3" , obj[1])
}
}
hello()
