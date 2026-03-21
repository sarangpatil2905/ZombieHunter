"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass ">
      <nav className="container mx-auto px-4 lg:px-8 border-b">
        <div className="flex items-center justify-between h-12">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/5">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg">ZombieHunter</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Stats
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
            <Button size="sm" className="" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">

              <a href="#features" onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>

              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>

              <a href="#stats" onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Stats
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    View Dashboard
                  </Link>
                </Button>
                <Button size="sm" className="glow-blue" asChild>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  )
}