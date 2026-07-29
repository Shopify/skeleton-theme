/* Global theme behaviors: scroll reveals + header scroll state. */
(() => {
  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  const observeReveals = () => {
    document
      .querySelectorAll('[data-reveal]:not(.is-visible)')
      .forEach((el) => observer.observe(el));
  };

  observeReveals();
  document.addEventListener('shopify:section:load', observeReveals);

  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      header.dataset.scrolled = window.scrollY > 24 ? 'true' : 'false';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Responsive background video: swap desktop/mobile source by viewport */
  const initResponsiveVideos = (root = document) => {
    root.querySelectorAll('video[data-responsive-video]').forEach((video) => {
      if (video.dataset.responsiveReady === 'true') return;
      video.dataset.responsiveReady = 'true';

      const desktop = video.dataset.desktop || '';
      const mobile = video.dataset.mobile || desktop;
      const bp = parseInt(video.dataset.breakpoint || '750', 10);
      const mq = window.matchMedia(`(max-width: ${bp}px)`);

      /* Inline <source> tags render the desktop file, so we start there */
      let current = 'desktop';

      const apply = () => {
        const target = mq.matches && mobile ? 'mobile' : 'desktop';
        if (target === current) return;
        current = target;

        const url = target === 'mobile' ? mobile : desktop;
        if (!url) return;

        const wasPlaying = !video.paused && !video.dataset.userPaused;
        video.src = url;
        video.load();
        if (video.autoplay || wasPlaying) {
          video.play().catch(() => {});
        }
      };

      apply();
      if (mq.addEventListener) {
        mq.addEventListener('change', apply);
      } else if (mq.addListener) {
        mq.addListener(apply);
      }
    });
  };

  /* Cinematic media: play/pause + mute toggles (hero, video story) */
  const initVideoControls = (root = document) => {
    root.querySelectorAll('[data-video-section]').forEach((scope) => {
      if (scope.dataset.videoReady === 'true') return;
      const video = scope.querySelector('video');
      if (!video) return;
      scope.dataset.videoReady = 'true';

      const playBtn = scope.querySelector('[data-video-play]');
      const muteBtn = scope.querySelector('[data-video-mute]');

      const syncPlay = () => {
        if (playBtn) playBtn.dataset.state = video.paused ? 'paused' : 'playing';
      };
      const syncMute = () => {
        if (muteBtn) muteBtn.dataset.state = video.muted ? 'muted' : 'unmuted';
      };

      if (playBtn) {
        playBtn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (video.paused) {
            video.dataset.userPaused = '';
            video.play().catch(() => {});
          } else {
            video.dataset.userPaused = 'true';
            video.pause();
          }
          syncPlay();
        });
      }

      if (muteBtn) {
        muteBtn.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          video.muted = !video.muted;
          syncMute();

          /* Unmuting often needs an explicit play() in the same gesture */
          if (!video.muted && video.paused) {
            video.play().catch(() => {});
            syncPlay();
          }
        });
      }

      video.addEventListener('play', syncPlay);
      video.addEventListener('pause', syncPlay);
      video.addEventListener('volumechange', syncMute);

      /* Pause offscreen videos to save resources; don't fight user pause */
      const playState = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (video.dataset.userPaused) continue;

            if (entry.isIntersecting && video.paused && video.autoplay) {
              video.play().catch(() => {});
            } else if (!entry.isIntersecting && !video.paused) {
              video.pause();
            }
          }
        },
        { threshold: 0.2 }
      );
      playState.observe(video);

      syncPlay();
      syncMute();
    });
  };

  initResponsiveVideos();
  initVideoControls();
  document.addEventListener('shopify:section:load', (event) => {
    const scope = event.target || document;
    initResponsiveVideos(scope);
    initVideoControls(scope);
  });
})();
