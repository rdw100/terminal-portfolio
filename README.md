![Lighthouse](https://github.com/rdw100/terminal-portfolio/actions/workflows/lighthouse.yml/badge.svg)

# 🚀 terminal-portfolio

A terminal‑style personal portfolio built with **vanilla JavaScript**, designed to feel like a real shell session rather than a traditional website.

This project explores how far you can push a fully static, framework‑free, dependency‑acyclic architecture while keeping the experience fast, expressive, and easy to extend.

The site is command‑driven, content‑first, and hosted as an **Azure Static Web Apps**.

---

## 🔦 Lighthouse Scores

![Performance](https://img.shields.io/badge/dynamic/json?label=Performance&query=$.performance&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![Accessibility](https://img.shields.io/badge/dynamic/json?label=Accessibility&query=$.accessibility&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![Best Practices](https://img.shields.io/badge/dynamic/json?label=Best%20Practices&query=$.bestPractices&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![SEO](https://img.shields.io/badge/dynamic/json?label=SEO&query=$.seo&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)

---

## 🧠 Design Philosophy

- Terminal‑first UX — interaction over navigation
- Content‑driven — Markdown, JSON, ASCII
- Minimal JS — only what’s necessary
- Predictable architecture — no hidden state
- Performance as a feature — not an afterthought

---

## 🏆 Highlights & Achievements

- ⚡ Fast by design — tiny payload, minimal JavaScript, clean critical path
- 🧠 Predictable architecture — explicit layers, no circular dependencies
- 🎛️ Dynamic module loading — commands and pages load only when needed
- 🧱 Layered terminal engine — shell → engine → registry → handler → renderer → services
- 🧭 Static hosting only — no server, no backend, no runtime dependencies
- 🔒 Deterministic deploys — all content prebuilt, no runtime parsing
- 🧩 Build‑time content pipeline — Markdown → HTML during CI
- 📝 Content‑driven — Markdown, JSON, ASCII, and static HTML
- 🧭 Zero frameworks, zero bundlers — pure HTML, CSS, and ES modules
- 🧪 Automated Lighthouse CI — scores tracked on every commit

---

## 🛠️ Built With

- 🧰 Visual Studio Code — primary development environment
- 🌐 Vanilla JavaScript (ES Modules) — command routing, dynamic imports, and rendering
- 🖥️ HTML5 + CSS3 — semantic markup and terminal-style UI
- 📄 Markdown — content-driven pages (About, Help, Projects, Socials)
- ⚡ Azure Static Web Apps (SWA) — globally distributed hosting
- 🔁 GitHub Actions — CI/CD and automated Lighthouse audits
- 🧠 Dynamic Module Loading — deferred page loading for optimal LCP
- ♿ Accessibility-first design — semantic HTML, focus management, and keyboard navigation

---

## ✨ Features

- 🧭 Command‑based navigation
- 🧠 Autocomplete (TAB)
- ⬆️⬇️ Command history
- 📄 Markdown‑driven content pages
- 🧾 JSON configuration for links and metadata
- 💰 Coin API with animated progress bar + cooldown indicator
- 🎨 Theme switching (Retro, Azure, Vapor, Minimal, etc.)

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
| `coin list` | List available crypto |
| `lighthouse` | View latest Lighthouse scores (production) |
| `theme` | Choose a theme |
| `gui` | Opens legacy GUI site |
| `clear` | Clears the terminal |
| `help` | Displays command help |

## ⌨️ Keyboard Shortcuts

| Key        | Action                     |
|------------|-----------------------------|
| `TAB`      | Autocomplete command names  |
| `ESC`      | Clear current input         |
| `↑` / `↓`  | Command history navigation  |

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

## 🧱 Technical Architecture

The system is organized into explicit layers:
- Terminal Core — input, output, engine, prompt, telemetry
- Command Handlers — minimal, declarative, async
- Page Renderers — Markdown/HTML loaders
- Shared Services — config, markdown, templates
- Shared UI Utilities — scrolling, formatting
- Content Files — Markdown, YAML, ASCII, HTML

---

## 🧱Layered Architecture Diagram
```mermaid
flowchart TD

    %% UI
    A[index.html<br/>site.css]:::ui

    %% Shell
    A --> B[shell.js<br/>shellTerminal.js]:::shell

    %% Terminal Core
    B --> C[Terminal Core<br/>runtime/*]:::core

    %% Commands
    C --> D[Command Handlers<br/>commands/*]:::commands

    %% Pages
    D --> E[Page Renderers<br/>pages/*]:::pages

    %% Services
    E --> F[Shared Services<br/>core/services/*]:::services

    %% Content
    F --> G[Content Files<br/>content/*]:::content

    classDef ui fill:#222,color:#fff,stroke:#555;
    classDef shell fill:#333,color:#fff,stroke:#666;
    classDef core fill:#444,color:#fff,stroke:#777;
    classDef commands fill:#555,color:#fff,stroke:#888;
    classDef pages fill:#666,color:#fff,stroke:#999;
    classDef services fill:#777,color:#fff,stroke:#aaa;
    classDef content fill:#888,color:#fff,stroke:#bbb;
```

Layer Responsibilities
UI Layer
- index.html, site.css
- Static shell markup and theme variables

Shell Layer
- shell.js, shellTerminal.js
- Wires DOM events into the terminal engine

Terminal Core
- Input parsing, dispatch, registry lookup, runtime orchestration
- Files under src/core/runtime/*

Command Handlers
- Minimal logic, async, declarative
- One folder per command under src/commands/*

Page Renderers
- Load static HTML generated from Markdown
- Insert into terminal output

Shared Services
- markdownService.js, configService.js, templateService.js
- Pure utilities with no DOM access

Content Files
- Markdown, YAML, ASCII, and static HTML
- Built into HTML during CI

---

## ⚡ Boot + Shell + Runtime Lifecycle

```mermaid
sequenceDiagram
    autonumber

    participant U as User
    participant T as Terminal UI
    participant S as Shell (Pre‑Boot)
    participant B as Boot Handler
    participant E as Runtime Engine
    participant R as Command Registry
    participant H as Command Handler
    participant P as Page Renderer
    participant SV as Services
    participant O as Output

    %% --- Pre-Boot Shell ---
    U->>T: types "boot" + Enter
    T->>S: sendInput("boot")
    S->>B: handleBoot()

    %% --- Boot Phase ---
    B->>T: clear preboot hint
    B->>T: clear output
    B->>R: load command registry
    B->>E: initRuntime(registry)
    E->>T: print runtime prompt

    %% --- Runtime Command ---
    U->>T: types "projects" + Enter
    T->>E: sendInput("projects")
    E->>R: lookup("projects")
    R-->>E: return handler reference
    E->>H: projects()
    H->>P: renderProjectsPage()
    P->>SV: loadMarkdown("projects.md")
    SV-->>P: return HTML
    P->>O: insertAdjacentHTML()
    O->>T: content rendered
    T->>T: scrollToBottom()
```

---