export interface Game {
  name: string
  route: string
  category: string
}

export interface GameCategories {
  featured: Game[]
  popular: Game[]
  arcade: Game[]
  multiplayer: Game[]
  puzzle: Game[]
  more: Game[]
}

export const gameCategories: GameCategories = {
  featured: [
    { name: "Bitlife", route: "/Games/Bitlife/index.html", category: "Simulation" },
    { name: "1v1.lol", route: "/Games/1v1.lol/index.html", category: "Action" },
    { name: "Among Us", route: "/Games/Amongus/index.html", category: "Multiplayer" },
    { name: "Minecraft 1.8.8", route: "/Games/mc.html", category: "Sandbox" },
    { name: "Geometry Dash", route: "/Games/geodash.html", category: "Arcade" },
    { name: "Slope", route: "/Games/slope/index.html", category: "Arcade" },
  ],
  popular: [
    { name: "Cookie Clicker", route: "/Games/Cookie-Clicker-Source-Code-master/index.html", category: "Idle" },
    { name: "Subway Surfers", route: "/Games/Subway/index.html", category: "Endless" },
    { name: "Friday Night Funkin'", route: "/Games/fnf.html", category: "Rhythm" },
    { name: "Monkey Mart", route: "/Games/mm.html", category: "Management" },
    { name: "Crossy Road", route: "/Games/CrossyRoad/index.html", category: "Arcade" },
    { name: "Getting Over It", route: "/Games/gettingoverit/index.html", category: "Challenge" },
  ],
  arcade: [
    { name: "Pacman", route: "/Games/pm.html", category: "Classic" },
    { name: "Tetris", route: "/Games/canvas-tetris-master/canvas-tetris-master/index.html", category: "Puzzle" },
    { name: "Snake", route: "/Games/snake/index.html", category: "Classic" },
    { name: "Chrome Dino Game", route: "/Games/dino.html", category: "Endless" },
    { name: "Clumsy Bird", route: "/Games/clumsy-bird-master/index.html", category: "Arcade" },
    { name: "World's Hardest Game", route: "/Games/hardest/index.html", category: "Challenge" },
  ],
  multiplayer: [
    { name: "Bedwars", route: "/Games/bedwars/index.html", category: "PvP" },
    { name: "ATR3", route: "/Games/atr3/index.html", category: "Racing" },
    { name: "Tic Tac Toe", route: "/Games/tic tac toe/index.html", category: "Classic" },
  ],
  puzzle: [
    { name: "Save the Doge", route: "/Games/Dog/index.html", category: "Logic" },
    { name: "URL Chess", route: "/Games/chess/index.html", category: "Strategy" },
    { name: "Puzzle Maker", route: "/Games/puzzle/index.html", category: "Creative" },
    { name: "Block Blast", route: "/Games/blockblast/index.html", category: "Match" },
  ],
  more: [
    { name: "Bee Swarm Simulator", route: "/Games/Bee-Swarm-Simulator/index.html", category: "Simulation" },
    { name: "3D City", route: "/Games/3d.city/index.html", category: "Simulation" },
    { name: "Particle Clicker", route: "/Games/particleclicker/index.html", category: "Idle" },
    { name: "The House Game", route: "/Games/thehouse/index.html", category: "Horror" },
    { name: "Cube Engine", route: "/Games/cubeengine/index.html", category: "3D" },
    { name: "Asteroid Game", route: "/Games/asteroid/index.html", category: "Shooter" },
    { name: "Anime Clicker", route: "/Games/animeclicker/index.html", category: "Idle" },
    { name: "Doge Miner", route: "/Games/dogeminer/index.html", category: "Idle" },
    { name: "Slope 2", route: "/Games/slope2/index.html", category: "Arcade" },
    { name: "Baldi's Basics", route: "/Games/baldis/index.html", category: "Horror" },
    { name: "Tower Game", route: "/Games/tower/index.html", category: "Strategy" },
    { name: "Stickman Hook", route: "/Games/stickmanhook/index.html", category: "Physics" },
    { name: "Bob the Robber", route: "/Games/bobrobber/index.html", category: "Stealth" },
    { name: "FIFA 17 Pack Opener", route: "/Games/fifa17/index.html", category: "Sports" },
    { name: "Pet Simulator X", route: "/Games/petx/index.html", category: "Simulation" },
    { name: "Playlist Cover Maker", route: "/Games/playlist/index.html", category: "Creative" },
    { name: "Birthday Guesser", route: "/Games/birthday/index.html", category: "Fun" },
  ],
}

// Helper function to get all games for search
export const getAllGames = (): Game[] => {
  return Object.values(gameCategories).flat()
}

// Helper function to search games
export const searchGames = (query: string): Game[] => {
  if (!query.trim()) return []

  const allGames = getAllGames()
  const searchTerm = query.toLowerCase().trim()

  return allGames.filter(
    (game) => game.name.toLowerCase().includes(searchTerm) || game.category.toLowerCase().includes(searchTerm),
  )
}
