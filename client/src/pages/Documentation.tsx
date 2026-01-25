import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  Terminal, 
  Shield, 
  Cpu, 
  BookOpen,
  Github,
  ExternalLink,
  Layers,
  Zap,
  Code2,
  Copy,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

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
    title: "Guides",
    icon: <Code2 className="w-4 h-4" />,
    items: ["Team Rules Guide"]
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
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const activePage = location.includes("team-rules") ? "Team Rules Guide" : (location.includes("welcome") || location === "/documentation" ? "Welcome" : "Installation");

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet copied successfully.",
    });
  };

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
                  {section.items.map((item, itemIdx) => {
                    let href = "/documentation";
                    if (item === "Team Rules Guide") href = "/documentation/team-rules";
                    if (item === "Welcome") href = "/documentation/welcome";
                    if (item === "Installation") href = "/documentation/installation";
                    
                    return (
                      <button
                        key={itemIdx}
                        onClick={() => setLocation(href)}
                        className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between group ${
                          item === activePage ? "bg-primary/10 text-primary font-medium" : "hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {item}
                        <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${item === activePage ? "opacity-100" : ""}`} />
                      </button>
                    );
                  })}
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
            {activePage === "Welcome" ? (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Introduction</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">Welcome</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Welcome to Aico AI</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Aico AI is a next-generation code quality gatekeeper designed for modern development teams. It goes beyond simple linting by leveraging advanced AI to understand the semantic intent and context of your code.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">What makes Aico AI different?</h2>
                    <p className="text-slate-400">Traditional tools focus on syntax and style. Aico AI focuses on <span className="text-white font-medium">correctness, security, and team alignment.</span></p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                      <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                        <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          Context-Aware
                        </h4>
                        <p className="text-xs text-slate-400 m-0">AI reviews that actually understand logic flows, not just missing semicolons.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                        <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Security-First
                        </h4>
                        <p className="text-xs text-slate-400 m-0">Built-in vulnerability scanning for XSS, SQLi, and hardcoded secrets.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                        <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          Team Standards
                        </h4>
                        <p className="text-xs text-slate-400 m-0">Enforce your team's specific naming and architecture rules with ease.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-white/5">
                        <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Zero Config
                        </h4>
                        <p className="text-xs text-slate-400 m-0">Get started in seconds with intelligent defaults that adapt to your stack.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Core Principles</h2>
                    <ul className="space-y-4 text-slate-400">
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">01.</span>
                        <div>
                          <strong className="text-white block">Speed without compromise</strong>
                          Local execution and multi-provider AI support (OpenAI, Groq, Ollama) ensure instant feedback.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">02.</span>
                        <div>
                          <strong className="text-white block">Developer Experience</strong>
                          Intuitive CLI and seamless integration with GitHub/GitLab CI/CD pipelines.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">03.</span>
                        <div>
                          <strong className="text-white block">Privacy Centric</strong>
                          Full support for local LLMs via Ollama for teams with strict data security requirements.
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            ) : activePage === "Team Rules Guide" ? (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Guides</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">Team Rules Guide</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Team Rules Guide</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Complete guide to using Aico's Team Rules feature for enforcing consistent code quality standards across your team.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                    <div className="flex gap-4">
                      <Info className="w-6 h-6 text-primary shrink-0" />
                      <p className="text-sm text-slate-300 m-0">
                        Team Rules allow you to define and enforce custom code quality standards that are specific to your team or project. Unlike generic linting tools, Aico's Team Rules integrate with AI-powered reviews to provide context-aware feedback.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">1. Initialize Team Rules</h3>
                        <CodeBlock code="aico rules init" onCopy={copyCode} />
                        <p className="text-sm text-slate-400 mt-2">This creates a <code className="text-primary bg-primary/10 px-1 rounded">.aico/rules.json</code> file with a default template.</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">2. Customize Your Rules</h3>
                        <CodeBlock 
                          language="json"
                          code={`{
  "version": "1.0",
  "rules": {
    "naming": {
      "functions": "camelCase",
      "classes": "PascalCase",
      "constants": "UPPER_SNAKE_CASE"
    },
    "complexity": {
      "maxFunctionLength": 50,
      "maxCyclomaticComplexity": 10
    }
  }
}`} 
                          onCopy={copyCode} 
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Security Rules
                    </h2>
                    <p className="mb-4">Enable built-in security checks to catch vulnerabilities early:</p>
                    <CodeBlock 
                      language="json"
                      code={`"security": {
  "noHardcodedSecrets": true,
  "noEval": true,
  "noInnerHTML": true,
  "requireInputValidation": true
}`} 
                      onCopy={copyCode} 
                    />
                    <ul className="mt-4 space-y-2 text-sm text-slate-400">
                      <li>• <strong className="text-slate-200">noHardcodedSecrets:</strong> Detects API keys and passwords</li>
                      <li>• <strong className="text-slate-200">noEval:</strong> Blocks dangerous eval() usage</li>
                    </ul>
                  </section>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Getting Started</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">Installation</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Installation</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Learn how to install and set up Aico AI in your development environment.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-primary" />
                      System Requirements
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                      <li><strong className="text-slate-200">Node.js:</strong> Version 18.0.0 or higher</li>
                      <li><strong className="text-slate-200">Git:</strong> Installed and configured</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Global Installation</h2>
                    <CodeBlock code="npm install -g aico-ai" onCopy={copyCode} />
                  </section>
                </div>
              </div>
            )}

            {/* TOC */}
            <aside className="w-56 hidden xl:block shrink-0 pt-4 sticky top-20 self-start">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">On this page</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {activePage === "Team Rules Guide" ? (
                  <>
                    <li><a href="#" className="hover:text-primary transition-colors text-primary border-l-2 border-primary pl-3 -ml-[2px]">Overview</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Quick Start</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Configuration</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Security Rules</a></li>
                  </>
                ) : (
                  <>
                    <li><a href="#" className="hover:text-primary transition-colors text-primary border-l-2 border-primary pl-3 -ml-[2px]">Requirements</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Global Installation</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors pl-3 border-l-2 border-transparent">Local Installation</a></li>
                  </>
                )}
              </ul>
            </aside>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

function CodeBlock({ code, language = "bash", onCopy }: { code: string, language?: string, onCopy: (c: string) => void }) {
  return (
    <div className="bg-[#1E293B] rounded-xl border border-white/5 overflow-hidden group">
      <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{language}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onCopy(code)}
          className="h-7 px-2 text-[10px] text-slate-400 hover:text-white"
        >
          <Copy className="w-3 h-3 mr-1" />
          Copy
        </Button>
      </div>
      <div className="p-5 font-mono text-sm overflow-x-auto whitespace-pre">
        <div className="flex gap-3">
          {language === "bash" && <span className="text-slate-600 select-none">$</span>}
          <span className="text-primary">{code}</span>
        </div>
      </div>
    </div>
  );
}
