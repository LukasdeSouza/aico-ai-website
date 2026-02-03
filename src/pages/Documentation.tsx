import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  Info,
  Check,
  Menu,
  X
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

function HighlightText({ text, highlight }: { text: string, highlight: string }) {
  if (!highlight.trim()) return <>{text}</>;
  
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-primary/20 text-primary rounded-[2px] font-medium">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

function FeedbackForm() {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitToFormspree = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mlglopnp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: "Feedback submitted",
          description: "Thank you for helping us improve our documentation!",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your feedback.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleYes = () => {
    setFeedback('yes');
    submitToFormspree({
      helpful: 'yes',
      page: window.location.pathname,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitToFormspree({
      helpful: 'no',
      comment: comment,
      page: window.location.pathname,
    });
  };

  if (submitted) {
    return (
      <div className="mt-16 pt-8 border-t border-white/5 text-center">
        <div className="p-6 rounded-lg bg-white/5 border border-primary/20 flex flex-col items-center gap-3">
          <Check className="w-8 h-8 text-primary" />
          <h4 className="text-lg font-semibold text-white">Thank you for your feedback!</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-8 border-t border-white/5">
      <h4 className="text-lg font-semibold text-white text-center mb-4">Was this page helpful?</h4>
      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant={feedback === 'yes' ? 'default' : 'outline'}
          onClick={handleYes}
          disabled={isSubmitting}
          className={`border-white/10 ${feedback === 'yes' ? 'bg-primary' : 'hover:bg-white/5'}`}
        >
          Yes
        </Button>
        <Button
          variant={feedback === 'no' ? 'default' : 'outline'}
          onClick={() => setFeedback('no')}
          disabled={isSubmitting}
          className={`border-white/10 ${feedback === 'no' ? 'bg-destructive text-destructive-foreground' : 'hover:bg-white/5'}`}
        >
          No
        </Button>
      </div>

      {feedback === 'no' && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How can we improve this page?" className="w-full p-3 bg-white/5 border border-white/10 rounded-md text-sm focus:ring-primary focus:border-primary transition-colors" rows={3} required disabled={isSubmitting} />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </motion.form>
      )}
    </div>
  );
}

export default function Documentation() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tocItems, setTocItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  
  const getActivePage = (path: string) => {
    if (path.includes("team-rules")) return "Team Rules Guide";
    if (path.includes("ci-cd-integration")) return "CI/CD Integration";
    if (path.includes("initialization")) return "Initialization";
    if (path.includes("quick-start")) return "Quick Start";
    if (path.includes("security")) return "Security";
    if (path.includes("ai-providers")) return "AI Providers";
    if (path.includes("installation")) return "Installation";
    return "Welcome";
  };

  const activePage = getActivePage(location);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code snippet copied successfully.",
    });
  };

  const filteredSidebarItems = sidebarItems.map((section) => {
    const matchesSection = section.title.toLowerCase().includes(searchQuery.toLowerCase());
    const filteredItems = section.items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchesSection) return section;
    if (filteredItems.length > 0) {
      return { ...section, items: filteredItems };
    }
    return null;
  }).filter((item): item is typeof sidebarItems[0] => item !== null);

  const getItemHref = (item: string) => {
    if (item === "Team Rules Guide") return "/documentation/team-rules";
    if (item === "Welcome") return "/documentation/welcome";
    if (item === "Installation") return "/documentation/installation";
    if (item === "CI/CD Integration") return "/documentation/ci-cd-integration";
    if (item === "Initialization") return "/documentation/initialization";
    if (item === "Quick Start") return "/documentation/quick-start";
    if (item === "Vulnerability Scanning") return "/documentation/security";
    if (item === "AI Providers") return "/documentation/ai-providers";
    if (item === "Why Aico AI?") return "/documentation/welcome";
    if (item === "Core Concepts") return "/documentation/welcome";
    if (item === "AI Code Review") return "/documentation/quick-start";
    if (item === "Custom Team Rules") return "/documentation/team-rules";
    if (item === "aico.config.json") return "/documentation/initialization";
    if (item === "Rule Definitions") return "/documentation/team-rules";
    if (item === "Data Privacy") return "/documentation/security";
    if (item === "Ollama (Local AI)") return "/documentation/ai-providers";
    if (item === "Encryption") return "/documentation/security";
    return "/documentation";
  };

  const SidebarList = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="space-y-6">
      {filteredSidebarItems.map((section, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {section.icon}
            <span><HighlightText text={section.title} highlight={searchQuery} /></span>
          </div>
          <div className="space-y-1">
            {section.items.map((item, itemIdx) => {
              const href = getItemHref(item);
              return (
                <button
                  key={itemIdx}
                  onClick={() => {
                    setLocation(href);
                    onLinkClick?.();
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between group ${
                    item === activePage ? "bg-primary/10 text-primary font-medium" : "hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <HighlightText text={item} highlight={searchQuery} />
                  <ChevronRight className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${item === activePage ? "opacity-100" : ""}`} />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0B1120] text-slate-300 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B1120] lg:hidden flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <span className="font-display font-bold text-lg text-white tracking-tight">Aico AI Docs</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 px-4 py-6">
            <SidebarList onLinkClick={() => setIsMobileMenuOpen(false)} />
          </ScrollArea>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="mt-6 flex items-center gap-3">
            {/* <img src="/assets/aico-ai-logo-withouth-text.png" alt="Logo" className="w-8 h-8" /> */}
            <span className="font-display font-bold text-lg text-white tracking-tight">Aico AI Docs</span>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <SidebarList />
        </ScrollArea>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="lg:hidden mr-4">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Search documentation..." 
              className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-sm h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              v1.1.1
            </Button>
            <Separator orientation="vertical" className="h-4 bg-white/10" />
            <a href="https://github.com/LukasdeSouza/aico-ai" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12 flex gap-12">
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

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">🏆 Why Choose Aico?</h2>
                    <div className="space-y-6">
                      <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                        <h3 className="text-lg font-semibold text-white mb-3">vs. IDE Extensions (Copilot, Cursor)</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Team-First:</strong> Shared standards across all developers</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>IDE-Agnostic:</strong> Works with any editor</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Git-Native:</strong> Integrates at the git level</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Enforceable:</strong> Can block commits/pushes</span></li>
                        </ul>
                      </div>
                      
                      <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                        <h3 className="text-lg font-semibold text-white mb-3">vs. Traditional Linters (ESLint, Prettier)</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>AI-Powered:</strong> Understands context and intent</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Semantic Analysis:</strong> Beyond syntax checking</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Security Scanning:</strong> Built-in vulnerability detection</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Auto-Fix:</strong> AI suggests and applies fixes</span></li>
                        </ul>
                      </div>

                      <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                        <h3 className="text-lg font-semibold text-white mb-3">vs. Code Review Tools (SonarQube, Codacy)</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Lightweight:</strong> No server setup required</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Fast:</strong> Local execution, instant feedback</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Flexible:</strong> Multiple AI providers</span></li>
                          <li className="flex gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> <span><strong>Privacy:</strong> Local-first option with Ollama</span></li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
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
                  <section>
                    <h2 id="overview" className="text-2xl font-bold text-white mb-4">Overview</h2>
                    <p>
                      Team Rules allow you to define and enforce custom code quality standards that are specific to your team or project. Unlike generic linting tools, Aico's Team Rules integrate with AI-powered reviews to provide context-aware feedback that aligns with your team's conventions.
                    </p>
                  </section>

                  <section>
                    <h2 id="quick-start" className="text-2xl font-bold text-white mb-4">Quick Start</h2>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">1. Initialize Team Rules</h3>
                        <CodeBlock code="aico rules init" onCopy={copyCode} />
                        <p className="text-sm text-slate-400 mt-2">This creates a <code className="text-primary bg-primary/10 px-1 rounded">.aico/rules.json</code> file with a default template.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">2. Customize Your Rules</h3>
                        <p className="mb-2">Edit <code className="text-primary bg-primary/10 px-1 rounded">.aico/rules.json</code> to match your team's standards:</p>
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
    },
    "forbidden": [
      {
        "pattern": "console\\\\.log",
        "severity": "warn",
        "message": "Remove console.log before committing"
      }
    ]
  }
}`} 
                          onCopy={copyCode} 
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">3. Validate Your Code</h3>
                        <CodeBlock 
                          code={`# Validate staged changes
aico rules validate

# Or run during normal review (rules are automatically applied)
aico review`} 
                          onCopy={copyCode} 
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">4. List Active Rules</h3>
                        <CodeBlock code="aico rules list" onCopy={copyCode} />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 id="configuration-reference" className="text-2xl font-bold text-white mb-4">📋 Configuration Reference</h2>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Complete Configuration Structure</h3>
                    <CodeBlock 
                      language="json"
                      code={`{
  "version": "1.0",
  "description": "Team code quality standards",
  "rules": {
    "naming": { /* Naming conventions */ },
    "complexity": { /* Complexity limits */ },
    "forbidden": [ /* Forbidden patterns */ ],
    "required": [ /* Required patterns */ ],
    "security": { /* Security rules */ }
  },
  "ignore": [ /* Files to ignore */ ],
  "teamStandards": { /* Team-specific standards */ },
  "aiPromptEnhancement": { /* AI integration */ }
}`} 
                      onCopy={copyCode} 
                    />
                  </section>

                  <section>
                    <h2 id="forbidden-patterns" className="text-2xl font-bold text-white mb-4">Forbidden Patterns</h2>
                    <p>Block specific code patterns using JavaScript-compatible regex:</p>
                    <CodeBlock 
                      language="json"
                      code={`{
  "rules": {
    "forbidden": [
      {
        "pattern": "console\\\\.log",
        "severity": "warn",
        "message": "Remove console.log before committing.",
        "exclude": ["*.test.js", "*.spec.ts"]
      },
      {
        "pattern": "debugger",
        "severity": "error",
        "message": "Remove debugger statement"
      }
    ]
  }
}`} 
                      onCopy={copyCode} 
                    />
                  </section>

                  <section>
                    <h2 id="security-rules" className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Security Rules
                    </h2>
                    <p>Enable built-in security checks to catch common vulnerabilities:</p>
                    <CodeBlock 
                      language="json"
                      code={`{
  "rules": {
    "security": {
      "noHardcodedSecrets": true,
      "noEval": true,
      "noInnerHTML": true,
      "requireInputValidation": true
    }
  }
}`} 
                      onCopy={copyCode} 
                    />
                  </section>

                  <section>
                    <h2 id="best-practices" className="text-2xl font-bold text-white mb-4">Best Practices</h2>
                    <ul className="space-y-4 text-slate-400">
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">01.</span>
                        <div>
                          <strong className="text-white block">Start Simple</strong>
                          Begin with a few critical rules (like forbidding <code className="text-xs bg-white/10 px-1 rounded">console.log</code> and <code className="text-xs bg-white/10 px-1 rounded">debugger</code>) and expand gradually.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">02.</span>
                        <div>
                          <strong className="text-white block">Use Appropriate Severity</strong>
                          Use <code className="text-xs bg-white/10 px-1 rounded">error</code> for critical issues that must block commits, and <code className="text-xs bg-white/10 px-1 rounded">warn</code> for best practices.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">03.</span>
                        <div>
                          <strong className="text-white block">Version Control Your Rules</strong>
                          Commit <code className="text-xs bg-white/10 px-1 rounded">.aico/rules.json</code> to your repository so the entire team uses the same standards.
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
              </div>
            ) : activePage === "CI/CD Integration" ? (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Core Features</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">CI/CD Integration</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">CI/CD Integration Guide</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Complete guide for integrating Aico AI into your CI/CD pipelines to automate code quality checks.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                    <p className="text-slate-400">
                      The <code className="text-primary bg-primary/10 px-1 rounded">aico ci</code> command enables automated code quality checks in CI/CD pipelines with:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400 mt-4">
                      <li><strong className="text-slate-200">Multiple output formats</strong> (JSON, XML, GitHub Actions, Text)</li>
                      <li><strong className="text-slate-200">Configurable exit codes</strong> (fail on errors, warnings, or specific severity)</li>
                      <li><strong className="text-slate-200">File output support</strong> (save reports for artifacts)</li>
                      <li><strong className="text-slate-200">Severity filtering</strong> (focus on specific issue types)</li>
                      <li><strong className="text-slate-200">Team rules integration</strong> (combines AI review + custom rules)</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">Basic Usage</h3>
                        <CodeBlock 
                          code={`# Run CI review with default text output
aico ci

# Run with JSON output
aico ci --format json

# Save report to file
aico ci --format json --output report.json

# Fail pipeline on errors
aico ci --fail-on-error

# Fail pipeline on warnings or errors
aico ci --fail-on-warn`} 
                          onCopy={copyCode} 
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Command Reference</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-400 border-collapse">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-3 px-4 text-white font-semibold">Option</th>
                            <th className="py-3 px-4 text-white font-semibold">Description</th>
                            <th className="py-3 px-4 text-white font-semibold">Example</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5">
                            <td className="py-3 px-4 font-mono text-primary">--format &lt;type&gt;</td>
                            <td className="py-3 px-4">Output format: json, xml, github, text</td>
                            <td className="py-3 px-4 font-mono">--format json</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-3 px-4 font-mono text-primary">--output &lt;file&gt;</td>
                            <td className="py-3 px-4">Save output to file</td>
                            <td className="py-3 px-4 font-mono">--output report.json</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-3 px-4 font-mono text-primary">--fail-on-error</td>
                            <td className="py-3 px-4">Exit with code 1 if errors found</td>
                            <td className="py-3 px-4 font-mono">--fail-on-error</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">GitHub Actions Integration</h2>
                    <p className="text-slate-400 mb-4">Copy <code className="text-primary bg-primary/10 px-1 rounded">.github/workflows/aico-review.yml</code> to your repository:</p>
                    <CodeBlock 
                      language="yaml"
                      code={`name: Aico Code Review

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  code-review:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Aico AI
        run: npm install -g aico-ai
      
      - name: Run Aico Review
        env:
          GROQ_API_KEY: \${{ secrets.GROQ_API_KEY }}
        run: |
          git add -A
          aico ci --format json --output aico-report.json --fail-on-error
      
      - name: Upload Report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: aico-report
          path: aico-report.json`} 
                      onCopy={copyCode} 
                    />
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">GitLab CI Integration</h2>
                    <p className="text-slate-400 mb-4">Copy <code className="text-primary bg-primary/10 px-1 rounded">.gitlab-ci.yml</code> to your repository:</p>
                    <CodeBlock 
                      language="yaml"
                      code={`stages:
  - code-quality

aico-review:
  stage: code-quality
  image: node:18
  
  before_script:
    - npm install -g aico-ai
  
  script:
    - git add -A
    - aico ci --format json --output aico-report.json --fail-on-error
  
  artifacts:
    when: always
    paths:
      - aico-report.json
    reports:
      junit: aico-report.xml
    expire_in: 30 days
  
  only:
    - merge_requests
    - main
    - develop
  
  variables:
    GROQ_API_KEY: $GROQ_API_KEY`} 
                      onCopy={copyCode} 
                    />
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
                    <ul className="space-y-4 text-slate-400">
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">01.</span>
                        <div>
                          <strong className="text-white block">Use Appropriate Failure Thresholds</strong>
                          Use <code className="text-xs bg-white/10 px-1 rounded">--fail-on-error</code> for strict checks and <code className="text-xs bg-white/10 px-1 rounded">--fail-on-warn</code> for higher quality bars.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary font-bold">02.</span>
                        <div>
                          <strong className="text-white block">Save Reports as Artifacts</strong>
                          Always save reports (JSON/XML) to artifacts so you can review them later if the pipeline fails.
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
              </div>
            ) : activePage === "Initialization" ? (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Getting Started</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">Initialization</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Initialization</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Configure Aico AI for your environment and set up your preferred AI provider.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Interactive Setup</h2>
                    <p className="text-slate-400">Run the initialization wizard to configure Aico globally:</p>
                    <CodeBlock code="aico init" onCopy={copyCode} />
                    
                    <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/5">
                      <h3 className="text-lg font-semibold text-white mb-4">What happens during init?</h3>
                      <ul className="space-y-3 text-slate-400">
                        <li className="flex gap-3 items-start">
                          <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">1</span>
                          </div>
                          <span><strong>Select AI Provider:</strong> Choose between Groq, OpenAI, DeepSeek, Gemini, or Ollama.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">2</span>
                          </div>
                          <span><strong>Configure API Key:</strong> Securely save your API key (stored in <code>~/.aicorc</code>).</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">3</span>
                          </div>
                          <span><strong>Select Model:</strong> Choose the specific model (e.g., gpt-4o, llama-3.3-70b).</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">4</span>
                          </div>
                          <span><strong>Git Hooks:</strong> Optionally install pre-push hooks for automatic reviews.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-white mb-4">Example Output</h3>
                      <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-slate-300 border border-white/5">
                        <div className="text-primary mb-2">? Which AI provider would you like to use?</div>
                        <div className="pl-4 text-white">❯ Groq (Fast & Free tier)</div>
                        <div className="pl-4 text-slate-500">  OpenAI (GPT-4o, etc.)</div>
                        <div className="pl-4 text-slate-500">  DeepSeek (Powerful & Cheap)</div>
                        <div className="pl-4 text-slate-500">  Ollama (Local & Private)</div>
                        <div className="pl-4 text-slate-500">  Google Gemini</div>
                        <br/>
                        <div className="text-primary">? Enter your groq API Key:</div> <span className="text-slate-500">gsk_...</span>
                        <div className="text-primary">? Model name (default: llama-3.3-70b-versatile):</div> <span className="text-slate-500">[Enter]</span>
                        <div className="text-primary">? Would you like to setup Aico as a pre-push git hook?</div> <span className="text-slate-500">Yes</span>
                        <br/>
                        <div className="text-green-400">✓ Configuration saved globally in ~/.aicorc for groq!</div>
                        <div className="text-green-400">✓ Husky pre-push hook configured!</div>
                      </div>
                    </div>
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
              </div>
            ) : activePage === "Quick Start" ? (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Getting Started</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">Quick Start</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Quick Start</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Start reviewing code and generating commits in seconds.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. AI Code Review</h2>
                    <p className="text-slate-400 mb-4">Stage your changes and run a review:</p>
                    <CodeBlock 
                      code={`git add .
aico review`} 
                      onCopy={copyCode} 
                    />
                    <p className="text-sm text-slate-400 mt-2">Aico will analyze the diff, check for bugs, security issues, and team rule violations.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Generate Commit Messages</h2>
                    <p className="text-slate-400 mb-4">Let AI write your Conventional Commits:</p>
                    <CodeBlock code="aico commit" onCopy={copyCode} />
                    <div className="mt-4 p-4 bg-black/20 rounded-lg border border-white/5 font-mono text-sm text-slate-400">
                      <p className="text-primary mb-2"># Output example:</p>
                      <p>feat(auth): add JWT token validation middleware</p>
                      <p className="mt-2 text-slate-500">? What would you like to do?</p>
                      <p className="pl-4 text-white">❯ Accept and commit</p>
                      <p className="pl-4">  Edit message</p>
                      <p className="pl-4">  Regenerate</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Security Scan</h2>
                    <p className="text-slate-400 mb-4">Run a standalone security audit:</p>
                    <CodeBlock code="aico security scan" onCopy={copyCode} />
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
              </div>
            ) : activePage === "Security" ? (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Core Features</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">Security</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">Security Scanning</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Detect vulnerabilities in your code and dependencies before they reach production.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                    <p className="text-slate-400">Aico's security engine combines static analysis with AI to detect:</p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <strong className="text-white block mb-1">Code Vulnerabilities</strong>
                        <span className="text-sm text-slate-400">SQL Injection, XSS, Command Injection, Path Traversal.</span>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <strong className="text-white block mb-1">Secrets Detection</strong>
                        <span className="text-sm text-slate-400">Hardcoded API keys, passwords, and tokens.</span>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <strong className="text-white block mb-1">Dependency Audit</strong>
                        <span className="text-sm text-slate-400">Integrates with npm/yarn/pnpm audit.</span>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <strong className="text-white block mb-1">Configuration Issues</strong>
                        <span className="text-sm text-slate-400">Insecure defaults, debug modes enabled.</span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Commands</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Full Scan</h3>
                        <CodeBlock code="aico security scan" onCopy={copyCode} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Generate Report</h3>
                        <CodeBlock code="aico security scan --output report.json" onCopy={copyCode} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Specific Checks</h3>
                        <CodeBlock 
                          code={`aico security check --dependencies
aico security check --code`} 
                          onCopy={copyCode} 
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Security Report</h3>
                        <p className="text-slate-400 mb-2">Generate a detailed JSON report:</p>
                        <CodeBlock code="aico security report" onCopy={copyCode} />
                        
                        <div className="mt-4">
                          <p className="text-sm text-slate-400 mb-2">Report Structure:</p>
                          <CodeBlock 
                            language="json"
                            code={`{
  "timestamp": "2024-01-15T10:30:00Z",
  "summary": {
    "total": 5,
    "critical": 1,
    "high": 2,
    "moderate": 2,
    "low": 0
  },
  "dependencies": [...],
  "codeVulnerabilities": [...],
  "recommendations": [...]
}`} 
                            onCopy={copyCode} 
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
              </div>
            ) : activePage === "AI Providers" ? (
              <div className="flex-1">
                <div className="mb-10">
                  <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <span>Configuration</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">AI Providers</span>
                  </nav>
                  <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">AI Providers</h1>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    Configure your preferred AI backend. Aico supports both cloud and local options.
                  </p>
                </div>

                <div className="space-y-10 prose prose-invert prose-slate max-w-none">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Supported Providers</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-400 border-collapse">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="py-3 px-4 text-white font-semibold">Provider</th>
                            <th className="py-3 px-4 text-white font-semibold">Speed</th>
                            <th className="py-3 px-4 text-white font-semibold">Cost</th>
                            <th className="py-3 px-4 text-white font-semibold">Privacy</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5">
                            <td className="py-3 px-4 font-medium text-white">Groq</td>
                            <td className="py-3 px-4">⚡⚡⚡</td>
                            <td className="py-3 px-4">Free Tier</td>
                            <td className="py-3 px-4">Cloud</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-3 px-4 font-medium text-white">OpenAI</td>
                            <td className="py-3 px-4">⚡⚡</td>
                            <td className="py-3 px-4">Paid</td>
                            <td className="py-3 px-4">Cloud</td>
                          </tr>
                          <tr className="border-b border-white/5">
                            <td className="py-3 px-4 font-medium text-white">Ollama</td>
                            <td className="py-3 px-4">⚡</td>
                            <td className="py-3 px-4">Free</td>
                            <td className="py-3 px-4 text-primary">Local</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Environment Variables</h2>
                    <p className="text-slate-400 mb-4">You can override configuration using environment variables:</p>
                    <CodeBlock 
                      code={`export GROQ_API_KEY="gsk_..."
export OPENAI_API_KEY="sk-..."
export AICO_PROVIDER="groq"`} 
                      onCopy={copyCode} 
                    />
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
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

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Install from GitHub Packages</h2>
                    <p className="text-slate-400 mb-4">Prerequisites: You need a GitHub Personal Access Token with <code>read:packages</code> scope.</p>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">1. Configure npm</h3>
                    <CodeBlock 
                      code={`echo "@lukasddesouza:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc`} 
                      onCopy={copyCode} 
                    />

                    <h3 className="text-lg font-semibold text-white mb-2 mt-4">2. Install Package</h3>
                    <CodeBlock code="npm install -g @lukasddesouza/aico-ai" onCopy={copyCode} />
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Verify Installation</h2>
                    <CodeBlock code="aico --version" onCopy={copyCode} />
                  </section>
                </div>
                <PageNavigation activePage={activePage} setLocation={setLocation} />
                <FeedbackForm />
              </div>
            )}

            {/* TOC */}
            <aside className="w-56 hidden xl:block shrink-0 pt-4 sticky top-20 self-start">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">On this page</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {tocItems.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                    <a 
                      href={`#${item.id}`} 
                      className={`block transition-colors border-l-2 pl-3 -ml-[2px] ${
                        activeSection === item.id 
                          ? "text-primary border-primary" 
                          : "text-slate-400 hover:text-primary border-transparent"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        setActiveSection(item.id);
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

function CodeBlock({ code, language = "bash", onCopy }: { code: string, language?: string, onCopy: (c: string) => void }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (isCopied) return;
    onCopy(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-[#1E293B] rounded-xl border border-white/5 overflow-hidden group">
      <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{language}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCopy}
          className="h-7 px-2 text-[10px] text-slate-400 hover:text-white"
        >
          {isCopied ? (
            <div className="flex items-center text-primary">
              <Check className="w-3 h-3 mr-1" />
              <span>Copied!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Copy className="w-3 h-3 mr-1" />
              <span>Copy</span>
            </div>
          )}
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
