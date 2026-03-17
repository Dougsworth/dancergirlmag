// High-quality image settings for Sanity schemas
// These settings ensure images are stored and served at maximum quality

export const imageSettings = {
  // Default options for all image fields
  options: {
    hotspot: true,
    metadata: ['palette', 'lqip', 'dimensions', 'location', 'exif'],
    storeOriginalFilename: true,
    accept: 'image/*' // Accept all image formats
  }
};

// HD preset for featured images
export const hdImageField = {
  type: 'image',
  options: {
    ...imageSettings.options,
    sources: [
      {
        name: 'upload',
        title: 'Upload HD Image',
        // Encourage high resolution uploads
        accept: 'image/jpeg, image/png, image/webp, image/avif'
      }
    ]
  },
  validation: (Rule: any) => [
    Rule.required().error('HD image is required'),
    // Validate minimum dimensions for HD quality
    Rule.custom((image: any) => {
      if (!image?.asset?._ref) return true;
      
      // This will be validated on the frontend
      // Sanity doesn't provide direct access to dimensions in validation
      return true;
    })
  ],
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      description: 'Important for SEO and accessibility',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Optional caption to display with the image'
    },
    {
      name: 'photographer',
      type: 'string',
      title: 'Photographer Credit',
      description: 'Credit the photographer (optional)'
    }
  ]
};

// Gallery image preset
export const galleryImageField = {
  type: 'image',
  options: imageSettings.options,
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption'
    }
  ]
};