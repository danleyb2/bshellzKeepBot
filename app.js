var irc=require("irc");
var fs=require("fs");
var express=require('express');
var mongo=require('mongodb').MongoClient;
var url='mongodb://brian:brian123@ds033143.mongolab.com:33143/nodetest2';
var database=null;
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

mongo.connect(url,function(err,db){
    if(err){
        console.log('Could not connect to db');

    }else{
        console.log('Connected to db');
        database=db;
    }

});

app.get('/',function(req,res,next){
    console.log(req.url);

    database.collection('keepShell',function(err,collection){
        if(err){

        }else{
            //res=collection.find();
            var results=collection.find().toArray(function(e,result){return result});

            console.log(results);
            //res.writeHead(200, {"Content-Type": "application/json"});
            //res.end(JSON.stringify(results));

            res.writeHead(200,"{'Content-type':'text/plain'}");
            fs.createReadStream(logfile).pipe(res);
            next();




        }

    });



	//res.writeHead(200,"{'Content-type':'text/plain'}");
	//fs.createReadStream(logfile).pipe(res);
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

        var coll=database.collection('keepShell');

        console.log("Connected");
        myBot.join(config.channel,function(data){
            console.log(data);
            //myBot.function (nick, to, text, message) { }

            myBot.addListener('message', function(from, to, message) {

                if(from!=config.name) {
                    var incoming={
                        "event":"message",
                        "to":to,
                        "content":message
                    };
                    coll.insert(incoming);
                }
                if(message.indexOf('ndieksBot')!=-1){
                    myBot.disconnect(function(data){

                        coll.insert({
                            "event":"disconnect",
                            "message":"Bot disconnected from " + config.channel
                        });



                    });
                }



            });

            coll.insert({
                "event":"join",
                "message":"Bot ["+data+"] joinned "+config.channel

            });



            myBot.say(config.channel,msg);
           /* myBot.disconnect(function(data){

                coll.insert({
                    "event":"disconnect",
                    "message":"Bot disconnected from " + config.channel
                });



            });*/


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

module.exports=app;