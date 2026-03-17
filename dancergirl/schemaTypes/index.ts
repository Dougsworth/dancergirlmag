// CORE CONTENT TYPES - Used by active frontend pages
import article from "./article";
import artist from "./artist";
import author from "./author";
import category from "./category";
import event from "./event";
import video from "./video";
import choreographer from "./choreographer";
import founder from "./founder";
import quote from "./quote";
import dancerOfTheMonth from "./dancerOfTheMonth";
import editorLetter from "./editorLetter";
import playlist from "./playlist";
import featuredStory from "./featuredStory";

// INTERNATIONALIZATION SUPPORT
import customBlocks from "./customBlocks";
import internationalizedString from "./internationalizedString";
import internationalizedText from "./internationalizedText";
import internationalizedBlockContent from "./internationalizedBlockContent";

// UNUSED/DEPRECATED SCHEMAS - These are not actively used by any frontend pages:
// import tutorial from "./tutorial";          // No active route, Tutorials.tsx exists but no route in App.tsx
// import trendingStory from "./trendingStory"; // Not used in current frontend
// import featuredVideo from "./featuredVideo"; // Not used in current frontend
// import heroVideo from "./heroVideo";         // Not used in current frontend
// import registration from "./registration";   // No registration functionality active
// import ad from "./ad";                       // No ads in current frontend
// import podcastAd from "./podcastAd";         // No podcast ads in current frontend

export const schemaTypes = [
  // Primary content types
  article,              // Used by: /stories, /choreographers-corner, /dancer-speak-up
  featuredStory,        // Used by: Homepage featured sections, StoryDetail fallback
  artist,               // Used by: /dancers
  choreographer,        // Used by: /choreographers-corner
  event,                // Used by: /events
  video,                // Used by: HeroSection, /watch (coming soon), /music
  playlist,             // Used by: /music page
  editorLetter,         // Used by: /editor-letters, /newsletter
  dancerOfTheMonth,     // Used by: /dancers-of-the-month
  
  // Supporting types
  author,               // Referenced by articles and editor letters
  category,             // Referenced by articles/events for organization
  founder,              // Used by: /about page
  quote,                // Used throughout site for testimonials
  
  // Internationalization
  internationalizedString,
  internationalizedText,
  internationalizedBlockContent,
  ...customBlocks
];
