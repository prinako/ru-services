import mongoose from 'mongoose';
import express from "express";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

/**
 * Connects to the MongoDB database.
 * 
 * @async
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 */
async function contectDB(next) {
  try {
    // mongoose.set("strictQuery", false);
    const db = await mongoose.connect(process.env.MONGO, clientOptions);
    console.info("Connected to mongo database " + db.connection.name);
    return next(true);
  } catch (err) {
    console.error(err);
    return next(false);
  }
};

contectDB(async(e) => {
  if (!e) {
    console.error("Connection failed");
    return;
  }
  console.info("Connection successful");
  console.info("################# -< Updating cardapio >- ###############################");
  await newCardapioOftheWeek(dropCacheWithKey);
  // await dropCacheWithKey("cardapio");
});

/**
 * Disconnects from the MongoDB database.
 * 
 * @async
 * @returns {Promise<void>} - A promise that resolves when the disconnection is complete.
 */
const disconnetDB = async () => {
  try {
    await mongoose.disconnect();
    console.info("Disconnected from mongo database");
  } catch (err) {
    console.error(err);
  }
};