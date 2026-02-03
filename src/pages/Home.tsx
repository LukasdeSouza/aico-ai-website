import { motion } from "framer-motion";
import { Link } from "wouter";
import { SiGithub, SiGitlab, SiGnubash } from "react-icons/si";
import { Check, Terminal, Play, Settings, GitBranch, Shield, Zap, Lock, Code2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Fade in animation variant
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const copyToClipboard = () => {
    const text = "npm install -g aico-ai";
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The installation command has been copied.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/aico-ai-logo-overall.png" alt="Aico AI Logo" className="w-18 h-18 object-contain" />
            <span className="font-display font-bold text-xl tracking-tight">Aico AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <Link href="/documentation" className="hover:text-primary transition-colors">Documentation</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <a href="#comparison" className="hover:text-primary transition-colors">Comparison</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/LukasdeSouza/aico-ai" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <SiGithub className="w-5 h-5" />
            </a>
            <Link href="/documentation">
              <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 font-semibold cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <img src="/assets/aico-ai-logo-withouth-text.png" alt="Aico AI Shield" className="w-24 h-24 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(0,229,188,0.3)]" />
          </motion.div>

          <motion.h1
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
          >
            Your Intelligent Code <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Quality Gatekeeper</span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Elevate your code quality, security, and consistency with AI-powered reviews, custom team rules, and robust vulnerability scanning. Seamlessly integrated into your workflow.
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={copyToClipboard}
              className="h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 font-semibold hover:cursor-pointer w-full sm:w-auto shadow-[0_0_20px_rgba(0,229,188,0.2)]"
            >
              {copied ? "Copied!" : "Get Started"}
              <span className="ml-2 opacity-70 text-xs font-mono bg-black/20 px-2 py-0.5 rounded flex items-center gap-2">
                npm install -g aico-ai
                <Copy className="w-3 h-3" />
              </span>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base hover:cursor-pointer border-white/10 hover:bg-white/5 hover:text-white w-full sm:w-auto"
              onClick={() => window.open("https://github.com/LukasdeSouza/aico-ai", '_blank')}>
              <SiGithub className="mr-2 w-5 h-5" />
              View on GitHub
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Unleash Superior Code with <br />
              <span className="text-primary">Aico AI's Core Features</span>
            </h2>
          </div>

          <div 
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            <div data-aos="fade-up" data-aos-delay="100">
              <FeatureCard
                icon="/assets/icon-brain.png"
                title="AI-Powered Code Review"
                description="Semantic analysis, multi-provider AI, and one-click auto-fixes. Catches logic errors before they merge."
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <FeatureCard
                icon="/assets/icon-rules.png"
                title="Custom Team Rules"
                description="Define naming conventions, complexity limits, and enforce forbidden patterns across your entire team."
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <FeatureCard
                icon="/assets/icon-security.png"
                title="Security Vulnerability Scanning"
                description="Detect hardcoded secrets, SQL injection, XSS, and more with comprehensive CWE mapping."
              />
            </div>
            <div data-aos="fade-up" data-aos-delay="400">
              <FeatureCard
                icon="/assets/icon-cicd.png"
                title="CI/CD & Git Hooks"
                description="Automate reviews, integrate with GitHub Actions, GitLab CI, and Husky for pre-commit checks."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quickstart" className="py-24 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Get Started in Minutes</h2>
            <p className="text-muted-foreground text-lg">Aico AI integrates seamlessly into your existing development workflow.</p>
          </div>

          <div className="space-y-8">
            <div data-aos="fade-right" data-aos-delay="100">
              <Step
                number="1"
                title="Install Aico AI"
                description="Globally recommended for easy access."
                icon={<Terminal className="w-6 h-6 text-primary" />}
                code="npm install -g aico-ai"
              />
            </div>
            <div data-aos="fade-right" data-aos-delay="200">
              <Step
                number="2"
                title="Initialize Aico"
                description="Run our interactive wizard to configure your AI provider and settings."
                icon={<Settings className="w-6 h-6 text-primary" />}
                code="aico init"
              />
            </div>
            <div data-aos="fade-right" data-aos-delay="300">
              <Step
                number="3"
                title="Start Reviewing & Protecting"
                description="Stage your changes and let Aico AI do the heavy lifting."
                icon={<Play className="w-6 h-6 text-primary" />}
                code={`git add .\naico review`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Why Aico AI? <br />
              <span className="text-muted-foreground text-3xl md:text-4xl font-normal">Beyond Traditional Tooling</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Discover how Aico AI offers a superior, integrated solution for modern development teams.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div data-aos="zoom-in" data-aos-delay="100">
              <ComparisonColumn
                title="Vs. IDE Extensions"
                points={[
                  { title: "Team-First", desc: "Enforce shared standards across all developers." },
                  { title: "IDE-Agnostic", desc: "Works with any editor, everywhere." },
                  { title: "Enforceable", desc: "Block commits/pushes to maintain quality." }
                ]}
              />
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <ComparisonColumn
                title="Vs. Traditional Linters"
                points={[
                  { title: "AI-Powered", desc: "Understands code context and intent, not just syntax." },
                  { title: "Semantic Analysis", desc: "Catches deeper issues linters miss." },
                  { title: "Built-in Security", desc: "Integrated vulnerability detection, not just style." }
                ]}
                highlight
              />
            </div>
            <div data-aos="zoom-in" data-aos-delay="300">
              <ComparisonColumn
                title="Vs. Code Review Platforms"
                points={[
                  { title: "Lightweight & Fast", desc: "No server setup, local execution, instant feedback." },
                  { title: "Flexible AI", desc: "Choose your provider (Groq, OpenAI) or Ollama for data control." },
                  { title: "Cost Effective", desc: "Pay for your own tokens, no per-seat SaaS markup." }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/assets/aico-ai-logo-overall.png" alt="Aico AI" className="w-32 h-32 opacity-80" />
            {/* <span className="text-muted-foreground font-display font-medium">Aico AI</span> */}
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <Link href="/documentation" className="hover:text-primary transition-colors">Documentation</Link>
            <a href="https://github.com/LukasdeSouza/aico-ai/issues" className="hover:text-primary transition-colors">Report an Issue</a>
            <a href="mailto:lucasdesouzasilva112@gmail.com" className="hover:text-primary transition-colors">Contact Us</a>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-xs">License: ISC</span>
            <a href="https://github.com/LukasdeSouza/aico-ai" className="hover:text-white transition-colors"><SiGithub className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="text-center text-xs text-white/20 mt-8">
          Built with ❤️ by @deveprogramar
        </div>
      </footer>
    </div>
  );
}

// Sub-components

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <motion.div
      variants={fadeIn}
      className="group bg-card hover:bg-card/80 border border-white/5 hover:border-primary/50 transition-all duration-300 p-8 rounded-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 w-16 h-16 rounded-xl bg-background/50 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform duration-300">
          <img src={icon} alt={title} className="w-10 h-10 object-contain" />
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function Step({ number, title, description, icon, code }: { number: string, title: string, description: string, icon: React.ReactNode, code: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row gap-6 md:items-start"
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-card border border-primary/20 flex items-center justify-center text-primary font-bold text-xl relative z-10">
          {number}
        </div>
        <div className="w-px h-full bg-white/10 my-2 absolute md:static left-6 top-12 -z-0 md:hidden" />
      </div>

      <div className="flex-grow grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {icon}
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="bg-[#0B1120] rounded-lg border border-white/5 p-4 font-mono text-sm shadow-inner relative group">
          <div className="absolute top-3 right-3 flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
          <div className="mt-4 text-primary">
            {code.split('\n').map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-white/30 select-none">$</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComparisonColumn({ title, points, highlight = false }: { title: string, points: { title: string, desc: string }[], highlight?: boolean }) {
  return (
    <div className={`p-8 rounded-2xl border ${highlight ? 'bg-card border-primary/30 relative' : 'bg-transparent border-transparent'} transition-all`}>
      {highlight && <div className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none" />}

      <h3 className="text-2xl font-display font-bold text-white mb-8 border-b border-white/10 pb-4">{title}</h3>

      <ul className="space-y-6 relative z-10">
        {points.map((point, i) => (
          <li key={i} className="flex gap-3 items-start">
            <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <div>
              <strong className="block text-white font-medium mb-1">{point.title}</strong>
              <span className="text-sm text-muted-foreground leading-relaxed block">{point.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
