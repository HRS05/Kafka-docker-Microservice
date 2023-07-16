const express = require("express");
//const kafak = require("kafka-node");
const { Kafka } = require("kafkajs");

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

app.post("/", async (req, res) => {
  try {
    const producer = kafka.producer();

    await producer.connect();
    await producer.send({
      topic: "test",
      messages: [{ value: JSON.stringify(req.body) }],
    });

    await producer.disconnect();
    res.status = 200;
    res.send("data sent");
  } catch (e) {
    console.log(`error: ${e}`);
  }
});

// const start = async () => {
//   const client = new kafak.KafkaClient({ kafkaHost: "kafka:9092" });
//   const producer = new kafak.Producer(client);
//   producer.on("ready", async () => {
//     app.post("/", async (req, res) => {
//         try{
//             producer.send(
//                 [{ topic: "test", message: JSON.stringify(req.body) }],
//                 async (err, data) => {
//                   if (err) console.log(err);
//                   else {
//                     console.log(data);
//                     console.log("data sent");
//                     res.status = 200;
//                     res.send("data sent");
//                   }
//                 }
//               );
//         } catch(e) {
//             console.log(`error: ${e}`)
//         }

//     });
//   });
// };

//setTimeout(start, 1000);
app.listen(8080);
