document.addEventListener("DOMContentLoaded", function () {
  const hadiths_bn = [
    "❝ যে ব্যক্তি দান করে, আল্লাহ তা’আলা তাকে আরও বেশি দেন। (সহীহ মুসলিম) ❞",
    "❝ দান করার মাধ্যমে সম্পদ কখনোই কমে না। বরং দান করলে আল্লাহ তা বাড়িয়ে দেন। (সহীহ মুসলিম) ❞",
    "❝ তিনটি জিনিস মৃত্যুর পরেও সওয়াব পৌঁছায়: সদকায়ে জারিয়া, উপকারী জ্ঞান, এবং নেক সন্তান। (সহীহ মুসলিম) ❞",
    "❝ আগুন থেকে বাঁচো—even যদি তা হয় একটি খেজুর দান করার মাধ্যমেও। (সহীহ বুখারী) ❞",
    "❝ দান করো, তা বিপদ-আপদ দূর করে। (তাবরানী) ❞"
  ];

  let currentIndex = 0;
  let scrollTimeout = null;

  const wrapper = document.querySelector(".hadith-wrapper");
  const hadithDiv = document.querySelector(".hadith-text");

  function scrollHadith() {
    if (!hadithDiv || !wrapper) return;

    // Clear any previous timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Reset styles and content
    hadithDiv.style.transition = "none";
    hadithDiv.innerText = hadiths_bn[currentIndex];
    hadithDiv.style.left = wrapper.offsetWidth + "px";

    // Wait for next paint frame to get correct width
    requestAnimationFrame(() => {
      const textWidth = hadithDiv.offsetWidth;
      const containerWidth = wrapper.offsetWidth;
      const distance = containerWidth + textWidth;
      const speed = 80; // px per second
      const duration = distance / speed;

      hadithDiv.style.transition = `left ${duration}s linear`;
      hadithDiv.style.left = `-${textWidth}px`;

      scrollTimeout = setTimeout(() => {
        currentIndex = (currentIndex + 1) % hadiths_bn.length;
        scrollHadith(); // Recursive scroll
      }, duration * 1000);
    });
  }

  scrollHadith();
});

    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // Show sidebar and hide hamburger
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.add('active');
      overlay.classList.add('active');
      menuToggle.classList.add('active');
      menuToggle.classList.add('hidden');
    });

    // Close sidebar and show hamburger when clicking outside
    function closeSidebar() {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.classList.remove('hidden');
    }

    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('click', (e) => {
      if (
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeSidebar();
      }
    });

    // Prevent closing if clicking inside sidebar
    sidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Slider functionality
    const slider = document.getElementById('slider');
    const dotsContainer = document.getElementById('dots');
    const slides = slider.querySelectorAll('img');
    let currentIndex = 0;

    function createDots() {
      slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => moveToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('span');
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
      }
    }

    function moveToSlide(index) {
      currentIndex = index;
      slider.style.transform = `translateX(-${index * 100}%)`;
      updateDots();
    }

    function autoSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      moveToSlide(currentIndex);
    }

    createDots();
    updateDots();
    setInterval(autoSlide, 4000); // Every 4 seconds
    
    const firebaseConfig = {
      apiKey: "AIzaSyBOBeWy-3P39kVnxNmQIMm0-Mawol1qjQU",
      authDomain: "admin-fe276.firebaseapp.com",
      databaseURL: "https://admin-fe276-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "admin-fe276",
      storageBucket: "admin-fe276.appspot.com",
      messagingSenderId: "1047359464238",
      appId: "1:1047359464238:web:bbb93e1b350b8d925110bf"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    const activityGrid = document.getElementById("activityGrid");
    const galleryGrid = document.getElementById("galleryGrid");
    const loadingDiv = document.getElementById("loading");

    function loadData() {
      const promises = [
        db.ref("activities").orderByChild("timestamp").once("value"),
        db.ref("photoOnly").orderByChild("timestamp").once("value")
      ];

      Promise.all(promises).then(([activitiesSnap, photoOnlySnap]) => {
        const activityItems = [];
        const galleryItems = [];

        activitiesSnap.forEach(child => {
          activityItems.push(child.val());
        });

        photoOnlySnap.forEach(child => {
          galleryItems.push(child.val());
        });

        displayAll(activityItems, galleryItems);

        // ডেটা লোড হলে লোডিং বার্তা লুকাও
        loadingDiv.style.display = "none";
      });
    }

    function displayAll(activityItems, galleryItems) {
      activityItems.sort((a, b) => b.timestamp - a.timestamp);
      galleryItems.sort((a, b) => b.timestamp - a.timestamp);

      activityItems.forEach(data => {
        const div = document.createElement("div");
        div.className = `item ${data.size || "medium"}`;
        div.innerHTML = `
          <img src="${data.photo}" alt="কার্যক্রম" loading="lazy">
          <div class="desc">
            ${data.title ? `<strong>${data.title}</strong><br>` : ""}
            ${data.description || ""}
          </div>
          <div class="divider"></div>
        `;
        activityGrid.appendChild(div);
      });

      galleryItems.forEach(data => {
        const div = document.createElement("div");
        div.className = `item ${data.size || "medium"}`;
        div.innerHTML = `
          <img src="${data.photo}" alt="গ্যালারি" loading="lazy">
          <div class="divider"></div>
        `;
        galleryGrid.appendChild(div);
      });
    }
    loadData();
    
  window.onload = function() {
    if (!sessionStorage.getItem("popupShown")) {
      document.getElementById("popup").style.display = "flex";
      sessionStorage.setItem("popupShown", "true");
    }
  }
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  
      const audio = document.getElementById('quranAudio');
    const btn = document.getElementById('playAudioBtn');
    const scrollText = document.getElementById('scrollText');
    let animationId;

    function startScroll() {
      const containerWidth = scrollText.parentElement.offsetWidth;
      const textWidth = scrollText.offsetWidth;
      const totalDistance = containerWidth + textWidth;

      const duration = 26000; // milliseconds
      const startTime = performance.now();

      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        scrollText.style.transform = `translateX(${-totalDistance * progress}px)`;

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    function stopScroll() {
      cancelAnimationFrame(animationId);
    }

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        btn.textContent = "⏸️ থামান";
        stopScroll();
        startScroll();
      } else {
        audio.pause();
        btn.textContent = "▶️ আয়াত শুনুন";
        stopScroll();
      }
    });

    audio.addEventListener('ended', () => {
      stopScroll();
      btn.textContent = "▶️ একটি আয়াত শুনুন";
      scrollText.style.transform = 'translateX(0%)';
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        audio.pause();
        stopScroll();
        btn.textContent = "▶️ একটি আয়াত শুনুন";
        scrollText.style.transform = 'translateX(0%)';
      }
    });

    // Metadata লোড হলে duration ঠিক করে scroll
    audio.addEventListener('loadedmetadata', () => {
      if (!audio.paused) {
        stopScroll();
        startScroll();
      }
    });
    
let deferredPrompt;
const installWall = document.getElementById('installWall');
const mainContent = document.getElementById('mainWebsiteContent');
const btnInstall = document.getElementById('btnInstall');





// ১. সার্ভিস ওয়ার্কার রেজিস্টার (এটা সবার আগে আলাদা রাখুন)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Fail', err));
  });
}

// ২. পিডব্লিউএ ইনস্টল লজিক (Error safe version)
(function() {
    let deferredPrompt;
    const installBanner = document.getElementById('pwa-install-banner');
    const btnInstall = document.getElementById('btnBannerInstall');
    const btnClose = document.getElementById('btnBannerClose');

    // চেক করা হচ্ছে আইডিগুলো এইচটিএমএল-এ আছে কি না
    if (!installBanner || !btnInstall || !btnClose) return;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // ৩ সেকেন্ড পর ব্যানার দেখাবে
        setTimeout(() => {
            if (installBanner) installBanner.classList.add('show');
        }, 3000);
    });

    btnInstall.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            installBanner.classList.remove('show');
            deferredPrompt = null;
        }
    });

    btnClose.addEventListener('click', () => {
        installBanner.classList.remove('show');
    });

    window.addEventListener('appinstalled', () => {
        installBanner.classList.remove('show');
        deferredPrompt = null;
    });
})();

// ৩. আপনার বাকি সব কোড (Firebase, Blog, Popup) এরপর থেকে শুরু হবে...
