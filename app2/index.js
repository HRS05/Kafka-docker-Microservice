const express = require("express");
const kafak = require("kafka-node");
const app = express();
app.use(express.json());

const start = async () => {
  const client = new kafak.KafkaClient({ kafkaHost: "kafka:9092" });
  const consumer = new kafak.Consumer(client, [{ topic: "test" }], {
    autoCommit: false,
  });
  consumer.on("message", async (message) => {
    console.log("here we recived event on message");
    console.log("---------------------------------");
    console.log(message);
    console.log("---------------------------------");
  });
  consumer.on("error", async (error) => {
    console.log(error);
  });
};

setTimeout(start, 1000);
app.listen(8080);
