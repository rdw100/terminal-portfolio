![Lighthouse](https://github.com/rdw100/terminal-portfolio/actions/workflows/lighthouse.yml/badge.svg)

# 🚀 terminal-portfolio

A terminal‑style personal portfolio built with **vanilla JavaScript**, designed to feel like a real shell session.

The site is command‑driven, content‑first, and hosted as an **Azure Static Web Apps** with a tiny footprint and a clean, layered architecture.

---

## 🔦 Lighthouse Scores

![Performance](https://img.shields.io/badge/dynamic/json?label=Performance&query=$.performance&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![Accessibility](https://img.shields.io/badge/dynamic/json?label=Accessibility&query=$.accessibility&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![Best Practices](https://img.shields.io/badge/dynamic/json?label=Best%20Practices&query=$.bestPractices&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)
![SEO](https://img.shields.io/badge/dynamic/json?label=SEO&query=$.seo&url=https://raw.githubusercontent.com/rdw100/terminal-portfolio/main/src/content/lighthouse/scores.json)

---
## 🌟 Project Highlights

- 🖥️ Terminal‑first UX — HTML5 + CSS3 interaction over navigation
- 📝 Content‑driven system — Markdown, YAML/JSON, ASCII, and static HTML
- ⚡ Fast by design — tiny payload, minimal JavaScript, clean critical path
- 🧠 Predictable, dependency‑acyclic architecture — no hidden state, no circular imports
- 🧱 Layered terminal engine — shell → engine → registry → handler → renderer → services
- 🧩 Build‑time content pipeline — Markdown → HTML during CI for deterministic deploys
- 🎛️ Dynamic module loading — commands and pages load only when needed
- 🛠️ Zero frameworks, zero bundlers — pure HTML, CSS, and ES modules
- 🧭 Azure Static Web Apps (SWA) — Static hosting with no backend, no runtime dependencies
- ♿ Accessibility‑first design — semantic HTML, focus management, keyboard navigation
- 🔁 Automated CI/CD — GitHub Actions builds, tests, and runs Lighthouse audits
- 🌐 Vanilla JavaScript architecture — ES modules for routing, imports, and rendering

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
| `theme list` | View available themes |
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

## 🎯 BONUS: Coin Rate Limit Demo

- A coin price request (coin btc, coin eth, etc.)
- A smooth animated progress bar that runs while the request is in flight
- Automatic transition from yellow → green as the request completes
- A clean, minimal cooldown indicator if the API rate limit is hit

![Coin Rate Limit Demo](https://github.com/rdw100/terminal-portfolio/blob/main/assets/ProgressBarAnimation.gif)
