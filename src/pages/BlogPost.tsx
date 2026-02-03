import { useRoute, Link } from "wouter";
import { blogPosts } from "./Blog";
import { ArrowLeft, Calendar, Clock, User, Link as LinkIcon, Check, ChevronRight } from "lucide-react";
import NotFound from "./not-found";
import { SiX, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  if (!match) return <NotFound />;

  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) return <NotFound />;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out "${post.title}" on Aico AI Blog`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Link copied", description: "Article link copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans selection:bg-primary/20 selection:text-primary">
         <nav className="border-b border-white/5 bg-[#0B1120]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                 <Link href="/blog" className="flex items-center gap-2 text-white hover:text-primary transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Blog</span>
                </Link>
                <span className="font-display font-bold text-lg text-white tracking-tight">Aico AI Blog</span>
            </div>
        </nav>

        <article className="container mx-auto px-6 py-16 max-w-3xl">
            <header className="mb-12 text-center">
                <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">{post.title}</h1>
                <div className="flex items-center justify-center gap-2 text-slate-400">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-white prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded prose-pre:bg-[#1E293B] prose-pre:border prose-pre:border-white/5">
                {post.content}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">Share this article</h3>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 hover:bg-white/5 hover:text-white gap-2 cursor-pointer"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    >
                        <SiX className="w-4 h-4" />
                        X
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 hover:bg-white/5 hover:text-white gap-2 cursor-pointer"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    >
                        <SiLinkedin className="w-4 h-4" />
                        LinkedIn
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 hover:bg-white/5 hover:text-white gap-2 cursor-pointer"
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                        {copied ? "Copied" : "Copy Link"}
                    </Button>
                </div>
            </div>

            {relatedPosts.length > 0 && (
                <div className="mt-16 pt-12 border-t border-white/5">
                    <h3 className="text-2xl font-display font-bold text-white mb-8">Related Posts</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedPosts.map((related) => (
                            <Link key={related.slug} href={`/blog/${related.slug}`}>
                                <div className="group cursor-pointer bg-white/5 border border-white/5 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {related.title}
                                    </h4>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                                        {related.excerpt}
                                    </p>
                                    <div className="flex items-center text-primary font-medium text-xs mt-auto">
                                        Read Article <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </article>
    </div>
  );
}