const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const multer = require('multer');
const path = require('path');



dotenv.config();
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database Connected');
});

app.use('/images',express.static(path.join(__dirname,"public/images")))

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})

const upload = multer({storage});
app.post("/upload",upload.single('file'),async(req,res)=>{
    try{
        return res.status(200).json("file uploaded")
    }catch(err)
    {
        console.log(err)
    }
})

app.use("/users", userRoute);
app.use("/posts",postRoute);
app.use("/auth",authRoute);

app.listen(8000, () => {
    console.log("Server is Live")
})