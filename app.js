//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date=require(__dirname+"/date.js");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items=["Buy Food", "Cook Food", "Eat Food"];
let workItems=[];
app.get("/", function(req, res) {

let day=date();
// console.log(day);
  res.render("list", { listTitle: day ,  newListItems: items });
});

app.post("/",function(req,res){
var item=req.body.newItem;
// console.log(req.body.list);
if(req.body.list=="Work"){
  workItems.push(item);
  res.redirect("/work");
}else{
  items.push(item);
   res.redirect("/");
}

});

app.get("/work", function(req,res){
  res.render("list", {listTitle:"Work List", newListItems: workItems});
});

app.post("/work", function(req,res){
  let item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});
app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
