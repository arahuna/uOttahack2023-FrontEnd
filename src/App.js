import messagingClient from "./messagingClient.js";

class App {
  constructor() {}

  init() {
    console.log("Initializing app");

    messagingClient
      .connectWithPromise()
      .then((response) => {
        console.log("Connected to broker", response);

        messagingClient.registerMessageHandler(app.messageHandler.bind(this));
      })
      .catch((err) => {
        console.log("Error connecting to broker", err);
      });
  }

  messageHandler(topicString, messageString) {
    console.log("Message received on topic:", topicString, "::", messageString);

    switch (topicString) {
      case "expired":
        const message = JSON.parse(messageString);
        console.log("Message as object:", message);
        break;
      default: {
        console.warn("No handler for topic:", topicString);
        break;
      }
    }
  }

  publishMessage(topic, message) {
    messagingClient.publish(topic, message);
  }

  subscribeToTopic(topic) {
    messagingClient.subscribe(topic);
    console.log("Subscribed to topic:", topic);
  }
}

const app = new App();
export default app;
