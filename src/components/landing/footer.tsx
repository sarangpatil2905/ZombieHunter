import { Link } from "react-router-dom"
import { Shield, Github, Twitter, Linkedin } from "lucide-react"

const links = [
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pricing", href: "#" },
  { label: "API Docs", href: "#" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Support", href: "#" },
  { label: "Status", href: "#" },
  { label: "Security", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookie Policy", href: "#" }
]

const socialLinks = [
  { icon: Github, href: "https://github.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" }
]

export function Footer() {
  return (
    <footer className=" bg-black text-white px-6 py-16 shadow-inner">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">

          {/* Logo */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-white" />
              <span className="text-xl font-bold tracking-wide">ZombieHunter</span>
            </div>
            <p className="text-sm text-gray-400">
              AI-powered API security platform
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-gray-400">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                <social.icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center md:text-right">
            © {new Date().getFullYear()} ZombieHunter. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  )
}