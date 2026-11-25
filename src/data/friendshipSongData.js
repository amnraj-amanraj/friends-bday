/**
 * DHruv.exe — Friendship Song & Timeline Audio Data
 * Dedicated from my side to Dhruv.
 */
import { getAssetUrl } from '../utils/assets';

export const FRIENDSHIP_SONG = {
  title: "Tera Yaar Hoon Main",
  subtitle: "Dedicated From My Side To Dhruv",
  artist: "Acoustic Friendship Anthem",
  coverImage: getAssetUrl("images/classroom-formals.jpg"),
  totalDuration: 68, // 68 seconds loop
  chapters: [
    {
      id: "chapter-1",
      startTime: 0,
      endTime: 17,
      timestamp: "00:00",
      tag: "THE HOSTEL DAYS",
      lyricHindi: "Yaad hai hostel ka pehla din? 'Yaaron dosti badi hi haseen hai...'",
      lyricQuote: "Yeh na ho toh kya phir zindagi hai, koi toh ho jisse sab keh sakein.",
      mood: "Acoustic Nostalgia",
      accentColor: "#0284c7"
    },
    {
      id: "chapter-2",
      startTime: 17,
      endTime: 34,
      timestamp: "00:17",
      tag: "THE SILENCE",
      lyricHindi: "Life apne-apne track par chali gayi... par dosti wahin khadi rahi.",
      lyricQuote: "Khaamoshiyaan bhi baatein karti hain jab yaari sachi ho.",
      mood: "Mellow Piano",
      accentColor: "#6366f1"
    },
    {
      id: "chapter-3",
      startTime: 34,
      endTime: 50,
      timestamp: "00:34",
      tag: "SIH PLOT TWIST",
      lyricHindi: "And then came SIH! 'Tere jaisa yaar kahan, kahan aisa yaarana...'",
      lyricQuote: "Yaad karegi duniya tera mera afsana! The clutch hackathon days.",
      mood: "Uplifting Energy",
      accentColor: "#7c3aed"
    },
    {
      id: "chapter-4",
      startTime: 50,
      endTime: 68,
      timestamp: "00:50",
      tag: "NAVRANG & REFLECTION",
      lyricHindi: "Tu jo rootha toh kaun hansega... Tera yaar hoon main.",
      lyricQuote: "Not every chapter is perfect, but every chapter becomes part of our story. Happy Birthday mere bhai! ❤️",
      mood: "Soulful Acoustic",
      accentColor: "#d97706"
    }
  ]
};
