var irc=require("irc");
var sch=require("node-schedule");
var fs=require("fs");
var express=require('express');

var app=express();

var logfile="./assets/log.txt";
var msg="!keep danleyb2";

var config={
    channel:"#danleyChnl",
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
/*time.dayOfWeek=[1,3,5];
time.hour=6;
time.minute=0;*/
time.second=0;


var myBot=new irc.Client(config.server,config.name,
    {
        autoConnect: false,
        //channels:config.channels,
        userName:config.userName,
        realName:config.realName
    }
    );

//sch.scheduleJob(time,function(){
    myBot.connect(5,function(data){

        console.log("Connected");
        myBot.join(config.channel,function(data){

            logEvent(logfile,"Bot ("+data+") joined "+config.channel);

            myBot.say(config.channel,'Hello guys..');
            myBot.disconnect(function(data){

                logEvent(logfile, "Bot Disconnected from " + config.channel);

            })


        });

    });
//});


function insertDate(){
    var d = new Date(),
        dformat = [ (d.getMonth()+1),
                    d.getDate(),
                    d.getFullYear()].join('/')+
                    '  ' +
                  [ d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()].join(':');
          return dformat;
}
function logEvent(fileto,str){
    fs.open(fileto,'a');
    fs.appendFile(fileto,insertDate()+" : "+str+"\n");

}
module.exports=app;