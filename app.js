var http=require("http");
var irc=require("irc");
var sch=require("node-schedule");


var config={
    channels:["#bshellz"],
    server:"irc.freenode.net",
    name:"ndieksBot",
    realName:"Brian",
    userName:"danleyb2"
};

var time=new sch.RecurrenceRule();
time.dayOfWeek=[1,3,5];
time.hour=6;
time.minute=0;

sch.scheduleJob(time,function(){
    var myBot=new irc.Client(config.server,config.name,
    {
        channels:config.channels,
        userName:config.userName,
        realName:config.realName
    }
    
    );
    
     myBot.addListener("join",function(channel,who){
     if (who==config.name) {
         myBot.say(channel,"!keep danleyb2");
         
     }
     
});
 
    
});

http.createServer(function(req,res){
    

}).listen(3000,function () {
    
});
