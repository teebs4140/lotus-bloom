# Lotus Bloom Clicker Game

A peaceful and meditative incremental clicker game where you cultivate lotus petals to grow your garden of serenity.

🎮 **[Play the game here!](https://teebs4140.github.io/lotus-bloom/)**

## Features

- Click the beautiful lotus flower to collect petals
- Purchase upgrades to increase your petal generation
- Automatic petal generation through various helpers
- Calming visual design with gradient effects
- Progressive gameplay with multiple upgrade tiers

## How to Play

1. Click the lotus flower in the center to collect petals
2. Use your petals to purchase upgrades from the panel
3. Upgrades will help you generate petals automatically
4. Watch your garden bloom as you progress!

## Running the Game

This is a static HTML game that can be run in several ways:

### Option 1: Direct Browser Opening
Simply open the `index.html` file in your web browser:
- Double-click the `index.html` file
- Or drag and drop it into your browser window
- Or use File → Open in your browser menu

### Option 2: Local Web Server (Recommended)
For the best experience, serve the game using a local web server:

**Using Python 3:**
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
# If you have npx
npx serve .

# Or install serve globally
npm install -g serve
serve .
```

**Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Project Structure

```
CLICKER GAME/
├── index.html      # Main game HTML
├── script.js       # Game logic and mechanics
├── styles.css      # Visual styling
├── resources/      # Game assets (sounds, images)
└── tasks/          # Task-related files
```

## Browser Compatibility

This game works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Technologies Used

- Vanilla JavaScript
- HTML5
- CSS3 with animations and gradients
- SVG for the lotus flower graphic

## Game Mechanics

- **Click Power**: Starts at 1 petal per click
- **Automatic Generation**: Purchase upgrades to generate petals per second
- **Upgrade System**: Multiple tiers of upgrades with increasing costs and benefits
- **Progressive Scaling**: Costs increase as you purchase more of each upgrade

Enjoy cultivating your lotus garden! 🪷