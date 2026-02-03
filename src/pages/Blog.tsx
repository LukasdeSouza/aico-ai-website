import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ChevronRight, Mail } from "lucide-react";

export const blogPosts = [
  {
    slug: "vibe-coding-revolution",
    title: "Vibe Coding: How AI is Changing the Way We Build",
    excerpt: "Forget the syntax struggle. Vibe coding is about flow, intent, and letting AI handle the details. Here is how Aico AI keeps your vibes secure.",
    date: "February 12, 2024",
    readTime: "4 min read",
    author: "Lucas Silva",
    content: (
      <>
        <p>
          There is a shift happening in software development. We are moving away from the days of memorizing obscure syntax and fighting with semicolons, towards an era of <strong>Vibe Coding</strong>.
        </p>
        <p>
          Vibe coding isn't just about using AI; it's about a workflow where the developer acts as the conductor, and AI tools play the instruments. You define the intent, the architecture, and the "vibe" of the feature, and tools like GitHub Copilot or Cursor generate the implementation.
        </p>
        
        <h3>The Risk of Vibing Too Hard</h3>
        <p>
          The problem with generating code at the speed of thought is that it's easy to introduce subtle bugs, security vulnerabilities, or simply code that doesn't match your team's style. When you accept an AI suggestion without fully vetting it because it "looks right," you are incurring technical debt.
        </p>
        
        <h3>Aico AI: The Vibe Check</h3>
        <p>
          This is where <strong>Aico AI</strong> enters the chat. Think of Aico as your automated vibe check. It sits in your terminal, ready to review your staged changes before you commit.
        </p>
        <p>
          Unlike traditional linters that complain about spacing, Aico looks at the <em>semantics</em> of your code.
        </p>
        <ul>
            <li><strong>Intent Verification:</strong> Does the code actually do what the commit message says?</li>
            <li><strong>Security Guardrails:</strong> Did that AI snippet introduce a potential SQL injection?</li>
            <li><strong>Team Alignment:</strong> Is this code consistent with how the rest of the team writes React components?</li>
        </ul>

        <h3>Flow State Preserved</h3>
        <p>
          The best part? Aico is fast. With providers like <strong>Groq</strong>, you get feedback in seconds. You don't have to break your flow to wait for a CI pipeline to fail 10 minutes later. You get instant feedback, fix it with one click, and keep vibing.
        </p>
      </>
    )
  },
  {
    slug: "understanding-aico-context",
    title: "Under the Hood: How Aico AI Understands Your Code",
    excerpt: "Aico isn't just a linter. It uses semantic analysis to understand the 'why' behind your code changes. Let's dive into the library context.",
    date: "February 10, 2024",
    readTime: "6 min read",
    author: "Aico Team",
    content: (
      <>
        <p>
          We often get asked: "How is Aico different from ESLint?" The answer lies in <strong>Context</strong>.
        </p>
        <p>
          Traditional static analysis tools parse your code into an Abstract Syntax Tree (AST). They are incredibly fast and accurate for syntax errors, but they struggle with <em>meaning</em>. They can tell you that a variable is unused, but they can't tell you that your variable naming is confusing or that your logic has a race condition.
        </p>

        <h3>The Library Context</h3>
        <p>
          Aico AI leverages Large Language Models (LLMs) to perform <strong>Semantic Analysis</strong>. When you run <code>aico review</code>, we don't just send the diff. We construct a context window that helps the AI understand:
        </p>
        <ul>
            <li>The changes you made (the git diff).</li>
            <li>The surrounding code (to understand scope).</li>
            <li>Your custom <strong>Team Rules</strong> (defined in <code>.aico/rules.json</code>).</li>
        </ul>

        <h3>Vulnerability Detection</h3>
        <p>
          Security is often about context. A hardcoded string might be a harmless constant, or it might be an API key. Aico uses pattern matching combined with AI inference to detect:
        </p>
        <ul>
            <li><strong>Hardcoded Secrets:</strong> API keys, tokens, passwords.</li>
            <li><strong>Injection Attacks:</strong> SQLi, XSS, Command Injection.</li>
            <li><strong>Insecure Dependencies:</strong> Integrating with npm audit.</li>
        </ul>

        <h3>Local-First Privacy</h3>
        <p>
          We understand that code is sensitive. That's why Aico supports <strong>Ollama</strong> out of the box. You can run powerful models like Llama 3 locally on your machine. Your code never leaves your hardware, giving you the ultimate privacy while still benefiting from AI-powered reviews.
        </p>
        <p>
            Whether you are using the cloud speed of Groq or the local privacy of Ollama, Aico adapts to your context.
        </p>
      </>
    )
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-primary/20 selection:text-primary">
        <nav className="border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                 <Link href="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>
                <span className="font-display font-bold text-lg text-white tracking-tight">Aico AI Blog</span>
            </div>
        </nav>

        <main className="container mx-auto px-6 py-16 max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Latest Updates</h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">Insights, tutorials, and announcements from the Aico AI team.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col"
                        >
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                                <span className="text-4xl">📝</span>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                                <p className="text-slate-400 mb-6 flex-1">{post.excerpt}</p>
                                <div className="flex items-center text-primary font-medium text-sm mt-auto">
                                    Read Article <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-24 p-8 md:p-12 bg-white/5 border border-white/5 rounded-3xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white mb-3">Subscribe to our newsletter</h2>
                        <p className="text-slate-400">
                            Get the latest updates on Aico AI, vibe coding trends, and code quality tips delivered straight to your inbox.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex-1 max-w-md">
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    required
                                />
                                <button 
                                    type="submit"
                                    className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap cursor-pointer"
                                >
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 text-center md:text-left">
                                We care about your data in our <span className="text-slate-400 underline cursor-pointer">privacy policy</span>.
                            </p>
                        </form>
                    </div>
                </div>
            </motion.div>
        </main>
    </div>
  );
}