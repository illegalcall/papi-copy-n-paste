#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { createCommand } from "./commands/create.js";
import { listCommand } from "./commands/list.js";

const program = new Command();

program
  .name("create-papi-app")
  .description("Create Polkadot API applications with zero configuration")
  .version("1.0.0")
  .configureOutput({
    outputError: (str, write) => write(chalk.red(str)),
  });

// Main create command
program
  .argument("[project-directory]", "directory for the project")
  .option(
    "-t, --template <template>",
    "template to use (minimal, vite-react, next-app, node-cli)",
  )
  .option(
    "-c, --chain <chain>",
    "blockchain to connect to (polkadot, kusama, westend, paseo)",
  )
  .option("--chopsticks", "include Chopsticks local development setup")
  .option("--no-chopsticks", "exclude Chopsticks setup")
  .option("--examples", "include example code")
  .option("--no-examples", "exclude example code")
  .option("--git", "initialize git repository")
  .option("--no-git", "skip git initialization")
  .option(
    "-p, --package-manager <pm>",
    "package manager to use (npm, pnpm, yarn)",
  )
  .option("-y, --yes", "skip interactive prompts and use defaults")
  .option("-l, --list", "list available templates")
  .action(async (projectDirectory, options) => {
    if (options.list) {
      await listCommand();
      return;
    }

    await createCommand(projectDirectory, options);
  });

// List templates command
program
  .command("list")
  .alias("ls")
  .description("list available templates")
  .action(listCommand);

// Error handling
program.exitOverride();

process.on("SIGINT", () => {
  console.log(chalk.yellow("\n✋ Operation cancelled"));
  process.exit(0);
});

process.on("uncaughtException", (err) => {
  console.error(chalk.red("❌ Unexpected error:"), err.message);
  process.exit(1);
});

program.parse();
