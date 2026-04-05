import article from "./article";
import dancerOfTheMonth from "./dancerOfTheMonth";
import editorLetter from "./editorLetter";
import event from "./event";
import founder from "./founder";
import video from "./video";
import heroSection from "./heroSection";

import blockContent from "./blockContent";
import customBlocks from "./customBlocks";

export const schemaTypes = [
  article,              // Stories, Money Moves, Choreographers Corner, Dancer: Speak Up
  dancerOfTheMonth,     // Dancer of the Month + Archive
  editorLetter,         // Letters from the Editor
  event,                // Events
  video,                // Videos
  founder,              // About page
  heroSection,          // Homepage hero video & caption

  blockContent,
  ...customBlocks,
];
