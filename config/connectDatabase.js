const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect(process.env.DBS_URL).then((con)=>{
        console.log('Mongodb connect to localhost'+con.connection.host);
    })
};



module.exports = connectDatabase;