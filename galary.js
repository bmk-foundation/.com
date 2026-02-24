// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBOBeWy-3P39kVnxNmQIMm0-Mawol1qjQU",
  authDomain: "admin-fe276.firebaseapp.com",
  databaseURL: "https://admin-fe276-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-fe276",
  storageBucket: "admin-fe276.appspot.com",
  messagingSenderId: "1047359464238",
  appId: "1:1047359464238:web:bbb93e1b350b8d925110bf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const galleryGrid = document.getElementById("galleryGrid");

function loadGalleryPhotos() {
  db.ref("photoOnly").orderByChild("timestamp").once("value").then(snapshot => {
    const galleryItems = [];
    snapshot.forEach(child => {
      galleryItems.push(child.val());
    });

    // Sort newest to oldest
    galleryItems.sort((a, b) => b.timestamp - a.timestamp);

    // Show photos one by one with delay
    galleryItems.forEach((data, index) => {
      setTimeout(() => {
        const div = document.createElement("div");
        div.className = `item ${data.size || "medium"}`;
        div.style.animationDelay = `${index * 150}ms`; // Delay for staggered effect

        div.innerHTML = `
          <img src="${data.photo}" alt="গ্যালারি ছবি" loading="lazy">
        `;
        galleryGrid.appendChild(div);
      }, index * 150); // Delay between items
    });
  });
}

loadGalleryPhotos();
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