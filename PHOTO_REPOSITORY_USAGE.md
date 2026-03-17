# Photo Repository Usage Guide

Your Sanity backend now has a **Photo Repository** that allows you to upload, organize, and pull photos easily.

## What You Get

### In Sanity Studio:
- **Photo Repository** section where you can:
  - Upload photos with descriptive titles
  - Categorize photos (Dancer Portraits, Performance Photos, etc.)
  - Add tags for easy searching
  - Mark photos as featured
  - Add photographer credits
  - Write descriptions/notes

## How to Use Photos in Your Code

### Import the functions:
```typescript
import { 
  getPhotosFromRepository, 
  getDancerPortraits, 
  getPerformancePhotos,
  getFeaturedPhotos,
  searchPhotosByTags 
} from "@/lib/sanity";
```

### Common Usage Examples:

#### Get all dancer portraits:
```typescript
const portraits = await getDancerPortraits(10); // Get 10 portrait photos
```

#### Get performance photos:
```typescript
const performancePhotos = await getPerformancePhotos(15);
```

#### Get featured photos:
```typescript
const featuredPhotos = await getFeaturedPhotos(5);
```

#### Search by tags:
```typescript
const modernDancePhotos = await searchPhotosByTags(['modern', 'contemporary']);
```

#### Get photos by category:
```typescript
const backstagePhotos = await getPhotosByCategory('behind-scenes', 8);
```

#### Get random photos for variety:
```typescript
const randomPhotos = await getRandomPhotos(5); // Any category
const randomPortraits = await getRandomPhotos(3, 'portraits'); // Only portraits
```

## Categories Available:
- **portraits** - Dancer Portraits
- **performance** - Performance Photos  
- **behind-scenes** - Behind the Scenes
- **events** - Events
- **choreographers** - Choreographers
- **rehearsals** - Rehearsals
- **competitions** - Competitions
- **studio** - Studio Sessions
- **editorial** - Editorial/Articles
- **assets** - Website Assets
- **other** - Other

## Using Photos in Components:
```typescript
import { urlFor } from "@/lib/sanity";

const MyComponent = () => {
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    const loadPhotos = async () => {
      const dancerPhotos = await getDancerPortraits(5);
      setPhotos(dancerPhotos);
    };
    loadPhotos();
  }, []);

  return (
    <div>
      {photos.map((photo) => (
        <img 
          key={photo._id}
          src={urlFor(photo.image).width(400).height(300).url()}
          alt={photo.title}
          title={photo.description}
        />
      ))}
    </div>
  );
};
```

## Benefits:
- ✅ **Easy photo management** in Sanity Studio
- ✅ **Organized by categories** and tags
- ✅ **Search functionality** 
- ✅ **No frontend gallery needed** - just backend storage
- ✅ **Pull photos dynamically** in any component
- ✅ **Professional photo organization**

Now you can upload all your photos to Sanity and pull them into any part of your website as needed!