
var irc=require("irc");
var sch=require("node-schedule");
var fs=require("fs");
var express=require('express');

var app=express();

var logfile="./assets/log.txt";

var config={
    channels:["#bshellz"],
    server:"irc.freenode.net",
    name:"ndieksBot",
    realName:"Brian",
    userName:"danleyb2"
};

app.use('/',function(req,res){
	res.writeHead(200,"{'Content-type':'text/plain'}");
	fs.createReadStream(logfile).pipe(res);
   });

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
         logEvent(logfile,"Bot joinned "+channel);
         var msg="!keep danleyb2";
         myBot.say(channel,msg);
         logEvent(logfile,"Bot said:- "+msg);
       // myBot.part("#bshellz");
     }
    });
});
function insertDate(){
    var d = new Date(),
        return= [ (d.getMonth()+1),
                    d.getDate(),
                    d.getFullYear()].join('/')+
                    '  ' +
                  [ d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');

}
function logEvent(fileto,str){
    fs.open(fileto,'a');
    fs.appendFile(fileto,insertDate()+" : "+str+"\n");

}
module.exports=app;