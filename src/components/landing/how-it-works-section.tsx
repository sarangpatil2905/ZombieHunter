import { Scan, Cpu, AlertTriangle, Shield } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Scan,
    title: "Scan & Discover",
    description: "Connect your infrastructure and our AI automatically discovers all API endpoints across your systems.",
    color: "text-neon-cyan",
    borderColor: "border-neon-cyan/30"
  },
  {
    step: "02",
    icon: Cpu,
    title: "Analyze & Classify",
    description: "Machine learning models analyze traffic patterns, usage metrics, and security posture of each endpoint.",
    color: "text-primary",
    borderColor: "border-primary/30"
  },
  {
    step: "03",
    icon: AlertTriangle,
    title: "Detect Threats",
    description: "Identify zombie APIs, vulnerable endpoints, and potential attack paths with risk scoring.",
    color: "text-neon-red",
    borderColor: "border-neon-red/30"
  },
  {
    step: "04",
    icon: Shield,
    title: "Protect & Monitor",
    description: "Take action on findings with quarantine options and continuous real-time monitoring.",
    color: "text-neon-green",
    borderColor: "border-neon-green/30"
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How ZombieHunter Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined pipeline from discovery to protection in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-neon-cyan via-primary via-neon-red to-neon-green opacity-30 transform -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className={`glass rounded-2xl p-6 border ${step.borderColor} h-full`}>
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-4xl font-bold ${step.color} opacity-30`}>
                      {step.step}
                    </span>
                    <div className={`p-3 rounded-xl bg-secondary/50`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
