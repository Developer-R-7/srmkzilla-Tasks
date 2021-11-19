/*
 * Telephone Directory
 *
 * Add new telephone details (number + name)
 * Update a detail using the name
 * Delete a detail using the name
 * Read - search detail by name
 */

require("dotenv").config();
const {MongoClient} = require("mongodb")

const client = new MongoClient(process.env.MONGO_URL);

const run = async () => {
    try{
        await client.connect();
        const database = client.db();

        const db = await database.collection("TelephoneDirectory")

        console.log("Database Connected!");

        //Call CRUD Function Here

        //createContact(db,"Rushi",1234567890)
        //findContact(db,"Rushi")
        //updateContact(db,"Rushi","Rushi Patel",0123456789);
        //deleteContact(db,"Rushi Patel")
        
    }
    catch(error){
        console.error(error)
    }
}

//CRUD operations

const createContact = async(db,name,number) =>{
    try{
        //Check if user exists
        if(await db.findOne({number:number})){
            console.log("User already Exists with this number");
            process.exit(0);
        }
        else{
            await client.connect()
            await db.insertOne({
                name:name,
                number:number,
            });
            console.log(`New contact added!! Name:${name} and Number:${number}`);
            process.exit(0)
        }
    }catch(error){
        console.error(error)
        process.exit(0)
    }
}


const findContact = async (db,name) => {
    try{
        await client.connect()
        const result = await db.findOne({
            name:name,
        })
        if(result == null){
            console.log(`User Not Found`);
            process.exit(0)
        }
        else{
            console.log(`Userfound --> Name:${result.name} and PhoneNumber:${result.number}`);
            process.exit(0)
        }

    }catch(error){
        console.error(error)
        process.exit(0)
    }
}

const updateContact = async (db,old_name,new_name,new_number) => {
    try{
        await client.connect()
        await db.updateOne({name: old_name},
            {
                $set:{
                name:new_name,number:new_number
            }
        });
        console.log("Contact Updated successfully!!")
        process.exit(0)
    }catch(error){
        console.error(error)
        process.exit(0)
    }
}

const deleteContact = async (db,name) => {
    try{
        await client.connect()
        if(await db.findOne({name:name})){
            await db.deleteOne({name: name})
            console.log("Contact Deleted");
            process.exit(0)
        }else{
            console.log("Now such user found!");
            process.exit(0)
        }

    }catch(error){
        console.error(error)
        process.exit(0)
    }
}



run();