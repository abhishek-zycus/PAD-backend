import mongoose from "mongoose";

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
