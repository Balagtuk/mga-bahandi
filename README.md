# 🌸 Interactive Anniversary Gift Website

A romantic, whimsical, interactive digital love letter built with vanilla HTML5, CSS3, and modern JavaScript.

---

## ✨ Features & User Experience

1. **Opening Screen — The Closed Envelope**
   - Centered blush-pink envelope floating gently over warm ambient gradients.
   - Heart-shaped wax seal and subtle drifting sparkles/petals.
   - Click interaction: the wax seal cracks in two and falls away, the top flap unfolds backward, a letter note slides upward, and a flower burst is triggered.

2. **Magical Flower Burst & Transition**
   - Coordinated burst of petals, miniature blossoms, hearts, and sparkles radiating outward from the envelope.
   - Organic deceleration and transition into gentle downward floating motion.
   - Smooth crossfade from the envelope into the centerpiece bouquet and memory carousel.

3. **Centerpiece Bouquet & 3D Memory Carousel**
   - **Large focal bouquet**: High-resolution florist-grade floral arrangement with transparent background, soft glow halo, and gentle floating bob.
   - **3D Memory Orbit (All Devices)**: Photos & videos float in a continuous 360° elliptical orbit encircling the grand bouquet centerpiece. Cards in the front half pass in front of the bouquet, while cards in the back pass behind it for true 3D spatial depth.
   - **Video Memory Support**: Videos appear with a delicate play badge on the card and live preview on hover.
   - **Pill Counter Indicator**: Clean, elegant `Memory 1 of 68` pill badge that updates in real time as cards orbit or swipe.
   - **Interactive Hover & Drag**: Hovering pauses the carousel, enlarges the photo smoothly, and brings it forward. Click-and-drag or touch gestures let you spin the carousel manually with realistic momentum.
   - **Responsive Planetary Ring**: On mobile, tablet, and desktop, the orbit automatically adapts its radius and card scale so memories encircle the flowers without overcrowding.

4. **Two-Column Memory Modal Dialog (Photos & Videos with Subtle Audio)**
   - Native `<dialog>` implementation with backdrop blur.
   - Left column displays the full-resolution memory photo or interactive video clip.
   - **Subtle Video Audio & Music Ducking**: Videos play with gentle, subtle audio (`videoVolume: 0.28`), and the background songs smoothly duck down in volume while watching so audio is crystal clear. Background music restores smoothly when closed.
   - Right column displays the special date, title, heart divider, personal note, and navigation controls.
   - Keyboard accessible (`Esc` to close, `←` / `→` arrows to navigate). Light-dismiss by clicking outside the card.

5. **Real-time Love Counter**
   - Live counter calculating the exact days, hours, minutes, and seconds counted up since October 22, 2017 12:00:00 AM (or any anniversary date set in config).
   - Ticks every second with high-precision time difference and smooth tabular typography in a glassmorphic pill badge.

6. **Atmospheric Ambient Petals**
   - Continues a gentle, restrained drift of petals in the background after reveal.
   - Pauses when the browser tab is hidden to save battery and performance.
   - Respects `prefers-reduced-motion` for accessibility.

7. **Romantic Music Player (Continuous Looping Playlist)**
   - Continuous playlist cycling through your romantic songs (*Bahandi*, *Way Sukod*, and *Pahuway*).
   - Starts playing automatically with an elegant volume swell when the envelope is clicked to open.
   - Glassmorphic floating player with animated equalizer bars, song title display, play/pause toggle, and a skip track button. Loop continues indefinitely.

---

## 📁 Project Structure

```
nth/
├── index.html                 # Main markup & semantic structure
├── css/
│   └── style.css              # Custom styling, 3D transforms, animations
├── js/
│   ├── config.js              # 📝 Central configuration for all text & photos
│   └── script.js              # Interaction logic, animations, carousel & dialog
├── assets/
│   ├── bouquet.png            # Luxury pink lilies & roses bouquet (clean transparent PNG)
│   ├── photos/                # 68 personal memories (63 photos + 5 MOV video clips)
│   └── music/                 # Romantic songs (Bahandi, Way Sukod, Pahuway)
└── README.md                  # Documentation & instructions
```

---

## 💌 How to Personalize

All personalization is done in a single file: [js/config.js](file:///d:/red/yv edit/nth/js/config.js).

### 1. Edit the Texts
Open [js/config.js](file:///d:/red/yv edit/nth/js/config.js) in your editor and update:
- **`intro.lead`**: Heading above the envelope.
- **`intro.hint`**: Hint below the envelope.
- **`intro.letter`**: Text peeking out of the letter.
- **`counter.startDate`**: The exact anniversary start date & time (defaults to `'2017-10-22T00:00:00'`).
- **`counter.caption`**: Caption above the timer digits (e.g. `'Loving you for'`).
- **`hero.title`** & **`hero.subtitle`**: Messages displayed under the bouquet.
- **`footer`**: Sign-off message at the bottom.

### 2. Add Your Photos
1. Place your personal photos into the `assets/photos/` directory (JPEG, PNG, or WebP).
2. Update the `memories` array in [js/config.js](file:///d:/red/yv edit/nth/js/config.js):
   ```javascript
   {
     image: 'assets/photos/your-photo.jpg',
     alt: 'Description of the memory',
     title: 'Our Trip to Paris',
     date: 'October 14, 2024',
     message: 'Write your heartfelt message here...'
   }
   ```
   *Tip: You can add as many or as few memories as you like. The carousel and dialog adapt automatically.*

### 3. Replace the Bouquet (Optional)
Replace `assets/bouquet.png` with any transparent `.png` or `.webp` file, or update `bouquet.image` in [js/config.js](file:///d:/red/yv edit/nth/js/config.js).

### 4. Background Music & Playlist
The site comes pre-configured with the songs you placed in `assets/music/`:
- **Bahandi**
- **Way Sukod**
- **Pahuway**

To reorder songs, adjust volume, or add new tracks, edit `music.playlist` in [js/config.js](file:///d:/red/yv edit/nth/js/config.js). The playlist automatically loops continuously, starts upon opening the envelope, and includes a next-track button.

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or launch a quick local server:

- **VS Code / IDE**: Right-click `index.html` and select **Open with Live Server**.
- **Python**: Run `python -m http.server 8000` in the project root and navigate to `http://localhost:8000`.
- **Node.js**: Run `npx serve .`

---

## 🌐 How to Deploy (Free)

This is a 100% static project with no build step required:
- **GitHub Pages**: Push this folder to a GitHub repo and enable Pages in repository settings.
- **Vercel / Netlify**: Drag-and-drop the project folder onto Netlify Drop or import the repository to Vercel.
- **Cloudflare Pages**: Connect your Git repo with default static settings.
