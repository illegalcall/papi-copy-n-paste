import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import { exec } from 'child_process'
import { promisify } from 'util'
import type { CommandOptions, CreateOptions, TemplateType, ChainType } from '../types.js'
import { validateProjectName, validatePath, detectPackageManager } from '../utils/validation.js'
import { getTemplateList } from '../utils/templates.js'
import { getChainList } from '../utils/chains.js'
import { TemplateEngine } from '../utils/template-engine.js'

const execAsync = promisify(exec)

export async function createCommand(
  projectDirectory: string | undefined,
  options: CommandOptions
): Promise<void> {
  console.log(chalk.cyan.bold('\n🚀 Create PAPI App\n'))
  
  try {
    // Gather project options
    const createOptions = await gatherOptions(projectDirectory, options)
    
    // Validate options
    await validateOptions(createOptions)
    
    // Create project
    await createProject(createOptions)
    
    // Success message
    showSuccessMessage(createOptions)
    
  } catch (error) {
    console.error(chalk.red('\n❌ Failed to create project:'))
    console.error(chalk.red((error as Error).message))
    process.exit(1)
  }
}

async function gatherOptions(
  projectDirectory: string | undefined,
  options: CommandOptions
): Promise<CreateOptions> {
  let projectName = projectDirectory
  
  // If no project directory provided, ask for it
  if (!projectName && !options.yes) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      initial: 'my-papi-app',
      validate: (value) => {
        const validation = validateProjectName(value)
        return validation.valid ? true : validation.message!
      }
    })
    
    if (!response.projectName) {
      console.log(chalk.yellow('Operation cancelled'))
      process.exit(0)
    }
    
    projectName = response.projectName
  }
  
  // Use current directory if '.'
  if (projectName === '.') {
    projectName = path.basename(process.cwd())
  }
  
  if (!projectName) {
    throw new Error('Project name is required')
  }

  const targetPath = projectDirectory === '.' 
    ? process.cwd()
    : path.resolve(projectName)

  // Interactive prompts if not in --yes mode
  if (!options.yes) {
    const responses = await prompts([
      {
        type: 'select',
        name: 'template',
        message: 'Select a template:',
        choices: getTemplateList().map(t => ({
          title: `${t.name} - ${t.description}`,
          value: t.name,
          description: `[${t.type}] ${t.features.join(', ')}`
        })),
        initial: 1 // Default to vite-react
      },
      {
        type: 'select', 
        name: 'chain',
        message: 'Select target blockchain:',
        choices: getChainList().map(c => ({
          title: `${c.displayName} - ${c.description}`,
          value: c.name
        })),
        initial: 0 // Default to polkadot
      },
      {
        type: 'confirm',
        name: 'includeChopsticks',
        message: 'Include Chopsticks local development setup?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'includeExamples', 
        message: 'Include example code?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'git',
        message: 'Initialize git repository?',
        initial: true
      }
    ])

    // Update options with responses
    Object.assign(options, responses)
  }

  return {
    projectName,
    template: (options.template || 'vite-react') as TemplateType,
    targetPath,
    chain: (options.chain || 'polkadot') as ChainType,
    includeChopsticks: options.chopsticks ?? true,
    includeExamples: options.examples ?? true,
    packageManager: options.packageManager || detectPackageManager(),
    git: options.git ?? true,
    interactive: !options.yes
  }
}

async function validateOptions(options: CreateOptions): Promise<void> {
  // Validate project name
  const nameValidation = validateProjectName(options.projectName)
  if (!nameValidation.valid) {
    throw new Error(nameValidation.message)
  }

  // Validate target path
  const pathValidation = validatePath(options.targetPath, options.projectName)
  if (!pathValidation.valid) {
    throw new Error(pathValidation.message)
  }
}

async function createProject(options: CreateOptions): Promise<void> {
  const spinner = ora('Creating project...').start()
  
  try {
    // Generate project from template
    spinner.text = 'Generating project files...'
    const templateEngine = new TemplateEngine(options)
    await templateEngine.generateProject()
    
    // Initialize git if requested
    if (options.git) {
      spinner.text = 'Initializing git repository...'
      await initializeGit(options.targetPath)
    }
    
    // Install dependencies
    spinner.text = 'Installing dependencies...'
    await installDependencies(options)
    
    spinner.succeed(chalk.green('Project created successfully!'))
    
  } catch (error) {
    spinner.fail('Failed to create project')
    throw error
  }
}

async function initializeGit(targetPath: string): Promise<void> {
  try {
    await execAsync('git init', { cwd: targetPath })
    
    // Create .gitignore if it doesn't exist
    const { default: fs } = await import('fs-extra')
    const gitignorePath = path.join(targetPath, '.gitignore')
    
    if (!(await fs.pathExists(gitignorePath))) {
      const gitignoreContent = `
# Dependencies
node_modules/
.pnpm/
.npm/
.yarn/

# Build outputs
dist/
build/
.next/
.vite/

# Environment
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# PAPI generated files
.papi/metadata/
.papi/descriptors/
`.trim()
      
      await fs.writeFile(gitignorePath, gitignoreContent)
    }
    
    await execAsync('git add .', { cwd: targetPath })
    await execAsync('git commit -m "Initial commit"', { cwd: targetPath })
    
  } catch (error) {
    // Git initialization is not critical, just warn
    console.warn(chalk.yellow('⚠️  Could not initialize git repository'))
  }
}

async function installDependencies(options: CreateOptions): Promise<void> {
  const installCommand = getInstallCommand(options.packageManager)
  
  try {
    await execAsync(installCommand, { 
      cwd: options.targetPath,
      // Increase timeout for dependency installation
      timeout: 300000 // 5 minutes
    })
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not install dependencies automatically'))
    console.log(chalk.dim(`Please run: cd ${options.projectName} && ${installCommand}`))
  }
}

function getInstallCommand(packageManager: string): string {
  switch (packageManager) {
    case 'yarn':
      return 'yarn install'
    case 'pnpm':
      return 'pnpm install'
    default:
      return 'npm install'
  }
}

function showSuccessMessage(options: CreateOptions): void {
  const { projectName, packageManager } = options
  const isCurrentDir = options.targetPath === process.cwd()
  
  console.log(chalk.green.bold('\n🎉 Success!'), `Created ${projectName} at ${options.targetPath}`)
  
  console.log('\nInside that directory, you can run several commands:\n')
  
  console.log(chalk.cyan(`  ${packageManager} dev`))
  console.log('    Starts the development server\n')
  
  if (options.includeChopsticks && options.template === 'vite-react') {
    console.log(chalk.cyan(`  ${packageManager} run dev-local`))
    console.log('    Starts development server with Chopsticks\n')
  }
  
  console.log(chalk.cyan(`  ${packageManager} build`))
  console.log('    Builds the app for production\n')
  
  console.log('We suggest that you begin by typing:\n')
  
  if (!isCurrentDir) {
    console.log(chalk.cyan(`  cd ${projectName}`))
  }
  console.log(chalk.cyan(`  ${packageManager} dev\n`))
  
  console.log('Happy coding! 🚀\n')
}