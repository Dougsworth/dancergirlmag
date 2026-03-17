import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { urlFor, SanityPlaylist, SanityImage } from '@/lib/sanity';
import { useEffect, useState } from 'react';

interface PlaylistEmbedProps extends Omit<SanityPlaylist, '_id' | '_type'> {
  className?: string;
}

const platformIcons = {
  spotify: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1DB954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.3c-.21.36-.6.48-.96.3-2.64-1.62-5.94-1.98-9.84-1.08-.42.12-.78-.21-.9-.57-.12-.42.21-.78.57-.9 4.2-.96 7.8-.54 10.68 1.26.36.18.48.6.3.96v-.03zm1.44-3.12c-.27.36-.75.48-1.11.27-3.03-1.86-7.62-2.4-11.19-1.32-.45.12-.93-.12-1.05-.57-.12-.45.12-.93.57-1.05 4.2-1.23 9.27-.66 12.69 1.5.39.24.51.81.27 1.2l.03-.03zm.12-3.24c-3.6-2.13-9.51-2.34-12.96-1.29-.54.15-1.08-.15-1.23-.69-.15-.54.15-1.08.69-1.23 3.96-1.17 10.41-.93 14.52 1.5.48.27.66.9.39 1.38-.24.48-.87.66-1.35.36v-.03z" />
    </svg>
  ),
  apple: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  youtube: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
      <path d="M23.5 6.5c-.8 3.2-2.9 8-3.1 8.2-.1.1-.3.2-.5.2s-.4-.1-.5-.2c-.2-.2-2.3-5-3.1-8.2-.1-.3 0-.6.2-.8.2-.2.5-.3.8-.3h6c.3 0 .6.1.8.3.2.2.3.5.2.8z" />
      <path d="M15.5 14.7c0 .1 0 .2-.1.3l-6 3.1c-.1.1-.3.1-.4.1-.2 0-.3 0-.4-.1l-6-3.1c-.1-.1-.1-.2-.1-.3V6.8c0-.1 0-.2.1-.3l6-3.1c.1-.1.2-.1.4-.1s.3 0 .4.1l6 3.1c.1.1.1.2.1.3v7.9z" />
    </svg>
  )
};

// Helper function to generate embed code from URL
function generateEmbedCode(url: string, platform: 'spotify' | 'apple' | 'youtube'): string {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    
    switch (platform) {
      case 'spotify':
        // Extract playlist ID from Spotify URL
        const spotifyId = urlObj.pathname.split('/').pop();
        return `<iframe 
          src="https://open.spotify.com/embed/playlist/${spotifyId}" 
          width="100%" 
          height="400" 
          frameBorder="0" 
          allow="encrypted-media" 
          loading="lazy"
          style="border-radius: 12px; min-height: 400px;">
        </iframe>`;
        
      case 'youtube':
        // Extract video ID from YouTube URL
        const youtubeId = urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
        return `<iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/${youtubeId}?rel=0" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          style="border-radius: 12px;">
        </iframe>`;
        
      case 'apple':
        // Convert Apple Music URL to embed URL
        const appleEmbedUrl = url.replace('music.apple.com', 'embed.music.apple.com');
        return `<iframe 
          allow="autoplay *; encrypted-media *; fullscreen *" 
          frameborder="0" 
          height="450" 
          style="width:100%; max-width:100%; overflow:hidden; background:transparent; border-radius: 12px;" 
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
          src="${appleEmbedUrl}">
        </iframe>`;
        
      default:
        return '';
    }
  } catch (error) {
    console.error('Error generating embed code:', error);
    return '';
  }
}

// Helper function to safely get image URL
function getImageUrl(coverImage: SanityImage | undefined | null): string | null {
  if (!coverImage?.asset?._ref) return null;
  try {
    return urlFor(coverImage).width(600).height(400).url();
  } catch (error) {
    console.error('Error generating image URL:', error);
    return null;
  }
}

interface PlaylistEmbedProps {
  _id: string;
  title: string;
  platform: 'spotify' | 'apple' | 'youtube';
  playlistUrl: string;
  description?: string;
}

export function PlaylistEmbed({
  _id,
  title,
  platform,
  playlistUrl,
  description,
}: PlaylistEmbedProps) {
  const [embedHtml, setEmbedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (playlistUrl && platform) {
      setIsLoading(true);
      const code = generateEmbedCode(playlistUrl, platform);
      setEmbedHtml(code);
      setIsLoading(false);
    }
  }, [playlistUrl, platform]);

  return (
    <div 
      key={_id}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
        "flex flex-col h-full p-6"
      )}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      
      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="h-96 flex items-center justify-center bg-muted/20 rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : embedHtml ? (
          <div 
            className="w-full h-full min-h-[400px]"
            dangerouslySetInnerHTML={{ __html: embedHtml }}
          />
        ) : (
          <div className="h-96 bg-muted/20 rounded-xl flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
            <p className="mb-4">Could not load player</p>
            <Button
              variant="outline"
              onClick={() => window.open(playlistUrl, '_blank', 'noopener,noreferrer')}
            >
              Open in {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}