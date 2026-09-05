/**
 * WW2Archive — II. Dünya Savaşı Ansiklopedisi & Arşivi
 * Ana Uygulama Mantığı ve İnteraktif Modüller
 */

document.addEventListener('DOMContentLoaded', () => {
    // Veri kontrolü
    if (typeof WW2_DATA === 'undefined') {
        console.error('WW2_DATA yüklenemedi!');
        return;
    }

    // Uygulama Durumu (State)
    const state = {
        currentFrontFilter: 'all',
        currentYearFilter: 'all',
        currentPeopleFilter: 'all',
        comments: JSON.parse(localStorage.getItem('ww2_comments')) || [...WW2_DATA.initialComments],
        map: null,
        markers: []
    };

    // DOM Elementleri
    const elements = {
        leafletMap: document.getElementById('leaflet-map'),
        timelineContainer: document.getElementById('timeline-container'),
        battlesContainer: document.getElementById('battles-container'),
        peopleContainer: document.getElementById('people-container'),
        alliesList: document.getElementById('allies-country-list'),
        axisList: document.getElementById('axis-country-list'),
        photosGrid: document.getElementById('photos-grid'),
        audioList: document.getElementById('audio-list'),
        documentsGrid: document.getElementById('documents-grid'),
        topicsContainer: document.getElementById('topics-container'),
        commentsFeed: document.getElementById('comments-feed'),
        newCommentForm: document.getElementById('new-comment-form'),
        
        // Modallar
        detailModal: document.getElementById('detail-modal'),
        detailModalBody: document.getElementById('detail-modal-body'),
        searchModal: document.getElementById('search-modal'),
        globalSearchInput: document.getElementById('global-search-input'),
        searchResultsList: document.getElementById('search-results-list'),
        adminModal: document.getElementById('admin-modal'),
        adminKpiEvents: document.getElementById('admin-kpi-events'),
        adminKpiBattles: document.getElementById('admin-kpi-battles'),
        adminKpiPeople: document.getElementById('admin-kpi-people'),
        adminKpiComments: document.getElementById('admin-kpi-comments'),
        adminCommentModList: document.getElementById('admin-comment-mod-list'),
        adminAddEventForm: document.getElementById('admin-add-event-form'),
        
        // Tetikleyiciler
        searchTriggerBtn: document.getElementById('search-trigger-btn'),
        heroSearchBtn: document.getElementById('hero-search-btn'),
        adminTriggerBtn: document.getElementById('admin-trigger-btn'),
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        navbar: document.getElementById('navbar'),
        
        // Audio Toast
        audioToast: document.getElementById('audio-player-toast'),
        toastAudioTitle: document.getElementById('toast-audio-title'),
        toastAudioClose: document.getElementById('toast-audio-close')
    };

    // 1. İNTERAKTİF LEAFLET HARİTASI
    function initMap() {
        if (!elements.leafletMap) return;

        // Leaflet Haritasını Başlat (Avrupa & Akdeniz merkezli)
        state.map = L.map('leaflet-map', {
            center: [46.5, 25.0],
            zoom: 4,
            minZoom: 2,
            maxZoom: 10,
            scrollWheelZoom: false
        });

        // CartoDB Dark Matter Koyu Tema Katmanı
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://carto.com/">CARTO</a> | WW2Archive',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(state.map);

        // Markerları Ekle
        renderMapMarkers();

        // Harita Filtre Butonları
        const mapFilterBtns = document.querySelectorAll('#map-filters .filter-pill');
        mapFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mapFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentFrontFilter = btn.dataset.front;
                filterMapMarkers(state.currentFrontFilter);
            });
        });
    }

    function renderMapMarkers() {
        // Eski markerları temizle
        state.markers.forEach(m => state.map.removeLayer(m));
        state.markers = [];

        WW2_DATA.events.forEach(evt => {
            if (!evt.location || !evt.location.lat) return;

            // Özel Renkli Marker İkonu
            const isPacific = evt.frontId === 'pasifik';
            const isNuclear = evt.id === 'evt-1945-2';
            const markerColor = isNuclear ? '#d4af37' : (isPacific ? '#3b82f6' : '#c53030');

            const customIcon = L.divIcon({
                className: 'custom-leaflet-marker',
                html: `<div style="
                    background: ${markerColor};
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    border: 2px solid #fff;
                    box-shadow: 0 0 10px ${markerColor};
                "></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });

            const marker = L.marker([evt.location.lat, evt.location.lng], { icon: customIcon });

            // Popup İçeriği
            const popupContent = `
                <div class="map-popup-card">
                    <h4>${evt.title}</h4>
                    <span class="map-popup-date"><i class="fas fa-calendar-day"></i> ${evt.date} (${evt.year})</span>
                    <p class="map-popup-desc">${evt.summary}</p>
                    <button class="btn btn-primary btn-sm" onclick="window.WW2App.openDetailModal('${evt.id}', 'event')">
                        <i class="fas fa-info-circle"></i> Detaylı Olay Raporu
                    </button>
                </div>
            `;

            marker.bindPopup(popupContent);
            marker.frontId = evt.frontId;
            marker.addTo(state.map);
            state.markers.push(marker);
        });
    }

    function filterMapMarkers(frontId) {
        state.markers.forEach(marker => {
            if (frontId === 'all' || marker.frontId === frontId) {
                marker.addTo(state.map);
            } else {
                state.map.removeLayer(marker);
            }
        });

        // Bölgeye odaklan
        if (frontId === 'avrupa') state.map.flyTo([48.8, 2.3], 5);
        else if (frontId === 'dogu') state.map.flyTo([52.0, 38.0], 4);
        else if (frontId === 'pasifik') state.map.flyTo([22.0, 160.0], 3);
        else if (frontId === 'afrika') state.map.flyTo([30.0, 25.0], 5);
        else state.map.flyTo([46.5, 25.0], 4);
    }

    // 2. KRONOLOJİK ZAMAN ÇİZELGESİ (TIMELINE)
    function renderTimeline(filterYear = 'all') {
        if (!elements.timelineContainer) return;
        elements.timelineContainer.innerHTML = '';

        const filteredEvents = filterYear === 'all' 
            ? WW2_DATA.events 
            : WW2_DATA.events.filter(e => e.year.toString() === filterYear);

        if (filteredEvents.length === 0) {
            elements.timelineContainer.innerHTML = `<p style="text-align:center; color:var(--text-dim);">Bu yıla ait olay kaydı bulunamadı.</p>`;
            return;
        }

        filteredEvents.forEach(evt => {
            const card = document.createElement('div');
            card.className = 'timeline-event-card';
            card.innerHTML = `
                <div class="timeline-date-block">
                    <span class="timeline-year">${evt.year}</span>
                    <span class="timeline-day">${evt.date.split(' ').slice(0, 2).join(' ')}</span>
                </div>
                <div class="timeline-content-block">
                    <div class="timeline-meta-tags">
                        <span class="tag-badge tag-front"><i class="fas fa-crosshairs"></i> ${getFrontName(evt.frontId)}</span>
                        <span class="tag-badge"><i class="fas fa-tag"></i> ${evt.category}</span>
                        <span class="tag-badge" style="color:var(--gold);"><i class="fas fa-star"></i> ${evt.importance}</span>
                    </div>
                    <h3>${evt.title}</h3>
                    <p class="timeline-text">${evt.summary}</p>
                </div>
                <div class="timeline-action-block">
                    <button class="btn btn-outline btn-sm" onclick="window.WW2App.openDetailModal('${evt.id}', 'event')">
                        İncele <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
            elements.timelineContainer.appendChild(card);
        });
    }

    // Yıl Filtre Butonları
    const yearBtns = document.querySelectorAll('#timeline-years .year-btn');
    yearBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            yearBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentYearFilter = btn.dataset.year;
            renderTimeline(state.currentYearFilter);
        });
    });

    // 3. MUHAREBELER KATALOĞU
    function renderBattles() {
        if (!elements.battlesContainer) return;
        elements.battlesContainer.innerHTML = '';

        WW2_DATA.battles.forEach(battle => {
            const card = document.createElement('div');
            card.className = 'battle-card';
            card.innerHTML = `
                <div>
                    <div class="battle-head">
                        <span class="battle-front"><i class="fas fa-compass"></i> ${battle.front}</span>
                        <span class="outcome-badge ${battle.badgeClass}">${battle.outcome}</span>
                    </div>
                    <h3 class="battle-title">${battle.name}</h3>
                    <div class="battle-date"><i class="far fa-calendar-alt"></i> ${battle.date}</div>
                    <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:14px;">${battle.desc}</p>
                    
                    <div class="battle-teams">
                        <div class="team-row">
                            <span class="team-label team-allies">Müttefikler:</span>
                            <span>${battle.belligerents.allies.join(', ')}</span>
                        </div>
                        <div class="team-row">
                            <span class="team-label team-axis">Mihver:</span>
                            <span>${battle.belligerents.axis.join(', ')}</span>
                        </div>
                        <div class="team-row" style="margin-top:6px; border-top:1px dashed var(--border-subtle); padding-top:6px;">
                            <span class="team-label">Komutanlar:</span>
                            <span style="font-size:0.8rem; color:var(--text-dim);">${battle.commanders.allies} vs ${battle.commanders.axis}</span>
                        </div>
                    </div>
                </div>

                <div class="battle-footer">
                    <span style="font-size:0.8rem; color:#ef4444;"><i class="fas fa-skull"></i> ${battle.casualties}</span>
                    <button class="btn btn-outline btn-sm" onclick="window.WW2App.openDetailModal('${battle.id}', 'battle')">
                        Detaylar <i class="fas fa-file-lines"></i>
                    </button>
                </div>
            `;
            elements.battlesContainer.appendChild(card);
        });
    }

    // 4. KİŞİLER & BİYOGRAFİLER
    function renderPeople(category = 'all') {
        if (!elements.peopleContainer) return;
        elements.peopleContainer.innerHTML = '';

        const filtered = category === 'all' 
            ? WW2_DATA.people 
            : WW2_DATA.people.filter(p => p.category === category);

        filtered.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';
            card.innerHTML = `
                <div class="person-img-wrap">
                    <img src="${person.image}" alt="${person.name}" loading="lazy">
                    <span class="person-country-tag">${person.country}</span>
                </div>
                <div class="person-info">
                    <h3 class="person-name">${person.name}</h3>
                    <span class="person-role">${person.role}</span>
                    <span class="person-dates"><i class="far fa-clock"></i> ${person.dates}</span>
                    <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:12px;">${person.bio}</p>
                    <blockquote class="person-quote">"${person.quote}"</blockquote>
                    <button class="btn btn-outline btn-sm" style="margin-top:auto;" onclick="window.WW2App.openDetailModal('${person.id}', 'person')">
                        Tam Biyografi <i class="fas fa-user"></i>
                    </button>
                </div>
            `;
            elements.peopleContainer.appendChild(card);
        });
    }

    // Kişiler Filtre Butonları
    const peopleFilters = document.querySelectorAll('#people-filters .filter-pill');
    peopleFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            peopleFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentPeopleFilter = btn.dataset.cat;
            renderPeople(state.currentPeopleFilter);
        });
    });

    // 5. ÜLKELER & İTTİFAKLAR
    function renderCountries() {
        if (!elements.alliesList || !elements.axisList) return;
        elements.alliesList.innerHTML = '';
        elements.axisList.innerHTML = '';

        WW2_DATA.countries.allies.forEach(c => {
            const item = document.createElement('div');
            item.className = 'country-item';
            item.innerHTML = `
                <div class="country-name-info">
                    <span class="country-flag">${c.flag}</span>
                    <div>
                        <h4>${c.name}</h4>
                        <span class="country-role-sub">${c.role}</span>
                    </div>
                </div>
                <div class="country-stats">
                    <span class="mob">${c.mobilized} Asker</span>
                    <span class="loss">${c.deaths} Kayıp</span>
                </div>
            `;
            elements.alliesList.appendChild(item);
        });

        WW2_DATA.countries.axis.forEach(c => {
            const item = document.createElement('div');
            item.className = 'country-item';
            item.innerHTML = `
                <div class="country-name-info">
                    <span class="country-flag">${c.flag}</span>
                    <div>
                        <h4>${c.name}</h4>
                        <span class="country-role-sub">${c.role}</span>
                    </div>
                </div>
                <div class="country-stats">
                    <span class="mob">${c.mobilized} Asker</span>
                    <span class="loss">${c.deaths} Kayıp</span>
                </div>
            `;
            elements.axisList.appendChild(item);
        });
    }

    // 6. MEDYA ARŞİVİ
    function renderMedia() {
        // Fotoğraflar
        if (elements.photosGrid) {
            elements.photosGrid.innerHTML = '';
            WW2_DATA.media.photos.forEach(photo => {
                const card = document.createElement('div');
                card.className = 'photo-card';
                card.innerHTML = `
                    <img src="${photo.url}" alt="${photo.title}" loading="lazy">
                    <div class="photo-card-info">
                        <span style="font-size:0.75rem; color:var(--gold); font-weight:600;">${photo.category}</span>
                        <h4>${photo.title}</h4>
                        <p>${photo.desc}</p>
                    </div>
                `;
                elements.photosGrid.appendChild(card);
            });
        }

        // Ses Kayıtları
        if (elements.audioList) {
            elements.audioList.innerHTML = '';
            WW2_DATA.media.speeches.forEach(speech => {
                const card = document.createElement('div');
                card.className = 'audio-card';
                card.innerHTML = `
                    <div class="audio-info">
                        <h4>${speech.title}</h4>
                        <div class="audio-meta">
                            <span><i class="far fa-user"></i> ${speech.speaker}</span>
                            <span><i class="far fa-calendar"></i> ${speech.date}</span>
                            <span><i class="far fa-clock"></i> ${speech.duration}</span>
                        </div>
                        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:6px;">${speech.note}</p>
                    </div>
                    <button class="play-audio-btn" title="Ses Kaydını Çal" onclick="window.WW2App.playAudioToast('${speech.title}')">
                        <i class="fas fa-play"></i>
                    </button>
                `;
                elements.audioList.appendChild(card);
            });
        }

        // Belgeler
        if (elements.documentsGrid) {
            elements.documentsGrid.innerHTML = '';
            WW2_DATA.media.documents.forEach(doc => {
                const card = document.createElement('div');
                card.className = 'document-card';
                card.innerHTML = `
                    <i class="fas fa-file-contract"></i>
                    <span style="font-size:0.75rem; color:var(--gold); display:block; margin-bottom:4px;">${doc.type}</span>
                    <h4>${doc.title}</h4>
                    <p>${doc.desc}</p>
                    <button class="btn btn-outline btn-sm" onclick="window.WW2App.openDetailModal('${doc.title}', 'document')">
                        Belgeyi İncele <i class="fas fa-eye"></i>
                    </button>
                `;
                elements.documentsGrid.appendChild(card);
            });
        }

        // Medya Sekme Değiştirici
        const tabBtns = document.querySelectorAll('#media-tab-nav .media-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.media-tab-panel').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const targetPanel = document.getElementById(`tab-${btn.dataset.tab}`);
                if (targetPanel) targetPanel.classList.add('active');
            });
        });
    }

    // 7. TEMATİK ODAK KONULARI
    function renderTopics() {
        if (!elements.topicsContainer) return;
        elements.topicsContainer.innerHTML = '';

        WW2_DATA.topics.forEach(topic => {
            const card = document.createElement('div');
            card.className = 'topic-card';
            card.innerHTML = `
                <div class="topic-icon-wrap">
                    <i class="fas ${topic.icon}"></i>
                </div>
                <h3>${topic.title}</h3>
                <p>${topic.shortDesc}</p>
                <button class="btn btn-outline btn-sm" onclick="window.WW2App.openDetailModal('${topic.id}', 'topic')">
                    Detaylı İnceleme <i class="fas fa-arrow-right"></i>
                </button>
            `;
            elements.topicsContainer.appendChild(card);
        });
    }

    // 8. YORUM VE KATKI SİSTEMİ
    function renderComments() {
        if (!elements.commentsFeed) return;
        elements.commentsFeed.innerHTML = '';

        const approvedComments = state.comments.filter(c => c.status === 'approved');

        if (approvedComments.length === 0) {
            elements.commentsFeed.innerHTML = `<p style="color:var(--text-dim);">Henüz onaylanmış yorum bulunmamaktadır. İlk katkıyı siz yapın!</p>`;
            return;
        }

        approvedComments.forEach(comm => {
            const card = document.createElement('div');
            card.className = 'comment-card';
            card.innerHTML = `
                <div class="comment-head">
                    <span class="comment-author"><i class="fas fa-user-circle"></i> ${comm.author}</span>
                    <span class="comment-time">${comm.date}</span>
                </div>
                <span class="comment-entity-badge">${comm.entity}</span>
                <p class="comment-body">${comm.content}</p>
            `;
            elements.commentsFeed.appendChild(card);
        });

        // Admin KPI güncelle
        if (elements.adminKpiComments) {
            elements.adminKpiComments.innerText = state.comments.length;
        }
    }

    if (elements.newCommentForm) {
        elements.newCommentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const author = document.getElementById('comment-author').value.trim();
            const entity = document.getElementById('comment-entity').value;
            const text = document.getElementById('comment-text').value.trim();

            if (!author || !text) return;

            const newComment = {
                id: Date.now(),
                author: author,
                date: 'Az önce',
                entity: entity,
                content: text,
                status: 'approved' // Doğrudan yayına al veya admin onayı simüle et
            };

            state.comments.unshift(newComment);
            localStorage.setItem('ww2_comments', JSON.stringify(state.comments));
            renderComments();
            renderAdminComments();
            elements.newCommentForm.reset();

            alert('Tarihsel notunuz ve katkınız başarıyla arşive eklendi!');
        });
    }

    // 9. UNIFIED DETAIL MODAL (GENEL DETAY PENCERESİ)
    window.WW2App = window.WW2App || {};

    window.WW2App.openDetailModal = function(id, type) {
        if (!elements.detailModal || !elements.detailModalBody) return;

        let html = '';

        if (type === 'event') {
            const evt = WW2_DATA.events.find(e => e.id === id);
            if (!evt) return;
            html = `
                <span class="tag-badge tag-front" style="margin-bottom:12px; display:inline-block;">
                    ${getFrontName(evt.frontId)} | ${evt.category}
                </span>
                <h2 style="font-family:var(--font-title); font-size:1.8rem; margin-bottom:8px;">${evt.title}</h2>
                <div style="color:var(--gold); font-weight:600; font-size:0.9rem; margin-bottom:16px;">
                    <i class="far fa-calendar-alt"></i> ${evt.date} (${evt.year}) &bull; <i class="fas fa-location-dot"></i> ${evt.location.name}
                </div>
                <img src="${evt.image}" alt="${evt.title}" style="width:100%; height:260px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:20px; border:1px solid var(--border-subtle);">
                <p style="font-size:1rem; line-height:1.7; color:var(--text-main); margin-bottom:20px;">${evt.description}</p>
                <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-subtle); padding:16px; border-radius:var(--radius-md);">
                    <h4 style="color:#ef4444; margin-bottom:6px;"><i class="fas fa-skull-crossbones"></i> Zayiat ve İnsan Kaybı Bilançosu:</h4>
                    <p style="color:var(--text-muted); font-size:0.9rem;">${evt.casualties}</p>
                </div>
            `;
        } else if (type === 'battle') {
            const battle = WW2_DATA.battles.find(b => b.id === id);
            if (!battle) return;
            html = `
                <span class="outcome-badge ${battle.badgeClass}" style="margin-bottom:12px; display:inline-block;">${battle.outcome}</span>
                <h2 style="font-family:var(--font-title); font-size:1.8rem; margin-bottom:8px;">${battle.name}</h2>
                <div style="color:var(--text-muted); margin-bottom:16px;"><i class="far fa-calendar-alt"></i> ${battle.date} &bull; ${battle.front}</div>
                <p style="font-size:1rem; line-height:1.7; margin-bottom:20px;">${battle.desc}</p>
                <div class="battle-teams" style="margin-bottom:20px;">
                    <div class="team-row"><span class="team-label team-allies">Müttefik Güçler:</span> <span>${battle.belligerents.allies.join(', ')}</span></div>
                    <div class="team-row"><span class="team-label team-axis">Mihver Güçler:</span> <span>${battle.belligerents.axis.join(', ')}</span></div>
                    <div class="team-row"><span class="team-label">Komutanlar:</span> <span>${battle.commanders.allies} vs ${battle.commanders.axis}</span></div>
                    <div class="team-row"><span class="team-label">Toplam Kayıp:</span> <span style="color:#ef4444;">${battle.casualties}</span></div>
                </div>
            `;
        } else if (type === 'person') {
            const person = WW2_DATA.people.find(p => p.id === id);
            if (!person) return;
            html = `
                <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px; flex-wrap:wrap;">
                    <img src="${person.image}" alt="${person.name}" style="width:110px; height:110px; border-radius:50%; object-fit:cover; border:3px solid var(--gold);">
                    <div>
                        <span style="color:var(--gold); font-weight:600; font-size:0.85rem;">${person.country}</span>
                        <h2 style="font-family:var(--font-title); font-size:1.8rem;">${person.name}</h2>
                        <span style="color:var(--primary-light); font-weight:600;">${person.role} (${person.dates})</span>
                    </div>
                </div>
                <blockquote class="person-quote" style="font-size:1rem; margin-bottom:20px;">"${person.quote}"</blockquote>
                <p style="font-size:1rem; line-height:1.7; color:var(--text-muted);">${person.bio}</p>
            `;
        } else if (type === 'topic') {
            const topic = WW2_DATA.topics.find(t => t.id === id);
            if (!topic) return;
            html = `
                <div style="font-size:2.5rem; color:var(--primary-light); margin-bottom:12px;"><i class="fas ${topic.icon}"></i></div>
                <h2 style="font-family:var(--font-title); font-size:1.8rem; margin-bottom:12px;">${topic.title}</h2>
                <p style="font-size:1.05rem; line-height:1.7; color:var(--text-main); margin-bottom:16px;">${topic.detail}</p>
                <div style="background:rgba(212,175,55,0.1); border:1px solid var(--gold); padding:14px; border-radius:var(--radius-md); font-size:0.88rem; color:var(--gold);">
                    <i class="fas fa-lightbulb"></i> Bu konu, II. Dünya Savaşı Tarihçiler Birliği ve uluslararası arşiv kaynaklarından derlenmiştir.
                </div>
            `;
        } else {
            html = `<p>İçerik detayı hazırlanıyor.</p>`;
        }

        elements.detailModalBody.innerHTML = html;
        elements.detailModal.classList.add('active');
    };

    // 10. SES OYNATICI (AUDIO TOAST SIMULATOR)
    window.WW2App.playAudioToast = function(title) {
        if (!elements.audioToast || !elements.toastAudioTitle) return;
        elements.toastAudioTitle.innerText = title;
        elements.audioToast.classList.add('active');
    };

    if (elements.toastAudioClose) {
        elements.toastAudioClose.addEventListener('click', () => {
            elements.audioToast.classList.remove('active');
        });
    }

    // Modal Kapatma Olayları
    document.querySelectorAll('.custom-modal').forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close-btn');
        const backdrop = modal.querySelector('.modal-backdrop');
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        if (backdrop) backdrop.addEventListener('click', () => modal.classList.remove('active'));
    });

    // 11. HIZLI ARAMA (SPOTLIGHT SEARCH — CTRL+K)
    function openSearchModal() {
        if (!elements.searchModal) return;
        elements.searchModal.classList.add('active');
        if (elements.globalSearchInput) {
            elements.globalSearchInput.value = '';
            elements.globalSearchInput.focus();
            renderSearchResults('');
        }
    }

    if (elements.searchTriggerBtn) elements.searchTriggerBtn.addEventListener('click', openSearchModal);
    if (elements.heroSearchBtn) elements.heroSearchBtn.addEventListener('click', openSearchModal);

    // Kısayol: Ctrl+K veya Cmd+K
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            openSearchModal();
        }
        if (e.key === 'Escape') {
            document.querySelectorAll('.custom-modal').forEach(m => m.classList.remove('active'));
        }
    });

    if (elements.globalSearchInput) {
        elements.globalSearchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value.trim().toLowerCase());
        });
    }

    function renderSearchResults(query) {
        if (!elements.searchResultsList) return;

        if (!query) {
            elements.searchResultsList.innerHTML = `
                <div class="empty-search-state">
                    <i class="fas fa-keyboard"></i>
                    <p>Aramak istediğiniz terimi yazın (örn: Stalingrad, Churchill, 1944)...</p>
                </div>
            `;
            return;
        }

        const matchedEvents = WW2_DATA.events.filter(e => 
            e.title.toLowerCase().includes(query) || 
            e.summary.toLowerCase().includes(query) || 
            e.year.toString().includes(query)
        );

        const matchedBattles = WW2_DATA.battles.filter(b => 
            b.name.toLowerCase().includes(query) || 
            b.front.toLowerCase().includes(query)
        );

        const matchedPeople = WW2_DATA.people.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.role.toLowerCase().includes(query) ||
            p.country.toLowerCase().includes(query)
        );

        const totalMatches = matchedEvents.length + matchedBattles.length + matchedPeople.length;

        if (totalMatches === 0) {
            elements.searchResultsList.innerHTML = `
                <div class="empty-search-state">
                    <i class="fas fa-search-minus"></i>
                    <p>"${query}" ile eşleşen sonuç bulunamadı.</p>
                </div>
            `;
            return;
        }

        let resultsHTML = '';

        matchedEvents.forEach(e => {
            resultsHTML += `
                <div class="search-result-item" onclick="window.WW2App.handleSearchClick('${e.id}', 'event')">
                    <div>
                        <span style="font-size:0.75rem; color:var(--primary-light); font-weight:600;"><i class="fas fa-calendar"></i> Olay &bull; ${e.year}</span>
                        <h4 style="font-size:1rem; margin-top:2px;">${e.title}</h4>
                    </div>
                    <i class="fas fa-chevron-right" style="color:var(--text-dim); font-size:0.8rem;"></i>
                </div>
            `;
        });

        matchedBattles.forEach(b => {
            resultsHTML += `
                <div class="search-result-item" onclick="window.WW2App.handleSearchClick('${b.id}', 'battle')">
                    <div>
                        <span style="font-size:0.75rem; color:var(--gold); font-weight:600;"><i class="fas fa-crosshairs"></i> Muharebe &bull; ${b.front}</span>
                        <h4 style="font-size:1rem; margin-top:2px;">${b.name}</h4>
                    </div>
                    <i class="fas fa-chevron-right" style="color:var(--text-dim); font-size:0.8rem;"></i>
                </div>
            `;
        });

        matchedPeople.forEach(p => {
            resultsHTML += `
                <div class="search-result-item" onclick="window.WW2App.handleSearchClick('${p.id}', 'person')">
                    <div>
                        <span style="font-size:0.75rem; color:#60a5fa; font-weight:600;"><i class="fas fa-user"></i> Kişi &bull; ${p.country}</span>
                        <h4 style="font-size:1rem; margin-top:2px;">${p.name} (${p.role})</h4>
                    </div>
                    <i class="fas fa-chevron-right" style="color:var(--text-dim); font-size:0.8rem;"></i>
                </div>
            `;
        });

        elements.searchResultsList.innerHTML = resultsHTML;
    }

    window.WW2App.handleSearchClick = function(id, type) {
        if (elements.searchModal) elements.searchModal.classList.remove('active');
        window.WW2App.openDetailModal(id, type);
    };

    // 12. ADMIN CMS PANELİ & YÖNETİM MODAL
    if (elements.adminTriggerBtn && elements.adminModal) {
        elements.adminTriggerBtn.addEventListener('click', () => {
            elements.adminKpiEvents.innerText = WW2_DATA.events.length;
            elements.adminKpiBattles.innerText = WW2_DATA.battles.length;
            elements.adminKpiPeople.innerText = WW2_DATA.people.length;
            elements.adminKpiComments.innerText = state.comments.length;
            renderAdminComments();
            elements.adminModal.classList.add('active');
        });
    }

    function renderAdminComments() {
        if (!elements.adminCommentModList) return;
        elements.adminCommentModList.innerHTML = '';

        if (state.comments.length === 0) {
            elements.adminCommentModList.innerHTML = `<p style="font-size:0.8rem; color:var(--text-dim);">Yorum bulunmuyor.</p>`;
            return;
        }

        state.comments.forEach((c, idx) => {
            const item = document.createElement('div');
            item.className = 'mod-item';
            item.innerHTML = `
                <div style="display:flex; justify-content:space-between; font-weight:600;">
                    <span>${c.author}</span>
                    <span style="color:var(--gold);">${c.entity}</span>
                </div>
                <p style="color:var(--text-muted); margin:4px 0;">${c.content}</p>
                <div class="mod-actions">
                    <button class="btn-delete" onclick="window.WW2App.deleteComment(${c.id})"><i class="fas fa-trash"></i> Sil</button>
                </div>
            `;
            elements.adminCommentModList.appendChild(item);
        });
    }

    window.WW2App.deleteComment = function(id) {
        state.comments = state.comments.filter(c => c.id !== id);
        localStorage.setItem('ww2_comments', JSON.stringify(state.comments));
        renderComments();
        renderAdminComments();
    };

    if (elements.adminAddEventForm) {
        elements.adminAddEventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('adm-title').value.trim();
            const year = parseInt(document.getElementById('adm-year').value);
            const front = document.getElementById('adm-front').value;
            const category = document.getElementById('adm-category').value.trim() || 'Askeri Harekât';
            const summary = document.getElementById('adm-summary').value.trim();

            if (!title || !summary) return;

            const newEvt = {
                id: `evt-custom-${Date.now()}`,
                year: year,
                date: `${year} Yılı`,
                title: title,
                frontId: front,
                category: category,
                importance: "Yeni Eklenen Kayıt",
                summary: summary,
                description: summary,
                location: { lat: 48.0, lng: 15.0, name: "Avrupa" },
                casualties: "Kayıt detaylandırılacak",
                image: "assets/images/hero.jpg"
            };

            WW2_DATA.events.unshift(newEvt);
            renderTimeline(state.currentYearFilter);
            renderMapMarkers();
            elements.adminKpiEvents.innerText = WW2_DATA.events.length;
            elements.adminAddEventForm.reset();
            alert(`"${title}" olayı başarıyla ansiklopediye eklendi ve harita/çizelgede güncellendi!`);
        });
    }

    // 13. MOBİL MENÜ TOGGLE
    if (elements.mobileMenuToggle && elements.navbar) {
        elements.mobileMenuToggle.addEventListener('click', () => {
            const isVisible = elements.navbar.style.display === 'block';
            elements.navbar.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                elements.navbar.style.position = 'absolute';
                elements.navbar.style.top = '100%';
                elements.navbar.style.left = '0';
                elements.navbar.style.width = '100%';
                elements.navbar.style.background = '#0a0c10';
                elements.navbar.style.padding = '20px';
                elements.navbar.style.borderBottom = '1px solid var(--border-subtle)';
            }
        });
    }

    // Yardımcı Fonksiyon: Cephe İsmi Çözümleme
    function getFrontName(id) {
        const found = WW2_DATA.fronts.find(f => f.id === id);
        return found ? found.name : 'Genel Cephe';
    }

    // Başlatıcılar
    initMap();
    renderTimeline('all');
    renderBattles();
    renderPeople('all');
    renderCountries();
    renderMedia();
    renderTopics();
    renderComments();

    console.log('WW2Archive — II. Dünya Savaşı Ansiklopedisi başarıyla yüklendi.');
});
