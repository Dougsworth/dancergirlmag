// src/lib/sanity/queries/playlists.ts
import { sanityFetch } from '../client';
import type { SanityPlaylist } from '../types';

const PLAYLIST_PROJECTION = `{
  _id,
  _type,
  title,
  slug,
  platform,
  playlistUrl,
  coverImage,
  description,
  tags
}`;

export async function getPlaylists(platform?: string): Promise<SanityPlaylist[]> {
  const filter = platform
    ? `*[_type == "playlist" && platform == $platform]`
    : `*[_type == "playlist"]`;
  const query = `${filter} | order(_createdAt desc) ${PLAYLIST_PROJECTION}`;
  return sanityFetch<SanityPlaylist[]>(query, platform ? { platform } : {});
}
