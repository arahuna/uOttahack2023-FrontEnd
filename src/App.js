import messagingClient from "./messagingClient.js";
import cohereAI from "./cohereClient.js";
import figlet from "figlet";
import chalk from "chalk";

class App {
  constructor() {}

  init() {
    console.log("--------------------------------------");
    console.log("\n" + "Initializing app. Please hold!" + "\n");

    figlet.text(
      "* chec:xpire *",
      {
        font: "Standard",
        horizontalLayout: "fitted",
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

    console.log(
      chalk.red.bold("Helping Reduce Food Wastage One Ingredient At A Time!")
    );

    messagingClient
      .connectWithPromise()
      .then((response) => {
        console.log(response, "to broker. Ready to use!" + "\n");

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

        console.log("--------------------------------------");
        console.log(
          chalk.magenta(
            "\n" +
              "Searching your fridge for food that's about to expire! Hang tight..." +
              "\n"
          )
        ); // waiting message

        if (obj.length > 0) {
          process.stdout.write(chalk.red.bold("EXPIRING SOON: "));
          console.log(obj.map((item) => `${item.quantity} of ${item.name}`));
          console.log(
            chalk.yellow(
              "\n" +
                "Finding a recipe for you that uses these ingredients... .. ."
            )
          );
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
            figlet.textSync("Yay!", {
              font: "Standard",
              horizontalLayout: "fitted",
              verticalLayout: "default",
              width: 40,
              whitespaceBreak: true,
            })
          );
          console.log(
            "\n" +
              chalk.cyan.bold(
                "No items expiring soon! Great job keeping on top of your groceries :-)"
              )
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
    //console.log("Subscribed to topic:", topic);
  }
}

const app = new App();
export default app;
