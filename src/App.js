import messagingClient from "./messagingClient.js";
import cohereAI from "./cohereClient.js";

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
    switch (topicString) {
      case "expired":
        // Insert functionality here
        const obj = JSON.parse(messageString);

        console.log(obj); // this is the thing you need to fix/make pretty

        cohereAI
          .findRecipe(obj.items)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("There was an error generating your recipe", err);
          });

        // END
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
