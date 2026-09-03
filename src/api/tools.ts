// ============================================================
// MimicPhoto API & Data Layer
// ============================================================

import type {
  Tool,
  ToolCategoryGroup,
  PricingPlan,
  CreditCostItem,
  FeatureItem,
  FAQItem,
  ApiResponse,
} from '@/types/index'

// ---------- Tool Data ----------

const imageTools: Tool[] = [
  {
    id: 'face-expression-editor',
    name: 'Face Expression Editor',
    slug: 'face-expression-editor',
    description:
      'Edit facial expressions with precise control - adjust smiles, head position, eye direction and more',
    category: 'image',
    badge: 'hot',
    creditCost: 'Free',
    icon: '😊',
    href: '/apps/face-expression-editor',
    features: ['Open/close eyes', 'Adjust smiles', 'Head rotation', 'Eye direction'],
    editorType: 'sliders',
    controls: {
      sliders: [
        { label: 'Head Tilt', min: -1, max: 1, step: 0.01, defaultValue: 0 },
        { label: 'Eye Openness', min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
        { label: 'Smile', min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
        { label: 'Mouth Opening', min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
      ],
    },
  },
  {
    id: 'ai-photo-editor',
    name: 'AI Photo Editor',
    slug: 'ai-photo-editor',
    description:
      'Edit images with text instructions, such as adding, removing, or modifying elements',
    category: 'image',
    badge: 'free',
    creditCost: '2 cr',
    icon: '🖌️',
    href: '/apps/ai-photo-editor',
    features: ['Text-based editing', 'Object removal', 'Style transfer', 'Inpainting'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 10,
      promptPlaceholder: 'Describe how to edit the image...',
      settings: [
        {
          label: 'Mode',
          type: 'select',
          options: ['Edit', 'Create', 'Restyle'],
          defaultValue: 'Edit',
        },
        {
          label: 'Aspect Ratio',
          type: 'select',
          options: ['1:1', '4:3', '16:9', '3:4', '9:16'],
          defaultValue: '1:1',
        },
        {
          label: 'Resolution',
          type: 'select',
          options: ['512x512', '768x768', '1024x1024'],
          defaultValue: '768x768',
        },
      ],
    },
  },
  {
    id: 'create-image',
    name: 'Create Image',
    slug: 'create-image',
    description: 'Generate images with text instructions',
    category: 'image',
    badge: null,
    creditCost: 'Varies',
    icon: '🎨',
    href: '/apps/create-image',
    features: ['Text to image', 'Multiple styles', 'High resolution'],
    editorType: 'prompt',
    controls: {
      promptPlaceholder: 'Describe the image you want to create...',
      settings: [
        {
          label: 'Style',
          type: 'select',
          options: ['Photorealistic', 'Anime', 'Digital Art', 'Oil Painting', 'Watercolor'],
          defaultValue: 'Photorealistic',
        },
        {
          label: 'Aspect Ratio',
          type: 'select',
          options: ['1:1', '4:3', '16:9', '3:4', '9:16'],
          defaultValue: '1:1',
        },
        {
          label: 'Quality',
          type: 'select',
          options: ['Standard', 'HD', 'Ultra HD'],
          defaultValue: 'HD',
        },
      ],
    },
  },
  {
    id: 'couple-photo-maker',
    name: 'AI Couple Photo Maker',
    slug: 'couple-photo-maker',
    description: 'Create romantic couple photos by combining two person portraits with AI',
    category: 'image',
    badge: null,
    creditCost: '5 cr',
    icon: '💑',
    href: '/apps/couple-photo-maker',
    features: ['Wedding styles', 'Beach scenes', 'Vintage looks'],
    editorType: 'dual-upload',
    controls: {
      settings: [
        {
          label: 'Scene',
          type: 'select',
          options: ['Wedding', 'Beach', 'Vintage', 'Studio', 'Nature'],
          defaultValue: 'Wedding',
        },
      ],
    },
  },
  {
    id: 'add-person-to-photo',
    name: 'Add Person to Photo',
    slug: 'add-person-to-photo',
    description: 'Position a person onto any scene, then let AI blend them naturally',
    category: 'image',
    badge: null,
    creditCost: '3 cr',
    icon: '👤',
    href: '/apps/add-person-to-photo',
    features: ['Natural blending', 'Lighting match', 'Shadow matching'],
    editorType: 'dual-upload',
  },
  {
    id: 'image-effects',
    name: 'Image Effects',
    slug: 'image-effects',
    description: 'Transforms your photos with simple instructions into stunning results',
    category: 'image',
    badge: null,
    creditCost: '19 cr',
    icon: '✨',
    href: '/apps/image-effects',
    features: ['Artistic styles', 'Filters', 'Transformations'],
    editorType: 'sliders',
    controls: {
      sliders: [
        { label: 'Intensity', min: 0, max: 1, step: 0.01, defaultValue: 0.7 },
        { label: 'Style Strength', min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
      ],
    },
  },
  {
    id: 'photo-pose-editor',
    name: 'Photo Pose Editor',
    slug: 'photo-pose-editor',
    description: 'Transfer poses from reference images to your photos',
    category: 'image',
    badge: null,
    creditCost: '3 cr',
    icon: '🤸',
    href: '/apps/photo-pose-editor',
    features: ['Pose transfer', 'Preset poses', 'Custom references'],
    editorType: 'dual-upload',
  },
  {
    id: 'photo-angle-changer',
    name: 'Photo Angle Changer',
    slug: 'photo-angle-changer',
    description: 'Change camera angles and perspectives with AI precision',
    category: 'image',
    badge: null,
    creditCost: '2 cr',
    icon: '📐',
    href: '/apps/photo-angle-changer',
    features: ['Angle adjustment', 'Perspective shift', 'Multi-angle views'],
    editorType: 'sliders',
    controls: {
      sliders: [
        { label: 'Horizontal Angle', min: -90, max: 90, step: 1, defaultValue: 0 },
        { label: 'Vertical Angle', min: -45, max: 45, step: 1, defaultValue: 0 },
      ],
    },
  },
  {
    id: 'virtual-try-on',
    name: 'Virtual Try-On',
    slug: 'virtual-try-on',
    description: 'Try on clothes with AI',
    category: 'image',
    badge: null,
    creditCost: '5 cr',
    icon: '👔',
    href: '/apps/virtual-try-on',
    features: ['Clothing preview', 'Multiple outfits', 'Realistic fit'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 2,
      promptPlaceholder: 'Describe the outfit to try on...',
    },
  },
  {
    id: 'relight',
    name: 'Relight',
    slug: 'relight',
    description: 'Adjust photo lighting with AI',
    category: 'image',
    badge: null,
    creditCost: '2 cr',
    icon: '💡',
    href: '/apps/relight',
    features: ['Light adjustment', 'Mood lighting', 'Studio effects'],
    editorType: 'sliders',
    controls: {
      sliders: [
        { label: 'Brightness', min: -1, max: 1, step: 0.01, defaultValue: 0 },
        { label: 'Warmth', min: -1, max: 1, step: 0.01, defaultValue: 0 },
        { label: 'Contrast', min: -1, max: 1, step: 0.01, defaultValue: 0 },
      ],
    },
  },
  {
    id: 'face-swap',
    name: 'Face Swap',
    slug: 'face-swapper',
    description: 'Swap faces in photos',
    category: 'image',
    badge: 'free',
    creditCost: '2 cr',
    icon: '🔄',
    href: '/apps/face-swapper',
    features: ['Multi-face support', 'Natural blending', 'High quality'],
    editorType: 'dual-upload',
  },
  {
    id: 'background-remove',
    name: 'Background Remove',
    slug: 'background-remove',
    description: 'Remove photo background',
    category: 'image',
    badge: 'free',
    creditCost: 'Free',
    icon: '🖼️',
    href: '/apps/background-remove',
    features: ['Instant removal', 'Clean edges', 'Transparent output'],
    editorType: 'sliders',
  },
  {
    id: 'unblur-image',
    name: 'Unblur Image',
    slug: 'unblur-image',
    description: 'Enhance and sharpen blurry images with AI',
    category: 'image',
    badge: null,
    creditCost: '5 cr',
    icon: '🔍',
    href: '/apps/unblur-image',
    features: ['Sharpening', 'Noise reduction', 'Detail recovery'],
    editorType: 'sliders',
    controls: {
      sliders: [
        { label: 'Sharpness', min: 0, max: 1, step: 0.01, defaultValue: 0.7 },
        { label: 'Noise Reduction', min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
      ],
    },
  },
  {
    id: 'upscale',
    name: 'Upscale',
    slug: 'upscale',
    description: 'Enhance image resolution',
    category: 'image',
    badge: 'free',
    creditCost: '2 cr',
    icon: '⬆️',
    href: '/apps/upscale',
    features: ['4x upscaling', 'Detail preservation', 'AI enhancement'],
    editorType: 'sliders',
    controls: {
      sliders: [
        { label: 'Scale Factor', min: 2, max: 4, step: 1, defaultValue: 2 },
        { label: 'Detail Enhancement', min: 0, max: 1, step: 0.01, defaultValue: 0.6 },
      ],
    },
  },
  {
    id: 'colorization',
    name: 'Colorization',
    slug: 'colorization',
    description: 'Convert B&W photos to color',
    category: 'image',
    badge: 'free',
    creditCost: 'Free',
    icon: '🌈',
    href: '/apps/colorization',
    features: ['Natural colors', 'Historical photos', 'Auto-detect'],
    editorType: 'sliders',
  },
  {
    id: 'image-translator',
    name: 'Image Translator',
    slug: 'image-translator',
    description: 'Translate text inside images while preserving the original layout',
    category: 'image',
    badge: null,
    creditCost: '2 cr',
    icon: '🌐',
    href: '/apps/image-translator',
    features: ['Multi-language', 'Layout preservation', 'Font matching'],
    editorType: 'prompt',
    controls: {
      promptPlaceholder: 'Enter text to translate...',
      settings: [
        {
          label: 'Target Language',
          type: 'select',
          options: ['English', 'Chinese', 'Japanese', 'Korean', 'Spanish', 'French'],
          defaultValue: 'English',
        },
      ],
    },
  },
  {
    id: 'object-remover',
    name: 'Object Remover',
    slug: 'object-remover',
    description: 'Remove unwanted objects from photos',
    category: 'image',
    badge: null,
    creditCost: '1 cr',
    icon: '🗑️',
    href: '/apps/object-remover',
    features: ['Smart removal', 'Background fill', 'Clean results'],
    editorType: 'prompt',
    controls: {
      promptPlaceholder: 'Describe the object to remove...',
    },
  },
  {
    id: 'remove-reflection',
    name: 'Remove Reflection',
    slug: 'remove-reflection',
    description: 'Remove glare and reflections from photos',
    category: 'image',
    badge: null,
    creditCost: '2 cr',
    icon: '💎',
    href: '/apps/remove-reflection',
    features: ['Glare removal', 'Glass reflection', 'Lens flare'],
    editorType: 'sliders',
    controls: {
      sliders: [{ label: 'Removal Strength', min: 0, max: 1, step: 0.01, defaultValue: 0.7 }],
    },
  },
  {
    id: 'photo-leap',
    name: 'Time Travel Photo Generator',
    slug: 'photo-leap',
    description:
      'Transform your photos into different historical time periods with our AI time travel photo generator',
    category: 'image',
    badge: null,
    creditCost: '15 cr',
    icon: '⏳',
    href: '/apps/photo-leap',
    features: ['Historical eras', 'Time slider', 'Ancient to future'],
    editorType: 'time-slider',
    controls: {
      sliders: [
        {
          label: 'Time Period',
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
        },
      ],
    },
  },
]

const videoTools: Tool[] = [
  {
    id: 'create-video',
    name: 'Create Video',
    slug: 'video-generator',
    description: 'Generate videos from text prompts using advanced AI models',
    category: 'video',
    badge: 'hot',
    creditCost: 'Varies',
    icon: '🎬',
    href: '/apps/video-generator',
    features: ['Text to video', 'Multiple models', 'High quality'],
    editorType: 'prompt',
    controls: {
      promptPlaceholder: 'Describe the video you want to create...',
      settings: [
        {
          label: 'Duration',
          type: 'select',
          options: ['3s', '5s', '10s'],
          defaultValue: '5s',
        },
        {
          label: 'Resolution',
          type: 'select',
          options: ['480p', '720p', '1080p'],
          defaultValue: '720p',
        },
      ],
    },
  },
  {
    id: 'photo-to-video',
    name: 'Photo to Video',
    slug: 'photo-to-video',
    description: 'Use the most advanced AI Model to make photos come alive',
    category: 'video',
    badge: 'new',
    creditCost: '75 cr',
    icon: '🎞️',
    href: '/apps/photo-to-video',
    features: ['Photo animation', 'Natural motion', 'AI-powered'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 1,
      promptPlaceholder: 'Describe the motion...',
      settings: [
        {
          label: 'Quality Mode',
          type: 'select',
          options: ['Standard', 'High', 'Ultra'],
          defaultValue: 'High',
        },
        {
          label: 'Duration',
          type: 'select',
          options: ['3s', '5s', '8s'],
          defaultValue: '5s',
        },
        {
          label: 'Resolution',
          type: 'select',
          options: ['480p', '720p', '1080p'],
          defaultValue: '720p',
        },
        {
          label: 'Generate Audio',
          type: 'toggle',
          defaultValue: false,
        },
      ],
    },
  },
  {
    id: 'drone-fpv-video',
    name: 'Drone FPV Video',
    slug: 'drone-fpv-video',
    description: 'Draw a flight path on any photo and generate cinematic FPV drone footage with AI',
    category: 'video',
    badge: null,
    creditCost: '50 cr',
    icon: '🚁',
    href: '/apps/drone-fpv-video',
    features: ['Flight path drawing', 'Cinematic effects', 'AI generation'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 1,
      promptPlaceholder: 'Describe the flight path...',
    },
  },
  {
    id: 'motion-control',
    name: 'Motion Control',
    slug: 'motion-control',
    description: 'Animate images with video motion',
    category: 'video',
    badge: null,
    creditCost: '75 cr',
    icon: '🎯',
    href: '/apps/motion-control',
    features: ['Motion transfer', 'Custom paths', 'Smooth animation'],
    editorType: 'dual-upload',
  },
  {
    id: 'talking-photo',
    name: 'Talking Photo',
    slug: 'talking-photo',
    description: 'Create high-quality videos from static images and audio',
    category: 'video',
    badge: null,
    creditCost: '3 cr/sec',
    icon: '🗣️',
    href: '/apps/talking-photo',
    features: ['Lip sync', 'Facial animation', 'Audio driven'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 2,
      promptPlaceholder: 'Upload photo and audio file...',
    },
  },
  {
    id: 'video-effects',
    name: 'Video Effects',
    slug: 'video-effects',
    description: 'Transform your videos',
    category: 'video',
    badge: null,
    creditCost: 'Varies',
    icon: '🎥',
    href: '/apps/video-effects',
    features: ['Style transfer', 'Filters', 'Transitions'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 1,
      settings: [
        {
          label: 'Effect',
          type: 'select',
          options: ['Cinematic', 'Anime', 'Vintage', 'Neon', 'Dreamy'],
          defaultValue: 'Cinematic',
        },
      ],
    },
  },
  {
    id: 'hug-kiss-video',
    name: 'Hug & Kiss Video',
    slug: 'hug-kiss-video',
    description: 'Create AI hugging videos',
    category: 'video',
    badge: null,
    creditCost: 'Varies',
    icon: '🤗',
    href: '/apps/hug-kiss-video',
    features: ['AI animation', 'Multiple styles', 'Realistic motion'],
    editorType: 'dual-upload',
  },
  {
    id: 'video-upscaler',
    name: 'Video Upscaler',
    slug: 'video-upscaler',
    description: 'Enhance video resolution',
    category: 'video',
    badge: null,
    creditCost: 'Varies',
    icon: '📈',
    href: '/apps/video-upscaler',
    features: ['Resolution boost', 'Frame enhancement', 'AI sharpening'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 1,
      settings: [
        {
          label: 'Target Resolution',
          type: 'select',
          options: ['720p', '1080p', '4K'],
          defaultValue: '1080p',
        },
      ],
    },
  },
  {
    id: 'wan-video',
    name: 'Wan2.5 Video',
    slug: 'wan-video',
    description: 'Use Wan2.5 Model to create videos with synced voice and lifelike motion',
    category: 'video',
    badge: 'new',
    creditCost: 'Varies',
    icon: '🌊',
    href: '/apps/wan-video',
    features: ['Voice sync', 'Lifelike motion', 'High quality'],
    editorType: 'prompt',
    controls: {
      promptPlaceholder: 'Describe the video scene...',
      settings: [
        {
          label: 'Resolution',
          type: 'select',
          options: ['480p', '720p', '1080p'],
          defaultValue: '720p',
        },
        {
          label: 'Duration',
          type: 'select',
          options: ['3s', '5s', '8s'],
          defaultValue: '5s',
        },
      ],
    },
  },
  {
    id: 'video-watermark-remover',
    name: 'Video Watermark Remover',
    slug: 'video-watermark-remover',
    description: 'Remove watermarks, logos, captions and text overlays from videos',
    category: 'video',
    badge: null,
    creditCost: '2 cr/sec',
    icon: '🚷',
    href: '/apps/video-watermark-remover',
    features: ['Logo removal', 'Text overlay removal', 'Up to 10 min'],
    editorType: 'multi-upload',
    controls: {
      maxFiles: 1,
    },
  },
]

// ---------- Tool Helpers ----------

export function getAllTools(): Tool[] {
  return [...imageTools, ...videoTools]
}

export function getToolsByCategory(category: 'image' | 'video'): Tool[] {
  return category === 'image' ? imageTools : videoTools
}

export function getToolBySlug(slug: string): Tool | undefined {
  return getAllTools().find((t) => t.slug === slug)
}

export function getToolCategoryGroups(): ToolCategoryGroup[] {
  return [
    { category: 'image', tools: imageTools, count: imageTools.length },
    { category: 'video', tools: videoTools, count: videoTools.length },
  ]
}

export function getTopChoiceTools(): Tool[] {
  const slugs = [
    'create-image',
    'video-generator',
    'face-expression-editor',
    'ai-photo-editor',
    'virtual-try-on',
    'photo-to-video',
    'photo-pose-editor',
    'add-person-to-photo',
    'hug-kiss-video',
  ]
  return getAllTools().filter((t) => slugs.includes(t.slug))
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase()
  return getAllTools().filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.features?.some((f) => f.toLowerCase().includes(q)),
  )
}

// ---------- Pricing Data ----------

export const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 16,
    period: '/ month',
    description: 'Flexible for short-term projects',
    credits: 1000,
    features: [
      '1,000 AI credits per month',
      'Full access to all tools',
      'Priority support',
      'Early access to new features',
      'Cancel anytime',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 8.3,
    originalPrice: 16,
    period: '/ month',
    billingNote: 'billed annually',
    description: 'Best value for power users',
    credits: 1000,
    highlight: true,
    badge: 'Save 49%',
    features: [
      '1,000 AI credits per month',
      'Full access to all tools',
      'Priority support',
      'Early access to new features',
      'Billed $99/year',
      'Secure payment via Stripe',
      'Cancel anytime',
    ],
  },
]

// ---------- Credit Cost Data ----------

export const creditCosts: CreditCostItem[] = [
  // Image Tools
  { name: 'AI Photo Editor', credits: '2 cr', category: 'image' },
  { name: 'Face Expression Edit', credits: 'Free', category: 'image' },
  { name: 'Photo Relight', credits: '2 cr', category: 'image' },
  { name: 'Face Swap', credits: '2 cr', category: 'image' },
  { name: 'Replace Background + Relight', credits: '5 cr', category: 'image' },
  { name: 'Image Style Transfer', credits: '4 cr', category: 'image' },
  { name: 'Photo Maker', credits: '5 cr', category: 'image' },
  { name: 'Upscale Image', credits: '2 cr', category: 'image' },
  { name: 'Object Remove', credits: '1 cr', category: 'image' },
  { name: 'Background Remove', credits: 'Free', category: 'image' },
  { name: 'Colorization', credits: 'Free', category: 'image' },
  { name: 'Unblur Image', credits: '5 cr', category: 'image' },
  { name: 'Image Effects', credits: '19 cr', category: 'image' },
  { name: 'Time Travel Photo', credits: '15 cr', category: 'image' },
  // Video Tools
  { name: 'Photo to Video (5s)', credits: '75 cr', category: 'video' },
  { name: 'Talking Photo (per sec)', credits: '3 cr', category: 'video' },
  { name: 'WAN 2.5 480p (per sec)', credits: '6 cr', category: 'video' },
  { name: 'WAN 2.5 720p (per sec)', credits: '13 cr', category: 'video' },
  { name: 'WAN 2.5 1080p (per sec)', credits: '19 cr', category: 'video' },
  { name: 'WAN 2.6 720p (per sec)', credits: '13 cr', category: 'video' },
  { name: 'WAN 2.6 1080p (per sec)', credits: '19 cr', category: 'video' },
  { name: 'Video Watermark Remover (per sec)', credits: '2 cr', category: 'video' },
  { name: 'Video Upscaler', credits: 'varies', category: 'video' },
  // AI Generation
  { name: 'Image Generator', credits: 'varies', category: 'image' },
  { name: 'Flux Kontext', credits: '5 cr', category: 'image' },
  { name: 'Gemini Photo Edit', credits: '2 cr', category: 'image' },
  { name: 'Hug & Kiss Video', credits: 'varies', category: 'video' },
]

// ---------- Feature / Value Props ----------

export const features: FeatureItem[] = [
  {
    icon: '⚡',
    title: 'Instant Results',
    description:
      'Studio-quality edits in seconds, not hours. Our AI processes images in real-time.',
  },
  {
    icon: '🏆',
    title: 'Pro-Grade Quality',
    description:
      'Enterprise AI models trained on millions of photos deliver exceptional, natural results.',
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description:
      'Enterprise-grade encryption. No permanent storage. Compliant with global data protection standards.',
  },
]

// ---------- FAQ Data ----------

export const faqItems: FAQItem[] = [
  {
    id: 'how-it-works',
    question: 'How does the AI expression editor work?',
    answer:
      'MimicPhoto leverages state-of-the-art AI technology to transform facial expressions and lighting in photos. Upload your image, choose from our professional presets or customize the parameters, and our advanced AI will generate studio-quality results in seconds.',
  },
  {
    id: 'features',
    question: 'What features does MimicPhoto offer?',
    answer:
      'MimicPhoto offers powerful AI-driven features including facial expression editing, professional lighting adjustment, background replacement, image enhancement, video effects, couple photo generation, virtual try-on, and more.',
  },
  {
    id: 'professional-use',
    question: 'Is MimicPhoto suitable for professional use?',
    answer:
      'Absolutely! MimicPhoto is trusted by professional photographers, marketing agencies, and content creators worldwide. Our AI tools deliver studio-quality results while saving hours of manual editing time.',
  },
  {
    id: 'quality',
    question: 'How accurate are the AI results?',
    answer:
      'Our enterprise-grade AI models have been trained on millions of professional photos to ensure exceptional accuracy and natural-looking results that maintain the authenticity of your original images.',
  },
  {
    id: 'privacy',
    question: 'How is my data protected?',
    answer:
      "Your privacy and data security are our top priority. We use enterprise-grade encryption, and your images are processed securely in real-time without permanent storage. We're compliant with global data protection standards.",
  },
]

// ---------- Pricing FAQ ----------

export const pricingFAQ: FAQItem[] = [
  {
    id: 'what-is-credit',
    question: 'What is an AI credit?',
    answer:
      "An AI credit is the unit used to access MimicPhoto's AI tools. Different tools consume different amounts of credits depending on their complexity. 1 credit equals approximately $0.008.",
  },
  {
    id: 'out-of-credits',
    question: 'What happens when I run out of credits?',
    answer:
      'When you run out of credits, you can top up additional credits ($10 for 1,000 credits) or wait until your next billing cycle for credit renewal.',
  },
  {
    id: 'cancel',
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
  },
  {
    id: 'rollover',
    question: 'Do unused credits roll over?',
    answer:
      'Credits do not roll over between billing periods. Each month you receive a fresh allocation of 1,000 credits.',
  },
  {
    id: 'free-tier',
    question: 'Is there a free tier?',
    answer:
      'Some tools like Face Expression Editor, Background Remove, and Colorization are completely free to use. No subscription required!',
  },
]

// ---------- Mock API Functions ----------

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Fetch all tools */
export async function fetchTools(): Promise<ApiResponse<Tool[]>> {
  await delay(300)
  return { success: true, data: getAllTools() }
}

/** Fetch a single tool by slug */
export async function fetchTool(slug: string): Promise<ApiResponse<Tool>> {
  await delay(200)
  const tool = getToolBySlug(slug)
  if (!tool) return { success: false, error: 'Tool not found' }
  return { success: true, data: tool }
}

/** Upload an image for processing */
export async function uploadImage(file: File): Promise<ApiResponse<{ url: string; id: string }>> {
  await delay(1500)
  const url = URL.createObjectURL(file)
  return {
    success: true,
    data: { url, id: `img-${Date.now()}` },
  }
}

/** Process an image with an AI tool */
export async function processImage(
  _toolId: string,
  imageUrl: string,
  _params: Record<string, number>,
): Promise<ApiResponse<{ resultUrl: string; creditsUsed: number }>> {
  await delay(3000)
  return {
    success: true,
    data: { resultUrl: imageUrl, creditsUsed: 2 },
  }
}
