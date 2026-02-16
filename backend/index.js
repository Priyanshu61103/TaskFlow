import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"

const app = express();
let fields;
app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, resp) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        resp.send({ success: true, message: "signup done", token });
      });
    }
  } else {
    resp.send({ success: false, message: "signup not done" });
  }
});

app.post("/login", async (req, resp) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    console.log("result:",result);
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        resp.send({ success: true, message: "login done", token });
      });
    } else {
      resp.send({ success: false, message: "user not found" });
    }
  }else{
       resp.send({ success: false, message: "login not done" });
  }
});
app.post("/add-task" , verifyJsonWebToken , async (req, resp) => {
  console.log(req.body);
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(req.body);
  if (result) resp.send({ message: "New task added", success: true, result });
  else resp.send({ message: "Task not added", success: false });
});

app.get("/tasks", verifyJsonWebToken , async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    resp.send({ message: "Data Fetched", success: "true", result });
  } else {
    resp.send({ message: "Error ! Try Again After SomTime", success: "false" });
  }
});

app.delete("/delete/:id", verifyJsonWebToken , async (req, resp) => {
  const db = await connection();
  const id = req.params.id;
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result) {
    resp.send({ message: "Data is Deleted", success: true, result });
  } else {
    resp.send({ message: "Error ! Try after sometime", success: false });
  }
});

app.get("/tasks",  verifyJsonWebToken , async (req, resp) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    resp.send({ message: "Data Fetched", success: "true", result });
  } else {
    resp.send({ message: "Error ! Try Again After SomTime", success: "false" });
  }
});

app.get("/update/:id", verifyJsonWebToken , async (req, resp) => {
  const db = await connection();
  const id = req.params.id;
  const collection = db.collection(collectionName);
  const result = await collection.findOne({ _id: new ObjectId(id) });
  fields = result;
  if (result) {
    resp.send({ message: "Data Fetched", success: "true", result });
  } else {
    resp.send({
      message: "Error ! Try Again After SomeTime",
      success: "false",
    });
  }
});

app.put("/update-task",  verifyJsonWebToken , async (req, resp) => {
  const db = await connection();
  const _id = fields._id;
  const update = { ...req.body, _id };
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: update },
  );
  if (result) {
    resp.send({ message: "Task Data Updated", success: true, result });
  } else {
    resp.send({
      message: "Error ! Try Again After Some Time.",
      success: false,
    });
  }
});

app.delete("/delete-multiple", verifyJsonWebToken , async (req, resp) => {
  const db = await connection();
  const ids = req.body;
  const deleteTasksIds = ids.map((item) => (item = new ObjectId(item)));
  const collection = db.collection(collectionName);
  const result = collection.deleteMany({ _id: { $in: deleteTasksIds } });
  if (result) {
    resp.send({ message: "Data Deleted", success: true, result });
  } else {
    resp.send({ message: "Data Not Deleted", success: false });
  }
});

function verifyJsonWebToken(req,resp,next){
    const token = req.cookies.token;
    jwt.verify(token,"Google",{expiresIn:"5d"},(error,decoded)=>{
       if(error){
          return resp.send({message:"invalid token",success:false});
       }
       console.log("decoded:",decoded);
       next();
    })
}

app.listen(3200);
