import express from "express"

const app=express();
const port=3000;

let AllPosts=[];
const firstPost={
    id:1,
    title: "What is a blog?",
    text: "A blog, short for weblog, is a frequently updated web page used for personal commentary or business content. Blogs are often interactive and include sections at the bottom of individual blog posts where readers can leave comments.Most are written in a conversational style to reflect the voice and personal views of the blogger. Some businesses use blogs to connect with target audiences and sell products."
}
const secondPost={
    id:2,
    title: "What does this blog Website uses?",
    text: "this site uses HTML, CSS, JavaScript, Node.Js, Express"
}

AllPosts.push(firstPost);
AllPosts.push(secondPost);

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        AllPosts:AllPosts,
    });
});

app.get("/addPost",(req,res)=>{
    res.render("newPost.ejs");
})

app.use(express.static('public'));

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

