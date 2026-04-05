import { sanityFetch } from '../client';

export interface SanityHeroSection {
  _id: string;
  heroVideo?: { asset: { _ref: string; url: string } };
  heroVideoUrl?: string;
  captionHeading?: string;
  captionName: string;
  captionButtonText?: string;
  captionLinkUrl?: string;
  captionLinkResolved?: string;
  isActive: boolean;
}

export async function getActiveHero(): Promise<SanityHeroSection | null> {
  const query = `*[_type == "heroSection" && isActive == true][0] {
    _id,
    "heroVideo": heroVideo.asset->{ _ref, url },
    heroVideoUrl,
    captionHeading,
    captionName,
    captionButtonText,
    captionLinkUrl,
    "captionLinkResolved": select(
      defined(captionLink) => captionLink->slug.current,
      null
    ),
    "captionLinkType": select(
      defined(captionLink) => captionLink->_type,
      null
    ),
    isActive
  }`;

  try {
    const hero = await sanityFetch<SanityHeroSection & { captionLinkType?: string }>(query);
    if (!hero) return null;

    // Build the resolved URL from the reference
    if (hero.captionLinkResolved && (hero as any).captionLinkType) {
      const type = (hero as any).captionLinkType;
      const slug = hero.captionLinkResolved;
      if (type === 'dancerOfTheMonth') {
        hero.captionLinkResolved = `/dancers-of-the-month/${slug}`;
      } else if (type === 'article') {
        hero.captionLinkResolved = `/stories/${slug}`;
      }
    }

    return hero;
  } catch (error) {
    console.error('Error fetching active hero:', error);
    return null;
  }
}
