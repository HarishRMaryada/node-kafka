const { Kafka } = require("kafkajs");
const {kafkaConfig} = require("./utils")

const kafka = new Kafka(kafkaConfig);
const consumer = kafka.consumer({
  groupId: "my-app",
  minBytes: 5,
  maxBytes: 1e6,
  // wait for at most 3 seconds before receiving new data
  maxWaitTimeInMs: 3000,
});

const getUsers = async (res) => {
  const topic = "users";
  await consumer.connect();
  await consumer.subscribe({
    topic,
    fromBeginning: true,
  });
  await consumer.run({
    // this function is called every time the consumer gets a new message
    eachMessage: ({ message }) => {
      console.log(
        "Message received ###############################################################################"
      );
      res.send(JSON.parse(message.value));
    },
  });

  setTimeout(async () => {
    await consumer.disconnect();
  }, 2000);
};

const getUsersById = async (res,id) => {
    const topic = `user-${id}`;
    await consumer.connect();
    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });
    await consumer.run({
      // this function is called every time the consumer gets a new message
      eachMessage: ({ message }) => {
        console.log(
          "Message received ###############################################################################"
        );
        res.send(JSON.parse(message.value));
      },
    });
  
    setTimeout(async () => {
      await consumer.disconnect();
    }, 2000);
  };
  

module.exports = { getUsers, getUsersById };
