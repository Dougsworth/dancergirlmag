# Video Optimization Guide

## 🚀 Quick Start

Your videos were loading slowly because they're large (3-14MB) and not optimized for web. Here's how to fix it:

## 1. Run the Optimization Script

```bash
# Install ffmpeg if not installed
brew install ffmpeg  # macOS
# or
sudo apt install ffmpeg  # Ubuntu/Linux

# Run the optimization script
./scripts/optimize-videos.sh
```

This will:
- ✅ Create optimized MP4 files (60-80% smaller)
- ✅ Generate WebM versions (even smaller, modern format)  
- ✅ Extract poster frames for instant display
- ✅ Add proper web optimization settings

## 2. Best Practices Implemented

### Multiple Formats
```html
<video>
  <source src="video.webm" type="video/webm">  <!-- Try this first -->
  <source src="video.mp4" type="video/mp4">    <!-- Fallback -->
</video>
```

### Lazy Loading
- Videos only load when scrolled into view
- Saves bandwidth and improves page load time

### Loading States
- Loading spinner while video loads
- Error handling if video fails
- Poster images show instantly

## 3. Video Hosting Alternatives

### Option A: Self-hosted with CDN
```javascript
// Use a CDN like Cloudflare or AWS CloudFront
const videoUrl = "https://cdn.yoursite.com/videos/dance.mp4"
```

### Option B: Video Hosting Services
```javascript
// Vimeo (no YouTube branding, better control)
<iframe src="https://player.vimeo.com/video/123456789?background=1" />

// Wistia (professional, expensive)
<iframe src="https://fast.wistia.net/embed/iframe/abc123?videoFoam=true" />
```

### Option C: Modern Solutions
```javascript
// Cloudinary (automatic optimization)
const cloudinaryUrl = "https://res.cloudinary.com/yourcloud/video/upload/q_auto,f_auto/video.mp4"

// Mux (built for developers)
<MuxPlayer playbackId="your-playback-id" />
```

## 4. Performance Tips

### Preload Strategy
```javascript
preload="metadata"  // Load video info only (recommended)
preload="none"      // Don't preload (mobile-friendly)
preload="auto"      // Load entire video (avoid for large files)
```

### Mobile Optimization
```javascript
playsInline={true}  // Prevents fullscreen on iOS
muted={true}        // Required for autoplay on mobile
```

### Compression Settings
- **CRF 23**: Good quality/size balance for MP4
- **CRF 30**: Smaller WebM files
- **1080p max**: Anything higher is usually overkill for web

## 5. File Size Targets

| Duration | Target Size | Quality |
|----------|-------------|---------|
| 10s      | 1-2MB      | High    |
| 30s      | 3-5MB      | High    |
| 60s      | 8-12MB     | High    |

## 6. Implementation in Your Code

The HeroSection now includes:
- ✅ WebM + MP4 support
- ✅ Loading states
- ✅ Error handling  
- ✅ Poster images
- ✅ Optimized preloading

## 7. Testing Your Videos

```bash
# Check current file sizes
ls -lh public/*.mp4

# Test video quality
open public/optimized/mlm.mp4

# Check network usage in browser dev tools
# Network tab > reload page > look for video requests
```

## 8. Next Steps

1. **Optimize existing videos**: Run the script
2. **Update file paths**: Point to optimized versions
3. **Add CDN**: Consider Cloudflare for global delivery
4. **Monitor performance**: Use tools like GTmetrix or PageSpeed Insights

## 🎯 Expected Results

After optimization:
- ⚡ **3-5x faster loading**
- 📱 **Better mobile experience** 
- 🌐 **Broader browser support**
- 💾 **60-80% smaller files**
- 🔄 **Smooth video transitions**