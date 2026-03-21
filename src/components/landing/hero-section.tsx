import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Eye } from "lucide-react"
import { NetworkGraph } from "./network-graph"

export function HeroSection() {
  return (
    <section className="pt-16 pb-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">

            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                AI-Powered Security Platform
              </span>
            </div> */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Detect{" "}
              <span className="text-primary">
                Zombie APIs
              </span>{" "}
              Before Attackers Do
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              AI-powered API security and risk detection platform. Discover
              vulnerable endpoints, visualize attack paths, and protect your
              enterprise systems in real-time.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="">
                <Link to="/dashboard" className="flex items-center">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">
                  View Dashboard
                </Link>
              </Button>
            </div>

            {/* <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-green" />
                <span className="text-sm text-muted-foreground">
                  Enterprise Ready
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-neon-cyan" />
                <span className="text-sm text-muted-foreground">
                  Real-time Monitoring
                </span>
              </div>
            </div> */}
          </div>

          <div className="relative">
            {/* Removed gradient glow background */}
            <div className="relative rounded-2xl ">
              <NetworkGraph />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}