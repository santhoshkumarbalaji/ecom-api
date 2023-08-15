import mongoose from "mongoose";
const dbConnect = async () => {
    try {
      mongoose.set("strictQuery", false);
      const connected = await mongoose.connect(process.env.MONGO_URL);
      console.log(`Mongodb connected ${connected.connection.host}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit(1);
    }
  };
  export default dbConnect;  
  

  //username:-api_ecom
  //password:-kaWrl4IKSpIxVg9o
  //database name :-ecom-api
  //url:-mongodb+srv://api_ecom:<password>@ecom-api.wqjlkmu.mongodb.net/?retryWrites=true&w=majority
   //url:-mongodb+srv://api_ecom:kaWrl4IKSpIxVg9o@ecom-api.wqjlkmu.mongodb.net/ecom-api?retryWrites=true&w=majority
   //collection nmae:ecomapi
   //database name:-nodeapi
   //user:admin2@gmail.com
   //Password:12345
   //Bearer token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzE1ZWQzM2FiYzljMzcxMGEwYTI3NSIsImlhdCI6MTY5MDQ0NTk5MCwiZXhwIjoxNjkwNzA1MTkwfQ.YN5rP24BO42dccuc1C8Luq1jzSWinBc8ByymQKQ7sJI