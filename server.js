const express=require("express");
const databaseConnection = require("./DB/database");
const app=express();
const userRouter=require("./routers/users");

app.use(express.json())
app.use("/user",userRouter);

app.listen(3000,()=>{
    console.log("server started on the Port",3000)
    databaseConnection()
})