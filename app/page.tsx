"use client"

import { useState, useEffect } from "react"
import { Search, Menu, Star, Clock, Gamepad2, Users, Trophy, Zap, Sparkles } from "lucide-react"
import { gameCategories, searchGames, type Game } from "@/config/games"

const sidebarItems = [
  { icon: Menu, label: "Home", active: true, category: "all" },
  { icon: Clock, label: "Recently Played", category: "recent" },
  { icon: Star, label: "Featured", category: "featured" },
  { icon: Zap, label: "Popular", category: "popular" },
  { icon: Gamepad2, label: "Arcade", category: "arcade" },
  { icon: Users, label: "Multiplayer", category: "multiplayer" },
  { icon: Trophy, label: "Puzzle", category: "puzzle" },
]

export default function Barnacle() {
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Game[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchGames(searchQuery)
      setSearchResults(results)
      setIsSearching(true)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }, [searchQuery])

  const handleGameClick = (route: string) => {
    window.location.href = route
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    // Clear search when switching categories
    clearSearch()
    // Close sidebar on mobile after selection
    setSidebarOpen(false)
  }

  const getGamesForCategory = () => {
    switch (activeCategory) {
      case "featured":
        return gameCategories.featured
      case "popular":
        return gameCategories.popular
      case "arcade":
        return gameCategories.arcade
      case "multiplayer":
        return gameCategories.multiplayer
      case "puzzle":
        return gameCategories.puzzle
      case "recent":
        // For now, show popular games as "recent"
        return gameCategories.popular.slice(0, 8)
      default:
        return null // Show all categories
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* ... existing background particles ... */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-secondary/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-accent/25 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted/50 rounded-xl transition-all duration-300 hover:scale-110 neon-glow"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center animate-pulse-glow relative">
                <Sparkles className="w-5 h-5 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl opacity-50 blur-sm" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
                BARNACLE
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 glass-effect"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {isSearching && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
                      Found {searchResults.length} game{searchResults.length !== 1 ? "s" : ""}
                    </div>
                    {searchResults.map((game, index) => (
                      <button
                        key={`${game.name}-${index}`}
                        onClick={() => {
                          handleGameClick(game.route)
                          clearSearch()
                        }}
                        className="w-full text-left px-3 py-3 hover:bg-muted/50 rounded-lg transition-all duration-200 flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {game.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{game.category}</div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-muted/50 rounded-full text-muted-foreground">
                          {game.category}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <div className="text-2xl mb-2">🎮</div>
                    <div className="font-medium">No games found</div>
                    <div className="text-sm">Try searching for something else</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-24" />
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 glass-effect border-r border-sidebar-border/50 transform transition-all duration-500 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:h-auto`}
        >
          <nav className="p-6 space-y-3">
            {sidebarItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleCategoryClick(item.category)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 opacity-0 animate-slide-in-left game-card-hover ${
                  activeCategory === item.category
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 neon-glow"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground hover:text-primary"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 lg:ml-0 p-8 space-y-12">
          {!isSearching && (
            <>
              {activeCategory === "all" ? (
                <>
                  <section className="text-center py-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl blur-3xl" />
                    <div className="relative z-10">
                      <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift text-balance">
                        Welcome to BARNACLE
                      </h2>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Your ultimate gaming destination with the best collection of browser games. Play instantly, no
                        downloads required!
                      </p>
                    </div>
                  </section>

                  {/* Featured Games */}
                  <GameSection
                    title="🌟 Featured Games"
                    games={gameCategories.featured}
                    onGameClick={handleGameClick}
                    delay={0}
                  />

                  {/* Popular Games */}
                  <GameSection
                    title="🔥 Popular Games"
                    games={gameCategories.popular}
                    onGameClick={handleGameClick}
                    delay={0.2}
                  />

                  {/* Arcade Games */}
                  <GameSection
                    title="🕹️ Arcade Classics"
                    games={gameCategories.arcade}
                    onGameClick={handleGameClick}
                    delay={0.4}
                  />

                  {/* Multiplayer Games */}
                  <GameSection
                    title="👥 Multiplayer Games"
                    games={gameCategories.multiplayer}
                    onGameClick={handleGameClick}
                    delay={0.6}
                  />

                  {/* Puzzle Games */}
                  <GameSection
                    title="🧩 Puzzle & Strategy"
                    games={gameCategories.puzzle}
                    onGameClick={handleGameClick}
                    delay={0.8}
                  />

                  {/* More Games */}
                  <GameSection
                    title="🎮 More Games"
                    games={gameCategories.more}
                    onGameClick={handleGameClick}
                    delay={1.0}
                    showAll={true}
                  />
                </>
              ) : (
                <section className="pt-8">
                  <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {sidebarItems.find((item) => item.category === activeCategory)?.label} Games
                  </h2>
                  <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {getGamesForCategory()?.map((game, index) => (
                      <button
                        key={`category-${game.name}-${index}`}
                        onClick={() => handleGameClick(game.route)}
                        className="group relative p-6 glass-effect rounded-2xl font-semibold text-card-foreground cursor-pointer overflow-hidden opacity-0 translate-y-4 animate-fade-up game-card-hover border border-border/30 hover:border-primary/50"
                        style={{
                          animationDelay: `${index * 0.05}s`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />

                        <div className="absolute top-3 right-3 text-xs px-3 py-1.5 bg-muted/80 backdrop-blur-sm rounded-full text-muted-foreground border border-border/30">
                          {game.category}
                        </div>

                        <div className="relative z-10 mt-6">
                          <span className="text-sm md:text-base text-balance block leading-relaxed">{game.name}</span>
                        </div>

                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 neon-glow" />
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* ... existing search results section ... */}
          {isSearching && (
            <section className="pt-8">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Search Results for "{searchQuery}"</h2>
              {searchResults.length > 0 ? (
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {searchResults.map((game, index) => (
                    <button
                      key={`search-${game.name}-${index}`}
                      onClick={() => handleGameClick(game.route)}
                      className="group relative p-6 glass-effect rounded-2xl font-semibold text-card-foreground cursor-pointer overflow-hidden opacity-0 translate-y-4 animate-fade-up game-card-hover border border-border/30 hover:border-primary/50"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />

                      <div className="absolute top-3 right-3 text-xs px-3 py-1.5 bg-muted/80 backdrop-blur-sm rounded-full text-muted-foreground border border-border/30">
                        {game.category}
                      </div>

                      <div className="relative z-10 mt-6">
                        <span className="text-sm md:text-base text-balance block leading-relaxed">{game.name}</span>
                      </div>

                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 neon-glow" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">No games found</h3>
                  <p className="text-muted-foreground">
                    Try searching for something else or browse our categories above.
                  </p>
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// ... existing GameSection component ...
function GameSection({
  title,
  games,
  onGameClick,
  delay = 0,
  showAll = false,
}: {
  title: string
  games: Game[]
  onGameClick: (route: string) => void
  delay?: number
  showAll?: boolean
}) {
  const displayGames = showAll ? games : games.slice(0, 6)

  return (
    <section className="opacity-0 animate-stagger-fade-in" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-foreground">{title}</h3>
        {!showAll && games.length > 6 && (
          <button className="text-primary hover:text-secondary transition-all duration-300 font-medium text-lg hover:scale-105">
            View all →
          </button>
        )}
      </div>

      <div
        className={`grid gap-6 ${showAll ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"}`}
      >
        {displayGames.map((game, index) => (
          <button
            key={game.name}
            onClick={() => onGameClick(game.route)}
            className="group relative p-6 glass-effect rounded-2xl font-semibold text-card-foreground cursor-pointer overflow-hidden opacity-0 translate-y-4 animate-fade-up game-card-hover border border-border/30 hover:border-primary/50"
            style={{
              animationDelay: `${delay + index * 0.05}s`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />

            <div className="absolute top-3 right-3 text-xs px-3 py-1.5 bg-muted/80 backdrop-blur-sm rounded-full text-muted-foreground border border-border/30">
              {game.category}
            </div>

            <div className="relative z-10 mt-6">
              <span className="text-sm md:text-base text-balance block leading-relaxed">{game.name}</span>
            </div>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 neon-glow" />
          </button>
        ))}
      </div>
    </section>
  )
}
