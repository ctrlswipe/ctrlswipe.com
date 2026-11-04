
/* ==========================================
   CTRL SWIPE - WORK VIDEO MARQUEE V2

   LOCALWP: /wp-content/uploads/2026/11/
   GITHUB:  ./wp-content/uploads/2026/10/

   - Correct thumbnails
   - Infinite scrolling
   - Pause on hover (CSS)
========================================== */

(function () {
  "use strict";

  function initializeWorkVideos() {

    const isLocalWP =
      window.location.hostname === "ctrl-swipe.local";

    const marquees = document.querySelectorAll(
      ".ctrl-video-marquee"
    );

    marquees.forEach(function (marquee) {

      const track = marquee.querySelector(
        ".ctrl-video-track"
      );

      const originalGroup = track
        ? track.querySelector(".ctrl-video-group")
        : null;

      if (!track || !originalGroup) {
        return;
      }

      /* PREVENT DUPLICATE INITIALIZATION */

      if (track.dataset.initialized === "true") {
        return;
      }

      /* ==================================
         CHOOSE CORRECT THUMBNAIL PATHS
      ================================== */

      const images = originalGroup.querySelectorAll(
        "img[data-local-src][data-static-src]"
      );

      images.forEach(function (image) {

        const selectedPath = isLocalWP
          ? image.dataset.localSrc
          : image.dataset.staticSrc;

        const resolvedUrl = new URL(
          selectedPath,
          document.baseURI
        ).href;

        image.src = resolvedUrl;

      });

      /* ==================================
         CLONE FOR INFINITE LOOP
      ================================== */

      const duplicateGroup = originalGroup.cloneNode(
        true
      );

      duplicateGroup.setAttribute(
        "aria-hidden",
        "true"
      );

      duplicateGroup.querySelectorAll("a").forEach(
        function (link) {

          link.setAttribute("tabindex", "-1");

        }
      );

      track.appendChild(duplicateGroup);

      track.dataset.initialized = "true";

    });

  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initializeWorkVideos
    );

  } else {

    initializeWorkVideos();

  }

})();
