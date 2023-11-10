//0.0.0.0/0 = is ki matlab hota hain is ko kisi bhi IP sai connect kya ga sakta hain
//Document base dataBase
import { MongoClient } from 'mongodb';
//Mongodb Uri = ya mera database ki connect Url hain
// ya mera database taak gana ki rasta hain
const uri =
  "mongodb+srv://Hassan:Hassan741883@cluster0.jjpseix.mongodb.net/?retryWrites=true&w=majority";
// Connect to your Atlas cluster
// Mongodb init
export const client = new MongoClient(uri);    

async function run() {
    try {
        //Client sa ap connect hogao
        //Await ki matlab hain stop ho kar wait karo response ana ki
        await client.connect();
        console.log("Successfully connected to Atlas");
    } catch (err) {
        console.log(err);
        //connect is closing
        await client.close();
        //application ko exit karna
        process.exit(1)
    }
}
run().catch(console.dir);

process.on('SIGINT', async function() {

    console.log('app is terminating')
    await client.close();
    process.exit(0)

})