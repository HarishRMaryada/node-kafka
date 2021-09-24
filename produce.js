const { Kafka } = require("kafkajs");
const { kafkaConfig, topicMessages } = require("./utils");

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka(kafkaConfig);
const producer = kafka.producer({});

// we define an async function that writes a new message each second
const produce = async () => {
  await producer.connect();
  try {
    await producer.sendBatch({ topicMessages });
    console.log("writes:  #####################");
  } catch (err) {
    console.error("could not write message " + err);
  }
};

module.exports = produce;
