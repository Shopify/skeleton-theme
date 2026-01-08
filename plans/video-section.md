# Video Section Plan

## Overview
A dedicated video content section supporting YouTube, Vimeo, and Shopify-hosted videos. Essential for brand films, runway footage, product videos, and storytelling content.

## Purpose
- Display video content prominently
- Support multiple video platforms
- Enable autoplay ambient video backgrounds
- Provide proper video player experience for intentional viewing

## Features

### Core Features
1. **Multi-Platform Support** - YouTube, Vimeo, Shopify-hosted video
2. **Poster Image** - Custom thumbnail/poster
3. **Autoplay Option** - Muted autoplay for ambient videos
4. **Play Button Overlay** - Click to play with custom styling
5. **Full-Width Option** - Edge-to-edge or contained
6. **Text Overlay** - Optional heading/text on video poster

### Video Types
1. **Ambient/Background** - Autoplay, muted, looped (no controls)
2. **Standard** - Click to play with controls
3. **External Embed** - YouTube/Vimeo with their players

## Settings

### Section Settings
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Heading | text | - | "" |
| Video URL | url | - | - |
| Shopify video | video | - | - |
| Cover image | image_picker | - | - |
| Video style | select | standard, ambient | standard |
| Aspect ratio | select | 16:9, 21:9, 4:3, 9:16 | 16:9 |
| Autoplay (muted) | checkbox | - | false |
| Loop | checkbox | - | false |
| Show controls | checkbox | - | true |
| Full width | checkbox | - | false |
| Text position | select | none, overlay, below | none |
| Color scheme | select | scheme-1, scheme-2 | scheme-1 |

### Block Settings (Text Overlay)
| Setting | Type | Options | Default |
|---------|------|---------|---------|
| Subheading | text | - | "" |
| Heading | text | - | "" |
| Text | richtext | - | "" |
| Button label | text | - | "" |
| Button link | url | - | - |

## Schema Structure

```json
{
  "name": "Video",
  "class": "section-video",
  "tag": "section",
  "settings": [
    {
      "type": "header",
      "content": "Video source"
    },
    {
      "type": "video_url",
      "id": "video_url",
      "accept": ["youtube", "vimeo"],
      "label": "Video URL",
      "info": "YouTube or Vimeo URL"
    },
    {
      "type": "video",
      "id": "video",
      "label": "Shopify-hosted video"
    },
    {
      "type": "image_picker",
      "id": "cover_image",
      "label": "Cover image"
    },
    ...
  ],
  "blocks": [
    {
      "type": "text",
      "name": "Text overlay",
      "limit": 1,
      "settings": [...]
    }
  ],
  "presets": [
    {
      "name": "Video"
    }
  ]
}
```

## HTML Structure

### Standard Video (Click to Play)
```html
<section class="video-section section">
  <div class="container{% if full_width %} container--full{% endif %}">

    <div class="video-section__wrapper"
         style="--video-aspect-ratio: 16/9;">

      <!-- Cover/Poster with Play Button -->
      <div class="video-section__cover" data-video-cover>
        <img class="video-section__poster" src="..." alt="">
        <button class="video-section__play-btn" aria-label="Play video">
          <svg class="video-section__play-icon"><!-- Play icon --></svg>
        </button>

        <!-- Optional Text Overlay -->
        <div class="video-section__overlay">
          <div class="video-section__content">
            <p class="video-section__subheading">Subheading</p>
            <h2 class="video-section__heading">Heading</h2>
          </div>
        </div>
      </div>

      <!-- Video Container (hidden until play) -->
      <div class="video-section__player" data-video-player hidden>
        <!-- YouTube/Vimeo iframe or HTML5 video inserted here -->
      </div>
    </div>

  </div>
</section>
```

### Ambient Video (Autoplay)
```html
<section class="video-section video-section--ambient section">
  <div class="video-section__wrapper">
    <video class="video-section__video"
           autoplay muted loop playsinline
           poster="{{ cover_image | image_url: width: 1920 }}">
      <source src="{{ video.sources[0].url }}" type="{{ video.sources[0].mime_type }}">
    </video>

    <!-- Optional Content Overlay -->
    <div class="video-section__overlay">
      <div class="video-section__content">
        <h2 class="video-section__heading">Overlay Text</h2>
      </div>
    </div>
  </div>
</section>
```

## CSS Approach

```css
.video-section__wrapper {
  position: relative;
  aspect-ratio: var(--video-aspect-ratio, 16/9);
  background-color: var(--color-muted);
  overflow: hidden;
}

.video-section__poster,
.video-section__video,
.video-section__player iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Play button styling */
.video-section__play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  transition: transform var(--duration-normal),
              background var(--duration-normal);
}

.video-section__play-btn:hover {
  transform: translate(-50%, -50%) scale(1.1);
  background: #fff;
}

/* Ambient video specific */
.video-section--ambient .video-section__wrapper {
  min-height: 60vh;
}

.video-section--ambient .video-section__video {
  object-fit: cover;
}

/* Content overlay */
.video-section__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
}

/* Full width variant */
.video-section--full-width .video-section__wrapper {
  margin-inline: calc(var(--page-margin) * -1);
}

/* Aspect ratio options */
.video-section--21-9 { --video-aspect-ratio: 21/9; }
.video-section--4-3 { --video-aspect-ratio: 4/3; }
.video-section--9-16 { --video-aspect-ratio: 9/16; max-width: 400px; margin-inline: auto; }
```

## JavaScript Requirements

```javascript
// Video player functionality
class VideoSection {
  constructor(section) {
    this.cover = section.querySelector('[data-video-cover]');
    this.player = section.querySelector('[data-video-player]');
    this.playBtn = section.querySelector('.video-section__play-btn');

    this.videoUrl = section.dataset.videoUrl;
    this.videoType = section.dataset.videoType; // youtube, vimeo, shopify

    this.init();
  }

  init() {
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.play());
    }
  }

  play() {
    // Hide cover
    this.cover.hidden = true;
    this.player.hidden = false;

    // Insert appropriate player
    if (this.videoType === 'youtube') {
      this.loadYouTube();
    } else if (this.videoType === 'vimeo') {
      this.loadVimeo();
    } else {
      this.loadNative();
    }
  }

  loadYouTube() {
    const videoId = this.extractYouTubeId(this.videoUrl);
    this.player.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
              frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>
    `;
  }

  // ... similar for Vimeo and native
}
```

## Accessibility

- Play button has clear `aria-label`
- Video has proper pause/play controls when not ambient
- Ambient videos can be paused via interaction
- Keyboard: Space/Enter to play from cover
- Screen reader announces "Play video: [title]"
- Respect `prefers-reduced-motion` - disable autoplay

## Mobile Behavior

- Autoplay may not work on mobile - show poster + play button as fallback
- 9:16 vertical videos should be responsive
- Touch-friendly play button (min 44px)
- Consider reduced quality on mobile data

## Performance

- Poster image eager-loaded (above fold) or lazy-loaded
- Video iframe/source loaded only on play (for standard mode)
- Ambient video: Consider loading after page load
- Use Shopify-hosted video for best performance

## Localization Keys

```json
{
  "sections": {
    "video": {
      "name": "Video",
      "settings": {
        "video_url": {
          "label": "Video URL",
          "info": "YouTube or Vimeo URL"
        },
        "video": { "label": "Shopify-hosted video" },
        "cover_image": { "label": "Cover image" },
        "video_style": {
          "label": "Video style",
          "options": {
            "standard": "Standard",
            "ambient": "Ambient background"
          }
        },
        "aspect_ratio": { "label": "Aspect ratio" },
        "autoplay": { "label": "Autoplay (muted)" },
        "loop": { "label": "Loop video" },
        "show_controls": { "label": "Show controls" }
      }
    }
  },
  "accessibility": {
    "play_video": "Play video",
    "pause_video": "Pause video"
  }
}
```

## Testing Checklist

- [ ] YouTube videos load and play
- [ ] Vimeo videos load and play
- [ ] Shopify-hosted videos work
- [ ] Poster image displays correctly
- [ ] Autoplay works (when allowed by browser)
- [ ] Loop works correctly
- [ ] Controls show/hide as configured
- [ ] Aspect ratios render properly
- [ ] Full-width option works
- [ ] Text overlay displays correctly
- [ ] Accessible via keyboard
- [ ] Mobile fallback works
- [ ] Reduced motion respected
