import { ExternalLink, Newspaper } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface NewsArticle {
  symbol: string;
  publishedDate: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}

interface NewsFeedProps {
  news?: NewsArticle[];
}

export function NewsFeed({ news }: NewsFeedProps) {
  if (!news || news.length === 0) {
    return (
      <div className="glass-card p-4 flex flex-col items-center justify-center text-muted-foreground h-full min-h-[160px]">
        <Newspaper className="h-6 w-6 mb-2 opacity-40 text-emerald-400" />
        <p className="text-xs">No recent news feeds available.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, h:mm a');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="glass-card p-4 h-full flex flex-col animate-fade-in space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Market Intelligence News
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          LIVE FEED
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[380px]">
        {news.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="flex gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-emerald-500/10 transition-all border border-white/5 hover:border-emerald-500/20">
              {article.image && (
                <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-slate-100 line-clamp-2 group-hover:text-emerald-300 transition-colors leading-tight">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    {article.text}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                      {article.site}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(article.publishedDate)}
                    </span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
