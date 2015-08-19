var irc=require("irc");
var fs=require("fs");
var express=require('express');

var app=express();

var logfile="./assets/log.txt";
var msg="!keep danleyb2";

var config={
    channel:"#bshellz",
    server:"irc.freenode.net",
    name:"ndieksBot",
    realName:"Brian",
    userName:"danleyb2"
};

app.get('/',function(req,res,next){
    console.log(req.url);

	res.writeHead(200,"{'Content-type':'text/plain'}");
	fs.createReadStream(logfile).pipe(res);
    next();

   });
app.use('/bot',function(req,res){
    console.log(req.url);
    bot();
    res.end();
});



var myBot=new irc.Client(config.server,config.name,
    {
        autoConnect: false,
        //channels:config.channels,
        userName:config.userName,
        realName:config.realName
    }
    );

function bot(){
    myBot.connect(5,function(data){

        console.log("Connected");
        myBot.join(config.channel,function(data){

            logEvent(logfile,"Bot ("+data+") joined "+config.channel);

            myBot.say(config.channel,msg);
            myBot.disconnect(function(data){

                logEvent(logfile, "Bot Disconnected from " + config.channel);
                logEvent(logfile,'________________________________________________________________________________________________');

            })


        });

    });
}




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