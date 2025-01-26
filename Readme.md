
# ME AI Assistant - Chrome Extension


Your intelligent browsing companion with voice-first interaction and AI-powered capabilities.

## 🌟 Features

### 🗣 Voice Command Control
- **Website Navigation**  
  `"Open [WebsiteName]"` - Direct access to common sites  
  *Example:* "Open GitHub"
  
- **Smart Search**  
  `"Google [Query]"` - Instant web searches  
  *Example:* "Google latest space discoveries"

- **Media Access**  
  `"YouTube [Video]"` - Video content search  
  *Example:* "YouTube machine learning tutorials"

- **AI Knowledge**  
  `"ME [Question]"` - LLM-powered answers  
  *Example:* "ME explain blockchain technology"

### 🎨 Key Features
- Voice-to-text conversion with real-time feedback
- Context-aware command recognition
- Response history tracking
- Cross-platform search unification
- Privacy-focused local processing
- Mobile-optimized responsive design

## ⚙️ Installation

### Manual Setup
1. **Download Extension**
   ```bash
   git clone https://github.com/yourusername/me-ai-assistant.git
   ```

2. **Enable Chrome Developer Mode**
   - Visit `chrome://extensions`
   - Toggle ➔ **Developer mode** (top-right)

3. **Load Extension**
   - Click `Load unpacked`
   - Select cloned repository folder

4. **Grant Permissions**
   - Allow microphone access to extension from extension settings

5. **Start Using**
   - Click toolbar icon 🎤
   - Try: "ME test connection"

## 🚀 Usage

### Basic Commands
| Command Pattern          | Action                     |
|--------------------------|----------------------------|
| "Open [Wikipedia]"       | Direct site navigation     |
| "Google [AI news]"       | Web search                 |
| "YouTube [tutorials]"    | Video search               |
| "ME [explain quantum]"   | AI-generated explanation   |

### Advanced Use
- **Multi-action**  
  "Open GitHub then Google repos"
- **Follow-up**  
  "ME define API" → "Simplify that"
- **Navigation**  
  "Scroll down" / "Go back"

## 🛠 Customization

Modify `styles.css`:
```css
:root {
  --primary: #6366f1;    /* Main brand color */
  --secondary: #8b5cf6;  /* Secondary color */
  --accent: #ec4899;     /* Highlight color */
  --glass-opacity: 0.8;  /* Glass effect intensity */
}
```

## 📂 Project Structure
```
me-ai-assistant/
  ├── manifest.json
  ├── popup.html
  ├── styles.css
  ├── content/
  │    ├── assistant.js
  │    └── injectPermission.js
  └── src/
       └── pages/
            └── permission/
                 ├── index.html
                 └── requestPermission.js
  
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch:
   ```bash
   git checkout -b feature/improvement
   ```
3. Submit PR with:
   - Test cases
   - Updated documentation
   - Compatibility checks

## 📜 License

MIT License - See [LICENSE](LICENSE) for full text

## 🚧 Roadmap

- [ ] Chrome Web Store deployment
- [ ] Firefox extension port
- [ ] Voice command presets
- [ ] API integration framework
- [ ] Multi-language support

## Team Mates
- Syed Talal Jilani 
- Mehreen Rasheed
---

**Need Help?**  
Open an issue or contact me 
