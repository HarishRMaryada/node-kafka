const {
    Kafka,
    logLevel
} = require("kafkajs")
const fs = require("fs");
const path = require("path");
const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "users"

const kafka = new Kafka({
    clientId,
    brokers,
    // logCreator: customLogger,
    // logLevel: logLevel.DEBUG,
})
const consumer = kafka.consumer({
    groupId: clientId,
    minBytes: 5,
    maxBytes: 1e6,
    // wait for at most 3 seconds before receiving new data
    maxWaitTimeInMs: 3000,
});

const consume = async (res) => {
    // first, we wait for the client to connect and subscribe to the given topic

    let myString = "";
    await consumer.connect()
    await consumer.subscribe({
        topic,
        fromBeginning: true
    })
    await consumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage: ({
            message
        }) => {
            console.log("Message received ###############################################################################");
            console.log(message)
            res.send(JSON.parse(message.value));
        },
    })

    setTimeout(async () => {
        await consumer.disconnect();
    }, 2000);
}

module.exports = consume
