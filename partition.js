const { Kafka } = require('kafkajs')

async function createPart(){
    const kafka = new Kafka({
        clientId: 'my-test-app-1',
        brokers: ['127.0.0.1:9092']
    })

    const admin = kafka.admin()
    await admin.connect()
    console.log("Admin connected")
    await admin.createTopics({
        topics: [
            {
                topic:"title",
                numPartitions:2
            }
        ]
    })

    await admin.disconnect()
    console.log("Admin disconnected")

    
}

createPart();
