// main.js - Script Principal

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SAEB Hub inicializando...');
    
    // Inicializar componentes principais
    renderDocumentYears();
    renderCompetencyTabs();
    bindTabs();
    bindQuickAccessLinks();
    bindCompetencyTabs();
    initDocumentUpload();
    initAccordion();
    initQuiz();
    
    // Inicializar funcionalidades avançadas
    initGlobalSearch();
    initActionButtons();
    initDifficultySelector();
    initAchievements();
    initScrollAnimations();
    
    // Inicializar novos sistemas
    initAuthSystem();
    initLeaderboardSystem();
    initSyncSystem();
    initNotificationSystem();
    initAPIIntegration();
    
    console.log('✅ SAEB Hub carregado com sucesso!');
});

// ========== BUSCA GLOBAL ==========
function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    const allDocuments = saebDocuments || [];
    const allCompetencies = saebCompetencies || [];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        
        const results = [];
        
        // Buscar em documentos
        allDocuments.forEach(year => {
            year.items.forEach(doc => {
                if (doc.title.toLowerCase().includes(query)) {
                    results.push({
                        type: 'document',
                        title: doc.title,
                        url: doc.url,
                        year: year.year
                    });
                }
            });
        });
        
        // Buscar em competências
        allCompetencies.forEach(comp => {
            comp.details.forEach(detail => {
                if (detail.summary.toLowerCase().includes(query) || 
                    detail.description.toLowerCase().includes(query)) {
                    results.push({
                        type: 'competency',
                        title: detail.summary,
                        description: detail.description,
                        series: comp.label
                    });
                }
            });
        });
        
        displaySearchResults(results);
    });
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div style="padding: 15px; text-align: center;">Nenhum resultado encontrado</div>';
            searchResults.classList.remove('hidden');
            return;
        }
        
        searchResults.innerHTML = results.map(result => {
            if (result.type === 'document') {
                return `
                    <a href="${result.url}" target="_blank" style="display: block; padding: 12px 16px; border-bottom: 1px solid #eee; color: inherit; text-decoration: none;">
                        <strong>📄 ${result.title}</strong>
                        <div style="font-size: 0.85em; color: #888;">Ano: ${result.year}</div>
                    </a>
                `;
            } else {
                return `
                    <div style="padding: 12px 16px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="this.scrollIntoView();">
                        <strong>🧠 ${result.title}</strong>
                        <div style="font-size: 0.85em; color: #888;">${result.series}</div>
                    </div>
                `;
            }
        }).join('');
        
        searchResults.classList.remove('hidden');
    }
}

// ========== BOTÕES DE AÇÃO ==========
function initActionButtons() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        
        const action = btn.dataset.action;
        
        switch(action) {
            case 'scroll-to-content':
                document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'show-tour':
                showTour();
                break;
            case 'download-certificate':
                if (analytics) {
                    const score = document.getElementById('quizScore')?.textContent || 0;
                    const cert = analytics.generateCertificate(parseInt(score));
                    if (cert) analytics.downloadCertificate(cert);
                }
                break;
            case 'export-data':
                if (analytics) analytics.exportData();
                break;
            case 'reset-stats':
                if (analytics) analytics.resetData();
                break;
        }
    });
}

// ========== TOUR GUIADO ==========
function showTour() {
    const steps = [
        {
            element: '.hero-copy h1',
            message: '👋 Bem-vindo ao SAEB Hub! Aqui você encontrará tudo sobre o SAEB.'
        },
        {
            element: '.quick-link-grid',
            message: '⚡ Acesso rápido às principais seções da plataforma.'
        },
        {
            element: '.tab-nav',
            message: '📑 Use as abas para navegar entre diferentes seções.'
        },
        {
            element: '.accordion',
            message: '📖 Clique nos acordeões para expandir/recolher conteúdo.'
        },
        {
            element: '#tab-stats',
            message: '📊 Acompanhe seu progresso no painel de estatísticas.'
        }
    ];
    
    let currentStep = 0;
    
    function showStep() {
        if (currentStep >= steps.length) {
            alert('✅ Tour finalizado! Aproveite a plataforma!');
            return;
        }
        
        const step = steps[currentStep];
        const elem = document.querySelector(step.element);
        
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            alert(step.message);
            currentStep++;
            setTimeout(showStep, 1000);
        } else {
            currentStep++;
            showStep();
        }
    }
    
    showStep();
}

// ========== SELETOR DE DIFICULDADE ==========
function initDifficultySelector() {
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const difficulty = btn.dataset.difficulty;
            const questionsCount = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
            
            // Gerar quiz com dificuldade específica
            console.log(`Iniciando quiz ${difficulty} com ${questionsCount} questões`);
            
            // TODO: Implementar geração de quiz por dificuldade
            alert(`Quiz ${difficulty} com ${questionsCount} questões (em desenvolvimento)`);
        });
    });
}

// ========== TROFÉUS E CONQUISTAS ==========
function initAchievements() {
    const achievements = [
        { icon: '🎯', name: 'Primeiro Passo', condition: 'documentViews >= 1' },
        { icon: '📚', name: 'Leitor Ávido', condition: 'documentViews >= 5' },
        { icon: '🧠', name: 'Estudioso', condition: 'completedCompetencies.length >= 3' },
        { icon: '🎓', name: 'Mestre do SAEB', condition: 'certificatesEarned >= 1' },
        { icon: '⚡', name: 'Especialista', condition: 'averageScore >= 80' },
        { icon: '🏆', name: 'Campeão', condition: 'averageScore >= 90' }
    ];
    
    updateAchievements();
    
    function updateAchievements() {
        const grid = document.getElementById('achievementsGrid');
        if (!grid) return;
        
        const unlockedAchievements = achievements.filter(ach => {
            try {
                if (analytics && analytics.session) {
                    const session = analytics.session;
                    return eval(ach.condition);
                }
                return false;
            } catch (e) {
                return false;
            }
        });
        
        grid.innerHTML = unlockedAchievements.map(ach => `
            <div class="achievement" title="${ach.name}">
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-name">${ach.name}</div>
            </div>
        `).join('');
    }
    
    // Atualizar a cada 5 segundos
    setInterval(updateAchievements, 5000);
}

// ========== ANIMAÇÕES AO SCROLL ==========
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card, .highlight-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));
}

// ========== TEMA E PREFERÊNCIAS ==========
function initThemeSystem() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

initThemeSystem();

// ========== SISTEMA DE AUTENTICAÇÃO ==========
function initAuthSystem() {
    // Atualizar UI baseado no login
    if (auth.currentUser) {
        auth.updateUILogin();
        // Atualizar leaderboard com dados do usuário
        leaderboard.addToLeaderboard(auth.currentUser);
    }
}

// ========== SISTEMA DE LEADERBOARD ==========
function initLeaderboardSystem() {
    // Renderizar leaderboards
    setTimeout(() => {
        leaderboard.renderGlobalLeaderboard();
        leaderboard.renderFriendsLeaderboard();
        leaderboard.renderChallenges(auth.currentUser?.email || 'guest');
    }, 500);
}

// ========== SISTEMA DE SINCRONIZAÇÃO ==========
function initSyncSystem() {
    // Renderizar painel de sincronização
    setTimeout(() => {
        cloudSync.renderSyncPanel();
    }, 1000);
    
    // Tentar sincronizar se habilitado
    if (cloudSync.syncEnabled && navigator.onLine) {
        cloudSync.performSync();
    }
}

// ========== SISTEMA DE NOTIFICAÇÕES ==========
function initNotificationSystem() {
    // Notificação inicial se novo usuário
    if (auth.currentUser && !localStorage.getItem('saeb-welcomed')) {
        notifications.sendPushNotification('🎉 Bem-vindo ao SAEB Hub!', {
            body: 'Explore documentos, competências e teste seus conhecimentos!'
        });
        notifications.createLocalNotification('🎉 Bem-vindo ao SAEB Hub!', 'achievement', 5000);
        localStorage.setItem('saeb-welcomed', 'true');
    }
}

// ========== INTEGRAÇÃO COM API INEP ==========
function initAPIIntegration() {
    // Carregar dados da API (com fallback para dados simulados)
    console.log('🌐 Conectando com API INEP...');
    
    // Tentar buscar dados atualizados se online
    if (navigator.onLine) {
        inepAPI.fetchDocuments().then(docs => {
            console.log('✅ Documentos carregados:', docs);
        }).catch(err => {
            console.warn('⚠️ Usando documentos em cache');
        });
    }
}

// ========== FUNÇÕES AUXILIARES ==========
function getCurrentUserEmail() {
    return auth.currentUser?.email || 'guest';
}

console.log('🎓 SAEB Hub - Plataforma Completa Carregada (v2.5 com Sistema de Autenticação)');
