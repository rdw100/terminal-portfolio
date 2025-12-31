![Lighthouse](https://github.com/rdw100/terminal-portfolio/actions/workflows/lighthouse.yml/badge.svg)

# 📄 terminal-portfolio

A terminal-style personal portfolio built with **vanilla JavaScript**, designed to feel like a real shell session rather than a traditional website.

The site is command-driven, fully static, and hosted as an **Azure Static Web App** with content and behavior cleanly separated.

---

## 🔦 Lighthouse Scores

![Performance](https://img.shields.io/badge/dynamic/json?label=Performance&query=$.performance&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/public/lighthouse/scores.json)
![Accessibility](https://img.shields.io/badge/dynamic/json?label=Accessibility&query=$.accessibility&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/public/lighthouse/scores.json)
![Best Practices](https://img.shields.io/badge/dynamic/json?label=Best%20Practices&query=$.bestPractices&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/public/lighthouse/scores.json)
![SEO](https://img.shields.io/badge/dynamic/json?label=SEO&query=$.seo&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/public/lighthouse/scores.json)

---

## 🛠️ Built With

This terminal-style portfolio was built using a modern, lightweight web stack with an emphasis on performance, accessibility, and developer ergonomics:

- 🧰 Visual Studio Code — primary development environment
- 🌐 Vanilla JavaScript (ES Modules) — command routing, dynamic imports, and rendering
- 🖥️ HTML5 + CSS3 — semantic markup and terminal-style UI
- 📄 Markdown — content-driven pages (About, Help, Projects, Socials)
- ⚡ Azure Static Web Apps (SWA) — globally distributed hosting
- 🔁 GitHub Actions — CI/CD and automated Lighthouse audits
- 📊 Lighthouse CI — performance, accessibility, and quality scoring
- 🧾 YAML Configuration — centralized config for commands and links
- 🧠 Dynamic Module Loading — deferred page loading for optimal LCP
- ♿ Accessibility-first design — semantic HTML, focus management, and keyboard navigation

---

## 🧠 Design Philosophy

- Terminal-first UX
- Minimal dependencies
- Explicit configuration
- Content > frameworks
- Readable over clever

This project intentionally avoids frontend frameworks to keep behavior transparent and maintainable.

---

## ✨ Features

- Terminal-style UI with command prompt
- Command-based navigation (`about`, `projects`, `resume`, etc.)
- ASCII-art welcome banner
- Markdown-driven content rendering
- YAML-based configuration
- GitHub project integration
- External resume build pipeline
- Fully static deployment (no backend required)
- Autocomplete features (TAB)
- Navigate previous and next command history
- Third-party coin api service 

---

## 🖥️ Available Commands

| Command | Description |
|-------|-------------|
| `welcome` | Displays the welcome banner |
| `about` | About Dusty and contact links |
| `projects` | Lists configured GitHub projects |
| `projects goto <n>` | Opens selected project in GitHub |
| `resume` | Displays ASCII resume |
| `socials` | Lists social links |
| `socials goto <n>` | Opens selected social link |
| `gui` | Opens legacy GUI site |
| `lighthouse` | View latest Lighthouse scores (production) |
| `help` | Displays command help |
| `clear` | Clears the terminal |

---

## ⚙️ Configuration

All environment-specific and external values are stored in **YAML**:

```yaml
site:
  legacy_url: https://gray-glacier-0dd347e0f.azurestaticapps.net/
  contact_email: dusty@dustywright.me

github:
  username: rdw100
  projects:
    - anthrocloud
    - northwind-api

socials:
  linkedin: https://linkedin.com/in/rdw100
  github: https://github.com/rdw100
  gui: https://gray-glacier-0dd347e0f.azurestaticapps.net/
```

---

## 📄 Resume Pipeline

- Resume is authored as **ASCII text**
- A Node.js script converts it to HTML
- Output is committed and served statically

### Build locally

```pwsh
node build/scripts/build-resume.js
```

### CI Execution (Azure Static Web Apps)

The resume build runs automatically in GitHub Actions before deployment.

The GitHub Actions workflow is configured to run the resume build script
before deployment. This requires Node.js to be explicitly installed in the
pipeline.

```yaml
# 🔹 REQUIRED: Node for build-resume.js
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 18

# 🔹 REQUIRED: Generate resume.html
- name: Build resume.html
  run: node build/scripts/build-resume.js
```

This ensures resume.html is always generated and included in the deployed
static site.

---

## 🚀 Deployment

Hosted using **Azure Static Web Apps** and GitHub Actions.

- No server-side rendering
- No framework build step
- Static content only
- Deterministic deploys

---

## ➕ Command Extensibility

Adding a new command follows a consistent pattern:

1. Create a new renderer in `pages/`
2. Export a `render()` function
3. Wire the command in `app.js`
4. (Optional) Add Markdown content under `content/`

Example:

```js
    // pages/example.js
    export async function render() {
    document.getElementById('output')
        .insertAdjacentHTML('beforeend', '<p>Hello world</p>');
    }

    // app.js
    case 'example':
    await renderExample();
    break;
```

---

## 🧪 Troubleshooting (Azure Static Web Apps)

### 🐳 Docker 403 Errors During Build

*failed to resolve source metadata for mcr.microsoft.com/appsvc/staticappsclient
403 Forbidden*

**Cause:** Intermittent Azure infrastructure issue  
**Fix:** Re-run the GitHub Actions workflow

This error occurs before application code is built and is not related to
JavaScript, Markdown, or configuration changes.

### ⚠️ Known Issues / Quirks (Azure + SWA)

- Azure SWA Docker image pulls may intermittently fail (403)
- Build cache behavior is opaque and non-configurable
- Absolute paths can behave differently locally vs hosted
- `skip_app_build: true` is recommended for static-only sites

None of these impact runtime once deployed successfully.

### 🔑 `deployment_token was not provided`

- Ensure the Azure Static Web Apps API token is present in repository secrets
- Confirm the workflow references the correct secret name

### 🚫 404 Errors for JavaScript Files in Production

- Verify `app_location` matches the directory containing `index.html`
- Ensure all runtime JS files are deployed under the same root
- Avoid absolute `/src/...` paths unless they exist in production

---

## ❓ Why this stack?

- Zero framework overhead — fast load times and minimal JavaScript
- Content-first architecture — Markdown over hardcoded UI
- CI-verified quality — Lighthouse scores tracked automatically
- Terminal-native UX — keyboard-driven, distraction-free interaction
- Production-focused — runs exactly as deployed, no mock data

---

## ❓ Why Terminal UI?

This project favors a terminal interface because it:

- Emphasizes interaction over navigation
- Encourages exploration through commands
- Avoids visual noise and layout complexity
- Reflects how engineers actually work

The terminal metaphor also keeps the architecture simple and explicit.

---

## ❓ Why ASCII Resume?

- Preserves alignment and formatting across environments
- Renders consistently in terminal-style UI
- Version-controlled, diff-friendly format
- Avoids PDF or framework-specific layouts

The resume is intentionally **content-first**, not presentation-driven.