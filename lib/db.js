import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/challenge_eco";

if (!MONGODB_URI) {
  throw new Error(" Missing MongoDB URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log(" MongoDB Connected (Local Compass)");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
