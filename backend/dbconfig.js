import { MongoClient } from "mongodb";

const url = "mongodb+srv://priyanshuparashar108:Priyanshuparashar6@cluster0.rkiizre.mongodb.net/?appName=Cluster0";
const dbName = "node-project";
export const collectionName = "todo";
const client = new MongoClient(url);
export const connection = async () =>{
    console.log("....connected.....");
    await client.connect();
    return client.db(dbName);
}