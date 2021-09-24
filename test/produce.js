const {
    Kafka,
    logLevel
} = require("kafkajs")
const fs = require("fs");
const path = require("path");
const {users} = require('./utils')

// the client ID lets kafka know who's producing the messages
const clientId = "my-app"
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"]
// this is the topic to which we want to write messages
const topic = "users"

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({
    clientId,
    brokers,
    // logLevel: logLevel.INFO
})
const producer = kafka.producer({})

// we define an async function that writes a new message each second
const produce = async () => {
  
      
    await producer.connect()
    // after the produce has connected, we start an interval timer

    try {
        // send a message to the configured topic with
        // the key and value formed from the current value of `i`
        await producer.send({
            topic,
            acks: 1,
            messages: [{
                key: "metrics on premise",
                value: JSON.stringify(users)
                //value: fs.readFileSync(path.join(__dirname,'metrics.txt'), 'utf8'),
            }, ],
        })

        const topics = []

        users.forEach(element => {
            let topicMessage = {}
            topicMessage.topic = `user-${element.id}`
            topicMessage.messages = [{  key: 'topic-${element.id}',value: JSON.stringify(users.filter(user => user.id == element.id)[0])}];
            topics.push(topicMessage)
        });
    await producer.connect()
    await producer.sendBatch({ topics })

//     const topicMessages = [
//         {
//           topic: 'topic-a',
//           messages: [{ key: 'key', value: 'hello topic-a' }],
//         },
//         {
//           topic: 'topic-b',
//           messages: [{ key: 'key', value: 'hello topic-b' }],
//         },
//         {
//           topic: 'topic-c',
//           messages: [
//             {
//               key: 'key',
//               value: 'hello topic-c',
//               headers: {
//                 'correlation-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
//               },
//             }
//           ],
//         }
//       ]
  
  
//   await producer.connect()
//   await producer.sendBatch({ topicMessages })
    

        // if the message is written successfully, log it and increment `i`
        console.log("writes:  #####################")
    
    } catch (err) {
        console.error("could not write message " + err)
    }

}

module.exports = produce
