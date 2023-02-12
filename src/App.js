import messagingClient from "./messagingClient.js";
import cohereAI from "./cohereClient.js";
import figlet from "figlet";

class App {
  constructor() {}

  init() {
    console.log("--------------------------------------");
    console.log("Initializing app. Please hold!");

    figlet.text(
      "* chec:xpire *",
      {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      }
    );

    messagingClient
      .connectWithPromise()
      .then((response) => {
        console.log(response, "to broker. Ready to use!");
        console.log("--------------------------------------");

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

        console.log(
          "Searching your fridge for food that's about to expire! Hang tight!"
        ); // waiting message

        console.log("EXPIRING SOON:");
        console.log(obj.map((item) => `${item.quantity} of ${item.name}`));

        if (obj.length > 0) {
          cohereAI
            .findRecipe(obj)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log("There was an error generating your recipe", err);
            });
        } else {
          console.log(
            "No items expiring soon! Great job keeping on top of your groceries!"
          );
          break;
        }
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
