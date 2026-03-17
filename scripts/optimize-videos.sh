#!/bin/bash

# Video optimization script for high-quality web videos
# Requires ffmpeg to be installed

echo "🎬 Starting video optimization..."

# Create optimized versions directory if it doesn't exist
mkdir -p public/optimized

# Function to optimize video
optimize_video() {
    local input_file="$1"
    local output_name="$2"
    
    echo "📹 Processing: $input_file"
    
    # Extract a poster frame (at 2 seconds)
    ffmpeg -i "$input_file" -ss 00:00:02 -vframes 1 -q:v 2 "public/${output_name}-poster.jpg" -y
    
    # Create optimized MP4 (H.264)
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset medium \
        -crf 23 \
        -maxrate 2M \
        -bufsize 4M \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        "public/optimized/${output_name}.mp4" -y
    
    # Create WebM version for better compression
    ffmpeg -i "$input_file" \
        -c:v libvpx-vp9 \
        -crf 30 \
        -b:v 1M \
        -maxrate 1.5M \
        -bufsize 3M \
        -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
        -c:a libopus \
        -b:a 96k \
        "public/optimized/${output_name}.webm" -y
    
    echo "✅ Completed: $output_name"
}

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: ffmpeg is not installed"
    echo "Install with: brew install ffmpeg (macOS) or apt install ffmpeg (Ubuntu)"
    exit 1
fi

# Optimize existing videos
if [ -f "public/mlm.mp4" ]; then
    optimize_video "public/mlm.mp4" "mlm"
fi

if [ -f "public/tinashe.mp4" ]; then
    optimize_video "public/tinashe.mp4" "tinashe"
fi

if [ -f "public/video.mp4" ]; then
    optimize_video "public/video.mp4" "video"
fi

if [ -f "public/raga.mp4" ]; then
    optimize_video "public/raga.mp4" "raga"
fi

echo "🎉 Video optimization complete!"
echo "📊 File size comparison:"
echo "Original files:"
ls -lh public/*.mp4 | grep -E "(mlm|tinashe|video|raga)\.mp4$"
echo ""
echo "Optimized files:"
ls -lh public/optimized/ 2>/dev/null || echo "No optimized files found"

echo ""
echo "💡 Next steps:"
echo "1. Move optimized files to your public directory"
echo "2. Update video paths in your components to use optimized versions"
echo "3. Consider using a CDN like Cloudflare or AWS CloudFront"