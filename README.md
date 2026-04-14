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


now we move from **“basic CI” → real-world CI/CD system** 🚀
This is where most people stop, and where you start standing out.

---

# 🧠 What we’re building now

Right now your system is:

```text
PR → CI → Merge → Deploy to production
```

👉 Problem:

* Every merge = production deploy ❌
* Risky

---

# 🎯 Goal (Next Level CI/CD)

```text
Feature → PR → CI →
   ↓
Merge to develop → Deploy to STAGING
   ↓
Verify
   ↓
Merge to main → Deploy to PRODUCTION
```

---

# 🧱 Step 1: Introduce `develop` branch

---

## 🔧 Create it

```bash
git checkout main
git pull origin main
git checkout -b develop
git push origin develop
```

---

## 🧠 Now your branches:

```text
main → production
develop → staging
feature/* → development
```

---

# ⚙️ Step 2: Update CI trigger (important)

Modify your workflow:

```yaml
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]
```

---

## 🧠 What this does:

| Action         | Result  |
| -------------- | ------- |
| PR → develop   | CI runs |
| PR → main      | CI runs |
| Push → develop | CI runs |
| Push → main    | CI runs |

---

# 🌍 Step 3: Setup Netlify environments

You’ll create **2 sites**:

---

## 🟡 1. Staging Site

* Connect to GitHub repo
* Branch: `develop`

👉 Deploys automatically when:

```text
code merges into develop
```

---

## 🟢 2. Production Site

* Same repo
* Branch: `main`

👉 Deploys when:

```text
code merges into main
```

---

# 🔥 Final deployment flow

```text
feature → PR → develop
   ↓
CI passes
   ↓
Merge → develop
   ↓
Netlify STAGING deploy 🚀
   ↓
Test manually
   ↓
PR → main
   ↓
CI passes
   ↓
Merge → main
   ↓
Netlify PRODUCTION deploy 🚀
```

---

# 🧠 Why this is powerful

---

## Before:

```text
Bug → merged → users affected
```

---

## Now:

```text
Bug → caught in staging → users safe
```

---

# 🧪 Step 4: Your new workflow (what YOU do)

---

## 🔁 Feature development

```bash
git checkout develop
git pull origin develop
git checkout -b feature/login-fix
```

---

## 📤 Push

```bash
git push origin feature/login-fix
```

---

## 🔀 PR → develop

👉 CI runs
👉 Merge after success

---

## 🧪 Test on staging

👉 Open staging URL (Netlify)

---

## 🔀 PR → main

👉 After verification

---

## 🚀 Production deploy

---

# 🔒 Step 5: Branch protection (important)

---

## Protect BOTH:

### main:

* Require CI ✅
* Require PR ✅

### develop:

* Require CI ✅

---

# 🧠 Mental model upgrade

---

## OLD:

```text
CI = testing
```

---

## NEW:

```text
CI = validation gate
CD = controlled release system
```

---

# 🚨 Common mistakes (don’t do these)

---

## ❌ Direct push to main

---

## ❌ Skipping staging

---

## ❌ Same env for staging & prod

---

## ❌ Not testing staging




# 🚀 Different Ways to Create CI Pipelines (Industry-Level Understanding)

---

# 🧠 1. Core Idea of CI Pipeline

```text
Code change → Trigger → Pipeline runs → Validate → (Optional) Deploy
```

👉 CI is not a tool, it’s a **process of automation**

---

# 🧱 2. Where CI Pipeline Can Exist

```text
CI can be:
1. Inside repository (config files)
2. Outside repository (external systems)
3. Inside deployment platforms
```

---

# ⚙️ 3. Type 1: Repository-Based CI (Config in Code)

---

## 🟢 Concept

Pipeline is defined **inside the repository**

---

## 📄 Example Config Files

* `.github/workflows/*.yml` → GitHub Actions
* `.gitlab-ci.yml` → GitLab CI/CD
* `azure-pipelines.yml` → Azure DevOps

---

## 🔁 Flow

```text
Push / PR →
Platform reads config file →
Runs pipeline →
Shows result in repo UI
```

---

## ✅ Advantages

* Version controlled (pipeline = code)
* Easy to track changes
* Tight integration with repo

---

## ❌ Disadvantages

* Limited flexibility (depends on platform)
* Complex setups can become hard to manage

---

# 🔧 4. Type 2: External CI Systems (Most Common in Large Systems)

---

## 🔵 Concept

Pipeline is managed **outside the repository**

---

## 🛠️ Tools

* Jenkins
* CircleCI
* TeamCity

---

## 🔁 Flow

```text
Push →
Webhook sent →
External CI tool triggered →
Pipeline runs →
Reports back status
```

---

## 🧠 Key Mechanism: Webhooks

👉 Git provider sends event to CI tool:

```text
"Hey, new commit pushed"
```

---

## ✅ Advantages

* Highly customizable
* Can handle complex workflows
* Centralized control across projects

---

## ❌ Disadvantages

* Setup overhead
* Needs maintenance
* Less visible in repo

---

# 🌍 5. Type 3: Platform-Based CI/CD

---

## 🟡 Concept

Deployment platform includes built-in CI

---

## 🛠️ Tools

* Netlify
* Vercel

---

## 🔁 Flow

```text
Push →
Platform detects change →
Runs build →
Deploys automatically
```

---

## ✅ Advantages

* Zero setup
* Fast and simple
* Great for frontend apps

---

## ❌ Disadvantages

* Limited control
* Not suitable for complex pipelines

---

# 🧱 6. Type 4: Hybrid CI/CD (Most Realistic Setup)

---

## 🧠 Concept

Combination of tools

---

## 🔁 Flow Example

```text
Push →
External CI (Jenkins) →
Tests + Build →
Deploy to platform (Netlify/Vercel/AWS)
```

---

## ✅ Advantages

* Best of both worlds
* Flexible + scalable

---

# ⚙️ 7. What Every CI Pipeline Typically Does

---

## 🧪 Common Steps

```text
1. Checkout code
2. Setup environment (Node, Java, etc.)
3. Install dependencies
4. Run lint checks
5. Run tests
6. Build application
7. (Optional) Deploy
```

---

# 🚦 8. Pipeline Triggers

---

## Common Events

```text
Push →
Pull Request →
Merge →
Scheduled jobs (cron)
Manual trigger
```

---

# 🔒 9. CI as a Gatekeeper

---

```text
PR →
CI runs →
❌ Fail → block merge
✅ Pass → allow merge
```

---

## Purpose:

👉 Protect main branch from bad code

---

# 🌍 10. How CI Connects with Git

---

## 🧠 Event-Based System

```text
Git event (push/PR) →
Webhook →
CI triggered
```

---

## NOT:

```text
CI constantly checking repo ❌
```

---

# 🧠 11. Key Concepts to Remember

---

## 🔑 CI is event-driven

---

## 🔑 CI is environment-dependent

---

## 🔑 CI ensures:

```text
Code quality
Build success
Integration safety
```

---

# ⚠️ 12. Common Mistakes

---

## ❌ Thinking CI = GitHub Actions only

---

## ❌ Not enforcing CI (no branch protection)

---

## ❌ Ignoring environment differences

---

## ❌ Mixing CI and CD concepts

---

# 🎯 13. Interview-Level Summary

👉
“CI pipelines can be implemented using repository-based tools like GitHub Actions, external systems like Jenkins, or platform-integrated solutions like Netlify. In large-scale systems, CI is often handled externally and triggered via webhooks, allowing flexible and scalable automation.”

---

# 🧠 Final Mental Model

```text
Code change →
Event →
CI system triggered →
Validation →
(Optional) Deployment
```

---





