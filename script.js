let activeTab = "ff";
let dataAkun = {};

function showTab(id){
    activeTab = id;

    // section
    document.querySelectorAll(".section").forEach(sec=>{
        sec.classList.remove("active");
        if(sec.id === id) sec.classList.add("active");
    });

    // tab
    document.querySelectorAll(".tab").forEach(tab=>{
        tab.classList.remove("active");
        if(tab.dataset.tab === id){
            tab.classList.add("active");
        }
    });

    resetSearch();
}

/* SEARCH GLOBAL TANPA CAMPUR TAB */
function searchAkun(keyword){
    keyword = keyword.toLowerCase().trim();
    resetHighlight();

    if(keyword === ""){
        resetSearch();
        return;
    }

    let targetTab = null;

    document.querySelectorAll(".section").forEach(section=>{
        let ketemu = false;

        section.querySelectorAll(".akun-card").forEach(card=>{
            if(card.innerText.toLowerCase().includes(keyword)){
                ketemu = true;
                highlight(card, keyword);
            }
        });

        if(ketemu && !targetTab){
            targetTab = section.id;
        }
    });

    if(targetTab){
        showTab(targetTab);
        document.querySelectorAll(`#${targetTab} .akun-card`)
        .forEach(card=>{
            card.style.display =
            card.innerText.toLowerCase().includes(keyword) ? "block" : "none";
        });
    }
}

function resetSearch(){
    document.querySelectorAll(".akun-card").forEach(card=>{
        card.style.display="block";
    });
    resetHighlight();
}

/* HIGHLIGHT */
function highlight(card, keyword){
    let regex = new RegExp(`(${keyword})`,"gi");
    card.querySelectorAll("h3,p,span").forEach(el=>{
        el.innerHTML = el.textContent.replace(regex,"<mark>$1</mark>");
    });
}

function resetHighlight(){
    document.querySelectorAll("mark").forEach(m=>{
        let parent = m.parentNode;
        parent.replaceChild(document.createTextNode(m.textContent), m);
        parent.normalize();
    });
}

/* POPUP */
function openPopup(kode,spek,harga){
    dataAkun = {kode,spek,harga,hargaAkhir:harga};
    document.getElementById("pKode").innerText = kode;
    document.getElementById("pSpek").innerText = spek;
    document.getElementById("pHarga").innerText = harga.toLocaleString();
    document.getElementById("hargaAkhir").innerText = harga.toLocaleString();
    document.getElementById("diskonInput").value="";
    document.getElementById("popup").style.display="block";
}

function closePopup(){
    document.getElementById("popup").style.display="none";
}

/* DISKON */
function applyDiskon(){
    let kode = document.getElementById("diskonInput").value.trim();
    dataAkun.hargaAkhir =
        kode === "HEMAT20" ? dataAkun.harga * 0.8 : dataAkun.harga;
    document.getElementById("hargaAkhir").innerText =
        dataAkun.hargaAkhir.toLocaleString();
}

/* WHATSAPP */
function beliWhatsApp(){
    let pesan = `Halo admin saya ingin membeli akun

Kode Akun: ${dataAkun.kode}
Spek: ${dataAkun.spek}

Harga asli Rp ${dataAkun.harga.toLocaleString()}
Harga akhir Rp ${dataAkun.hargaAkhir.toLocaleString()}

Saya mau beli akun ini`;

    let wa = "6285882369852"; // GANTI NOMOR
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(pesan)}`);
}

function toggleDarkMode(){
    document.body.classList.toggle("dark");

    // simpan ke localStorage
    if(document.body.classList.contains("dark")){
        localStorage.setItem("darkMode","on");
    } else {
        localStorage.setItem("darkMode","off");
    }
}

/* AUTO LOAD MODE */
if(localStorage.getItem("darkMode") === "on"){
    document.body.classList.add("dark");
}