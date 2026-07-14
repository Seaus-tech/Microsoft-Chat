# 💬 Microsoft Teams Chat Client Replication

<p align="center">
  <strong>A high-fidelity desktop replication of the Microsoft Teams Chat user interface, built with Tauri, React, and Fluent UI.</strong>
</p>

<p align="center>
  <img src="https://img.shields.io/badge/Desktop-Tauri-FFC131?style=flat-square&logo=tauri&logoColor=white" alt="Tauri" />
  <img src="https://img.shields.io/badge/Framework-React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Design-Fluent%20UI-0078D4?style=flat-square&logo=microsoft&logoColor=white" alt="Fluent UI" />
  <img src="https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## 🌌 Overview

This repository contains a desktop chat client replication modeled after **Microsoft Teams Chat**. It demonstrates high-fidelity UI recreation with smooth state animations, responsive layouts, and standard Fluent UI design patterns.

The project is dual-packaged for desktop deployment:
- **Tauri (Rust-based) backend** as the primary wrapper
- **Electron shell launcher** as an alternative for compatibility

---

## ✨ Features

- 👥 **Fluent Design System** — Leverages Microsoft's official `@fluentui/react-components` and `@fluentui/react-icons` for authentic Teams appearance
- 💬 **Live Chat Simulator** — Click and swap between active chat threads (e.g., Anish Malpani, Marta Fuentes) with custom transit animations
- ✉️ **Interactive Threading** — Fully interactive input field; send messages to update thread history and previews in real time
- ⚡ **Multi-Desktop Runtimes:**
  - **Tauri**: Ultra-lightweight Rust shell compilation
  - **Electron**: Web-standard node wrapper configuration (`electron-main.cjs`)

---

## 🛠️ Codebase Structure

- [**src/App.tsx**](file:///Users/YashB/seaus/Microsoft-Chat/src/App.tsx) — Main Chat dashboard, Fluent providers, active chat state machinery, and list rendering
- [**src/App.css**](file:///Users/YashB/seaus/Microsoft-Chat/src/App.css) — Layout styles, transitions, message bubble shapes, and presence status indicators
- [**src-tauri/**](file:///Users/YashB/seaus/Microsoft-Chat/src-tauri) — Tauri configuration files, icons, capabilities, and Rust main entrypoint
- [**electron-main.cjs**](file:///Users/YashB/seaus/Microsoft-Chat/electron-main.cjs) — Alternate Electron execution script

---

## 🚀 Running the Project

### Prerequisites

Make sure you have Node.js and Rust/Cargo installed on your system.

### Install Dependencies

```bash
npm install
```

### Run in Development (Web Port)

To view and edit the interface in your web browser:

```bash
npm run dev
```

### Run on Desktop (Tauri)

To compile and run the native desktop shell locally:

```bash
npm run tauri dev
```

### Run on Desktop (Electron)

For Electron compatibility mode:

```bash
npm run electron dev
```

---

## 📸 Screenshots

*(Coming soon)*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

© 2026 Seaus Tech. All rights reserved.

<p align="center">
  <sub>⚡ Built with modern web technologies for native performance</sub>
</p>