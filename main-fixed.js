/**
 * main-fixed.js - inicializa��o principal da aplica��o
 */

document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeNavigation();
        bindTabs();
        bindQuickAccessLinks();
        initAccordion();
        renderDocumentYears();
        renderCompetencyTabs();
        initQuiz();
        initStatsDashboard();
        initGlobalSearch();
        initActionButtons();
        initAchievements();
        initScrollAnimations();
        initThemeSystem();
        initAuthSystem();
        initLeaderboardSystem();
        initSyncSystem();
        initNotificationSystem();
        initAPIIntegration();
        initFooterLinks();
    } catch (error) {
        console.error('Erro ao inicializar o SAEB Hub:', error);
    }
});

function initializeNavigation() {
    const mainContent = document.getElementById('main-content');
    document.querySelector('[data-action="scroll-to-content"]')?.addEventListener('click', () => {
        mainContent?.scrollIntoView({ behavior: 'smooth' });
    });
}

function bindQuickAccessLinks() {
    document.querySelectorAll('.quick-link[data-tab-target]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const tabId = link.dataset.tabTarget;
            activateTab(tabId);
            document.getElementById(tabId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initStatsDashboard() {
    if (typeof analytics !== 'undefined') {
        analytics.updateStatsDisplay();
    }
}

function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim().toLowerCase();
        if (query.length < 2) {
            clearSearchResults();
            return;
        }

        const results = buildSearchResults(query);
        renderSearchResults(results, searchResults);
    });

    searchResults.addEventListener('click', (event) => {
        const target = event.target.closest('[data-search-type]');
        if (!target) return;
        handleSearchResult(target.dataset.searchType, target.dataset.searchValue);
        clearSearchResults();
        searchInput.value = '';
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.search-bar')) {
            clearSearchResults();
        }
    });

    function clearSearchResults() {
        searchResults.classList.add('hidden');
        searchResults.replaceChildren();
    }
}

function buildSearchResults(query) {
    const results = [];

    if (Array.isArray(window.saebDocuments)) {
        window.saebDocuments.forEach((year) => {
            year.items.forEach((doc) => {
                if (doc.title.toLowerCase().includes(query)) {
                    results.push({
                        type: 'document',
                        title: doc.title,
                        meta: `Documento oficial � ${year.year}`,
                        value: doc.url
                    });
                }
            });
        });
    }

    if (Array.isArray(window.saebCompetencies)) {
        window.saebCompetencies.forEach((year) => {
            year.series.forEach((serie, seriesIndex) => {
                serie.details.forEach((detail) => {
                    const haystack = `${detail.summary} ${detail.description}`.toLowerCase();
                    if (haystack.includes(query)) {
                        results.push({
                            type: 'competency',
                            title: detail.summary,
                            meta: `${year.year} � ${serie.label}`,
                            value: `${year.year}|${seriesIndex}|${detail.summary}`
                        });
                    }
                });
            });
        });
    }

    return results.slice(0, 8);
}

function renderSearchResults(results, container) {
    container.replaceChildren();

    if (results.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'search-result-empty';
        empty.textContent = 'Nenhum resultado encontrado.';
        container.appendChild(empty);
        container.classList.remove('hidden');
        return;
    }

    results.forEach((result) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'search-result-item';
        button.dataset.searchType = result.type;
        button.dataset.searchValue = result.value;

        const title = document.createElement('strong');
        title.textContent = result.title;

        const meta = document.createElement('span');
        meta.textContent = result.meta;

        button.append(title, meta);
        container.appendChild(button);
    });

    container.classList.remove('hidden');
}

function handleSearchResult(type, value) {
    if (type === 'document') {
        window.open(value, '_blank', 'noopener');
        return;
    }

    if (type === 'competency') {
        activateTab('tab-competencias');
        const [year] = value.split('|');
        const yearIndex = window.saebCompetencies.findIndex((entry) => String(entry.year) === year);
        if (yearIndex >= 0 && typeof showCompetencyYear === 'function') {
            showCompetencyYear(yearIndex);
        }
        document.getElementById('tab-competencias')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function initActionButtons() {
    document.querySelectorAll('[data-action]').forEach((button) => {
        button.addEventListener('click', () => handleAction(button.dataset.action));
    });
}

function handleAction(action) {
    switch (action) {
        case 'show-tour':
            showTour();
            break;
        case 'download-certificate': {
            const score = Number(document.getElementById('quizScore')?.textContent || 0);
            const cert = analytics?.generateCertificate(score);
            if (cert) analytics.downloadCertificate(cert);
            break;
        }
        case 'export-data':
            analytics?.exportData();
            break;
        case 'reset-stats':
            analytics?.resetData();
            break;
    }
}

function showTour() {
    alert(
        'Tour r�pido:\n\n' +
        '1. Use o acesso r�pido para abrir cada �rea.\n' +
        '2. Explore os documentos oficiais do SAEB.\n' +
        '3. Navegue pelas compet�ncias por ano.\n' +
        '4. Fa�a os quizzes e acompanhe seu progresso.'
    );
}

function initAchievements() {
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (!achievementsGrid) return;

    const achievements = [
        { icon: '??', name: 'Primeiro Passo', desc: 'Complete o primeiro quiz.' },
        { icon: '??', name: 'Leitor �vido', desc: 'Consulte 5 documentos.' },
        { icon: '??', name: 'Estudioso', desc: 'Explore compet�ncias de diferentes s�ries.' },
        { icon: '??', name: 'Mestre do SAEB', desc: 'Obtenha ao menos um certificado.' }
    ];

    achievementsGrid.replaceChildren();
    achievements.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'achievement-card';

        const icon = document.createElement('div');
        icon.className = 'achievement-icon';
        icon.textContent = item.icon;

        const title = document.createElement('strong');
        title.textContent = item.name;

        const description = document.createElement('p');
        description.textContent = item.desc;

        card.append(icon, title, description);
        achievementsGrid.appendChild(card);
    });
}

function initScrollAnimations() {
    const cards = document.querySelectorAll('.card, .stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    cards.forEach((card) => observer.observe(card));
}

function initThemeSystem() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

function initAuthSystem() {
    if (typeof auth === 'undefined') return;
    if (auth.currentUser) {
        auth.updateUILogin();
    } else {
        auth.updateUILogout();
    }
}

function initLeaderboardSystem() {
    if (typeof leaderboard === 'undefined') return;
    setTimeout(() => {
        leaderboard.renderGlobalLeaderboard();
        leaderboard.renderFriendsLeaderboard();
        leaderboard.renderChallenges(getCurrentUserEmail());
    }, 200);
}

function initSyncSystem() {
    if (typeof cloudSync === 'undefined') return;
    setTimeout(() => {
        cloudSync.renderSyncPanel();
    }, 200);

    if (cloudSync.syncEnabled && navigator.onLine) {
        cloudSync.performSync();
    }
}

function initNotificationSystem() {
    if (typeof notifications === 'undefined') return;
    if (typeof auth !== 'undefined' && auth.currentUser && !localStorage.getItem('saeb-welcomed')) {
        notifications.createLocalNotification('Bem-vindo ao SAEB Hub!', 'achievement', 5000);
        localStorage.setItem('saeb-welcomed', 'true');
    }
}

function initAPIIntegration() {
    if (typeof inepAPI === 'undefined' || !navigator.onLine) return;
    inepAPI.fetchDocuments().catch(() => {
        console.warn('Falha ao atualizar documentos em tempo real; cache local mantido.');
    });
}

function initFooterLinks() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
        link.addEventListener('click', (event) => event.preventDefault());
    });
}

function getCurrentUserEmail() {
    return auth?.currentUser?.email || 'guest';
}
