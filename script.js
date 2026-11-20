// 1. Open Wax Seal Envelope
function openInvitation() {
    document.getElementById('envelope-screen').classList.add('opened');
}

// 2. Switch Multiple Pages Smoothly
function switchPage(pageId, btnElement) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Scratch-Off Circles Effect
document.querySelectorAll('.scratch-canvas').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 92, 92);
    grad.addColorStop(0, '#f6d365');
    grad.addColorStop(0.5, '#d4af37');
    grad.addColorStop(1, '#b5891c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 92, 92);

    ctx.fillStyle = '#5c4305';
    ctx.font = 'bold 11px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH', 46, 50);

    let isDrawing = false;

    function scratch(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches.clientX : e.clientX;
        const clientY = e.touches ? e.touches.clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: true });
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratch, { passive: true });
});

// 4. RSVP Form Submit
function submitRSVP(e) {
    e.preventDefault();
    const name = document.getElementById('guestName').value;
    document.getElementById('rsvp-msg').innerText = `Thank you, ${name}! Your RSVP has been recorded.`;
    e.target.reset();
}
