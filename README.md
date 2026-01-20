![Lighthouse](https://github.com/rdw100/terminal-portfolio/actions/workflows/lighthouse.yml/badge.svg)

# 🚀 terminal-portfolio

A terminal-style personal portfolio built with **vanilla JavaScript**, designed to feel like a real shell session rather than a traditional website.

Hyper‑optimized, framework‑free terminal interface that delivers a real shell‑like experience in the browser — with 100/100/100/100 Lighthouse scores, a 5 KB payload, and TBT under 60 ms.

This project demonstrates how far you can push vanilla JavaScript, static hosting, and clean architecture when every decision is intentional.

The site is command-driven, fully static, and hosted as an **Azure Static Web App** with content and behavior cleanly separated.

---

## 🔦 Lighthouse Scores

![Performance](https://img.shields.io/badge/dynamic/json?label=Performance&query=$.performance&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![Accessibility](https://img.shields.io/badge/dynamic/json?label=Accessibility&query=$.accessibility&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![Best Practices](https://img.shields.io/badge/dynamic/json?label=Best%20Practices&query=$.bestPractices&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![SEO](https://img.shields.io/badge/dynamic/json?label=SEO&query=$.seo&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)

---
## 🌟 Highlights & Achievements
⚡ 100 Performance. 100 Accessibility. 100 Best Practices. 100 SEO.
Achieved through a combination of architectural discipline, zero‑framework design, and aggressive micro‑optimization.

🪶 5 KB Total Payload
The entire site — HTML, CSS, JS — fits into a footprint smaller than most favicon files.

🧠 60 ms Total Blocking Time
A level of responsiveness typically reserved for native apps and hand‑tuned demos.

🧱 Dependency‑Acyclic Architecture
Every module has a single responsibility.
No circular imports.
No hidden side effects.
No framework magic.

🧩 Dynamic Command System
Commands are declarative, lazy‑loaded, and follow a predictable lifecycle:
\```
User Input → Engine → Registry → Handler → Renderer → Output
\```

📝 Build‑Time Markdown → HTML Pipeline
Content is authored in Markdown and converted to static HTML during CI, ensuring:
- zero runtime parsing
- zero client‑side overhead
- deterministic deploys

🎨 Theme‑Aware Terminal UI
Retro, Azure, Vapor, Minimal, Amber, and Dusty themes — all powered by CSS variables and zero JS.

🧪 Automated Lighthouse CI
Every push triggers a full Lighthouse audit, with scores published as badges and stored as static JSON.

🧭 Zero Frameworks. Zero Bundlers. Zero Client‑Side Routing.
Just HTML, CSS, and JavaScript — intentionally simple, intentionally fast.
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
- Terminal‑first UX — interaction over navigation
- Content‑driven — Markdown, YAML, ASCII
- Minimal JS — only what’s necessary
- Predictable architecture — no hidden state
- Performance as a feature — not an afterthought

---

## ✨ Features
- 🖥️ Terminal-style UI with persistent prompt
- 🧭 Command-based navigation
- 📄 Markdown-driven content
- 🧾 YAML configuration
- 🧱 Modular command architecture
- 🔍 GitHub project integration
- 📊 Lighthouse CI automation
- 🧠 Autocomplete (TAB)
- ⬆️⬇️ Command history
- 💰 Coin API with animated progress bar
- 🎨 Theme-aware design (Dark, Light, Vapor)
- ⚡ Zero frameworks, zero build step

---

## 🖥️ Available Commands

| Command | Description |
|-------|-------------|
| `welcome` | Displays the welcome banner |
| `about` | About Dusty and contact links |
| `projects` | GitHub projects list |
| `projects goto <n>` | Opens selected project |
| `resume` | Displays ASCII resume |
| `socials` | Social links list |
| `socials goto <n>` | Opens selected link |
| `coin` | Check the latest crypto price |
| `lighthouse` | View latest Lighthouse scores (production) |
| `theme` | Choose a theme |
| `gui` | Opens legacy GUI site |
| `clear` | Clears the terminal |
| `help` | Displays command help |

---

🧱 Technical Architecture
The system is organized into explicit layers:
- Terminal Core — input, output, engine, prompt, telemetry
- Command Handlers — minimal, declarative, async
- Page Renderers — Markdown/HTML loaders
- Shared Services — config, markdown, templates
- Shared UI Utilities — scrolling, formatting
- Content Files — Markdown, YAML, ASCII, HTML

This structure ensures:
- no circular dependencies
- predictable behavior
- clean separation of concerns
- easy extensibility

---

🛠️ Technology Stack
- Vanilla JavaScript (ES Modules)
- HTML5 + CSS3
- Markdown content pipeline
- Azure Static Web Apps
- GitHub Actions CI/CD
- Lighthouse CI automation
- YAML configuration
- Dynamic module loading
- ASCII‑driven resume

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

- ASCII source → HTML output
- CI built via Node.js in GitHub Actions
- Committed as static content
- Runs automatically in CI

---

## 🧪 CI/CD & Deployment

- Static hosting on Azure SWA
- Build‑time HTML generation
- Automated Lighthouse audits
- Deterministic deploys
- Zero server‑side code

---

## 🎯 Coin Rate Limit Demo

- A coin price request (coin btc, coin eth, etc.)
- A smooth animated progress bar that runs while the request is in flight
- Automatic transition from yellow → green as the request completes
- A clean, minimal cooldown indicator if the API rate limit is hit

![Coin Rate Limit Demo](https://github.com/rdw100/terminal-portfolio/blob/main/assets/ProgressBarAnimation.gif)

---
🧱 Architecture Diagram (Mermaid)
```mermaid
flowchart TD

    %% UI Layer
    A[index.html<br/>terminal.css<br/>themes/*]:::ui
    A --> B[Terminal Subsystem<br/>src/core/terminal/*]

    %% Terminal Subsystem
    subgraph TERMINAL["Terminal Core"]
        B1[terminal.js<br/>UI shell, input/output]
        B2[terminalEngine.js<br/>parsing + dispatch]
        B3[commandRegistry.js<br/>command metadata]
        B4[prompt.js<br/>prompt rendering]
        B5[telemetry.js<br/>App Insights wrapper]
    end

    B --> C[Command Handlers<br/>src/commands/*]

    %% Commands
    subgraph COMMANDS["Command Handlers"]
        C1[about.js]
        C2[projects.js]
        C3[resume.js]
        C4[socials.js]
        C5[help.js]
        C6[clear.js]
        C7[welcome.js]
        C8[coin.js]
    end

    C --> D[Page Renderers<br/>src/pages/*]

    %% Pages
    subgraph PAGES["Page Renderers"]
        D1[about.js]
        D2[projects.js]
        D3[resume.js]
        D4[socials.js]
        D5[welcome.js]
    end

    D --> E[Shared Services<br/>src/core/services/*]

    %% Services
    subgraph SERVICES["Shared Services"]
        E1[markdownService.js<br/>Markdown → HTML]
        E2[configService.js<br/>YAML loader]
        E3[templateService.js<br/>placeholder injection]
    end

    E --> F[Shared UI Utilities<br/>src/shared/ui/*]

    %% Shared UI
    subgraph SHARED["Shared UI Utilities"]
        F1[scroll.js<br/>scrollToBottom]
    end

    F --> G[Content Files<br/>src/content/*]

    %% Content
    subgraph CONTENT["Content Files"]
        G1[Markdown<br/>about.md, projects.md, socials.md]
        G2[YAML<br/>config.yaml]
        G3[ASCII<br/>ascii.txt, name.txt]
        G4[HTML<br/>resume.html]
    end

    classDef ui fill:#222,color:#fff,stroke:#555;
    classDef terminal fill:#333,color:#fff,stroke:#666;
    classDef commands fill:#444,color:#fff,stroke:#777;
    classDef pages fill:#555,color:#fff,stroke:#888;
    classDef services fill:#666,color:#fff,stroke:#999;
    classDef shared fill:#777,color:#fff,stroke:#aaa;
    classDef content fill:#888,color:#fff,stroke:#bbb;

    class A ui;
    class B,B1,B2,B3,B4,B5 terminal;
    class C,C1,C2,C3,C4,C5,C6,C7,C8 commands;
    class D,D1,D2,D3,D4,D5 pages;
    class E,E1,E2,E3 services;
    class F,F1 shared;
    class G,G1,G2,G3,G4 content;

```
---
🧭 Command Lifecycle Sequence Diagram (Mermaid)
```mermaid
sequenceDiagram
    autonumber

    participant U as User
    participant T as Terminal UI
    participant E as Terminal Engine
    participant R as Command Registry
    participant H as Command Handler
    participant P as Page Renderer
    participant S as Services
    participant O as Output

    U->>T: types "example" + Enter
    T->>E: sendInput("example")
    E->>R: lookup("example")
    R-->>E: return handler reference
    E->>H: example()
    H->>P: renderExamplePage()
    P->>S: loadMarkdown("example.md")
    S-->>P: return HTML
    P->>O: insertAdjacentHTML()
    O->>T: content rendered
    T->>T: scrollToBottom()
```
---
🧱 Add New Command Architecture Flow Diagram (Mermaid)
```mermaid
flowchart

    subgraph Terminal["Terminal Core"]
        A[terminal.js]
        B[terminalEngine.js]
        C[commandRegistry.js]
    end

    subgraph Commands["Command Handlers"]
        H[example.js]
    end

    subgraph Pages["Page Renderers"]
        P[example.js]
    end

    subgraph Services["Shared Services"]
        S1[markdownService.js]
        S2[configService.js]
    end

    subgraph Content["Content Files"]
        M[example.md]
    end

    A --> B
    B --> C
    C --> H
    H --> P
    P --> S1
    S1 --> M
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