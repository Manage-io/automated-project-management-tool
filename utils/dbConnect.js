const mongoose = require('mongoose');


const connectToMongo = () => {
    if (!mongoose.connections[0].readyState) {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((db) => {
            console.log("database - Connection Established. Ready State: " + db.connections[0].readyState);
        }).catch((err) => {
            console.log("error - From DB. Message: " + err.message);
        })
    }
}

export default connectToMongo;