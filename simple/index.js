const {Kafka} = require('kafkajs')
//const kafkaConfig = 
const kafka = new Kafka({
    clientId: 'users-app',
    brokers: ['127.0.0.1:9092']
})
const admin = kafka.admin()

async function createPartition(){
    await admin.connect()
    await admin.createTopics({
        waitForLeaders: true,
        topics: [{topic:"topic-a",numPartitions:2}]
    })
    
    await admin.disconnect()

}
createPartition()

async function produce(){
    try{
        const producer = kafka.producer()
        await producer.connect()
        await producer.send({
            topic: "topic-a",
            messages: [
                { key: 'key1', value: 'hello world',partition:0 },
                { key: 'key2', value: 'hey hey!',partition:1 }
            ],
        })
        //await producer.disconnect()
    }
    catch(e){
        console.log("***************************")
        console.log("***************************")
        console.log("********Producer***********")
        console.log("***************************")
        console.log("***************************")
        console.log("***************************")

    }
}

produce()


async function consume(){
    try{
        const consumer = kafka.consumer({ groupId: 'my-group-2' })
        await consumer.connect()
        await consumer.subscribe({ topic: 'test', fromBeginning: true  })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    key: message.key.toString(),
                    value: message.value.toString(),
                    headers: message.headers,
                })
            },
        })
        //await consumer.disconnect()

    }
    
    catch(e){
        console.log("***************************")
        console.log("***************************")
        console.log("********Consumer***********")
        console.log("***************************")
        console.log("***************************")
        console.log("***************************")

    }
    
}

consume()


// docker run 
//     --name kafka -p 9092:9092 \
//     -e KAFKA_ZOOKEEPER_CONNECT=172.17.0.3:2181 \
//     -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://172.17.0.3:9092 \
//     -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
//     confluentinc/cp-kafka:6.2.1



