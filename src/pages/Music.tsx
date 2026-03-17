import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaylistEmbed } from '@/components/PlaylistEmbed';
import { getPlaylists, SanityPlaylist } from '@/lib/sanity';
import { PageLayout } from '@/components/PageLayout';

export default function Music() {
  const [playlists, setPlaylists] = useState<SanityPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'spotify' | 'apple' | 'youtube'>('all');

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const data = await getPlaylists();
        setPlaylists(data || []);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        setError('Failed to load playlists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const filteredPlaylists = activeFilter === 'all' 
    ? playlists 
    : playlists.filter(playlist => playlist.platform === activeFilter);

  if (error) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-6">Music Playlists</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my curated playlists across different platforms. Perfect for dancing, working out, or just relaxing.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['all', 'spotify', 'apple', 'youtube'].map((platform) => (
            <button
              key={platform}
              onClick={() => setActiveFilter(platform as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === platform
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="aspect-[4/5] w-full rounded-lg" />
            ))}
          </div>
        ) : filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <PlaylistEmbed
                key={playlist._id}
                {...playlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No playlists found for this platform.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
