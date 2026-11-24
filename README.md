# DHruv.exe — A Cinematic Birthday Surprise Website 🎂
> **The Friendship Edition (Light Theme Edition)** • Built for Dhruv • 26 November 2026

A premium, interactive, emotional, and celebratory birthday surprise website designed as a personalized college friendship story, styled with a radiant, elegant light aesthetic.

---

## ✨ Features & Architecture

1. **Section 1: Secret Welcome Screen**
   - Mysterious terminal/cyber opening screen: *"Hey Dhruv! 👀"*
   - Glowing entrance button *"ENTER THE SURPRISE →"*
   - Starts smooth background music and transitions seamlessly into the experience.

2. **Section 2: Birthday Introduction & Live Countdown**
   - *"26 NOVEMBER 2026"* — *"THE DAY A LEGEND WAS BORN."*
   - Live real-time countdown to Dhruv's birthday (Days, Hours, Minutes, Seconds).
   - Dynamic date detection: On or after November 26, it displays the official celebration banner with confetti instead of a negative countdown!
   - Live mode preview toggle for testing.

3. **Section 3: Our Friendship Story (4 Chapters)**
   - **Chapter 1: The First Meet** — *"It All Started at the Hostel"* (*"Season 1: Introduction complete. Communication disconnected. 😂"*)
   - **Chapter 2: The Silence** — *"The Unexpected Gap"* (featuring an animated disappearing chat bubble simulation!)
   - **Chapter 3: SIH — The Plot Twist** — *"And Then Came SIH!"* (*"Plot twist: The characters are finally becoming friends! 😂"*)
   - **Chapter 4: Navrang — An Unexpected Chapter** — *"The Navrang Chapter"* (mature, respectful, sensitive, zero blame: *"Not every chapter is perfect, but every chapter becomes part of the story."*)

4. **Section 4: Our Memories (Polaroid Photo Gallery)**
   - Polaroid-style photo cards with authentic tilts, tape textures, and hover zoom.
   - Click-to-enlarge interactive lightbox with smooth keyboard/arrow navigation and captions.
   - Elegant SVG illustrations as fallbacks so no broken image icons ever show up.

5. **Section 5: A Small Message From My Side (Personal Letter)**
   - Designed like a warm, golden-lit personal handwritten parchment letter.
   - Delicate line-by-line staggered reveal of the exact heartfelt message.
   - 100% genuine, friendly, mature, with zero guilt and zero drama.

6. **Section 6: Interactive Birthday Cake Ceremony**
   - 3D-styled animated tiered cake with candles and flickering flames.
   - *"Make a Wish ✨"* button: Candles blow out, smoke rises, twin confetti cannons burst, and realistic blow sound plays via Web Audio API.
   - Congratulatory wish reveals: *"May this year bring you happiness, success, and countless unforgettable memories!"*

7. **Section 7: Final Birthday Surprise & Grand Finale**
   - *"ONCE AGAIN... HAPPY BIRTHDAY, DHRUV! ❤️"*
   - *"Stay crazy. Stay happy. Keep winning."*
   - Grand fireworks show and a smooth *"Replay Our Story"* button that loops back to the top.

8. **Extra Interactive Features**
   - **Audio Controller**: Web Audio API ambient lo-fi synthesizer + custom MP3 player fallback with mute/unmute and visualizer bars.
   - **Hidden Secret Gift Modal**: Floating glowing gift button triggering: *"PS: Bhai, birthday party pending hai. Is website se kaam nahi chalega. 😂"*
   - **Dynamic Canvas Starfield**: Deep midnight sky with shooting stars and soft glowing nebulas.
   - **Reading Progress Bar**: Glowing top tracker as you scroll.

---

## 📸 Adding Your Own College Photos

To show your actual photos in the Polaroid gallery, drop your image files into the `/public/images/` directory with these filenames:

| Filename | Memory / Chapter |
| :--- | :--- |
| `hostel.jpg` | First meet & hostel corridor memories |
| `sih1.jpg` | SIH hackathon sprint / laptop coding |
| `sih2.jpg` | Late night SIH team huddle |
| `navrang1.jpg` | Navrang event preparation & hustle |
| `navrang2.jpg` | Navrang stage lights & crowd moments |
| `friends.jpg` | College gang squad photo |

*(If any image is not added, the site automatically renders a beautiful custom vector illustration instead of a broken icon.)*

---

## 🎵 Custom Music (Optional)

If you have a favorite friendship or birthday song, place an MP3 file at:
`/public/audio/birthday.mp3`

The audio controller will automatically prioritize your custom MP3. If not provided, it seamlessly plays a soothing, warm acoustic lo-fi synthesizer chord progression built right into the code using the Web Audio API!

---

## ✏️ Customizing Story & Content

All text, dates, chapter descriptions, and captions are cleanly separated in:
`src/data/storyData.js`

You can edit any message or date without touching UI code.

---

## 🚀 Running the Project

1. Navigate to the project folder:
   ```bash
   cd dhruv-birthday
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   `http://localhost:3000`

4. Build for production:
   ```bash
   npm run build
   ```
