# Solar System 3D Map

Welcome to the Solar System 3D Map project! This repository contains a web application that visualizes the solar system in 3D using React and Three.js. The project was developed during a 6-hour pair programming hackathon.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [License](#license)

## Introduction

The Solar System 3D Map application provides an interactive 3D representation of the solar system. It includes the major planets and the sun, allowing users to explore their relative positions and orbits(not yet see v2 @).

## Features

- 3D visualization of the solar system using Three.js.
- Interactive controls to navigate and explore the solar system.
- Loader animation while data is being fetched.
- Responsive design suitable for various devices.

## Installation

To run the Solar System 3D Map locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HMouaziz/solar-system-3d-map.git
   cd solar-system-3d-map
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   Ensure you have a local server setup. You can use various methods such as:
   - **Using VS Code Live Server Plugin:**
     - Install the Live Server plugin from the VS Code marketplace.
     - Open the project folder in VS Code.
     - Right-click on the `index.html` file and select `Open with Live Server`.
   - **Using JetBrains IDE Built-in Server:**
     - Open the project in a JetBrains IDE like WebStorm or IntelliJ IDEA.
     - Right-click on the `index.html` file and select `Run 'index.html'`.
   - **Using the built-in development server:**
     ```bash
     npm run dev
     ```

4. **Navigate to the application:**
   Open your browser and go to `http://localhost:5173`.

## Usage

Once the server is running, open your browser and navigate to `http://localhost:5173`. You will see the Solar System 3D Map application displaying the solar system with interactive controls.

### Interactions

- **Planet Information:**
  - Hover over a planet to highlight it.
  - Click on a planet to view its detailed information.
- **Controls:**
  - Use your mouse to rotate and zoom in/out of the solar system.

## Technologies

- **React:** For building the user interface.
- **Three.js:** For rendering the 3D solar system.
- **SCSS:** For styling the application with a modular approach.
- **Axios:** For making API requests to fetch planetary data.
- **API:** `https://api.le-systeme-solaire.net` for retrieving solar system data.

## Project Structure

```plaintext
solar-system-3d-map/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── Canvas.jsx
│   │   │   └── Canvas.scss
│   │   ├── Loader/
│   │   │   ├── Loader.jsx
│   │   │   └── Loader.scss
│   ├── style/
│   │   ├── functions.scss
│   │   ├── mixins.scss
│   │   ├── resets.scss
│   │   ├── variables.scss
│   ├── App.jsx
│   ├── main.jsx
│   ├── main.scss
├── index.html
└── README.md
```

- `index.html`: Main HTML file for the application.
- `src/main.jsx`: Entry point for the React application.
- `src/App.jsx`: Main application component.
- `src/components/Canvas/Canvas.jsx`: Component for rendering the 3D canvas.
- `src/components/Loader/Loader.jsx`: Component for displaying a loading spinner.
- `src/style/`: Directory containing SCSS files for styling the application.

## License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for more details.

---

Developed by Halim Mouaziz @ project-hephaestus.com & Vladimir Cașcarade &copy; 2024
