import chalk from "chalk";
import cohere from "cohere-ai";
cohere.init("BnN79b2KLysqZbikJTZktJotkqaOl5ouRXFkqhHO"); // This is our API key

function cohereClient() {
  function formatString(foodItems) {
    let arr = foodItems.map((item) => `${item.quantity} of ${item.name}`);

    return arr.join(" and ");
  }

  async function findRecipe(foodItems) {
    const prompt = `Find a recipe that includes ${formatString(
      foodItems
    )}. Invent a nice name for this recipe and write it first. List down the ingredients and steps.`;

    const response = await cohere.generate({
      model: "command-xlarge-nightly",
      prompt: prompt,
      max_tokens: 450,
      temperature: 1.5,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: [],
      return_likelihoods: "NONE",
    });
    console.log(chalk.green.bold("\n" + "Here's your recipe!"));
    console.log(`${response.body.generations[0].text}`);
  }

  return {
    findRecipe,
  };
}

let cohereAI = cohereClient();
export default cohereAI;
