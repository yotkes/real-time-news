import pika
import json
import time
import random
from faker import Faker
from datetime import datetime

# Initialize Faker for generating random data
faker = Faker()

# Categories for news items
CATEGORIES = ["World", "Science", "Technology", "Business"]

# RabbitMQ configuration
RABBITMQ_HOST = "localhost"
QUEUE_NAME = "news_topic"


def generate_news_item():
    """Generate a random news item."""
    return {
        "title": faker.sentence(),
        "content": faker.text(),
        "category": random.choice(CATEGORIES),
        "timestamp": datetime.now().isoformat(),
        "keywords": [faker.word() for _ in range(3)]
    }


def publish_to_rabbitmq(channel, news_item):
    """Publish a news item to RabbitMQ."""
    channel.basic_publish(
        exchange="",
        routing_key=QUEUE_NAME,
        body=json.dumps(news_item),
        properties=pika.BasicProperties(delivery_mode=2)  # Persistent messages
    )
    print(f"Published: {news_item}")


def main():
    # Connect to RabbitMQ
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    # Declare a queue
    channel.queue_declare(queue=QUEUE_NAME, durable=True)

    try:
        while True:
            # Generate a random news item
            news_item = generate_news_item()

            # Publish the news item to RabbitMQ
            publish_to_rabbitmq(channel, news_item)

            # Wait for 5-10 seconds before generating the next item
            time.sleep(random.randint(5, 10))
    except KeyboardInterrupt:
        print("Stopping news generator...")
    finally:
        connection.close()


if __name__ == "__main__":
    main()
