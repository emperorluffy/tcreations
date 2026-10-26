// Global Continental Configuration & Differential Pricing Tiers
let activeContinent = 'AFRICA'; // 'AFRICA', 'EUROPE', 'ASIA', 'NORTH_AMERICA', 'SOUTH_AMERICA', 'OCEANIA'
let currentLang = 'EN';         // 'EN' or Native ('SW', 'DE', 'JP', 'ES')

// Continental Currency Specs & Geolocation Defaults
const continentSpecs = {
    AFRICA: {
        name: '🌍 Africa',
        currency: 'KSh',
        symbol: 'Ksh ',
        localLangCode: 'SW',
        localLangName: 'Kiswahili',
        langLabel: 'SW / EN'
    },
    EUROPE: {
        name: '🇪🇺 Europe',
        currency: 'EUR',
        symbol: '€',
        localLangCode: 'DE',
        localLangName: 'Deutsch',
        langLabel: 'DE / EN'
    },
    ASIA: {
        name: '🌏 Asia',
        currency: 'JPY',
        symbol: '¥',
        localLangCode: 'JP',
        localLangName: '日本語',
        langLabel: 'JP / EN'
    },
    NORTH_AMERICA: {
        name: '🌎 North America',
        currency: 'USD',
        symbol: '$',
        localLangCode: 'EN',
        localLangName: 'English',
        langLabel: 'EN'
    },
    SOUTH_AMERICA: {
        name: '💃 South America',
        currency: 'USD',
        symbol: '$',
        localLangCode: 'ES',
        localLangName: 'Español',
        langLabel: 'ES / EN'
    },
    OCEANIA: {
        name: '🇦🇺 Oceania',
        currency: 'AUD',
        symbol: 'A$',
        localLangCode: 'EN',
        localLangName: 'English',
        langLabel: 'EN'
    }
};

let cart = [];
let appliedDiscount = 0; // percentage

// Mobile Menu Toggle Function
function toggleMobileMenu(forceState) {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    if (forceState === false) {
        navLinks.classList.remove('open');
    } else {
        navLinks.classList.toggle('open');
    }
}

// Differential Pricing Matrix per Continent
const productContinentPrices = {
    p1: { AFRICA: 150, EUROPE: 2.80, ASIA: 580, NORTH_AMERICA: 2.80, SOUTH_AMERICA: 2.20, OCEANIA: 3.80 },
    p2: { AFRICA: 180, EUROPE: 3.50, ASIA: 720, NORTH_AMERICA: 3.50, SOUTH_AMERICA: 2.80, OCEANIA: 4.80 },
    p3: { AFRICA: 180, EUROPE: 3.50, ASIA: 720, NORTH_AMERICA: 3.50, SOUTH_AMERICA: 2.80, OCEANIA: 4.80 },
    p4: { AFRICA: 150, EUROPE: 2.80, ASIA: 580, NORTH_AMERICA: 2.80, SOUTH_AMERICA: 2.20, OCEANIA: 3.80 },
    p5: { AFRICA: 90,  EUROPE: 1.80, ASIA: 380, NORTH_AMERICA: 1.80, SOUTH_AMERICA: 1.40, OCEANIA: 2.50 },
    p6: { AFRICA: 140, EUROPE: 2.50, ASIA: 520, NORTH_AMERICA: 2.50, SOUTH_AMERICA: 1.90, OCEANIA: 3.40 }
};

const storyContinentPrices = {
    gothic:     { AFRICA: 20, EUROPE: 0.80, ASIA: 160, NORTH_AMERICA: 0.80, SOUTH_AMERICA: 0.60, OCEANIA: 1.20 },
    horror:     { AFRICA: 25, EUROPE: 1.00, ASIA: 200, NORTH_AMERICA: 1.00, SOUTH_AMERICA: 0.75, OCEANIA: 1.50 },
    romance:    { AFRICA: 20, EUROPE: 0.80, ASIA: 160, NORTH_AMERICA: 0.80, SOUTH_AMERICA: 0.60, OCEANIA: 1.20 },
    superheroes:{ AFRICA: 30, EUROPE: 1.20, ASIA: 240, NORTH_AMERICA: 1.20, SOUTH_AMERICA: 0.90, OCEANIA: 1.80 }
};

// Translations Dictionary (Dual Language Support per Continent)
const i18n = {
    EN: {
        announcement: '<i class="fa-solid fa-sparkles"></i> Welcome to <strong>T\'s Creations</strong>! Handcrafted coloring books & digital stories.',
        brandTagline: 'Coloring Books & Digital Art Studio',
        navOffers: '<i class="fa-solid fa-tag"></i> Special Offers',
        navShop: '<i class="fa-solid fa-book-open"></i> Shop Books',
        navStudio: '<i class="fa-solid fa-paintbrush"></i> Online Studio',
        navReviews: '<i class="fa-solid fa-star"></i> Reviews',
        adminOffersBtnText: 'Offers Admin',
        heroHeading: 'Hand-Drawn Books That Bring Joy to Kids & Adults',
        heroSubtext: 'Discover cute cozy scenes, African Rituals, intricate botanical mandalas, stress-relief patterns, and vibrant local cultural heritage books designed to spark creativity.',
        btnExploreBooks: '<i class="fa-solid fa-cart-shopping"></i> Explore Books',
        btnTryStudio: '<i class="fa-solid fa-hand-pointer"></i> Try Online Studio',
        statCopiesSold: 'Copies Sold',
        statRating: 'Customer Rating',
        statLineart: 'Hand-Drawn Lineart',
        offersHeading: '<i class="fa-solid fa-fire"></i> Exclusive Offers & Deals',
        offersSubtext: 'Updated in real-time. Use these offer codes at checkout for discounts!',
        studioHeading: 'Try Online Coloring Studio',
        studioSubtext: 'Color right in your browser on phone, tablet, stylus, or desktop! Tap bounded areas to flood fill or draw freehand.',
        sidebarThemeTitle: 'Select Theme',
        storyCardTitle: 'Get a Custom Story',
        storyCardDesc: 'Order custom story coloring pages! Pricing per story catalogue & length.',
        storyGenreLabel: 'Story Catalogue:',
        storyLengthLabel: 'Story Length:',
        optStory5: 'Short Story (5 Pages)',
        optStory10: 'Medium Tale (10 Pages)',
        optStory20: 'Full Storybook (20 Pages)',
        lblTotalPrice: 'Total Price:',
        btnAddStoryText: 'Add Story to Cart',
        lblFillBucket: 'Fill Bucket',
        lblBrush: 'Brush',
        lblEraser: 'Eraser',
        lblSize: 'Size:',
        lblUndo: 'Undo',
        lblReset: 'Reset',
        lblSaveArt: 'Save Art',
        lblPalette: 'Palette:',
        lblCustomColor: 'Custom',
        shopHeading: 'Our Coloring Book Collection',
        shopSubtext: 'Browse hand-crafted physical coloring books printed on premium 160gsm bleed-proof paper.',
        filterAll: 'All Books',
        filterCozy: 'Luxury & Cozy',
        filterHeritage: 'African Rituals',
        filterMandala: 'Mandalas & Therapy',
        filterKids: 'Kids Editions',
        reviewsHeading: 'Loved By Colorists Everywhere',
        reviewsSubtext: 'Read what our happy customers say about T\'s Creations.',
        lblYourCart: 'Your Cart',
        btnApplyCoupon: 'Apply',
        lblSubtotal: 'Subtotal:',
        lblTotal: 'Total:',
        btnCheckoutText: 'Proceed to Checkout'
    },
    SW: {
        announcement: '<i class="fa-solid fa-sparkles"></i> Karibu <strong>T\'s Creations</strong>! Vitabu vya kupaka rangi kuanzia Ksh 20 tu!',
        brandTagline: 'Vitabu vya Rangi na Studio ya Mtandao',
        navOffers: '<i class="fa-solid fa-tag"></i> Ofa Maalum',
        navShop: '<i class="fa-solid fa-book-open"></i> Duka la Vitabu',
        navStudio: '<i class="fa-solid fa-paintbrush"></i> Studio ya Mtandao',
        navReviews: '<i class="fa-solid fa-star"></i> Maoni',
        adminOffersBtnText: 'Ofa za Admin',
        heroHeading: 'Vitabu Vilivyochorwa kwa Mikono kwa Watoto na Wakubwa',
        heroSubtext: 'Gundua picha za Kiafrika, mandala za maua, na picha za kipekee zilizoundwa kuamsha ubunifu wako.',
        btnExploreBooks: '<i class="fa-solid fa-cart-shopping"></i> Nunua Vitabu',
        btnTryStudio: '<i class="fa-solid fa-hand-pointer"></i> Jaribu Studio',
        statCopiesSold: 'Vitabu Vilivyouzwa',
        statRating: 'Daraja la Wateja',
        statLineart: 'Kazi ya Mikono 100%',
        offersHeading: '<i class="fa-solid fa-fire"></i> Ofa na Punguzo Maalum',
        offersSubtext: 'Zimesasishwa papo hapo. Tumia msimbo wa punguzo wakati wa kulipa!',
        studioHeading: 'Studio ya Paka Rangi Mtandaoni',
        studioSubtext: 'Paka rangi mtandaoni kwenye simu au kompyuta yako! Gusa sehemu zilizofungwa kujaza rangi.',
        sidebarThemeTitle: 'Mada za Picha',
        storyCardTitle: 'Agiza Hadithi Yako',
        storyCardDesc: 'Agiza kurasa za hadithi maalum zenye picha za kupaka rangi!',
        storyGenreLabel: 'Aina ya Hadithi:',
        storyLengthLabel: 'Urefu wa Hadithi:',
        optStory5: 'Hadithi Fupi (Kurasa 5)',
        optStory10: 'Hadithi ya Kati (Kurasa 10)',
        optStory20: 'Kitabu Kamili (Kurasa 20)',
        lblTotalPrice: 'Bei Kamili:',
        btnAddStoryText: 'Weka Kwenye Kikapu',
        lblFillBucket: 'Jaza Rangi',
        lblBrush: 'Broshi',
        lblEraser: 'Futa',
        lblSize: 'Ukubwa:',
        lblUndo: 'Rudi Nyuma',
        lblReset: 'Anza Upya',
        lblSaveArt: 'Hifadhi Picha',
        lblPalette: 'Rangi:',
        lblCustomColor: 'Chagua',
        shopHeading: 'Mkusanyiko wa Vitabu Vyetu',
        shopSubtext: 'Vinjari vitabu bora vilivyochapishwa kwenye karatasi imara zisizopenya wino.',
        filterAll: 'Vitabu Vyote',
        filterCozy: 'Anasa na Starehe',
        filterHeritage: 'Mila za Kiafrika',
        filterMandala: 'Mandala & Tiba',
        filterKids: 'Eneo la Watoto',
        reviewsHeading: 'Inapendwa na Wateja Wote',
        reviewsSubtext: 'Soma maoni ya wateja wetu kote duniani.',
        lblYourCart: 'Kikapu Chako',
        btnApplyCoupon: 'Tumia',
        lblSubtotal: 'Jumla Ndogo:',
        lblTotal: 'Jumla Kuu:',
        btnCheckoutText: 'Endelea Kulipa'
    },
    DE: {
        announcement: '<i class="fa-solid fa-sparkles"></i> Willkommen bei <strong>T\'s Creations</strong>! Malbücher & digitale Geschichten.',
        brandTagline: 'Malbücher & Digitales Kunststudio',
        navOffers: '<i class="fa-solid fa-tag"></i> Sonderangebote',
        navShop: '<i class="fa-solid fa-book-open"></i> Bücher Shop',
        navStudio: '<i class="fa-solid fa-paintbrush"></i> Online Studio',
        navReviews: '<i class="fa-solid fa-star"></i> Bewertungen',
        adminOffersBtnText: 'Angebote Admin',
        heroHeading: 'Handgezeichnete Malbücher für Kinder & Erwachsene',
        heroSubtext: 'Entdecken Sie Pariser Ateliers, afrikanische Rituale, botanische Mandalas und kreative Geschichten.',
        btnExploreBooks: '<i class="fa-solid fa-cart-shopping"></i> Bücher Kaufen',
        btnTryStudio: '<i class="fa-solid fa-hand-pointer"></i> Studio Testen',
        statCopiesSold: 'Verkaufte Bücher',
        statRating: 'Kundenbewertung',
        statLineart: '100% Handgezeichnet',
        offersHeading: '<i class="fa-solid fa-fire"></i> Exklusive Angebote',
        offersSubtext: 'In Echtzeit aktualisiert. Nutzen Sie Rabattcodes an der Kasse!',
        studioHeading: 'Interaktives Online Malstudio',
        studioSubtext: 'Malen Sie direkt im Browser auf Smartphone, Tablet oder PC!',
        sidebarThemeTitle: 'Thema Wählen',
        storyCardTitle: 'Wunschgeschichte Bestellen',
        storyCardDesc: 'Bestellen Sie maßgeschneiderte Ausmalgeschichten nach Wunschthema und Länge!',
        storyGenreLabel: 'Geschichten-Kategorie:',
        storyLengthLabel: 'Umfang:',
        optStory5: 'Kurzgeschichte (5 Seiten)',
        optStory10: 'Mittlere Geschichte (10 Seiten)',
        optStory20: 'Vollständiges Buch (20 Seiten)',
        lblTotalPrice: 'Gesamtpreis:',
        btnAddStoryText: 'In den Warenkorb',
        lblFillBucket: 'Eimer Füllen',
        lblBrush: 'Pinsel',
        lblEraser: 'Radiergummi',
        lblSize: 'Größe:',
        lblUndo: 'Rückgängig',
        lblReset: 'Zurücksetzen',
        lblSaveArt: 'Bild Speichern',
        lblPalette: 'Farbpalette:',
        lblCustomColor: 'Eigene Farbe',
        shopHeading: 'Unsere Malbuch-Kollektion',
        shopSubtext: 'Durchstöbern Sie gedruckte Premium-Malbücher auf 160g bleed-proof Papier.',
        filterAll: 'Alle Bücher',
        filterCozy: 'Luxus & Komfort',
        filterHeritage: 'Afrikanische Rituale',
        filterMandala: 'Mandalas & Therapie',
        filterKids: 'Für Kinder',
        reviewsHeading: 'Beliebt bei Kunstfreunden Weltweit',
        reviewsSubtext: 'Lesen Sie Kundenbewertungen zu T\'s Creations.',
        lblYourCart: 'Ihr Warenkorb',
        btnApplyCoupon: 'Einlösen',
        lblSubtotal: 'Zwischensumme:',
        lblTotal: 'Gesamtsumme:',
        btnCheckoutText: 'Zur Kasse Gehen'
    },
    JP: {
        announcement: '<i class="fa-solid fa-sparkles"></i> <strong>T\'s Creations</strong> へようこそ！手描き塗り絵本とデジタルストーリー。',
        brandTagline: '塗り絵本 & デジタルアートスタジオ',
        navOffers: '<i class="fa-solid fa-tag"></i> 特別オファー',
        navShop: '<i class="fa-solid fa-book-open"></i> ショップ',
        navStudio: '<i class="fa-solid fa-paintbrush"></i> オンラインスタジオ',
        navReviews: '<i class="fa-solid fa-star"></i> レビュー',
        adminOffersBtnText: 'オファー管理',
        heroHeading: '子供と大人のための手描きの美しい塗り絵本',
        heroSubtext: 'パリのアトリエ、アフリカの儀式、美しいマンダラなど、創造力を刺激するコレクション。',
        btnExploreBooks: '<i class="fa-solid fa-cart-shopping"></i> 本を見る',
        btnTryStudio: '<i class="fa-solid fa-hand-pointer"></i> スタジオを試す',
        statCopiesSold: '販売実績',
        statRating: 'カスタマー評価',
        statLineart: '100% 手描き線画',
        offersHeading: '<i class="fa-solid fa-fire"></i> 限定オファー',
        offersSubtext: 'チェックアウト時にコードを入力して割引を適用！',
        studioHeading: 'オンライン塗り絵スタジオ',
        studioSubtext: 'スマホやタブレットでブラウザから直接塗り絵を楽しめます！',
        sidebarThemeTitle: 'テーマを選択',
        storyCardTitle: 'カスタムストーリーを注文',
        storyCardDesc: 'ご希望のジャンルとページ数でオリジナルの塗り絵ストーリーを作成します！',
        storyGenreLabel: 'ストーリージャンル:',
        storyLengthLabel: 'ページ数:',
        optStory5: 'ショート（5ページ）',
        optStory10: 'ミディアム（10ページ）',
        optStory20: 'フルブック（20ページ）',
        lblTotalPrice: '合計金額:',
        btnAddStoryText: 'カートに追加',
        lblFillBucket: '塗りつぶし',
        lblBrush: 'ブラシ',
        lblEraser: '消しゴム',
        lblSize: 'サイズ:',
        lblUndo: '元に戻す',
        lblReset: 'リセット',
        lblSaveArt: 'アートを保存',
        lblPalette: 'パレット:',
        lblCustomColor: 'カスタム色',
        shopHeading: '塗り絵本コレクション',
        shopSubtext: '高品質な160gsmプレミアムペーパーに印刷された物理的な塗り絵本。',
        filterAll: 'すべての本',
        filterCozy: 'ラグジュアリー',
        filterHeritage: 'アフリカの儀式',
        filterMandala: 'マンダラ&セラピー',
        filterKids: 'キッズ',
        reviewsHeading: '世界中で愛されています',
        reviewsSubtext: 'お客様からのレビューをご覧ください。',
        lblYourCart: 'ショッピングカート',
        btnApplyCoupon: '適用',
        lblSubtotal: '小計:',
        lblTotal: '合計:',
        btnCheckoutText: 'レジに進む'
    },
    ES: {
        announcement: '<i class="fa-solid fa-sparkles"></i> ¡Bienvenido a <strong>T\'s Creations</strong>! Libros para colorear e historias digitales.',
        brandTagline: 'Libros para Colorear y Estudio de Arte Digital',
        navOffers: '<i class="fa-solid fa-tag"></i> Ofertas Especiales',
        navShop: '<i class="fa-solid fa-book-open"></i> Tienda de Libros',
        navStudio: '<i class="fa-solid fa-paintbrush"></i> Estudio en Línea',
        navReviews: '<i class="fa-solid fa-star"></i> Reseñas',
        adminOffersBtnText: 'Admin de Ofertas',
        heroHeading: 'Libros Dibujados a Mano que Traen Alegría a Niños y Adultos',
        heroSubtext: 'Descubre escenas acogedoras, rituales africanos, mandalas botánicos y patrones de alivio del estrés.',
        btnExploreBooks: '<i class="fa-solid fa-cart-shopping"></i> Explorar Libros',
        btnTryStudio: '<i class="fa-solid fa-hand-pointer"></i> Probar Estudio',
        statCopiesSold: 'Copias Vendidas',
        statRating: 'Calificación de Clientes',
        statLineart: '100% Arte a Mano',
        offersHeading: '<i class="fa-solid fa-fire"></i> Ofertas Exclusivas',
        offersSubtext: '¡Actualizado en tiempo real. Usa códigos de descuento en el pago!',
        studioHeading: 'Estudio de Colorear en Línea',
        studioSubtext: '¡Colorea directamente en tu navegador desde tu teléfono, tableta o computadora!',
        sidebarThemeTitle: 'Seleccionar Tema',
        storyCardTitle: 'Obtén una Historia Personalizada',
        storyCardDesc: '¡Pide páginas para colorear de historias personalizadas!',
        storyGenreLabel: 'Catálogo de Historia:',
        storyLengthLabel: 'Longitud de Historia:',
        optStory5: 'Historia Corta (5 Páginas)',
        optStory10: 'Cuento Mediano (10 Páginas)',
        optStory20: 'Libro Completo (20 Páginas)',
        lblTotalPrice: 'Precio Total:',
        btnAddStoryText: 'Añadir al Carrito',
        lblFillBucket: 'Rellenar',
        lblBrush: 'Pincel',
        lblEraser: 'Borrador',
        lblSize: 'Tamaño:',
        lblUndo: 'Deshacer',
        lblReset: 'Reiniciar',
        lblSaveArt: 'Guardar Arte',
        lblPalette: 'Paleta:',
        lblCustomColor: 'Personalizado',
        shopHeading: 'Nuestra Colección de Libros',
        shopSubtext: 'Explora libros físicos impresos en papel de alta calidad de 160 gsm.',
        filterAll: 'Todos los Libros',
        filterCozy: 'Lujo y Confort',
        filterHeritage: 'Rituales Africanos',
        filterMandala: 'Mandalas y Terapia',
        filterKids: 'Edición Infantil',
        reviewsHeading: 'Amado por Amantes del Arte',
        reviewsSubtext: 'Lee lo que dicen nuestros clientes felices.',
        lblYourCart: 'Tu Carrito',
        btnApplyCoupon: 'Aplicar',
        lblSubtotal: 'Subtotal:',
        lblTotal: 'Total:',
        btnCheckoutText: 'Proceder al Pago'
    }
};

// Dynamic Products List
const products = [
    { id: 'p1', title: 'African Rituals: Sacred Masks', category: 'heritage', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80', desc: 'Authentic ceremonial tribal masks, ritual djembe drums, and sacred shield lineart.' },
    { id: 'p2', title: 'Luxury Atelier & Parisian Bookshop', category: 'cozy', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80', desc: 'Sophisticated Parisian bookstore, mahogany library, velvet armchairs, chandeliers, and gold classics.' },
    { id: 'p3', title: 'Botanical Mandalas & Floral Therapy', category: 'mandala', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80', desc: 'Complex geometric flowers and calming symmetry for deep adult art therapy.' },
    { id: 'p4', title: 'Aesthetic Rooms & Desk Nooks', category: 'cozy', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80', desc: 'Comfy aesthetic room setups, aesthetic desks, plants, and relaxing vibes.' },
    { id: 'p5', title: 'Simba Safari Wildlife', category: 'kids', image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=500&q=80', desc: 'Thick, bold outlines of lions, elephants, and giraffes designed for young colorists.' },
    { id: 'p6', title: 'Enchanted Forest & Fairies', category: 'mandala', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80', desc: 'Enchanted forests, mushrooms, and whimsical fantasy characters.' }
];

// Digital Canvas Templates Data (4 Categories x 5 Pictures Each = 20 Total Pictures)
const canvasTemplateCategories = [
    {
        id: 'cat_luxury_atelier',
        title: 'Luxury Atelier',
        icon: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=150&q=80',
        pages: [
            { id: 'b1', title: 'Parisian Bookstore Facade', drawFn: drawLuxuryAtelierPage1 },
            { id: 'b2', title: 'Grand Chandelier Library', drawFn: drawLuxuryAtelierPage2 },
            { id: 'b3', title: 'Velvet Lounge & Classics', drawFn: drawLuxuryAtelierPage3 },
            { id: 'b4', title: 'Private Study & Fireplace', drawFn: drawLuxuryAtelierPage4 },
            { id: 'b5', title: 'Spiral Staircase Gallery', drawFn: drawLuxuryAtelierPage5 }
        ]
    },
    {
        id: 'cat_african_rituals',
        title: 'African Rituals',
        icon: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=150&q=80',
        pages: [
            { id: 'a1', title: 'Ceremonial Ritual Shield', drawFn: drawAfricanRitualPage1 },
            { id: 'a2', title: 'Sacred Carved Tribal Mask', drawFn: drawAfricanRitualPage2 },
            { id: 'a3', title: 'Rain Dance Ritual Drums', drawFn: drawAfricanRitualPage3 },
            { id: 'a4', title: 'Sunset Acacia Ritual', drawFn: drawAfricanRitualPage4 },
            { id: 'a5', title: 'Harvest Blessing Pottery', drawFn: drawAfricanRitualPage5 }
        ]
    },
    {
        id: 'cat_mandala',
        title: 'Floral Mandala',
        icon: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80',
        pages: [
            { id: 'm1', title: 'Sunburst Mandala', drawFn: drawMandalaPage1 },
            { id: 'm2', title: 'Sacred Lotus Mandala', drawFn: drawMandalaPage2 },
            { id: 'm3', title: 'Star Geometry Mandala', drawFn: drawMandalaPage3 },
            { id: 'm4', title: 'Rose Garden Mandala', drawFn: drawMandalaPage4 },
            { id: 'm5', title: 'Cosmic Moon Mandala', drawFn: drawMandalaPage5 }
        ]
    },
    {
        id: 'cat_lion',
        title: 'Cute Lion (Kids)',
        icon: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=150&q=80',
        pages: [
            { id: 'l1', title: 'Simba Lion', drawFn: drawLionPage1 },
            { id: 'l2', title: 'Playful Lion Cub', drawFn: drawLionPage2 },
            { id: 'l3', title: 'King Lion Crown', drawFn: drawLionPage3 },
            { id: 'l4', title: 'Safari Friends Lion', drawFn: drawLionPage4 },
            { id: 'l5', title: 'Sleeping Baby Lion', drawFn: drawLionPage5 }
        ]
    }
];

// Studio State
let activeCategoryIndex = 0;
let activePageIndex = 0;
let activeColor = '#E76F51';
let activeTool = 'fill';
let brushSize = 12;
let canvas, ctx;
let undoStack = [];
const MAX_UNDO_STEPS = 10;

// Preset Color Palette Options
const paletteColors = [
    '#E76F51', '#2A9D8F', '#E9C46A', '#F4A261', '#264653',
    '#E63946', '#A8DADC', '#457B9D', '#1D3557', '#9B5DE5',
    '#00F5D4', '#FFB703', '#FB8500', '#6D6875', '#B5838D', '#FFFFFF'
];

// Initialize Geolocation Request & DOM
document.addEventListener('DOMContentLoaded', () => {
    requestBrowserGeolocation();
    initStudio();
    renderAdminOfferList();
});

// Active HTML5 GPS Geolocation Request Prompt
function requestBrowserGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Map Latitude & Longitude to Continent
                if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 51) {
                    activeContinent = 'AFRICA';
                } else if (lat >= 35 && lat <= 72 && lon >= -25 && lon <= 45) {
                    activeContinent = 'EUROPE';
                } else if (lat >= -10 && lat <= 80 && lon >= 45 && lon <= 180) {
                    activeContinent = 'ASIA';
                } else if (lat >= 12 && lat <= 83 && lon >= -170 && lon <= -50) {
                    activeContinent = 'NORTH_AMERICA';
                } else if (lat >= -56 && lat <= 12 && lon >= -82 && lon <= -34) {
                    activeContinent = 'SOUTH_AMERICA';
                } else if (lat >= -50 && lat <= 0 && lon >= 110 && lon <= 180) {
                    activeContinent = 'OCEANIA';
                }

                applyContinentAndLanguage();
            },
            (error) => {
                detectUserContinent();
            },
            { timeout: 8000, enableHighAccuracy: true }
        );
    } else {
        detectUserContinent();
    }
}

function detectUserContinent() {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const lang = navigator.language || '';

        if (tz.includes('Africa') || lang.includes('sw')) {
            activeContinent = 'AFRICA';
        } else if (tz.includes('Europe') || lang.includes('de') || lang.includes('fr') || lang.includes('es')) {
            activeContinent = 'EUROPE';
        } else if (tz.includes('Tokyo') || tz.includes('Asia') || lang.includes('ja') || lang.includes('zh')) {
            activeContinent = 'ASIA';
        } else if (tz.includes('Australia') || tz.includes('Pacific') || tz.includes('Auckland')) {
            activeContinent = 'OCEANIA';
        } else if (tz.includes('America/Sao_Paulo') || tz.includes('Buenos_Aires') || tz.includes('Bogota') || tz.includes('Santiago')) {
            activeContinent = 'SOUTH_AMERICA';
        } else {
            activeContinent = 'NORTH_AMERICA';
        }
    } catch (e) {
        activeContinent = 'AFRICA';
    }

    applyContinentAndLanguage();
}

function applyContinentAndLanguage() {
    const spec = continentSpecs[activeContinent];

    // Update Top Bar Location Badge Text
    const geoText = document.getElementById('geoDetectedText');
    if (geoText) {
        geoText.innerText = `${spec.name} (${spec.currency})`;
    }

    applyLanguageTranslations();
    renderProducts(products);
    updateCartUI();
    calculateStoryPrice();
    renderOffers();
}

function applyLanguageTranslations() {
    const dict = i18n[currentLang] || i18n.EN;

    for (let key in dict) {
        const el = document.getElementById(key);
        if (el) el.innerHTML = dict[key];
    }
}

// Format Price per Active Continent Tier
function formatContinentalPrice(pId) {
    const spec = continentSpecs[activeContinent];
    let price = productContinentPrices[pId][activeContinent];

    if (spec.currency === 'EUR' || spec.currency === 'USD' || spec.currency === 'AUD') {
        return spec.symbol + parseFloat(price).toFixed(2);
    }
    return spec.symbol + Math.round(price).toLocaleString();
}

// Story Price Calculation
function calculateStoryPrice() {
    const genreEl = document.getElementById('storyGenre');
    const lengthEl = document.getElementById('storyLength');
    const displayEl = document.getElementById('storyPriceDisplay');
    if (!genreEl || !lengthEl || !displayEl) return;

    const genre = genreEl.value;
    const len = lengthEl.value;
    const mult = (len === '5') ? 1.0 : (len === '10' ? 1.8 : 3.0);

    const basePrice = storyContinentPrices[genre] ? storyContinentPrices[genre][activeContinent] : 20;
    const finalPrice = basePrice * mult;

    const spec = continentSpecs[activeContinent];
    if (spec.currency === 'EUR' || spec.currency === 'USD' || spec.currency === 'AUD') {
        displayEl.innerText = spec.symbol + finalPrice.toFixed(2);
    } else {
        displayEl.innerText = spec.symbol + Math.round(finalPrice).toLocaleString();
    }
    displayEl.dataset.numericPrice = finalPrice;
}

function addStoryToCart() {
    const genreEl = document.getElementById('storyGenre');
    const lengthEl = document.getElementById('storyLength');
    const displayEl = document.getElementById('storyPriceDisplay');

    const genreText = genreEl.options[genreEl.selectedIndex].text;
    const lengthText = lengthEl.options[lengthEl.selectedIndex].text;
    const numericPrice = parseFloat(displayEl.dataset.numericPrice) || 36;

    const storyItemId = `story-${genreEl.value}-${lengthEl.value}-${activeContinent}`;
    const title = `Custom Story: ${genreText} (${lengthText})`;

    const existing = cart.find(c => c.id === storyItemId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: storyItemId,
            title: title,
            category: 'story',
            unitPrice: numericPrice,
            qty: 1,
            image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=200&q=80'
        });
    }

    updateCartUI();
    toggleCart(true);
}

// Render Offers
function renderOffers() {
    const container = document.getElementById('offersContainer');
    if (!container) return;
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
    if (!grid) return;

    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <span class="badge-cat">${p.category.toUpperCase()}</span>
                <img src="${p.image}" alt="${p.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=500&q=80';">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.title}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${formatContinentalPrice(p.id)}</span>
                    <button class="add-cart-btn" onclick="addToCart('${p.id}')"><i class="fa-solid fa-plus"></i> Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Category
function filterCategory(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
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
    const unitPrice = productContinentPrices[productId][activeContinent];

    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, unitPrice: unitPrice, qty: 1 });
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
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.innerText = totalCount;

    if (!container) return;

    const spec = continentSpecs[activeContinent];

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color: var(--text-muted); padding:40px 0;">Your cart is empty.</p>`;
        document.getElementById('cartSubtotal').innerText = spec.symbol + '0';
        document.getElementById('cartTotal').innerText = spec.symbol + '0';
        return;
    }

    let subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    let total = subtotal * ((100 - appliedDiscount) / 100);

    const fmt = (val) => (spec.currency === 'EUR' || spec.currency === 'USD' || spec.currency === 'AUD') ? spec.symbol + val.toFixed(2) : spec.symbol + Math.round(val).toLocaleString();

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=200&q=80';">
            <div class="cart-item-info">
                <strong>${item.title}</strong>
                <div>${fmt(item.unitPrice)}</div>
                <div style="margin-top: 4px;">
                    <button onclick="updateCartQty('${item.id}', -1)" style="padding: 2px 8px; cursor:pointer;">-</button>
                    <span style="margin: 0 8px;">${item.qty}</span>
                    <button onclick="updateCartQty('${item.id}', 1)" style="padding: 2px 8px; cursor:pointer;">+</button>
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById('cartSubtotal').innerText = fmt(subtotal);
    document.getElementById('cartTotal').innerText = fmt(total);
}

function applyCoupon() {
    const input = document.getElementById('couponInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
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
    if (!drawer || !overlay) return;

    if (forceOpen || !drawer.classList.contains('open')) {
        drawer.classList.add('open');
        overlay.style.display = 'block';
    } else {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
    }
}

// Checkout Modal
function openCheckoutModal() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    toggleCart(false);

    let subtotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    let total = subtotal * ((100 - appliedDiscount) / 100);

    const mpesaAmt = document.getElementById('mpesaCheckoutAmount');
    const cardAmt = document.getElementById('cardCheckoutAmount');

    const spec = continentSpecs[activeContinent];
    const fmt = (val) => (spec.currency === 'EUR' || spec.currency === 'USD' || spec.currency === 'AUD') ? spec.symbol + val.toFixed(2) : spec.symbol + Math.round(val).toLocaleString();

    if (mpesaAmt) mpesaAmt.innerText = fmt(total);
    if (cardAmt) cardAmt.innerText = fmt(total);

    const modal = document.getElementById('checkoutModalOverlay');
    if (modal) modal.style.display = 'flex';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModalOverlay');
    if (modal) modal.style.display = 'none';
    const statusBox = document.getElementById('mpesaStatusBox');
    if (statusBox) statusBox.style.display = 'none';
}

function switchPaymentTab(type) {
    const mpesaTab = document.getElementById('tabMpesa');
    const cardTab = document.getElementById('tabCard');
    const mpesaView = document.getElementById('viewMpesa');
    const cardView = document.getElementById('viewCard');

    if (type === 'mpesa') {
        mpesaTab.classList.add('active');
        cardTab.classList.remove('active');
        mpesaView.style.display = 'block';
        cardView.style.display = 'none';
    } else {
        cardTab.classList.add('active');
        mpesaTab.classList.remove('active');
        cardView.style.display = 'block';
        mpesaView.style.display = 'none';
    }
}

function initiateMpesaStkPush() {
    const phoneInput = document.getElementById('mpesaPhone');
    const statusBox = document.getElementById('mpesaStatusBox');

    if (!phoneInput || !statusBox) return;

    let phone = phoneInput.value.trim();
    if (!phone || phone.length < 9) {
        alert('Please enter a valid Safaricom phone number e.g. 254712345678');
        return;
    }

    statusBox.style.display = 'block';
    statusBox.className = 'stk-status-box pending';
    statusBox.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Initiating Safaricom M-Pesa STK Push to <strong>${phone}</strong>... Please check your phone screen.`;

    setTimeout(() => {
        statusBox.className = 'stk-status-box success';
        statusBox.innerHTML = `
            <div style="font-size:1.1rem; color:var(--mpesa-green); margin-bottom:6px;"><i class="fa-solid fa-circle-check"></i> M-Pesa Payment Received!</div>
            <div>Transaction Ref: <strong>SLG8${Math.floor(100000 + Math.random() * 900000)}P</strong></div>
            <div style="font-size:0.8rem; color:#555; margin-top:4px;">Thank you! Your storybook order has been successfully placed.</div>
        `;

        cart = [];
        appliedDiscount = 0;
        updateCartUI();

        setTimeout(() => {
            closeCheckoutModal();
        }, 3500);
    }, 2500);
}

function processCardPayment() {
    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();

    if (!cardName || !cardNumber) {
        alert('Please enter your card details.');
        return;
    }

    alert('Payment approved via Secure Gateway! Order confirmed.');
    cart = [];
    appliedDiscount = 0;
    updateCartUI();
    closeCheckoutModal();
}

// Interactive Studio Setup
function initStudio() {
    canvas = document.getElementById('coloringCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d', { willReadFrequently: true });

    renderColorPalettes();
    renderCategoryList();
    loadDrawing(0, 0);

    let isDrawing = false;
    let lastX = 0, lastY = 0;

    function getCanvasCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        return {
            x: Math.round((clientX - rect.left) * scaleX),
            y: Math.round((clientY - rect.top) * scaleY)
        };
    }

    function handleStart(e) {
        e.preventDefault();
        saveUndoState();
        const pos = getCanvasCoordinates(e);

        if (activeTool === 'fill') {
            performFloodFill(pos.x, pos.y, activeColor);
        } else {
            isDrawing = true;
            lastX = pos.x;
            lastY = pos.y;
            drawStroke(pos.x, pos.y);
        }
    }

    function handleMove(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getCanvasCoordinates(e);
        drawStroke(pos.x, pos.y);
    }

    function handleEnd(e) {
        if (isDrawing) {
            isDrawing = false;
        }
    }

    function drawStroke(x, y) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = activeTool === 'eraser' ? '#FFFFFF' : activeColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        lastX = x;
        lastY = y;
    }

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    const brushSizeInput = document.getElementById('brushSize');
    if (brushSizeInput) {
        brushSizeInput.addEventListener('input', (e) => {
            brushSize = parseInt(e.target.value);
            const valSpan = document.getElementById('brushSizeVal');
            if (valSpan) valSpan.innerText = brushSize + 'px';
        });
    }
}

function renderCategoryList() {
    const list = document.getElementById('templateList');
    if (!list) return;

    list.innerHTML = canvasTemplateCategories.map((cat, catIdx) => `
        <div class="template-item ${catIdx === activeCategoryIndex ? 'active' : ''}" onclick="selectCategory(${catIdx}, this)">
            <img src="${cat.icon}" alt="${cat.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=100&q=80';">
            <div>
                <strong>${cat.title}</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">5 Lineart Pictures</div>
            </div>
        </div>
    `).join('');
}

// Prev / Next Carousel Page Navigation Bar
function renderPageSelectorBar() {
    const pageBar = document.getElementById('studioPageBar');
    if (!pageBar) return;

    const currentCat = canvasTemplateCategories[activeCategoryIndex];
    const currentPage = currentCat.pages[activePageIndex];
    const totalPages = currentCat.pages.length;

    pageBar.innerHTML = `
        <button class="carousel-nav-btn" onclick="prevPage()" ${activePageIndex === 0 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-left"></i> Previous
        </button>
        <div class="carousel-page-indicator">
            <span class="page-badge"><i class="fa-solid fa-image"></i> Picture ${activePageIndex + 1} of ${totalPages}</span>
            <strong class="page-title-text">${currentPage.title}</strong>
        </div>
        <button class="carousel-nav-btn" onclick="nextPage()" ${activePageIndex === totalPages - 1 ? 'disabled' : ''}>
            Next <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;
}

function nextPage() {
    const currentCat = canvasTemplateCategories[activeCategoryIndex];
    if (activePageIndex < currentCat.pages.length - 1) {
        activePageIndex++;
        loadDrawing(activeCategoryIndex, activePageIndex);
    }
}

function prevPage() {
    if (activePageIndex > 0) {
        activePageIndex--;
        loadDrawing(activeCategoryIndex, activePageIndex);
    }
}

function selectCategory(catIdx) {
    activeCategoryIndex = catIdx;
    activePageIndex = 0;
    renderCategoryList();
    loadDrawing(catIdx, 0);
}

function loadDrawing(catIdx, pageIdx) {
    activeCategoryIndex = catIdx;
    activePageIndex = pageIdx;
    renderPageSelectorBar();
    undoStack = [];
    const drawFn = canvasTemplateCategories[catIdx].pages[pageIdx].drawFn;
    drawFn();
}

function renderColorPalettes() {
    const quickList = document.getElementById('quickSwatchesList');
    if (quickList) {
        quickList.innerHTML = '';
        paletteColors.slice(0, 10).forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'quick-swatch' + (color === activeColor ? ' active' : '');
            swatch.style.backgroundColor = color;
            swatch.onclick = () => selectColor(color, swatch);
            quickList.appendChild(swatch);
        });
    }
}

function selectColor(color, element) {
    activeColor = color;

    document.querySelectorAll('.quick-swatch').forEach(s => {
        const bg = s.style.backgroundColor;
        if (s === element || colorToHex(bg) === color.toLowerCase()) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });

    const quickPicker = document.getElementById('quickColorPickerInput');
    if (quickPicker) quickPicker.value = color;
}

function colorToHex(rgbStr) {
    if (!rgbStr) return '';
    if (rgbStr.startsWith('#')) return rgbStr.toLowerCase();
    const rgb = rgbStr.match(/\d+/g);
    if (!rgb) return rgbStr;
    return "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1).toLowerCase();
}

function selectCustomColor(hex) {
    activeColor = hex;
    document.querySelectorAll('.quick-swatch').forEach(s => s.classList.remove('active'));
}

function setTool(tool) {
    activeTool = tool;
    document.getElementById('tool-fill').classList.toggle('active', tool === 'fill');
    document.getElementById('tool-brush').classList.toggle('active', tool === 'brush');
    document.getElementById('tool-eraser').classList.toggle('active', tool === 'eraser');
}

function saveUndoState() {
    if (undoStack.length >= MAX_UNDO_STEPS) {
        undoStack.shift();
    }
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undoCanvas() {
    if (undoStack.length > 0) {
        const previousData = undoStack.pop();
        ctx.putImageData(previousData, 0, 0);
    } else {
        loadDrawing(activeCategoryIndex, activePageIndex);
    }
}

function resetCanvas() {
    if (confirm('Reset your drawing? All current coloring will be cleared.')) {
        undoStack = [];
        loadDrawing(activeCategoryIndex, activePageIndex);
    }
}

function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'Ts-Creations-Art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Flood Fill Algorithm (Queue-based BFS)
function performFloodFill(startX, startY, fillHex) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const width = canvas.width;
    const height = canvas.height;

    const fillRgba = hexToRgb(fillHex);

    const startPos = (startY * width + startX) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    if (isBlackLine(startR, startG, startB) || isSameColor(startR, startG, startB, startA, fillRgba)) {
        return;
    }

    const queue = [[startX, startY]];
    const visited = new Uint8Array(width * height);

    while (queue.length > 0) {
        const [x, y] = queue.pop();
        if (x < 0 || x >= width || y < 0 || y >= height) continue;

        const idx = y * width + x;
        if (visited[idx]) continue;
        visited[idx] = 1;

        const p = idx * 4;
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];

        if (!isBlackLine(r, g, b) && colorMatch(r, g, b, startR, startG, startB, 40)) {
            data[p] = fillRgba.r;
            data[p + 1] = fillRgba.g;
            data[p + 2] = fillRgba.b;
            data[p + 3] = 255;

            queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function isBlackLine(r, g, b) {
    return r < 60 && g < 60 && b < 60;
}

function isSameColor(r, g, b, a, rgba) {
    return r === rgba.r && g === rgba.g && b === rgba.b && a === 255;
}

function colorMatch(r1, g1, b1, r2, g2, b2, threshold) {
    return Math.abs(r1 - r2) <= threshold &&
           Math.abs(g1 - g2) <= threshold &&
           Math.abs(b1 - b2) <= threshold;
}

function hexToRgb(hex) {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

// Helper: Clear Canvas Baseline (Pure Lineart Canvas, No Text Inside)
function clearCanvasBase() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#264653";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
}

// --- CATEGORY 1: LUXURY ATELIER & BOOKSHOP (5 PICTURES - NO TEXT INSIDE CANVAS) ---
function drawLuxuryAtelierPage1() {
    clearCanvasBase();
    ctx.strokeRect(100, 100, 400, 400);
    ctx.beginPath();
    ctx.arc(300, 100, 200, Math.PI, 0);
    ctx.stroke();

    ctx.strokeRect(120, 240, 360, 40);
    ctx.beginPath();
    for (let x = 130; x <= 470; x += 20) {
        ctx.moveTo(x, 240); ctx.lineTo(x, 280);
    }
    ctx.stroke();

    ctx.strokeRect(140, 140, 110, 80);
    ctx.strokeRect(350, 140, 110, 80);

    ctx.strokeRect(240, 300, 60, 200);
    ctx.strokeRect(300, 300, 60, 200);

    ctx.strokeRect(180, 60, 240, 40);
}

function drawLuxuryAtelierPage2() {
    clearCanvasBase();
    for (let y = 100; y <= 460; y += 90) {
        ctx.strokeRect(60, y, 480, 15);
        ctx.strokeRect(90, y - 65, 35, 65);
        ctx.strokeRect(130, y - 65, 30, 65);
        ctx.strokeRect(165, y - 65, 45, 65);
        ctx.strokeRect(360, y - 65, 40, 65);
        ctx.strokeRect(405, y - 65, 50, 65);
    }
    ctx.beginPath();
    ctx.moveTo(300, 40); ctx.lineTo(300, 110);
    ctx.arc(300, 130, 40, 0, Math.PI * 2);
    ctx.stroke();
}

function drawLuxuryAtelierPage3() {
    clearCanvasBase();
    ctx.beginPath();
    ctx.arc(300, 250, 120, Math.PI, 0);
    ctx.strokeRect(160, 250, 280, 140);
    ctx.strokeRect(120, 230, 40, 160);
    ctx.strokeRect(440, 230, 40, 160);
    ctx.stroke();

    ctx.strokeRect(180, 430, 240, 60);
    ctx.strokeRect(230, 405, 140, 25);
}

function drawLuxuryAtelierPage4() {
    clearCanvasBase();
    ctx.strokeRect(140, 120, 320, 380);
    ctx.strokeRect(190, 220, 220, 280);
    ctx.strokeRect(100, 80, 400, 40);

    ctx.beginPath();
    ctx.moveTo(300, 80); ctx.lineTo(300, 30);
    ctx.moveTo(270, 50); ctx.lineTo(330, 50);
    ctx.stroke();
}

function drawLuxuryAtelierPage5() {
    clearCanvasBase();
    ctx.beginPath();
    ctx.arc(300, 300, 200, 0, Math.PI * 2);
    ctx.arc(300, 300, 70, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 10; i++) {
        let a = (i * Math.PI) / 5;
        ctx.beginPath();
        ctx.moveTo(300 + Math.cos(a) * 70, 300 + Math.sin(a) * 70);
        ctx.lineTo(300 + Math.cos(a) * 200, 300 + Math.sin(a) * 200);
        ctx.stroke();
    }
}

// --- CATEGORY 2: AFRICAN RITUALS (5 PICTURES - NO TEXT INSIDE CANVAS) ---
function drawAfricanRitualPage1() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    ctx.beginPath();
    ctx.moveTo(80, 80); ctx.lineTo(520, 520);
    ctx.moveTo(520, 80); ctx.lineTo(80, 520);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx, cy, 120, 210, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy - 210); ctx.lineTo(cx, cy + 210);
    ctx.moveTo(cx - 120, cy); ctx.lineTo(cx + 120, cy);
    ctx.stroke();

    ctx.strokeRect(cx - 60, cy - 70, 120, 140);
}

function drawAfricanRitualPage2() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 130, 200, 0, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 22, cy - 200);
        ctx.lineTo(cx + i * 38, cy - 270);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.ellipse(cx - 50, cy - 35, 28, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 50, cy - 35, 28, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeRect(cx - 18, cy - 10, 36, 90);
    ctx.strokeRect(cx - 40, cy + 100, 80, 35);
}

function drawAfricanRitualPage3() {
    clearCanvasBase();
    ctx.strokeRect(130, 180, 140, 140);
    ctx.beginPath();
    ctx.moveTo(140, 320); ctx.lineTo(170, 480); ctx.lineTo(230, 480); ctx.lineTo(260, 320);
    ctx.stroke();

    ctx.strokeRect(330, 140, 160, 160);
    ctx.beginPath();
    ctx.moveTo(340, 300); ctx.lineTo(370, 480); ctx.lineTo(450, 480); ctx.lineTo(480, 300);
    ctx.stroke();
}

function drawAfricanRitualPage4() {
    clearCanvasBase();
    const cx = 300, cy = 340;
    ctx.beginPath();
    ctx.moveTo(40, 480); ctx.lineTo(560, 480);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy - 110, 140, 0, Math.PI * 2);
    ctx.arc(cx, cy - 110, 90, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 18, 480); ctx.lineTo(cx - 25, 320); ctx.lineTo(160, 250);
    ctx.moveTo(cx + 18, 480); ctx.lineTo(cx + 25, 320); ctx.lineTo(440, 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(300, 230, 200, 45, 0, 0, Math.PI * 2);
    ctx.stroke();
}

function drawAfricanRitualPage5() {
    clearCanvasBase();
    ctx.beginPath();
    ctx.arc(300, 330, 130, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeRect(230, 170, 140, 50);

    ctx.strokeRect(180, 280, 240, 35);
    ctx.strokeRect(190, 340, 220, 35);
}

// --- CATEGORY 3: FLORAL MANDALA (5 PICTURES - NO TEXT INSIDE CANVAS) ---
function drawMandalaPage1() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    for (let r = 40; r <= 240; r += 50) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
    }
    for (let i = 0; i < 12; i++) {
        let angle = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 240, cy + Math.sin(angle) * 240);
        ctx.stroke();
    }
}

function drawMandalaPage2() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 8; i++) {
        let a = (i * Math.PI) / 4;
        let px = cx + Math.cos(a) * 130;
        let py = cy + Math.sin(a) * 130;
        ctx.beginPath();
        ctx.arc(px, py, 70, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function drawMandalaPage3() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    ctx.strokeRect(120, 120, 360, 360);
    ctx.strokeRect(150, 150, 300, 300);
    ctx.beginPath();
    ctx.arc(cx, cy, 160, 0, Math.PI * 2);
    ctx.arc(cx, cy, 90, 0, Math.PI * 2);
    ctx.stroke();
}

function drawMandalaPage4() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    for (let r = 30; r <= 240; r += 35) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function drawMandalaPage5() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    ctx.beginPath();
    ctx.arc(cx, cy, 210, 0, Math.PI * 2);
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.stroke();
}

// --- CATEGORY 4: CUTE LION (KIDS) (5 PICTURES - NO TEXT INSIDE CANVAS) ---
function drawLionPage1() {
    clearCanvasBase();
    const cx = 300, cy = 300;
    ctx.beginPath();
    ctx.arc(cx, cy, 160, 0, Math.PI * 2);
    ctx.arc(cx, cy, 95, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 35, cy - 25, 12, 0, Math.PI * 2);
    ctx.arc(cx + 35, cy - 25, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#264653";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy + 12); ctx.lineTo(cx + 18, cy + 12); ctx.lineTo(cx, cy + 35); ctx.closePath();
    ctx.stroke();
}

function drawLionPage2() {
    clearCanvasBase();
    ctx.beginPath();
    ctx.arc(300, 220, 80, 0, Math.PI * 2);
    ctx.arc(220, 170, 30, 0, Math.PI * 2);
    ctx.arc(380, 170, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeRect(220, 300, 160, 180);
}

function drawLionPage3() {
    clearCanvasBase();
    const cx = 300, cy = 320;
    ctx.beginPath();
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(200, 200); ctx.lineTo(220, 110); ctx.lineTo(260, 170); ctx.lineTo(300, 100); ctx.lineTo(340, 170); ctx.lineTo(380, 110); ctx.lineTo(400, 200); ctx.closePath();
    ctx.stroke();
}

function drawLionPage4() {
    clearCanvasBase();
    ctx.beginPath();
    ctx.arc(200, 320, 90, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeRect(400, 140, 35, 340);
    ctx.beginPath();
    ctx.ellipse(415, 140, 100, 35, 0, 0, Math.PI * 2);
    ctx.stroke();
}

function drawLionPage5() {
    clearCanvasBase();
    ctx.beginPath();
    ctx.ellipse(300, 350, 140, 90, 0, 0, Math.PI * 2);
    ctx.arc(200, 310, 70, 0, Math.PI * 2);
    ctx.stroke();
}

// Admin Modal Functions
function toggleAdminModal() {
    const modal = document.getElementById('adminModalOverlay');
    if (!modal) return;
    modal.style.display = (modal.style.display === 'none' || !modal.style.display) ? 'flex' : 'none';
}

function handleCreateOffer(e) {
    e.preventDefault();
    const title = document.getElementById('offerTitle').value;
    const code = document.getElementById('offerCode').value.toUpperCase();
    const discount = parseInt(document.getElementById('offerDiscount').value);
    const desc = document.getElementById('offerDesc').value;

    const newOffer = { id: Date.now(), title, code, discount, desc };
    offersList.push(newOffer);

    renderOffers();
    renderAdminOfferList();

    document.getElementById('offerForm').reset();
    alert(`New offer '${code}' created successfully!`);
}

function deleteOffer(id) {
    offersList = offersList.filter(o => o.id !== id);
    renderOffers();
    renderAdminOfferList();
}

function renderAdminOfferList() {
    const list = document.getElementById('adminOfferList');
    if (!list) return;
    list.innerHTML = offersList.map(o => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#f9f9f9; padding:8px 12px; margin-bottom:8px; border-radius:6px; border:1px solid #eee;">
            <div>
                <strong>${o.code} (${o.discount}% OFF)</strong> - ${o.title}
            </div>
            <button onclick="deleteOffer(${o.id})" style="background:#e76f51; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        </div>
    `).join('');
}
