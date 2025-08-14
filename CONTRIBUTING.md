# Contributing to PAPI Copy-n-Paste

Thank you for your interest in contributing to PAPI Copy-n-Paste! This document provides guidelines and information for contributors to help maintain code quality and project consistency.

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended package manager)
- Git
- Basic knowledge of TypeScript, React, and Next.js
- Familiarity with PAPI (Polkadot API) is helpful but not required

### Development Setup
1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/papi-copy-paste.git
   cd papi-copy-paste
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Start the development server**:
   ```bash
   pnpm dev
   ```
5. **Open** [http://localhost:3000](http://localhost:3000) to see the application

### Project Structure
```
papi-copy-paste/
├── apps/
│   └── web/                 # Main Next.js application
│       ├── app/             # App Router pages and layouts
│       ├── components/      # React components
│       │   ├── forms/       # Form components
│       │   ├── layout/      # Layout components
│       │   └── learning/    # Educational components
│       ├── hooks/           # Custom React hooks
│       └── utils/           # Utility functions
├── packages/
│   ├── core/                # Core PAPI functionality
│   ├── ui/                  # Shared UI components (shadcn/ui)
│   ├── learning-engine/     # Educational features
│   └── create-papi-app/     # CLI scaffolding tool (published separately)
└── turbo.json               # Turbo monorepo configuration
```

## 🎯 How to Contribute

### Types of Contributions
- **Bug fixes**: Fix existing issues or edge cases
- **New features**: Add new blockchain support, UI improvements, or learning features
- **Documentation**: Improve README, code comments, or create tutorials
- **Performance**: Optimize code generation, UI responsiveness, or build times
- **Testing**: Add or improve unit, integration, or E2E tests
- **Accessibility**: Improve keyboard navigation, screen reader support, or mobile experience

### Finding Work
1. **Browse issues** labeled `good-first-issue` for newcomers
2. **Check discussions** for feature requests and ideas
3. **Look for TODO comments** in the codebase
4. **Test the application** and report bugs or UX improvements

## 📋 Contribution Process

### 1. Planning
- **Check existing issues** to avoid duplicate work
- **Open an issue** to discuss significant changes before implementation
- **Ask questions** in discussions if you need guidance or clarification

### 2. Development
- **Create a feature branch** from `main`:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- **Make focused commits** with clear commit messages
- **Follow the coding standards** outlined below
- **Add tests** for new functionality
- **Update documentation** as needed

### 3. Testing
- **Run all tests** before submitting:
  ```bash
  pnpm test
  pnpm build  # Ensure the build succeeds
  pnpm lint   # Check for linting errors
  ```
- **Test manually** in the browser
- **Test on different screen sizes** for responsive design
- **Test with different chains** if your changes affect blockchain interactions

### 4. Submitting
- **Push your branch** to your fork
- **Open a pull request** with:
  - Clear title describing the change
  - Detailed description of what was changed and why
  - Screenshots for UI changes
  - Reference to related issues
- **Respond to feedback** and make requested changes
- **Ensure CI passes** before requesting final review

## 🎨 Coding Standards

### TypeScript Guidelines
- **Use TypeScript** for all new code
- **Define proper types** rather than using `any`
- **Use interfaces** for object shapes and props
- **Prefer type imports** when importing types:
  ```typescript
  import type { ComponentProps } from 'react'
  ```

### React Patterns
- **Use functional components** with hooks
- **Follow the custom hooks pattern** for reusable logic
- **Use proper prop types** with TypeScript interfaces
- **Implement proper error boundaries** for robustness
- **Use React.memo** for performance when appropriate

### Component Organization
- **Keep components focused** on a single responsibility
- **Extract reusable logic** into custom hooks
- **Use the established folder structure**:
  ```
  components/
  ├── forms/         # Form-related components
  ├── layout/        # Layout and navigation
  ├── learning/      # Educational features
  └── ui/            # Reusable UI components
  ```

### Naming Conventions
- **Components**: PascalCase (`TransactionForm`, `ChainSelector`)
- **Files**: kebab-case for components (`transaction-form.tsx`)
- **Hooks**: camelCase starting with `use` (`useChainConnection`)
- **Utilities**: camelCase (`generateCodeSnippet`)
- **Types**: PascalCase (`ChainConfig`, `PalletCall`)

### Code Style
- **Use Prettier** for consistent formatting (run `pnpm format`)
- **Follow ESLint rules** (run `pnpm lint`)
- **Add meaningful comments** for complex logic
- **Use descriptive variable names**
- **Keep functions focused** and reasonably sized

### Import Organization
```typescript
// 1. React and external libraries
import React, { useState, useEffect } from 'react'
import { Button } from '@workspace/ui/components/button'

// 2. Internal utilities and hooks
import { useChainConnection } from '../hooks/useChainConnection'
import { generateCodeSnippet } from '../utils/codeGenerators'

// 3. Types
import type { ChainConfig, PalletCall } from '@workspace/core'
```

## 🧪 Testing Guidelines

### Testing Strategy
- **Unit tests**: Test individual functions and hooks
- **Integration tests**: Test component interactions
- **E2E tests**: Test complete user workflows
- **Mock external dependencies** for reliable testing

### Writing Tests
- **Use descriptive test names** that explain what is being tested
- **Follow the AAA pattern**: Arrange, Act, Assert
- **Test both happy paths and edge cases**
- **Mock blockchain connections** and external APIs
- **Test accessibility** with screen readers and keyboard navigation

### Test Files
- **Co-locate tests** with the code they test
- **Use `.test.ts` or `.test.tsx`** extension
- **Name test files** to match the component/function being tested

## 🏗️ Architecture Guidelines

### Adding New Chains
1. **Update `packages/core/src/networks.ts`** with chain configuration
2. **Add RPC providers** and websocket URLs
3. **Update code generation functions** to include setup commands
4. **Test transaction and storage query generation**
5. **Update documentation** with the new chain

### Adding New Components
1. **Follow the existing component patterns**
2. **Use TypeScript interfaces** for props
3. **Implement responsive design** with Tailwind CSS
4. **Add proper accessibility attributes**
5. **Include JSDoc comments** for complex components

### Educational Features
1. **Use the learning-engine package** for educational functionality
2. **Follow the established learning patterns**
3. **Add parameter explanations** to the parameter education system
4. **Create appropriate difficulty levels**
5. **Include safe testing options** in the mock simulator

## 🎓 Learning and Educational Contributions

### Parameter Education
- **Add explanations** for new PAPI parameters
- **Include real-world examples** and common use cases
- **Explain potential pitfalls** and common mistakes
- **Use clear, beginner-friendly language**

### Code Templates
- **Maintain consistency** across different template levels
- **Include appropriate comments** for each complexity level
- **Ensure all templates are functional** and follow best practices
- **Test templates** with real blockchain interactions

### Mock Simulator
- **Add realistic mock data** for new features
- **Provide educational feedback** for user actions
- **Include validation** with helpful error messages
- **Guide users** toward real testing when appropriate

## 🚨 Security Guidelines

### Code Security
- **Never commit secrets** or private keys
- **Validate all user inputs** and parameters
- **Use secure random generation** for sensitive operations
- **Implement proper error handling** without exposing internal details

### Blockchain Security
- **Include warnings** for potentially dangerous operations
- **Validate transaction parameters** thoroughly
- **Provide clear explanations** of transaction consequences
- **Use testnet examples** in documentation

## 📚 Documentation Standards

### Code Documentation
- **Add JSDoc comments** for exported functions and complex logic
- **Explain the "why"** not just the "what"
- **Include parameter and return type descriptions**
- **Add usage examples** for utilities and hooks

### User Documentation
- **Use clear, concise language**
- **Include step-by-step instructions**
- **Add screenshots** for UI changes
- **Provide troubleshooting guidance**

### Changelog
- **Follow semantic versioning** principles
- **Document breaking changes** clearly
- **Include migration guides** when necessary
- **Credit contributors** for their work

## 🤝 Community Guidelines

### Communication
- **Be respectful** and constructive in all interactions
- **Ask questions** if you're unsure about anything
- **Share knowledge** and help other contributors
- **Be patient** with code review feedback

### Code Reviews
- **Review code thoroughly** but constructively
- **Focus on code quality** and maintainability
- **Suggest improvements** rather than just pointing out problems
- **Appreciate good contributions** and thank contributors

### Issue Reporting
- **Use issue templates** when available
- **Provide reproduction steps** for bugs
- **Include environment details** (browser, OS, Node version)
- **Search existing issues** before creating new ones

## ⚡ Performance Considerations

### Frontend Performance
- **Optimize bundle size** by avoiding unnecessary imports
- **Use React.memo** for expensive components
- **Implement proper loading states** for async operations
- **Optimize images** and static assets

### Code Generation
- **Cache template generation** when possible
- **Optimize regex patterns** for parameter parsing
- **Use efficient string concatenation** methods
- **Profile performance** for large metadata operations

## 🐛 Debugging and Troubleshooting

### Common Issues
- **PAPI connection failures**: Check websocket URLs and network connectivity
- **TypeScript errors**: Ensure proper type definitions and imports
- **Build failures**: Verify all dependencies are installed correctly
- **Test failures**: Check for proper mocking of external dependencies

### Development Tools
- **React DevTools**: Debug component state and props
- **Browser DevTools**: Network requests, console logs, performance
- **TypeScript compiler**: Type checking and error reporting
- **ESLint**: Code quality and style issues

## 📋 Pull Request Template

When submitting a pull request, please include:

```markdown
## Description
Brief description of what this PR does and why

## Changes Made
- List of specific changes
- Files modified
- New features or fixes

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Build passes
- [ ] Linting passes

## Screenshots (if applicable)
Include screenshots for UI changes

## Related Issues
Closes #[issue-number]
Related to #[issue-number]

## Additional Notes
Any additional context or considerations
```

## 🎉 Recognition

### Contributors
All contributors will be:
- **Listed in the README.md** acknowledgments section
- **Credited in release notes** for their contributions
- **Mentioned in commit messages** when merging PRs
- **Appreciated in discussions** and community interactions

### Maintainer Path
Regular contributors who demonstrate:
- **Consistent quality contributions**
- **Good understanding of the codebase**
- **Helpful community interactions**
- **Interest in project maintenance**

May be invited to become project maintainers with additional privileges and responsibilities.

---

Thank you for contributing to PAPI Copy-n-Paste! Your contributions help make blockchain development more accessible to everyone. 🚀