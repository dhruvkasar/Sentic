# 📰 Sentic - News Analysis Engine

**Sentic** is an AI-powered media critique tool wrapped in a striking, vintage broadsheet aesthetic. Built to help readers navigate modern journalism, Sentic analyzes any news headline or excerpt to uncover hidden framing, emotional intensity, and ideological bias.

Created by **Aditya** and **Dhruv** for a hackathon project.

![Sentic Preview](https://via.placeholder.com/1200x630/F9F9F7/111111?text=Sentic+-+News+Analysis+Engine)

## ✨ Features

- **🗞️ Editorial Breakdown:** Paste any headline or excerpt and get an instant AI-generated summary, keyword extraction, and an objective editorial note on factual density vs. sensationalism.
- **⚖️ Bias Meter:** A sleek, animated gauge that detects ideological signaling (from Far-Left to Far-Right) based on subtle framing and loaded language.
- **🔥 Energy Score:** Rates the emotional intensity and urgency of the text on a scale from 0 to 100.
- **🎧 Immersive Newsroom Audio:** Procedural ambient sound (typewriter clicks, paper rustles) built with the Web Audio API to give you the authentic vibe of a vintage bullpen.
- **📸 Export clipping:** Download your analysis as a customized image that looks like a freshly printed newspaper clipping, perfect for sharing.
- **📱 Fully Responsive:** The complex typographic layout scales beautifully from ultra-wide desktops down to mobile devices.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (utility-first, with custom typography and brutalist/newspaper theming)
- **Animations:** Framer Motion (`motion/react`)
- **AI Integration:** Google Gen AI SDK (`@google/genai`) powered by Gemini 3 Flash Preview
- **Icons:** Lucide React
- **Utils:** `html2canvas` for exporting the newspaper clippings

## 🚀 Getting Started

To run Sentic locally, follow these steps:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A Gemini API Key from Google AI Studio

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sentic.git
   cd sentic
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to start analyzing the news!

## 🤝 Creators

Built with ❤️ by:
- [**Aditya Mestry**](https://github.com/adimestry) - [Instagram](https://www.instagram.com/aditya_mestry_x007/)
- [**Dhruv Kasar**](https://github.com/dhruvkasar) - [Instagram](https://www.instagram.com/dhruvvkasar/)

## 📜 License

This project is licensed under the MIT License.
