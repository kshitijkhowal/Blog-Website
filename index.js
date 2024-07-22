import express from "express"

const app=express();
const port=3000;



app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/addPost",(req,res)=>{
    res.render("newPost.ejs");
})

app.use(express.static('public'));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

