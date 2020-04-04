
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });
const app = require('./app');


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));


const port  = process.env.PORT || 8000;




const server = app.listen(port , function (){
    console.log(`Server is successfully running at port ${port}`);
})