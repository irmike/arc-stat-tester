# Arc Stat Tester

A modern, interactive skill/stat tree builder for games, built with React and Vite.

[![GitHub Pages](https://img.shields.io/badge/demo-online-brightgreen)](https://irmike.github.io/arc-stat-tester/)

---

## Table of Contents
- [How it works](#how-it-works)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Testing](#testing)
- [TODO](#todo)
- [License](#license)

---

## How it works

The app builds a tree structure using a hierarchy of React components:

- **Tree**: The root component that creates and arranges multiple TreeSections (e.g., Mobility, Conditioning, Survival).
- **TreeSection**: Represents a section of the tree (a branch or category). Each TreeSection contains rows of Nodes.
- **Node**: Represents an individual skill or stat node. Nodes can unlock or lock other nodes based on user interaction and the `unlocks` property.

### Visual Structure (ASCII Art)

```
Tree
│
├── TreeSection: Mobility
│     ├── Node: Nimble Climber
│     ├── Node: Marathon Runner
│     └── ...
│
├── TreeSection: Conditioning
│     ├── Node: Iron Lungs
│     ├── Node: Quick Recovery
│     └── ...
│
└── TreeSection: Survival
      ├── Node: Agile Croucher
      ├── Node: Silent Scavenger
      └── ...
```

### Node Unlocking Example

```
TreeSection: Mobility
  ├── Node: Nimble Climber (unlocks → Marathon Runner)
  └── Node: Marathon Runner (locked until Nimble Climber is unlocked)
```

- When a Node's count increases from 0, it unlocks the nodes listed in its `unlocks` array.
- When a Node's count decreases to 0, it locks those nodes again (except the first node in each section, which is always unlocked).

---

## Features
- Interactive skill/stat tree with unlock/lock logic
- Responsive design, works on desktop and mobile
- Zoom and pan functionality
- Modular React component structure
- Deployed to GitHub Pages

---

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
```sh
npm install
```

---

## Usage

### Development
```sh
npm run dev
```

### Build
```sh
npm run build
```

### Deploy
```sh
npm run deploy
```

---

## Deployment

The app is deployed at: [https://irmike.github.io/arc-stat-tester/](https://irmike.github.io/arc-stat-tester/)

---

## Configuration
- Vite base path: `/arc-stat-tester/`

---

## Testing
- Run all tests:
```sh
npm test
```
- Tests are run automatically on pull requests.

---

## TODO
- [x] Correct messy file structure
- [x] Add connection between nodes
- [ ] Create branch layer between nodes to point to their connections
- [ ] Make use of pointLock
- [x] Implement use of individual stat images
- [x] Add coloring based on stat type
- [ ] Stylize everything and make it look nice
- [ ] Fix issue with description modal flickering
- [ ] Move touch and mouse controls in app to a dedicated location

---

## License

MIT License

---


