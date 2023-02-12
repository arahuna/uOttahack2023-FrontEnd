import mqtt from "mqtt";
import options from "./messaging-options.js";

function messaging() {
  let client;

  function connectWithPromise() {
    return new Promise((resolve, reject) => {
      try {
        client = mqtt.connect(options.host, options);
      } catch (err) {
        console.log("Error connecting");
        reject(err);
      }

      client.on("connect", () => {
        resolve("Connected");
      });
    });
  }

  function subscribe(topicName) {
    client.subscribe(topicName, (err) => {
      if (err) {
        console.log("error subscribing");
      }
    });
  }

  function registerMessageHandler(handler) {
    client.on("message", (topic, message) => {
      handler(topic.toString(), message.toString());
    });
  }

  return {
    connectWithPromise,
    subscribe,
    registerMessageHandler,
  };
}

let messagingClient = messaging();
export default messagingClient;
