let currentUrl = "";

function generate() {
    const text = document.getElementById('quoteInput').value;
    if (!text.trim()) return;

    const btn = document.getElementById('btnAction');
    const loader = document.getElementById('loader');
    const output = document.getElementById('output');
    const img = document.getElementById('resultImg');

    btn.disabled = true;
    loader.style.display = "block";
    output.style.display = "none";

    currentUrl = `https://api-faa.my.id/faa/iqc?prompt=${encodeURIComponent(text)}&name=%20`;
    
    img.crossOrigin = "anonymous";
    img.src = currentUrl;

    img.onload = () => {
        btn.disabled = false;
        loader.style.display = "none";
        output.style.display = "block";
    };
    
    img.onerror = () => {
        alert("API sedang sibuk.");
        btn.disabled = false;
        loader.style.display = "none";
    };
}

function downloadViaCanvas() {
    const img = document.getElementById('resultImg');
    const canvas = document.getElementById('helperCanvas');
    const ctx = canvas.getContext('2d');
    const btn = document.querySelector('.btn-save');

    btn.innerText = "PROCESSING...";

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    try {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = `IQC_Quote_${Date.now()}.png`;
        link.href = dataURL;
        link.click();

        btn.innerText = "SUCCESS";
        setTimeout(() => { btn.innerText = "SAVE TO GALLERY"; }, 2000);
    } catch (e) {
        alert("Gagal otomatis. Tahan gambar lalu pilih Simpan.");
        btn.innerText = "SAVE TO GALLERY";
    }
}
