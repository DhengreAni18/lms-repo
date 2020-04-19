const { MongoClient } = require("mongodb");
const key = require("./mongo").mongoURI;
const express = require("express");
const mongoose = require("mongoose");

const app = express();
// Replace the following with your Atlas connection string

const client = new MongoClient(key);

// The database to use
const dbName = "test";

module.exports = async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection("people");

    // Construct a document
    //  let personDocument = {
    //      "name": { "first": "Alan", "last": "Turing" },
    //      "birth": new Date(1912, 5, 23), // June 23, 1912
    //      "death": new Date(1954, 5, 7),  // June 7, 1954
    //      "contribs": [ "Turing machine", "Turing test", "Turingery" ],
    //      "views": 1250000
    //  }

    //  // Insert a single document, wait for promise so we can read it back
    //  const p = await col.insertOne(personDocument);
    // Find one document
    const myDoc = await col.findOne({
      idd: "1",
    });
    //  document.getElementById("text").innerHTML = myDoc.name;

    // Print to the console
    console.log(myDoc.name);
    app.get("/", (req, res) => res.send(myDoc.name));
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
};

// run().catch(console.dir);
