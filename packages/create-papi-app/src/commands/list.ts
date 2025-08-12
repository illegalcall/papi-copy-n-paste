import chalk from "chalk";
import { getTemplateList } from "../utils/templates.js";

export async function listCommand(): Promise<void> {
  console.log(chalk.bold("\n📦 Available Templates:\n"));

  const templates = getTemplateList();

  templates.forEach((template) => {
    const name = chalk.cyan(template.name.padEnd(12));
    const description = chalk.gray(template.description);
    const type = chalk.yellow(`[${template.type}]`.padEnd(8));

    console.log(`  ${name} ${type} ${description}`);

    if (template.features.length > 0) {
      const features = template.features
        .map((f) => chalk.green(`• ${f}`))
        .join(" ");
      console.log(`  ${" ".repeat(21)} ${features}`);
    }
    console.log();
  });

  console.log(
    chalk.dim("Usage: npx create-papi-app my-app --template <template-name>\n"),
  );
}
