# Cursor Project Rules Project

This directory contains Cursor project rules that provide AI assistance with consistent coding standards and best practices.

## Rule Structure

### 1. typescript-style.mdc

- **Scope**: Auto-applied to TypeScript files (`**/*.ts`, `**/*.tsx`)
- **Purpose**: TypeScript standards, import organization, naming conventions
- **Key Info**: Strict TypeScript, import sorting, naming conventions

### 2. react-components.mdc

- **Scope**: Auto-applied to React components (`src/components/**/*.tsx`, `src/app/**/*.tsx`)
- **Purpose**: React component architecture and styling standards
- **Key Info**: Functional components, Tailwind styling, performance optimization

### 3. api-backend.mdc

- **Scope**: Auto-applied to API and backend files (`src/app/api/**/*.ts`, `src/classes/**/*.ts`, `src/actions/**/*.ts`)
- **Purpose**: API routes, database operations, error handling
- **Key Info**: Next.js API routes, Drizzle ORM, Zod validation

### 4. state-management.mdc

- **Scope**: Auto-applied to state management files (`src/store/**/*.ts`, `src/hooks/**/*.ts`)
- **Purpose**: Zustand stores and React hooks standards
- **Key Info**: Zustand patterns, custom hooks, state management

### 5. file-naming-imports.mdc

- **Scope**: Available for manual application
- **Purpose**: File naming conventions and import path standards
- **Key Info**: Kebab-case naming, import aliases, path organization

## Usage

These rules are automatically applied based on file patterns when working in Cursor. The AI will use the appropriate rules based on the files you're working with.

## Rule Types

- **Always Apply**: Applied to all files (project-overview)
- **Auto Attached**: Applied based on file patterns (most rules)
- **Manual**: Available for explicit application (file-naming-imports, code-review-checklist)
