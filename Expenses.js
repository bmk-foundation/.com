// --- Sidebar & UI Logic ---
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.add('active');
    overlay.classList.add('active');
    menuToggle.classList.add('hidden');
});

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('hidden');
}

overlay.addEventListener('click', closeSidebar);
sidebar.addEventListener('click', (e) => e.stopPropagation());

// --- Smart Syncing & Loading Logic ---
const url = "https://script.google.com/macros/s/AKfycbw27SQuYCRknWUblsKfgGhFy8QWIUtx01Q34WCdZP7ZeDFWFXfxssfDSmcvyzqgIfe4/exec?sheet=Expenses";

async function fetchData() {
    const loader = document.getElementById("loader");
    const cachedData = localStorage.getItem("bmkf_expense_data");

    // ১. মেমোরিতে ডাটা থাকলে তা দ্রুত দেখাও
    if (cachedData) {
        const data = JSON.parse(cachedData);
        renderData(data);
        calculateTotal(data);
        loader.style.display = "none"; // ডাটা আছে তাই লোডার বন্ধ
        console.log("Showing cached data...");
    } else {
        // ২. যদি মেমোরিতে ডাটা না থাকে, তবে লোডার নিশ্চিতভাবে দেখাও
        loader.style.display = "flex"; 
        console.log("No cache found, showing loader...");
    }

    // ৩. ব্যাকগ্রাউন্ডে বা মেইনলি সার্ভার থেকে ডাটা আনা
    try {
        const res = await fetch(url);
        const newData = await res.json();
        const newDataString = JSON.stringify(newData);

        // ৪. নতুন ডাটা কি পুরোনো ডাটার চেয়ে আলাদা? 
        if (newDataString !== cachedData) {
            localStorage.setItem("bmkf_expense_data", newDataString);
            renderData(newData);
            calculateTotal(newData);
            console.log("Data updated from server.");
        }

        // সব কাজ শেষে লোডার বন্ধ
        loader.style.display = "none";

    } catch (err) {
        if (!cachedData) {
            loader.innerHTML = `<span style="color: #ef4444;">❌ তথ্য লোড করতে সমস্যা হচ্ছে!</span>`;
        }
        console.error("Fetch error:", err);
    }
}

// --- Rendering Data to Cards ---
function renderData(data) {
    const list = document.getElementById("dataList");
    list.innerHTML = "";
    
    data.forEach(item => {
        if (item.description && item.description.toLowerCase() !== "description") {
            const card = document.createElement("div");
            card.className = "card";
            card.onclick = () => showModal(item);
            card.innerHTML = `
                <div class="card-left">
                    <h3>${item.description}</h3>
                    <span>📅 ${formatDate(item.date)}</span>
                </div>
                <div class="card-right">
                    <div class="card-amount">৳ ${item.amount}</div>
                </div>
            `;
            list.appendChild(card);
        }
    });
}

// --- Calculate Total ---
function calculateTotal(data) {
    let total = data.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
    document.getElementById("totalAmount").innerText = "৳ " + total.toLocaleString("bn-BD");
}

// --- Modal System ---
function showModal(item) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
        <h2 style="color:#006064; font-size: 20px; margin-bottom: 20px; text-align: center;">
            <i class="fas fa-file-invoice-dollar"></i> খরচের বিস্তারিত
        </h2>
        <div class="modal-row"><b>তারিখ</b> <span>${formatDate(item.date)}</span></div>
        <div class="modal-row"><b>বিবরণ</b> <span>${item.description}</span></div>
        <div class="modal-row"><b>পরিমাণ</b> <span style="color:#ef4444; font-size:18px;">৳ ${item.amount}/-</span></div>
        <div class="modal-row"><b>খরচকারী</b> <span>${item.spentBy || "তথ্য নেই"}</span></div>
        <div class="modal-row" style="border-bottom: none;"><b>নোট</b> <span>${item.note || "নেই"}</span></div>
    `;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) closeModal();
}

// --- Date Formatter ---
function formatDate(d) {
    if (!d) return "-";
    const date = new Date(d);
    return isNaN(date.getTime()) ? d : date.toLocaleDateString("bn-BD", {
        day: "2-digit", month: "short", year: "numeric"
    });
}

// Start fetching
fetchData();
