const mongoose = require('mongoose');

module.exports = async () => {
    const mongoUri = "mongodb+srv://satyam:QDietkOLnIf6T7pV@cluster0.xy2vuav.mongodb.net/?retryWrites=true&w=majority";
    try{
        mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
            console.log('mongodb connection established')
        });
    }catch(e){
        console.log(e);
        process.exit(1);
    }
};