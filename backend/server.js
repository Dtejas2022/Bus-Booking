const express = require('express')
const app = express()
require('dotenv').config()
require('./db/db');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const schedule = require('node-schedule');
const cron = require('node-cron');



const cors = require("cors");
const path = require("path");
const Pass = require("./models/pass")

const userRoutes = require("./routes/userRoutes");
// const blogRoutes = require("./routes/blogRoutes");
const busRoutes = require("./routes/busRoutes")
const contactRoutes=require("./routes/contactRoutes")

app.use(
    cors({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan("dev"));

app.get('/ping', function (req, res) {
  res.send('server running...')
})

app.use("/api/users",userRoutes)
app.use("/api/bus",busRoutes)
app.use("/api/contact",contactRoutes)


cron.schedule('35 17 * * *', async () => {
  const result = await Pass.updateMany(
    { approvedd: { $in: ["1", "0"] } }, 
    { 
      $set: { 
        approvedd: "2", 
        daily: false 
      } 
    }
  );
  
});


app.listen(process.env.PORT,()=>{
    console.log(`server running at port ${process.env.PORT}`)
})
