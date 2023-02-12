const cohere = require("cohere-ai");
cohere.init("BnN79b2KLysqZbikJTZktJotkqaOl5ouRXFkqhHO"); // This is your trial API key

let var1 = JSON.parse();
let var2 = ;

(async () => {
  const response = await cohere.generate({
    model: "command-xlarge-nightly",
    prompt:
      `Find a recipe for ${var1} and ${var2}. Invent a nice name for this recipe and write it first. List down the ingredients and steps after.`,
    max_tokens: 450,
    temperature: 1.5,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
  });
  console.log(`Prediction: ${response.body.generations[0].text}`);
})();