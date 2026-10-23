// Global State Management
let currentCurrency = 'KSH';
const exchangeRateUSD = 0.0077; // 1 KSH = 0.0077 USD approx

let cart = [];
let appliedDiscount = 0; // percentage

// Dynamic Offers List State
let offersList = [
    { id: 1, title: 'Cozy & Cute Bundle', code: 'COZY20', discount: 20, desc: 'Get 20% off when buying any 2 Cute & Cozy series books.' },
    { id: 2, title: 'Karibu Kenya Launch', code: 'KARIBU15', discount: 15, desc: '15% off Provisions Kenya & Cultural series.' }
];

// Product Catalog Data
const products = [
    {
        id: 'p1',
        title: 'Provisions Kenya: Market Stall',
        category: 'heritage',
        priceKsh: 600,
        desc: 'Inspired by local market fruits, vegetables, and woven baskets. Hand-drawn bold lines on premium paper.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'p2',
        title: 'Little Corner: Cozy Bookshop',
        category: 'cozy',
        priceKsh: 650,
        desc: 'Coco Wyo style adorable storefronts, cozy coffee nooks, and sleeping kittens.',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'p3',
        title: 'Botanical Stress Relief Mandalas',
        category: 'mandala',
        priceKsh: 700,
        desc: 'Complex geometric flowers and calming symmetry for deep adult art therapy.',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'p4',
        title: 'Cozy Travel & Tiny Bedrooms',
        category: 'cozy',
        priceKsh: 600,
        desc: 'Comfy aesthetic room setups, aesthetic desks, plants, and relaxing vibes.',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'p5',
        title: 'Safari Wildlife Kids Edition',
        category: 'kids',
        priceKsh: 500,
        desc: 'Thick, bold outlines of lions, elephants, and giraffes designed for young colorists.',
        image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 'p6',
        title: 'Mischievous Fairies & Magic',
        category: 'mandala',
        priceKsh: 650,
        desc: 'Enchanted forests, mushrooms, and whimsical fantasy characters.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80'
    }
];

// Digital Canvas Templates Data
const canvasTemplates = [
    { id: 't1', title: 'Cozy Bookshop', icon: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=100&q=80', drawFn: drawBookshopTemplate },
    { id: 't2', title: 'Market Provisions', icon: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=100&q=80', drawFn: drawMarketTemplate },
    { id: 't3', title: 'Floral Mandala', icon: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=100&q=80', drawFn: drawMandalaTemplate }
];

// Studio State
let activeTemplateIndex = 0;
let activeColor = '#E76F51';
let activeTool = 'fill'; // 'fill' or 'brush'
let brushSize = 15;
let canvas, ctx;

// Color Palette Options
const paletteColors = ['#E76F51', '#2A9D8F', '#E9C46A', '#F4A261', '#264653', '#E63946', '#A8DADC', '#457B9D', '#1D3557', '#9B5DE5', '#00F5D4', '#FFFFFF'];

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderOffers();
    renderProducts(products);
    initStudio();
    renderAdminOfferList();
});

// Currency Switching Helper
function switchCurrency(curr) {
    currentCurrency = curr;
    document.getElementById('curr-ksh').classList.toggle('active', curr === 'KSH');
    document.getElementById('curr-usd').classList.toggle('active', curr === 'USD');
    renderProducts(products);
    updateCartUI();
}

function formatPrice(priceKsh) {
    if (currentCurrency === 'USD') {
        return '$' + (priceKsh * exchangeRateUSD).toFixed(2);
    }
    return 'Ksh ' + priceKsh.toLocaleString();
}

// Render Offers
function renderOffers() {
    const container = document.getElementById('offersContainer');
    container.innerHTML = offersList.map(offer => `
        <div class="offer-card">
            <span class="offer-tag">${offer.discount}% OFF</span>
            <h3>${offer.title}</h3>
            <p>${offer.desc}</p>
            <div>Use Code: <span class="offer-code">${offer.code}</span></div>
        </div>
    `).join('');
}

// Render Products Catalog
function renderProducts(items) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <span class="badge-cat">${p.category.toUpperCase()}</span>
                <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.title}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(p.priceKsh)}</span>
                    <button class="add-cart-btn" onclick="addToCart('${p.id}')"><i class="fa-solid fa-plus"></i> Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Category
function filterCategory(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (cat === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderProducts(filtered);
    }
}

// Cart Functionality
function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

function updateCartQty(id, change) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(c => c.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartCount').innerText = totalCount;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding:40px 0;">Your cart is empty.</p>`;
        document.getElementById('cartSubtotal').innerText = formatPrice(0);
        document.getElementById('cartTotal').innerText = formatPrice(0);
        return;
    }

    let subtotalKsh = cart.reduce((sum, item) => sum + (item.priceKsh * item.qty), 0);
    let totalKsh = subtotalKsh * ((100 - appliedDiscount) / 100);

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <strong>${item.title}</strong>
                <div>${formatPrice(item.priceKsh)}</div>
                <div style="margin-top: 4px;">
                    <button onclick="updateCartQty('${item.id}', -1)" style="padding: 2px 8px;">-</button>
                    <span style="margin: 0 8px;">${item.qty}</span>
                    <button onclick="updateCartQty('${item.id}', 1)" style="padding: 2px 8px;">+</button>
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById('cartSubtotal').innerText = formatPrice(subtotalKsh);
    document.getElementById('cartTotal').innerText = formatPrice(totalKsh);
}

function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    const offer = offersList.find(o => o.code === code);
    const msg = document.getElementById('discountMsg');
    if (offer) {
        appliedDiscount = offer.discount;
        msg.style.color = '#2a9d8f';
        msg.innerText = `Coupon Applied! ${offer.discount}% OFF`;
    } else {
        appliedDiscount = 0;
        msg.style.color = '#e76f51';
        msg.innerText = 'Invalid Offer Code';
    }
    updateCartUI();
}

function toggleCart(forceOpen) {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    if (forceOpen || !drawer.classList.contains('open')) {
        drawer.classList.add('open');
        overlay.style.display = 'block';
    } else {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
    }
}

// Interactive Studio Setup
function initStudio() {
    canvas = document.getElementById('coloringCanvas');
    ctx = canvas.getContext('2d');

    // Render palette
    const paletteBar = document.getElementById('paletteBar');
    paletteColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch' + (color === activeColor ? ' active' : '');
        swatch.style.backgroundColor = color;
        swatch.onclick = () => selectColor(color, swatch);
        paletteBar.insertBefore(swatch, document.getElementById('customColorPicker'));
    });

    // Render Template List
    const templateList = document.getElementById('templateList');
    templateList.innerHTML = canvasTemplates.map((t, idx) => `
        <div class="template-item ${idx === 0 ? 'active' : ''}" onclick="loadTemplate(${idx}, this)">
            <img src="${t.icon}" alt="${t.title}">
            <span>${t.title}</span>
        </div>
    `).join('');

    loadTemplate(0);

    // Event listeners for brush mode
    let isDrawing = false;
    canvas.addEventListener('mousedown', (e) => {
        if (activeTool === 'brush') {
            isDrawing = true;
            paintBrush(e);
        } else if (activeTool === 'fill') {
            bucketFill(e);
        }
    });
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing && activeTool === 'brush') paintBrush(e);
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);

    document.getElementById('brushSize').addEventListener('input', (e) => {
        brushSize = e.target.value;
    });
}

function selectColor(color, element) {
    activeColor = color;
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    if (element) element.classList.add('active');
}

function setTool(tool) {
    activeTool = tool;
    document.getElementById('tool-fill').classList.toggle('active', tool === 'fill');
    document.getElementById('tool-brush').classList.toggle('active', tool === 'brush');
}

function loadTemplate(index, element) {
    activeTemplateIndex = index;
    if (element) {
        document.querySelectorAll('.template-item').forEach(t => t.classList.remove('active'));
        element.classList.add('active');
    }
    canvasTemplates[index].drawFn();
}

function undoCanvas() {
    canvasTemplates[activeTemplateIndex].drawFn();
}

function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'Ts-Creations-Art.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Canvas Drawings (Line-art Simulators)
function drawBookshopTemplate() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#264653";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    // Roof & Store Outline
    ctx.strokeRect(100, 150, 400, 350);
    ctx.beginPath();
    ctx.moveTo(80, 150); ctx.lineTo(300, 70); ctx.lineTo(520, 150); ctx.closePath();
    ctx.stroke();

    // Windows
    ctx.strokeRect(140, 200, 120, 140);
    ctx.strokeRect(340, 200, 120, 140);

    // Door
    ctx.strokeRect(250, 360, 100, 140);

    // Decorative Sign
    ctx.strokeRect(200, 100, 200, 40);
    ctx.font = "bold 20px Fredoka";
    ctx.fillStyle = "#264653";
    ctx.fillText("BOOKSHOP", 240, 128);
}

function drawMarketTemplate() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#264653";
    ctx.lineWidth = 4;

    // Table Stall
    ctx.strokeRect(80, 280, 440, 200);

    // Baskets
    ctx.beginPath();
    ctx.arc(160, 260, 50, 0, Math.PI * 2);
    ctx.arc(300, 260, 60, 0, Math.PI * 2);
    ctx.arc(440, 260, 50, 0, Math.PI * 2);
    ctx.stroke();

    // Fruits/Veg
    ctx.beginPath();
    ctx.arc(160, 250, 15, 0, Math.PI * 2);
    ctx.arc(300, 240, 20, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = "bold 22px Fredoka";
    ctx.fillStyle = "#264653";
    ctx.fillText("PROVISIONS KENYA", 200, 80);
}

function drawMandalaTemplate() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#264653";
    ctx.lineWidth = 3;

    const cx = 300, cy = 300;
    for (let r = 40; r <= 200; r += 40) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
    }

    for (let i = 0; i < 12; i++) {
        let angle = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 200, cy + Math.sin(angle) * 200);
        ctx.stroke();
    }
}

// Painting Functions
function paintBrush(e) {
    const rect = canvas.getBoundingClientRect