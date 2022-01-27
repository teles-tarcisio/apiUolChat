import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function connectToDB() {
  try {
    const connection= await mongoClient.connect();
    console.log('connected to database ->', connection.s.url);
    return connection;
  } catch (error) {
    console.log(error);
    console.log("Erro abrindo conexão com BD");
  }
}

async function insertUser(newUser) {
  try {
    const dbConnection = await connectToDB();
    const db = dbConnection.db('apiUOL');
    const targetCollection = db.collection('users');
    
    const insertionPromise = await targetCollection.insertOne(
      { 
        name: newUser.name,
        lastStatus: Date.now()
    });

    dbConnection.close();
    return insertionPromise.insertedId;
  } catch (error) {
    console.log(error);
    console.log("Erro ao inserir usuário");
  }
}

async function getUsers() {
  
  return;
}



export { connectToDB, insertUser, getUsers };