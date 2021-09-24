

#Docker
Zookeeper / Kafka

#Docker run zookeeper
docker run --name zookeeper -p 2181:2181 zookeeper


#Docker run kafka
docker run --name kafka -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=127.1.0.2:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka

#Docker insepect
docker inspect --format "{{ .NetworkSettings.IPAddress }}" zookeeper



