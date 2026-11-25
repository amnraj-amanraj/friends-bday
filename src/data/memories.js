/**
 * DHruv.exe — Memory Wall & Photo Gallery Data
 * All real college memories, captions, categories, and settings.
 * Edit, add, or reorder memories here without touching UI code!
 */
import { getAssetUrl } from '../utils/assets';

export const MEMORY_CATEGORIES = {
  all: {
    id: "all",
    label: "All Memories",
    description: "Every captured moment of our college friendship."
  },
  random: {
    id: "random",
    label: "College Memories",
    caption: "Some moments don't need explanations."
  },
  navrang: {
    id: "navrang",
    label: "Navrang Moments",
    caption: "A chapter full of experiences and memories."
  }
};

export const MEMORY_PHOTOS = [
  {
    id: "mem-1",
    title: "Classroom Formals & Swag",
    category: "random",
    caption: "Formals pehen ke class attend karne ka alag hi vibe tha bhai. Notes kam, swag zyada! 😎",
    date: "College Days",
    tag: "College Formals",
    src: getAssetUrl("images/classroom-formals.jpg"),
    thumbnail: getAssetUrl("images/classroom-formals.jpg"),
    featured: true, // Memory Spotlight image
    spotlightTitle: "If I Could Relive One Moment...",
    spotlightSubtitle: "Classroom, formals, tie, and that classic Dhruv smile — memories that define college.",
    rotation: -2.5,
    aspect: "landscape",
    objectPosition: "center 30%",
    isRealPhoto: true
  },
  {
    id: "mem-2",
    title: "Mess & Dhaba Thali Hour",
    category: "random",
    caption: "Khaane ke baad wo signature thumbs-up pose — pure hostel & dhaba nostalgia!",
    date: "Lunch Break",
    tag: "Mess Chronicles",
    src: getAssetUrl("images/dhaba-food.jpg"),
    thumbnail: getAssetUrl("images/dhaba-food.jpg"),
    featured: false,
    rotation: 2.8,
    aspect: "landscape",
    objectPosition: "center center",
    isRealPhoto: true
  },
  {
    id: "mem-3",
    title: "Backbench Vibe & Poses",
    category: "random",
    caption: "Assignments pending, test agle din, par camera on hote hi hero ban jana zaroori tha! 😂",
    date: "Lecture Hall",
    tag: "Backbenchers",
    src: getAssetUrl("images/classroom-upright.jpg"),
    thumbnail: getAssetUrl("images/classroom-upright.jpg"),
    featured: false,
    rotation: -1.8,
    aspect: "landscape",
    objectPosition: "center center",
    isRealPhoto: true
  },
  {
    id: "mem-4",
    title: "Navrang Festival Memories",
    category: "navrang",
    caption: "Terrace sunsets, pink kurta, aur college ke unforgettable moments.",
    date: "Festive Vibes",
    tag: "Navrang Chapter",
    src: getAssetUrl("images/dhruv-kurta.jpg"),
    thumbnail: getAssetUrl("images/dhruv-kurta-portrait.jpg"),
    featured: false,
    rotation: 2.2,
    aspect: "portrait",
    objectPosition: "center 20%",
    isRealPhoto: true
  },
  {
    id: "mem-5",
    title: "Live Video Memory Clip",
    category: "random",
    caption: "Camera chalu karte hi real college banter and candid laughters. Truly unscripted!",
    date: "Candid Video",
    tag: "Live Video",
    src: getAssetUrl("videos/memory-video.mp4"),
    isVideo: true,
    thumbnail: getAssetUrl("images/classroom-formals.jpg"),
    featured: false,
    rotation: -1.5,
    aspect: "landscape",
    isRealPhoto: true
  }
];

export const HIDDEN_MEMORY_DATA = {
  message: "Every picture has a story, and every story has a memory worth keeping. ❤️",
  footnote: "From classroom backbenches to late night mess food — thanks for being a real one, Dhruv!"
};
