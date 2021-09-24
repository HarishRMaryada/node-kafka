const { Kafka, logLevel } = require("kafkajs");
const fs = require("fs");
const path = require("path");
const { users } = require("./utils");

// the client ID lets kafka know who's producing the messages
const clientId = "my-app";
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"];
// this is the topic to which we want to write messages
const topic = "users";

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({
  clientId,
  brokers,
  // logLevel: logLevel.INFO
});
const producer = kafka.producer({});

// we define an async function that writes a new message each second
const produce = async () => {
  await producer.connect();
  // after the produce has connected, we start an interval timer

  try {
    // send a message to the configured topic with
    // the key and value formed from the current value of `i`
    await producer.send({
      topic,
      acks: 1,
      messages: [
        {
          key: "metrics on premise",
          value: JSON.stringify(users),
          //value: fs.readFileSync(path.join(__dirname,'metrics.txt'), 'utf8'),
        },
      ],
    });

    // const topics = []

    // users.forEach(element => {
    //     let topicMessage = {}
    //     topicMessage.topic = `user-${element.id}`
    //     topicMessage.messages = [{  key: `topic-${element.id}`,value: JSON.stringify(users[element.id])}];
    //     topics.push(topicMessage)
    // });
    // await producer.sendBatch({ topics })

    const topicMessages = [
      {
        topic: "user-1",
        messages: [{ key: "key", value: JSON.stringify(users[0]) }],
      },
      {
        topic: "user-2",
        messages: [{ key: "key", value: JSON.stringify(users[1]) }],
      },
      {
        topic: "user-3",
        messages: [{ key: "key", value: JSON.stringify(users[2]) }],
      },
      {
        topic: "user-4",
        messages: [{ key: "key", value: JSON.stringify(users[3]) }],
      },
      {
        topic: "user-5",
        messages: [{ key: "key", value: JSON.stringify(users[4]) }],
      },
      {
        topic: "user-6",
        messages: [{ key: "key", value: JSON.stringify(users[5]) }],
      },
      {
        topic: "user-7",
        messages: [{ key: "key", value: JSON.stringify(users[6]) }],
      },
      {
        topic: "user-8",
        messages: [{ key: "key", value: JSON.stringify(users[7]) }],
      },
      {
        topic: "user-9",
        messages: [{ key: "key", value: JSON.stringify(users[8]) }],
      },
      {
        topic: "user-10",
        messages: [{ key: "key", value: JSON.stringify(users[9]) }],
      },
    ];
    await producer.sendBatch({ topicMessages })

    // if the message is written successfully, log it and increment `i`
    console.log("writes:  #####################");
  } catch (err) {
    console.error("could not write message " + err);
  }
};

module.exports = produce;
