import mongoose from "mongoose"; //mongoose will allow type definitions for all of our collections(a group of related data).

// Take the MongoDB connection URL stored in an environment variable called MONGODB_URI, and store it in a constant named MONGODB_URI.
const MONGODB_URI = process.env.MONGODB_URI;

/*const → creates a variable that you don't intend to reassign.
MONGODB_URI on the left → your local variable.
process.env → Node.js's collection of environment variables.
MONGODB_URI on the right → the name of the environment variable you're reading.
*/

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  // The code you're looking at is setting up a reusable cache for the Mongoose connection so your application doesn't unnecessarily create new MongoDB connections, while TypeScript is being told what that cache looks like.
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your environment variables");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;