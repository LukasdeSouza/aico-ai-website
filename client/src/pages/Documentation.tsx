import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft, 
  FileText, 
  Terminal, 
  Shield, 
  Cpu, 
  BookOpen,
  Github,
  ExternalLink,
  Layers,
  Zap,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  {
    title: "Introduction",
    icon: <BookOpen className="w-4 h-4" />,
    items: ["Welcome", "Why Aico AI?", "Core Concepts"]
  },
  {
    title: "Getting Started",
    icon: <Zap className="w-4 h-4" />,
    items: ["Installation", "Initialization", "Quick Start"]
  },
  {
    title: "Core Features",
    icon: <Cpu className="w-4 h-4" />,
    items: ["AI Code Review", "Custom Team Rules", "Vulnerability Scanning", "CI/CD Integration"]
  },
  {
    title: "Configuration",
    icon: <Layers className="w-4 h-4" />,
    items: ["aico.config.json", "AI Providers", "Rule Definitions"]
  },
  {
    title: "Security",
    icon: <Shield className="w-4 h-4" />,
    items: ["Data Privacy", "Ollama (Local AI)", "Encryption"]
  }
];

export default function Documentation() {
  return (
    <div className="flex h-screen bg-[#0B1120] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <img src="/assets/logo-shield.png" alt="Logo" className="w-6 h-6" />
            <span className="font-display font-bold text-lg text-white tracking-tight">Aico AI Docs</span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="space-y-6">
            {sidebarItems.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between group ${
                        item === "Installation" ? "bg-primary/10 text-primary font-medium" : "hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item}
                      <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${item === "Installation" ? "opacity-100" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-sm h-9"
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              v1.0.4
            </Button>
            <Separator orientation="vertical" className="h-4 bg-white/10" />
            <a href="https://github.com/LukasdeSouza/aico-ai" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-8 py-12 flex gap-12">
            <div className="flex-1">
              <div className="mb-10">
                <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                  <span>Getting Started</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-primary">Installation</span>
                </nav>
                <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Installation</h1>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Learn how to install and set up Aico AI in your development environment. Aico AI is distributed as an NPM package and can be used globally or locally within a project.
                </p>
              </div>

              <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    System Requirements
                  </h2>
                  <p>Before installing Aico AI, ensure you have the following requirements met:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    <li><strong className="text-slate-200">Node.js:</strong> Version 18.0.0 or higher</li>
                    <li><strong className="text-slate-200">NPM/Yarn/PNPM:</strong> Any modern package manager</li>
                    <li><strong className="text-slate-200">Git:</strong> Installed and configured in your shell</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Global Installation</h2>
                  <p className="mb-4">For most users, we recommend installing Aico AI globally to access the <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">aico</code> command from anywhere.</p>
                  <div className="bg-[#1E293B] rounded-xl border border-white/5 overflow-hidden">
                    <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Bash</span>
                      <Button variant="ghost" size="sm" className="h-7 text-[10px] text-slate-400 hover:text-white">Copy</Button>
                    </div>
                    <div className="p-5 font-mono text-sm">
                      <div className="flex gap-3">
                        <span className="text-slate-600 select-none">$</span>
                        <span className="text-primary">npm install -g aico-ai</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Local Installation
                  </h2>
                  <p className="mb-4">If you prefer to keep dependencies scoped to your project or use them in CI/CD pipelines:</p>
                  <div className="bg-[#1E293B] rounded-xl border border-white/5 overflow-hidden">
                    <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Bash</span>
                      <Button variant="ghost" size="sm" className="h-7 text-[10px] text-slate-400 hover:text-white">Copy</Button>
                    </div>
                    <div className="p-5 font-mono text-sm">
                      <div className="flex gap-3">
                        <span className="text-slate-600 select-none">$</span>
                        <span className="text-primary">npm install --save-dev aico-ai</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-primary font-bold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Next Steps
                  </h3>
                  <p className="text-sm text-slate-300">Once installed, you should initialize your project configuration by running <code className="bg-primary/20 text-primary px-1 rounded">aico init</code> in your terminal.</p>
                </section>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-16 pt-8 border-t border-white/5 flex justify-between">
                <Link href="/" className="group flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Previous</span>
                  <span className="text-white group-hover:text-primary transition-colors flex items-center gap-2 font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Welcome
                  </span>
                </Link>
                <button className="group flex flex-col items-end gap-1 text-right">
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Next</span>
                  <span className="text-white group-hover:text-primary transition-colors flex items-center gap-2 font-medium">
                    Initialization
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>

            {/* Table of Contents (On this page) */}
            <aside className="w-56 hidden xl:block shrink-0 pt-4 sticky top-20 self-start">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">On this page</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors text-primary border-l-2 border-primary pl-3 -ml-[2px]">Requirements</a></li>
                <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Global Installation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Local Installation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Troubleshooting</a></li>
              </ul>
              
              <div className="mt-10 pt-10 border-t border-white/5">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 border-white/10 hover:bg-white/5 text-slate-300">
                  <ExternalLink className="w-3 h-3" />
                  Edit on GitHub
                </Button>
              </div>
            </aside>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
