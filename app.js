var http=require("http");
var irc=require("irc");


var config={
    channels:["#danleyb2","#danleyb4"],
    server:"irc.freenode.net",
    botName:"ndieksBot",
    realName:"Brian",
    userName:"danleyb2"
};

var myBot=new irc.Client(config.server,config.botName,{channels:config.channels
    });
 myBot.addListener("join",function(channel,who){
   myBot.say(channel, who+" ...welcome here"); 

http.createServer(function(req,res){
    
   
});

}).listen(3000,function(){
    console.log("Server running");
});







//myBot.connect();