//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _ = require('lodash');
const md5=require("md5");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const alert= require('alert');

mongoose.connect("mongodb://localhost:27017/blogSite2",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.set("useCreateIndex",true);

//mongoose.connect("mongodb+srv://admin-briju:briju0810@cluster0.vixf2.mongodb.net/blogDB",{useNewUrlParser: true, useUnifiedTopology: true });

const homeStartingContent = "So here you are, to read a page of my life. I'm really glad that mine is read by you people and this makes me keep posting. So keep visiting as I update my daily activities and keep cheering. Now you may scroll down.😅";
const aboutContent = "Blogger is software designed for everyone, emphasizing accessibility, performance, security, and ease of use. We believe great software should work with minimum set up, so you can focus on sharing your story, product, or services freely. This basic software is simple and predictable so you can easily get started. It also offers powerful features for growth and success.We believe in democratizing publishing and the freedoms that come with open source. Supporting this idea is a large community of people collaborating on and contributing to this project.";
const contactContent = "While we're good with Managing your posts, there are simpler ways for us to get in touch and answer your questions.";
const contactNumber="+91 1234567890";
const contactEmail="support@blogger.com";

/////////////////////////////////////////////MODEL///////////////////////////////////////////////
const userSchema=new mongoose.Schema({
	firstName:String,
	lastName:String,
	userName:String,
	email:String,
	password:String,
	posts: Array
});
const User=mongoose.model("User",userSchema);

/////////////////////////////////////Home/////////////////////////////////////////////////////
app.get("/",function(req,res){
	res.render("main");
});

/////////////////////////////ABOUT/////////////////////////////////////////////
app.get("/about",function(req,res){
	res.render("about",{startingContent:aboutContent});
});

///////////////////////////CONTACT/////////////////////////////////////////////
app.get("/contact",function(req,res){
	res.render("contact",{startingContent:contactContent,contactNumber:contactNumber,contactEmail:contactEmail});
});

/////////////////////////BLOGGERS////////////////////////////////////////////
app.get("/bloggers",function(req,res){
	User.find({}, function(err, users){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("bloggers",{users:users});
		}
	});
	
});

/////////////////////////////Register///////////////////////////////////////
app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res)
{
	const uname=_.lowerCase(req.body.uname);
	User.findOne({userName:uname},function(err,foundUser){
		if(err)
		{
			console.log(err);
		}
		else{
			if(foundUser)
			{
				alert("Username already taken. Pick another one.");
				res.redirect("/register");
			}
			else{
				const user=new User({
					firstName:req.body.fname,
					lastName:req.body.lname,
					userName:uname,
					email:req.body.email,
					password:req.body.password,
					posts:[]
				});
				user.save(function(err){
					if(!err){
						res.redirect("/");
					}
					else
					{
						res.redirect("/register");
					}
				});
			}
		}
	});
});

/////////////////////////////////Login///////////////////////////////////////
app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",function(req,res){

	User.findOne({userName:req.body.username},function(err,foundUser){
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(foundUser)
			{
				if(foundUser.password===req.body.password)
				{
					console.log("Password Matched");
					const link="/"+foundUser._id+"/compose";
					res.redirect(link);
				}
				else{
					console.log("Wrong Password");
				}
			}
			else
			{
				console.log("User not found!");
			}
		}
	});
});

//////////////////////////////////////COMPOSE for users/////////////////////////////////
app.get("/:id/compose",function(req,res){
	res.render("compose",{id:req.params.id});
});
app.post("/:id/compose",function(req,res){

	const title=req.body.postTitle;
	const content=req.body.postBody;
	const item={title:title,content:content}
	User.findOneAndUpdate({_id:req.params.id}, {$push:{posts:item}}, {upsert: true}, function(err, doc) {
		if (err){
			res.render("post",{title:"ERROR 505",content:""});
		}
		else{
			alert("Updated");
		}
	});
	const url="/"+req.params.id+"/compose";
	res.redirect(url);
});

////////////////////////////////////////////POSTS//////////////////////////////////////////////////
app.get("/:username/posts",function(req,res){
	User.findOne({userName:req.params.username},function(err,foundUser){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("posts", {startingContent:homeStartingContent,posts: foundUser.posts,user:req.params.username});
		}
	});
});

////////////////////////////////////////////////SPECIFIC POSTS///////////////////////////////////////
app.get("/:username/posts/:index",function(req,res){
	User.findOne({userName:req.params.username}, function(err,foundUser){
		if(err)
		{
			console.log(err);
		}
		else{

			if(foundUser)
			{
				const item=foundUser.posts[req.params.index];
				res.render("post",{
					title:item.title,
					content:item.content
				});
			}
			else{
				res.render("post",{title:"ERROR 404",content:"Page not found. Please check the URL."});
			}
		}
	});
});

//////////////////////////////////////////////////CONNECT/////////////////////////////////////////////
port=process.env.PORT;
if(!port)
{
	port=3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
//briju0810
//admin-briju