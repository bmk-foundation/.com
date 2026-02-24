// TAB Switch
    function showTab(id) {
      document.querySelectorAll('.tab-content').forEach(div => div.classList.remove('active'));
      document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      event.target.classList.add('active');
    }

const apiUrl = "https://script.google.com/macros/s/AKfycbz54He1p6oeqmI-jLacC1AgZVddJJyYTV4_VOQb9V1c8DRfdKenuAM8eLur9ySuvyqa/exec?sheet=Summary";

    async function loadSummary() {
      const summaryCards = document.getElementById('summaryCards');
      // Show spinner while loading
      summaryCards.innerHTML = '<div class="spinner"></div>';

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        summaryCards.innerHTML = ""; // remove spinner

        data.forEach((item, index) => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `<span class="label">${item.label}</span><span class="value">${item.value}</span>`;
          summaryCards.appendChild(card);
        });

      } catch (err) {
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", err);
        summaryCards.innerHTML = "<p>ডেটা লোড করা যায়নি।</p>";
      }
    }

    loadSummary();

    // Donor List
const scriptURL = "https://script.google.com/macros/s/AKfycbx-7P9mfq3Y8YKtD29xNzIGgsMvM8GtptaConRqlmlFn1L1jaomBekrqWcU2q7vzrpo/exec?sheet=Donation";

    function getBanglaMonth(monthIndex) {
      const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
      return months[monthIndex];
    }

    fetch(scriptURL)
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById('donorList');
        tbody.innerHTML = '';

        // মাস অনুযায়ী গ্রুপ বানানো
        const grouped = {};
        data.forEach(donor => {
          if (!donor.Timestamp) return;
          const date = new Date(donor.Timestamp);
          const key = date.getFullYear() + '-' + (date.getMonth() + 1); // YYYY-M
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(donor);
        });

        // মাসগুলো sort করে নতুন মাস আগে দেখানো
        const sortedKeys = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

        sortedKeys.forEach(key => {
          const [year, month] = key.split('-');
          const monthName = getBanglaMonth(parseInt(month) - 1);

          // মাসের হেডার রো
          const headerRow = document.createElement('tr');
          headerRow.innerHTML = `<td colspan="3" style="background: #006064;font-weight:normal;text-align:center; color: yellow;">${monthName} ${year}</td>`;
          tbody.appendChild(headerRow);

          // এই মাসের দাতাদের লিস্ট
          grouped[key].forEach(donor => {
            const tr = document.createElement('tr');

            ['Name','Phone','Amount'].forEach(field => {
              const td = document.createElement('td');
              if (field === 'Amount') {
                td.textContent = '৳ ' + (donor[field] || '');
              } else {
                td.textContent = donor[field] || '';
              }
              tr.appendChild(td);
            });

            tbody.appendChild(tr);
          });
        });
      })
      .catch(() => {
        document.getElementById('donorList').innerHTML = '<tr><td colspan="3">❌ ডেটা লোড করা যায়নি। পরে আবার চেষ্টা করুন।</td></tr>';
      });