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
      <div className="glass-card p-6 flex flex-col items-center justify-center text-muted-foreground h-full min-h-[200px]">
        <Newspaper className="h-8 w-8 mb-2 opacity-50" />
        <p>No recent news available.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Recent News</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {news.map((article, idx) => (
          <a 
            key={idx} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-border/50">
              {article.image && (
                <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted">
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
                  <h4 className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                    {article.text}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {article.site}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.publishedDate)}
                    </span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
