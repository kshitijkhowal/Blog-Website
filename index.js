import express from "express"
import bodyParser from "body-parser"

const app=express();
const port=3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let AllPosts=[];
let lastUsedId=2;


const firstPost={
    id:1,
    title: "What is a blog?",
    text: "A blog, short for weblog, is a frequently updated web page used for personal commentary or business content. Blogs are often interactive and include sections at the bottom of individual blog posts where readers can leave comments.Most are written in a conversational style to reflect the voice and personal views of the blogger. Some businesses use blogs to connect with target audiences and sell products.",
    date: "August 11, 2024 - 01:36"
}
const secondPost={
    id:2,
    title: "What does this blog Website uses?",
    text: "this site uses HTML, CSS, JavaScript, Node.Js, Express",
    date: "August 11, 2024 - 02:36"

}

AllPosts.push(secondPost);
AllPosts.push(firstPost);

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        AllPosts:AllPosts,
    });
});

app.get("/addPost",async(req,res)=>{
    res.render("newPost.ejs");
})

function formatDate() {
    const date = new Date();

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;
    
    return `${formattedDate} - ${formattedTime}`;
}

app.post("/addPost",async(req,res)=>{
    const newPost={
        id:lastUsedId+1,
        title:req.body["user-title"],
        text:req.body["user-text"],
        date:formatDate()
    }
    lastUsedId+=1;
    AllPosts.unshift(newPost);
    
    // console.log(newPost);
    res.redirect("/");
    
})

app.get("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    const index = AllPosts.findIndex((p) => p.id === parseInt(id));
    AllPosts.splice(index,1);
    res.redirect("/");
    
})

app.get("/update/:id",async(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    const index = AllPosts.findIndex((p) => p.id === parseInt(id));
    // console.log(AllPosts[index]);
    
    res.render("editPost.ejs",{currPost:AllPosts[index]});
    
})

app.post("/update/:id",async(req,res)=>{
    console.log("req.body.title");
    const id=req.params.id;
    const index = AllPosts.findIndex((p) => p.id === parseInt(id));

    AllPosts[index].title=req.body["user-title"] || AllPosts[index].title;
    AllPosts[index].text=req.body["user-text"] || AllPosts[index].text;

    res.redirect("/");


})




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

