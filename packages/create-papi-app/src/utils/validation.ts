import validateNpmPackageName from 'validate-npm-package-name'
import { existsSync } from 'fs'
import path from 'path'
import type { TemplateType, ChainType, PackageManager } from '../types.js'

export function validateProjectName(name: string): { valid: boolean; message?: string } {
  if (!name || name.length === 0) {
    return { valid: false, message: 'Project name is required' }
  }

  const validation = validateNpmPackageName(name)
  
  if (!validation.validForNewPackages) {
    const errors = validation.errors || []
    const warnings = validation.warnings || []
    return { 
      valid: false, 
      message: `Invalid project name: ${[...errors, ...warnings].join(', ')}` 
    }
  }

  return { valid: true }
}

export function validatePath(targetPath: string, projectName?: string): { valid: boolean; message?: string } {
  const fullPath = path.resolve(targetPath)
  
  if (existsSync(fullPath)) {
    // If it's current directory (.) and it's empty, that's ok
    if (targetPath === '.' && isDirectoryEmpty(fullPath)) {
      return { valid: true }
    }
    
    // If it's a project directory and it exists, that's not ok
    if (projectName && path.basename(fullPath) === projectName) {
      return { valid: false, message: `Directory ${projectName} already exists` }
    }
  }

  return { valid: true }
}

export function isDirectoryEmpty(dirPath: string): boolean {
  if (!existsSync(dirPath)) return true
  
  try {
    const fs = require('fs')
    const files = fs.readdirSync(dirPath)
    return files.length === 0
  } catch {
    return true
  }
}

export function validateTemplate(template: string): template is TemplateType {
  const validTemplates: TemplateType[] = ['minimal', 'vite-react', 'next-app', 'node-cli']
  return validTemplates.includes(template as TemplateType)
}

export function validateChain(chain: string): chain is ChainType {
  const validChains: ChainType[] = ['polkadot', 'kusama', 'westend', 'paseo']
  return validChains.includes(chain as ChainType)
}

export function validatePackageManager(pm: string): pm is PackageManager {
  const validPms: PackageManager[] = ['npm', 'pnpm', 'yarn']
  return validPms.includes(pm as PackageManager)
}

export function detectPackageManager(): PackageManager {
  // Check for lock files
  if (existsSync('pnpm-lock.yaml')) return 'pnpm'
  if (existsSync('yarn.lock')) return 'yarn'
  if (existsSync('package-lock.json')) return 'npm'
  
  // Check for package manager in environment
  const userAgent = process.env.npm_config_user_agent
  if (userAgent) {
    if (userAgent.startsWith('pnpm')) return 'pnpm'
    if (userAgent.startsWith('yarn')) return 'yarn'
  }
  
  return 'npm'
}