// আপনার অরিজিনাল ডাটা লিস্ট
const originalData = [
  { name: "মোঃ মোফাচ্ছেল ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://iili.io/K3Z6gQ1.md.jpg", email: "rofikulislam.tecnok15k@gmail.com", phone: "+8801749629769" },
  { name: "মোঃ স্বপন", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/nMmbs0w3/Sopon.jpg", email: "পাওয়া যায়নি", phone: "+8801733138704" },
  { name: "মোঃ সজীব ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/9mH5rTpP/Sojib.jpg", email: "mdfahimvai1020@gmail.com", phone: "+8801917133981" },
  { name: "মোঃ শফিকুল ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co/Dfv07G1L/images.png", email: "পাওয়া যায়নি", phone: "+8801906594704" },
  { name: "মোঃ ফরিদুল ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co/Dfv07G1L/images.png", email: "পাওয়া যায়নি", phone: "+8801794702230" },
  { name: "মোঃ আল-আমিন", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co/Dfv07G1L/images.png", email: "পাওয়া যায়নি", phone: "+8801791226533" },
  { name: "মোঃ সাজু ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/Kx5LZq1Z/member21.jpg", email: "mdsajuislamsaju15@gmail.com", phone: "+8801995502698" },
  { name: "মোঃ মমিনুর ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/TBmTzxcL/member20.jpg", email: "পাওয়া যায়নি", phone: "+8801718043209" },
  { name: "মোঃ মমিন ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/wrKvwvSJ/member19.jpg", email: "mdmominmr757@gmail.com", phone: "+8801705374514" },
  { name: "মোঃ রাসেল বাবু", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/0R8QhSyy/member18-1.jpg", email: "skraselbabu749@gmail.com", phone: "+8801338407384" },
  { name: "মোঃ ফারুক হোসেন", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/KcXTM0Xm/member17.jpg", email: "farukislam.spz16@gmail.com", phone: "+8801780252146" },
  { name: "মোঃ সোহাগ বাবু", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/BKj7df1h/member16.jpg", email: "sohag.symphony.and13@gmail.com", phone: "+8801964883462" },
  { name: "মোঃ রবিউল ইসলাম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/JW6VSqBy/member15-1.jpg", email: "mdrobiulislamislam003@gmail.com", phone: "+8801707064330" },
  { name: "মোঃ শাকিল আহমেদ", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/d4cLcrBG/member14.jpg", email: "shakilkhanmd522@gmail.com", phone: "+8801798645911" },
  { name: "মোঃ রাসেল আহমেদ", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/Y77KRR5H/member13.jpg", email: "rasel7538i@gmail.com", phone: "+8801779903172" },
  { name: "মোঃ মোজাম্মেল হক", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/9Hp4cxn0/member12.jpg", email: "md01908265760@gmail.com", phone: "+8801774151775" },
  { name: "ইশা হুজুর", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/DH2D9q53/member11-1.jpg", email: "পাওয়া যায়নি", phone: "+8801773266062" },
  { name: "মোঃ সোহেল রানা", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/zTCqJLqD/member10.jpg", email: "visohelrana@gmail.com", phone: "+8801780581674" },
  { name: "মোঃ মোখলেছুর রহমান", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/0jRtyDXx/Number-10.jpg", email: "mdmoklechkhan905@gmail.com", phone: "+8801793675524" },
  { name: "মোঃ আনিছুর রহমান", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/ZpZ1jFyG/memberA.jpg", email: "পাওয়া যায়নি", phone: "+8801719725974" },
  { name: "মোঃ মাসুদ রানা", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/yBWdW6nF/member7.jpg", email: "পাওয়া যায়নি", phone: "+8801305101698" },
  { name: "মোঃ শেখসাদী আলম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/pNMfwfP/Sheksadi.jpg", email: "mdsheksadialom@gmail.com", phone: "+8801789104086" },
  { name: "মোঃ ইব্রাহীম খলিল", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/Kc982VS3/Member5.jpg", email: "ibrahim.hios.v13@gmail.com", phone: "+8801738090506" },
  { name: "মোঃ বেলাল হোসেন", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/20LSBF02/member4.jpg", email: "belal.hossain.ui3.0@gmail.com", phone: "+8801779211568" },
  { name: "মোঃ জাহিদুল ইসলাম (মিন্টু)", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co/9kL60VLw/member3-1.jpg", email: "atiyazannat8171@gmail.com", phone: "+8801756817148" },
  { name: "হাফেজ মোঃ নুর আলম", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/HTBBXJhh/member2.jpg", email: "hmnuralamsiddiki00@gmail.com", phone: "+8801408835591" },
  { name: "মোহাম্মদ মাসুদ রানা", type: "core", bio: "প্রতিষ্ঠাতা সদস্য", image: "https://i.ibb.co.com/yn9447dJ/Member1.jpg", email: "masudrana.xos.7.6@gmail.com", phone: "+8801972151775" }
];

// ১. তালিকাটিকে উল্টে নেওয়া (মাসুদ রানা এখন ১ নম্বরে চলে আসবেন)
const membersData = [...originalData].reverse();

// ২. উল্টানো তালিকা অনুযায়ী স্থায়ী সিরিয়াল সেট করা
membersData.forEach((member, index) => {
  member.displayID = index + 1; 
});

let currentPage = 1;
const membersPerPage = 10;
let filteredMembers = [...membersData];

const membersGrid = document.getElementById("membersGrid");
const filterSelect = document.getElementById("filterType");
const sortSelect = document.getElementById("sortBy");

function getTypeLabel(type) {
  const labels = { core: "মূল সদস্য", active: "সক্রিয় সদস্য" };
  return labels[type] || "সদস্য";
}

function applyFiltersAndSort() {
  const selectedType = filterSelect.value;
  const selectedSort = sortSelect.value;

  // ফিল্টার প্রয়োগ
  if (selectedType === "all") {
    filteredMembers = [...membersData];
  } else {
    filteredMembers = membersData.filter(m => m.type === selectedType);
  }

  // সর্ট প্রয়োগ
  if (selectedSort === "name") {
    filteredMembers.sort((a, b) => a.name.localeCompare(b.name, 'bn'));
  } else {
    // অরিজিনাল উল্টানো সিরিয়াল অনুযায়ী (#১ থেকে শুরু)
    filteredMembers.sort((a, b) => a.displayID - b.originalID);
  }

  currentPage = 1;
  renderMembers();
}

function renderMembers() {
  const start = (currentPage - 1) * membersPerPage;
  const end = start + membersPerPage;
  const paginated = filteredMembers.slice(start, end);

  membersGrid.innerHTML = "";
  
  paginated.forEach((m) => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.innerHTML = `
      <span class="serial">#${m.displayID}</span>
      <img src="${m.image}" alt="${m.name}" loading="lazy">
      <h4>${m.name}</h4>
      <p><strong>${getTypeLabel(m.type)}</strong></p>
    `;
    card.onclick = () => showPopup(m);
    membersGrid.appendChild(card);
  });

  updatePagination();
}

function updatePagination() {
  const total = Math.ceil(filteredMembers.length / membersPerPage);
  document.getElementById("currentPage").innerText = currentPage;
  
  const prevBtn = document.querySelector(".page-btn[onclick='prevPage()']");
  const nextBtn = document.querySelector(".page-btn[onclick='nextPage()']");
  
  if(prevBtn) prevBtn.disabled = (currentPage === 1);
  if(nextBtn) nextBtn.disabled = (currentPage === total || total === 0);
}

function prevPage() { if (currentPage > 1) { currentPage--; renderMembers(); window.scrollTo(0,0); } }
function nextPage() { 
  const total = Math.ceil(filteredMembers.length / membersPerPage);
  if (currentPage < total) { currentPage++; renderMembers(); window.scrollTo(0,0); } 
}

function showPopup(m) {
  const modal = document.getElementById("memberModal");
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <img src="${m.image}" style="width:110px; height:110px; border-radius:50%; border:3px solid #00ffa2; margin-bottom:15px; object-fit:cover;">
    <h3>${m.name}</h3>
    <p style="color:#00ffa2; margin-bottom:10px;">${getTypeLabel(m.type)}</p>
    <p style="font-size:14px; margin-bottom:15px;">${m.bio}</p>
    <div style="text-align:left; font-size:14px; background:rgba(255,255,255,0.1); padding:10px; border-radius:10px;">
      <p><i class="fas fa-phone"></i> ফোন: ${m.phone}</p>
      <p><i class="fas fa-envelope"></i> ইমেইল: ${m.email}</p>
    </div>
  `;
  modal.classList.remove("hidden");
}

function closeModal() { document.getElementById("memberModal").classList.add("hidden"); }

filterSelect.addEventListener("change", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

// শুরুতেই ডাটা রেন্ডার
applyFiltersAndSort();
