export default {
  host: "wss://mr-connection-jmrsmyzidta.messaging.solace.cloud:8443",
  username: "solace-cloud-client",
  password: "1q42tbeklh4iqaqqbjmv5u9j8f",
  clientId: "AraK-client",
  keepalive: 10,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 10000,
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};
