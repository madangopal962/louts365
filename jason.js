    function formatDateTime() {
      const now = new Date();

      // Month in short form (e.g. Oct)
      const month = now.toLocaleString('default', { month: 'short' });

      // Get day, year, time
      const day = now.getDate();
      const year = now.getFullYear();

      // Format time as 24-hour (HH:MM:SS)
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      // Get timezone offset in +HH:MM format
      const offsetMinutes = now.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60).toString().padStart(2, '0');
      const offsetMins = (Math.abs(offsetMinutes) % 60).toString().padStart(2, '0');
      const sign = offsetMinutes > 0 ? '-' : '+';
      const timezone = `${sign}${offsetHours}:${offsetMins}`;

      // Final formatted string
      const formatted = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds} (${timezone})`;

      document.getElementById("datetime").innerText = formatted;
    }

    function initAutoSlider() {
      const slides = document.querySelector(".slider .slides");
      if (!slides) return;

      const images = slides.querySelectorAll("img");
      if (images.length <= 1) return;

      images.forEach((img) => {
        slides.appendChild(img.cloneNode(true));
      });

      const speed = 0.6;
      let rafId = 0;

      const tick = () => {
        slides.scrollLeft += speed;

        if (slides.scrollLeft >= slides.scrollWidth / 2) {
          slides.scrollLeft = 0;
        }

        rafId = requestAnimationFrame(tick);
      };

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
        } else {
          tick();
        }
      });
    }

    // Update every second
    setInterval(formatDateTime, 1000);
    formatDateTime();
    initAutoSlider();
