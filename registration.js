const form = document.getElementById("registrationForm");
    const submitBtn = document.getElementById("submitBtn");
    const responseMsg = document.getElementById("responseMsg");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const file = document.getElementById("photoInput").files[0];

      if (!file) {
        responseMsg.innerText = "❌ ছবি অবশ্যই দিন।";
        return;
      }

      const reader = new FileReader();

      reader.onloadend = async function () {
        const base64Image = reader.result;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("photo", base64Image);

        submitBtn.disabled = true;
        submitBtn.innerHTML = "⏳ রেজিস্ট্রেশন হচ্ছে... <span class='spinner'></span>";
        responseMsg.innerText = "";

        const url = "https://script.google.com/macros/s/AKfycbzW2tcQD9w9bl8HGbHdQpD0DR2G-8hEUXtX2r-YKYTGukp15KTnB1-JuVApWcAB4ORt5Q/exec";

        try {
          const res = await fetch(url, {
            method: "POST",
            body: formData
          });

          const result = await res.text();
          responseMsg.innerText = result;

          if (result.includes("সফল")) {
            form.reset();
          }
        } catch (err) {
          responseMsg.innerText = "❌ ত্রুটি হয়েছে: " + err.message;
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = "রেজিস্টার করুন";
      };

      reader.readAsDataURL(file);
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