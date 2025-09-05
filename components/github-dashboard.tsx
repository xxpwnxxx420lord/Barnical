"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  Star,
  Eye,
  GitFork,
  Calendar,
  Code,
  Users,
  TrendingUp,
} from "lucide-react"

export function GitHubDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="text-center space-y-4 animate-fade-in-up">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
          BARNACLE
        </h1>
        <p className="text-xl text-muted-foreground">GitHub Developer Dashboard</p>
      </header>

      {/* Profile Section */}
      <Card className="animate-fade-in-up hover:scale-[1.02] transition-all duration-300 animate-pulse-glow">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/developer-avatar.png" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">BC</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">Barnacle Developer</CardTitle>
              <CardDescription className="text-lg">Full-Stack Developer & Game Enthusiast</CardDescription>
              <div className="flex space-x-2 mt-2">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                  <Users className="w-4 h-4 mr-1" />
                  1.2K Followers
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  <GitBranch className="w-4 h-4 mr-1" />
                  42 Repositories
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Commits", value: "2,847", icon: GitCommit, color: "text-chart-1" },
          { title: "Pull Requests", value: "156", icon: GitPullRequest, color: "text-chart-2" },
          { title: "Stars Earned", value: "892", icon: Star, color: "text-chart-3" },
          { title: "Contributions", value: "365", icon: TrendingUp, color: "text-chart-4" },
        ].map((stat, index) => (
          <Card
            key={stat.title}
            className="animate-fade-in-up hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="repositories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card">
          <TabsTrigger
            value="repositories"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Repositories
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Activity
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="repositories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "barnacle-games",
                description: "A collection of web-based games with smooth animations",
                language: "TypeScript",
                stars: 234,
                forks: 45,
                updated: "2 hours ago",
              },
              {
                name: "github-dashboard",
                description: "Modern GitHub dashboard with dark theme",
                language: "React",
                stars: 189,
                forks: 32,
                updated: "1 day ago",
              },
              {
                name: "animation-library",
                description: "Smooth CSS and JS animations for web apps",
                language: "CSS",
                stars: 156,
                forks: 28,
                updated: "3 days ago",
              },
              {
                name: "game-engine",
                description: "Lightweight 2D game engine for web browsers",
                language: "JavaScript",
                stars: 298,
                forks: 67,
                updated: "1 week ago",
              },
            ].map((repo, index) => (
              <Card
                key={repo.name}
                className="animate-fade-in-up hover:scale-[1.02] transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{repo.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {repo.language}
                    </Badge>
                  </div>
                  <CardDescription>{repo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {repo.forks}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {repo.updated}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest GitHub contributions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "Pushed to", repo: "barnacle-games", branch: "main", time: "2 hours ago" },
                { action: "Opened PR in", repo: "github-dashboard", branch: "feature/dark-theme", time: "1 day ago" },
                { action: "Created", repo: "animation-library", branch: "main", time: "3 days ago" },
                { action: "Merged PR in", repo: "game-engine", branch: "develop", time: "1 week ago" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <GitCommit className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="text-foreground">{activity.action}</span>{" "}
                      <span className="text-primary font-medium">{activity.repo}</span>
                      {activity.branch && (
                        <>
                          {" "}
                          on <span className="text-secondary font-medium">{activity.branch}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Barnacle Gaming Platform",
                status: "In Progress",
                progress: 75,
                description: "Complete gaming platform with user accounts and leaderboards",
              },
              {
                name: "Dark Theme UI Kit",
                status: "Completed",
                progress: 100,
                description: "Comprehensive dark theme components library",
              },
              {
                name: "Animation Framework",
                status: "Planning",
                progress: 25,
                description: "Next-generation web animation framework",
              },
            ].map((project, index) => (
              <Card
                key={project.name}
                className="animate-fade-in-up hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        project.status === "Completed"
                          ? "bg-chart-4 text-white"
                          : project.status === "In Progress"
                            ? "bg-chart-1 text-white"
                            : "border-chart-5 text-chart-5"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 animate-fade-in-up">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-all duration-300"
        >
          <Code className="w-5 h-5 mr-2" />
          View All Repositories
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300 bg-transparent"
        >
          <Eye className="w-5 h-5 mr-2" />
          Watch Activity
        </Button>
      </div>
    </div>
  )
}
