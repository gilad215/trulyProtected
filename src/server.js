var express   =    require("express");
 var mysql     =    require('mysql');
 var app       =    express();

 var pool      =    mysql.createPool({
     connectionLimit : 100, //important
     host     : 'localhost',
     user     : 'root',
     password : '2121',
     database : 'tp',
     debug    :  false
 });

 function getMachines(req, res) {
     pool.getConnection(function(err,connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }   

         console.log('connected as id ' + connection.threadId);

         connection.query("select * from machines",function(err,rows){
             connection.release();
             if(!err) {
                 res.json(rows);
             }           
         });

         connection.on('error', function(err) {      
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;     
         });
   });
 }

 function getDictionary(req, res) {
     pool.getConnection(function(err,connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }   

         console.log('connected as id ' + connection.threadId);

          var responseJson={};
         var column = "statuses";
         connection.query("select * from " + column,function(err,data){
             console.log(data);
             if(!err) {
                 
                 responseJson["status"] = data;
                }
              else
              {
                res.json({"code" : 100, "status" : "Data invalid"});
              }
         });

         column = "os";
         connection.query("select * from " + column,function(err,data){
             connection.release();
             console.log(data);
             if(!err) {
              responseJson["os"] = data;
                  res.json(responseJson);
                  return;
                }

                res.json({"code" : 100, "status" : "Data invalid"});
         });

         connection.on('error', function(err) {      
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;     
         });
   });
 }

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

 app.get("/machines",function(req,res){
  getMachines(req, res);
 });

 app.get("/getDictionary", function(req,res){
  getDictionary(req, res);
 })

 app.listen(5000);