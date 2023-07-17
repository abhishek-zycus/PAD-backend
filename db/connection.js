import mongoose from "mongoose";
// import AutoIncrementFactory from "mongoose-sequence";

// const AutoIncrement = AutoIncrementFactory(mongoose);

const dbConnection = (MongoURI) => {
  mongoose
    .connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default dbConnection;
