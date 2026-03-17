# 🎥 Video Setup Guide for DancerGirl Island Rhythms

This guide will help you add video data to your Watch screen using the terminal.

## Prerequisites

1. **Sanity Token Setup**
   - Go to https://www.sanity.io/manage
   - Select your "dancergirl-island-rhythms" project
   - Go to "API" tab
   - Create a new token with "Editor" permissions
   - Copy the token

## Step 1: Set Environment Variable

Replace `YOUR_TOKEN_HERE` with your actual Sanity token:

```bash
# Edit the .env file
echo "export SANITY_TOKEN=\"YOUR_TOKEN_HERE\"" > .env

# Source the environment file
source .env
```

## Step 2: Add Sample Videos

Run the existing sample video script:

```bash
node scripts/add-sample-videos.js
```

This will add 6 sample videos to your Sanity CMS.

## Step 3: Add Custom Videos

Run the custom video script:

```bash
node scripts/add-custom-videos.js
```

This will add 5 custom videos. To add your own videos:

1. **Edit the script**: Open `scripts/add-custom-videos.js`
2. **Modify the `customVideos` array**: Replace the video URLs with your actual YouTube/Vimeo URLs
3. **Update content**: Change titles, descriptions, and tags
4. **Run again**: `node scripts/add-custom-videos.js`

## Step 4: Verify in Sanity Studio

1. Go to your Sanity Studio
2. Navigate to "🎥 Media" → "Featured Videos"
3. You should see your videos listed

## Step 5: View on Website

1. Start your development server: `npm run dev`
2. Navigate to the Watch page
3. You should see your videos displayed

## Video Data Structure

Each video has these fields:

```javascript
{
  title: "Video Title",
  description: "Video description",
  videoUrl: "https://www.youtube.com/watch?v=...", // YouTube/Vimeo URL
  duration: 180, // Duration in seconds
  featured: true, // Whether it's featured
  tags: ["tag1", "tag2"], // Array of tags
  publishedAt: "2024-01-20T10:00:00Z" // ISO date string
}
```

## Troubleshooting

### Token Issues
- Make sure your SANITY_TOKEN is set correctly
- Verify the token has "Editor" permissions
- Check that the project ID matches your Sanity project

### Script Errors
- Ensure you're in the correct directory
- Check that all dependencies are installed
- Verify the Sanity client configuration

### No Videos Showing
- Check that videos were created in Sanity Studio
- Verify the video URLs are valid
- Ensure the Watch page is fetching data correctly

## Quick Commands

```bash
# Set token (replace with your actual token)
export SANITY_TOKEN="your-token-here"

# Add sample videos
node scripts/add-sample-videos.js

# Add custom videos
node scripts/add-custom-videos.js

# Start development server
npm run dev
```

## Video URL Examples

- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- Vimeo: `https://vimeo.com/VIDEO_ID`
- Other platforms: Use the direct video URL

## Duration Format

Duration should be in seconds:
- 3 minutes = 180 seconds
- 10 minutes = 600 seconds
- 15 minutes = 900 seconds

## Tags Suggestions

Common tags for dance videos:
- `soca`, `dancehall`, `caribbean`, `tutorial`
- `beginner`, `intermediate`, `advanced`
- `workout`, `cardio`, `fitness`
- `traditional`, `folk`, `cultural`
- `performance`, `showcase` 