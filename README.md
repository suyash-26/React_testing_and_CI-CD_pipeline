# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


* Concepts → Flow → Commands → Scenarios → Mistakes → Interview prep

---

# 🚀 CI/CD + Git Workflow (Complete Notion Notes)

---

# 🧠 1. What is CI/CD (Real Understanding)

## 🔁 CI (Continuous Integration)

👉 Automated validation of code on every change

### Includes:

* Install dependencies
* Lint (code quality)
* Run tests
* Build project

---

## 🚀 CD (Continuous Deployment / Delivery)

👉 Automated deployment after CI passes

* Delivery → manual deploy
* Deployment → automatic deploy

---

## 🔥 Core Idea

```text
Push → Validate (CI) → Merge → Deploy (CD)
```

---

# 🧱 2. Your Current Setup (What you built)

```text
Feature Branch (b1)
   ↓
Push
   ↓
Pull Request
   ↓
CI runs (GitHub Actions)
   ↓
Merge to main
   ↓
CI runs again
   ↓
Netlify deploys 🚀
```

---

# ⚙️ 3. GitHub Actions CI Pipeline

## 📄 File location

```text
.github/workflows/ci.yml
```

---

## 🧾 Basic Pipeline

```yaml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 20

      - run: npm install
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

---

## 🧠 What each step does

| Step        | Purpose             |
| ----------- | ------------------- |
| checkout    | get your code       |
| setup-node  | install Node        |
| npm install | install deps        |
| lint        | code quality        |
| test        | correctness         |
| build       | ensure app compiles |

---

# 🔁 4. CI Trigger Rules (IMPORTANT)

## Based on:

```yaml
on:
  push:
    branches: [main]
  pull_request:
```

---

## Behavior:

| Action          | CI Runs? |
| --------------- | -------- |
| Push to main    | ✅        |
| Push to feature | ❌        |
| Create PR       | ✅        |
| Update PR       | ✅        |
| Merge to main   | ✅        |

---

# 🌿 5. Git Workflow (REAL FLOW)

---

## Step 1: Create branch

```bash
git checkout -b feature/login-fix
```

---

## Step 2: Make changes

---

## Step 3: Push branch

```bash
git push origin feature/login-fix
```

---

## Step 4: Create PR (GitHub UI)

```text
feature → main
```

---

## Step 5: CI runs

* If ❌ fails → fix
* If ✅ passes → merge allowed

---

## Step 6: Merge PR

```text
Merge pull request
```

---

## Step 7: Deployment

```text
Merge → main → Netlify deploy
```

---

# 🔀 6. Merge vs Rebase

---

## 🔵 Merge

```bash
git merge b1
```

### Result:

* Creates merge commit
* Safe
* Used in PR

---

## 🟢 Rebase

```bash
git rebase origin/main
```

### Result:

* Clean history
* No merge commits

---

## 🧠 Rule

```text
Rebase → update branch
Merge → combine branches
```

---

# 🔄 7. Updating Feature Branch

---

## ✅ Recommended

```bash
git fetch origin
git rebase origin/main
git push --force
```

---

## ❌ Not recommended

```bash
git pull origin main
```

👉 Creates messy merge commits

---

# 🔒 8. Branch Protection Rules

---

## Why needed?

👉 CI alone doesn’t block merge

---

## Enable:

* Require status checks
* Select CI job

---

## Result:

| CI Status | Merge   |
| --------- | ------- |
| ❌ Fail    | Blocked |
| ✅ Pass    | Allowed |

---

# 🚨 9. Common CI Failures (You Faced These)

---

## 1. Lint errors

```text
unused variables
```

### Fix:

* remove variable
* or use properly

---

## 2. Fast Refresh error

```text
only export components
```

### Fix:

* separate utils into different file

---

## 3. Node version mismatch

```text
styleText not found
```

### Fix:

```yaml
node-version: 20
```

---

# 🌍 10. Environment Consistency

---

## Problem:

```text
Works locally ❌ fails in CI
```

---

## Solution:

* Same Node version
* Use `.nvmrc`
* Validate env variables

---

# 🧪 11. CI Responsibilities

---

## CI should:

* Catch errors early
* Prevent bad merges
* Maintain quality

---

## CI should NOT:

* Be bypassed blindly
* Be disabled for convenience

---

# 🧠 12. Key Concepts Summary

---

## CI triggers on:

```text
Events (push, PR)
+ branch filters
```

---

## PR purpose:

```text
Validate BEFORE merge
```

---

## Merge purpose:

```text
Move validated code to main
```

---

## Deployment:

```text
Triggered from main branch
```

---

# 🎯 13. Interview Questions + Answers

---

## ❓ What is CI/CD?

👉
CI validates code changes automatically, while CD ensures validated code is deployed reliably.

---

## ❓ Why CI before merge?

👉
Prevents broken code from entering main branch.

---

## ❓ Merge vs Rebase?

👉
Merge preserves history, rebase creates a clean linear history.

---

## ❓ Why CI runs again after merge?

👉
To validate final merged state and trigger deployment.

---

## ❓ Why builds fail in CI but not locally?

👉
Environment mismatch (Node version, env variables, dependencies)

---

# 🚀 14. Final Mental Model

```text
Developer →
Feature Branch →
PR →
CI validation →
Merge →
CI again →
Deploy →
Monitor
```


