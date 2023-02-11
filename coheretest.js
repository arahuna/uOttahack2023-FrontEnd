const cohere = require("cohere-ai");
cohere.init("BnN79b2KLysqZbikJTZktJotkqaOl5ouRXFkqhHO"); // This is our API key
(async () => {
  const response = await cohere.generate({
    model: "command-xlarge-nightly",
    prompt:
      "Find a recipe that includes 100g of cheese and 50g garlic. Invent a nice name for this recipe and write it first. List down the ingredients and steps.",
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
