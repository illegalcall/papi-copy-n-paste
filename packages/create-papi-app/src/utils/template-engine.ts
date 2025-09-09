import fs from "fs-extra";
import path from "path";
import type { CreateOptions, TemplateVariables } from "../types.js";
import { getChainConfig } from "./chains.js";
import { getTemplateConfig } from "./templates.js";

export class TemplateEngine {
  private variables: TemplateVariables;
  private templatePath: string;
  private targetPath: string;
  private options: CreateOptions;

  constructor(options: CreateOptions) {
    this.options = options;
    this.targetPath = options.targetPath;
    // Get the directory of this file and navigate to templates
    const __filename = import.meta.url.replace("file://", "");
    const __dirname = path.dirname(__filename);

    // From dist/utils, go up to package root, then to templates
    this.templatePath = path.resolve(
      __dirname,
      "../../templates",
      options.template,
    );

    const chainConfig = getChainConfig(options.chain);

    this.variables = {
      projectName: options.projectName,
      chainName: chainConfig.name,
      chainDisplayName: chainConfig.displayName,
      chainSpecImport: chainConfig.chainSpecImport,
      descriptorName: chainConfig.descriptorName,
      descriptorImport: `@polkadot-api/descriptors`,
      includeChopsticks: options.includeChopsticks,
      includeExamples: options.includeExamples,
      packageManager: options.packageManager,
      wsUrls: chainConfig.wsUrls,
    };
  }

  async generateProject(): Promise<void> {
    // Create target directory
    await fs.ensureDir(this.targetPath);

    // Copy template files
    await this.copyTemplateFiles();

    // Generate package.json
    await this.generatePackageJson();

    // Generate PAPI configuration
    await this.generatePapiConfig();

    // Process template variables in files
    await this.processTemplateFiles();
  }

  private async copyTemplateFiles(): Promise<void> {
    if (!(await fs.pathExists(this.templatePath))) {
      throw new Error(`Template not found: ${this.templatePath}`);
    }

    await fs.copy(this.templatePath, this.targetPath, {
      filter: (src) => {
        // Skip package.json and .papi/polkadot-api.json as we'll generate these
        const relativePath = path.relative(this.templatePath, src);
        return (
          relativePath !== "package.json" &&
          relativePath !== ".papi/polkadot-api.json" &&
          !relativePath.includes("node_modules")
        );
      },
    });
  }

  private async generatePackageJson(): Promise<void> {
    const templateConfig = getTemplateConfig(this.options.template);

    const packageJson = {
      name: this.variables.projectName,
      version: "0.0.1",
      type: "module",
      private: true,
      scripts: {
        ...templateConfig.scripts,
      },
      dependencies: {
        ...templateConfig.dependencies,
      },
      devDependencies: {
        ...templateConfig.devDependencies,
      },
    };

    // Add chopsticks dependencies if enabled
    if (this.variables.includeChopsticks) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        "@acala-network/chopsticks": "^1.0.2",
      };

      packageJson.scripts = {
        ...packageJson.scripts,
        "dev-local": "VITE_WITH_CHOPSTICKS=true vite", // For vite-react template
      };
    }

    await fs.writeJSON(
      path.join(this.targetPath, "package.json"),
      packageJson,
      { spaces: 2 },
    );
  }

  private async generatePapiConfig(): Promise<void> {
    const papiDir = path.join(this.targetPath, ".papi");
    await fs.ensureDir(papiDir);

    const papiConfig = {
      version: 0,
      descriptorPath: ".papi/descriptors",
      entries: {
        [this.variables.descriptorName]: {
          chain: this.variables.chainName,
          metadata: `.papi/metadata/${this.variables.chainName}.scale`,
        },
      },
    };

    await fs.writeJSON(path.join(papiDir, "polkadot-api.json"), papiConfig, {
      spaces: 2,
    });
  }

  private async processTemplateFiles(): Promise<void> {
    await this.walkDirectory(this.targetPath);
  }

  private async walkDirectory(dir: string): Promise<void> {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        // Skip node_modules and .git
        if (["node_modules", ".git"].includes(item.name)) continue;
        await this.walkDirectory(fullPath);
      } else if (item.isFile()) {
        await this.processFile(fullPath);
      }
    }
  }

  private async processFile(filePath: string): Promise<void> {
    // Only process text files
    const textExtensions = [
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".json",
      ".md",
      ".txt",
      ".html",
      ".css",
      ".scss",
    ];
    const ext = path.extname(filePath);

    if (!textExtensions.includes(ext)) return;

    try {
      let content = await fs.readFile(filePath, "utf-8");
      content = this.replaceVariables(content);
      await fs.writeFile(filePath, content);
    } catch (error) {
      // Skip binary files or files that can't be processed
      console.warn(`Warning: Could not process file ${filePath}`);
    }
  }

  private replaceVariables(content: string): string {
    let result = content;

    // Replace all template variables
    Object.entries(this.variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");

      // Handle arrays specially (e.g., wsUrls)
      if (Array.isArray(value)) {
        result = result.replace(regex, JSON.stringify(value));
      } else {
        result = result.replace(regex, String(value));
      }
    });

    // Handle conditional blocks
    result = this.processConditionalBlocks(result);

    return result;
  }

  private processConditionalBlocks(content: string): string {
    let result = content;

    // Process includeChopsticks conditional blocks
    const chopsticksPattern =
      /{{#includeChopsticks}}([\s\S]*?){{\/includeChopsticks}}/g;
    result = result.replace(chopsticksPattern, (match, block) => {
      return this.variables.includeChopsticks ? block : "";
    });

    // Process includeExamples conditional blocks
    const examplesPattern =
      /{{#includeExamples}}([\s\S]*?){{\/includeExamples}}/g;
    result = result.replace(examplesPattern, (match, block) => {
      return this.variables.includeExamples ? block : "";
    });

    // Process wsUrls array - use first URL by default
    const wsUrlsPattern = /{{#wsUrls}}([\s\S]*?){{\/wsUrls}}/g;
    result = result.replace(wsUrlsPattern, (match, block) => {
      // Use the first URL in the array
      return block.replace(/{{url}}/g, this.variables.wsUrls[0] || "");
    });

    // Also handle simple {{wsUrl}} placeholder for single URL
    result = result.replace(/{{wsUrl}}/g, this.variables.wsUrls[0] || "");

    return result;
  }
}
