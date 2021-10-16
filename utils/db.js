import { MongoClient } from 'mongodb';

export async function connectToDataBase(){
    const client = await MongoClient.connect('mongodb+srv://bdAdmin:bdAdminbdAdmin@cluster0.akpi1.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})

    return client
}