# Barnacle Gaming Site

## Adding New Games

To add new games to your site, simply edit the `config/games.ts` file:

### Quick Guide:

1. Open `config/games.ts`
2. Find the category you want to add to (featured, popular, arcade, multiplayer, puzzle, more)
3. Add your game in this format:

\`\`\`typescript
{ name: "Your Game Name", route: "/Games/your-game/index.html", category: "Game Type" }
\`\`\`

### Example:

\`\`\`typescript
featured: [
  // ... existing games ...
  { name: "New Awesome Game", route: "/Games/awesome-game/index.html", category: "Action" },
]
\`\`\`

### Categories:
- **featured**: Your best/highlighted games
- **popular**: Most played games  
- **arcade**: Classic arcade-style games
- **multiplayer**: Games for multiple players
- **puzzle**: Brain games and puzzles
- **more**: Everything else

### Game Categories (for the category field):
Action, Simulation, Multiplayer, Sandbox, Arcade, Idle, Endless, Rhythm, Management, Challenge, Classic, Puzzle, Logic, Strategy, Creative, Match, PvP, Racing, Horror, 3D, Shooter, Physics, Stealth, Sports, Fun

That's it! The search function will automatically include your new games.
