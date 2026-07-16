# 💬 Microsoft Teams Chat Client Replication

<p align="center>
  <strong>A high-fidelity desktop replication of the Microsoft Teams Chat user interface, built with Tauri, React, and Fluent UI.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Desktop-Tauri-FFC131?style=flat-square&logo=tauri&logoColor=white" alt="Tauri" />
  <img src="https://img.shields.io/badge/Framework-React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Design-Fluent%20UI-0078D4?style=flat-square&logo=microsoft&logoColor=white" alt="Fluent UI" />
  <img src="https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Codebase Structure](#codebase-structure)
- [Customization](#customization)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains a desktop chat client replication modeled after **Microsoft Teams Chat**. It demonstrates high-fidelity UI recreation with smooth state animations, responsive layouts, and standard Fluent UI design patterns.

The project is dual-packaged for desktop deployment:

| Runtime | Description |
|---------|-------------|
| **Tauri** | Ultra-lightweight Rust shell compilation |
| **Electron** | Web-standard node wrapper configuration |

## Features

- 👥 **Fluent Design System** - Leverages Microsoft's official `@fluentui/react-components` and `@fluentui/react-icons` for authentic Teams appearance
- 💬 **Live Chat Simulator** - Click and swap between active chat threads (e.g., Anish Malpani, Marta Fuentes) with custom transit animations
- ✉️ **Interactive Threading** - Fully interactive input field; send messages to update thread history and previews in real time
- ⚡ **Multi-Desktop Runtimes** - Both Tauri and Electron support
- 🎨 **Responsive Layout** - Adapts to different window sizes
- 🌙 **Dark/Light Mode** - Native Fluent UI theme switching

## Screenshots

*(Coming soon)*

## Prerequisites

- Node.js 18+
- Rust/Cargo (for Tauri builds)
- npm or yarn package manager

## Installation

```bash
# Clone the repository
git clone https://github.com/Seaus-tech/Microsoft-Chat.git
cd Microsoft-Chat

# Install dependencies
npm install
```

## Running the Project

### Web Development

To view and edit the interface in your web browser:

```bash
npm run dev
```

### Desktop (Tauri)

To compile and run the native desktop shell locally:

```bash
npm run tauri dev
```

### Desktop (Electron)

For Electron compatibility mode:

```bash
npm run electron dev
```

## Codebase Structure

```
Microsoft-Chat/
├── src/
│   ├── App.tsx              # Main Chat dashboard, Fluent providers
│   ├── App.css              # Layout styles, transitions, message bubbles
│   ├── components/          # Reusable UI components
│   └── hooks/               # Custom React hooks
├── src-tauri/               # Tauri configuration and Rust code
├── electron-main.cjs        # Electron main process
├── package.json             # Node.js dependencies
└── README.md                # This file
```

## Customization

Edit `src/App.tsx` to modify chat threads, user data, and UI themes. The Fluent UI providers can be customized for branding.

## Roadmap

- [ ] Real-time messaging with WebSocket integration
- [ ] File sharing and media previews
- [ ] Notification system
- [ ] Multi-account support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

© 2026 Seaus Tech. All rights reserved.

<p align="center">
  <sub>⚡ Built with modern web technologies for native performance</sub>
</p>