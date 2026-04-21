/**
 * 🔐 SISTEMA DE AUTENTICAÇÃO - SAEB Hub
 * Gerencia login, registro e sincronização de usuários
 */

class AuthEngine {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('saeb-users')) || {};
        this.loadCurrentUser();
        this.setupEventListeners();
    }

    /**
     * Carrega usuário atualmente logado
     */
    loadCurrentUser() {
        const userId = localStorage.getItem('saeb-current-user');
        if (userId && this.users[userId]) {
            this.currentUser = this.users[userId];
        }
    }

    /**
     * Registra novo usuário
     */
    register(email, password, name) {
        if (this.users[email]) {
            return { success: false, message: '📧 Email já cadastrado' };
        }

        if (password.length < 6) {
            return { success: false, message: '🔒 Senha deve ter no mínimo 6 caracteres' };
        }

        const userId = email;
        this.users[userId] = {
            id: userId,
            email: email,
            password: this.hashPassword(password),
            name: name,
            createdAt: new Date().toISOString(),
            progress: {
                documentsViewed: 0,
                quizzesCompleted: 0,
                averageScore: 0,
                certificatesEarned: 0,
                totalTimeSpent: 0,
                completedCompetencies: [],
                streak: 0,
                level: 1,
                totalPoints: 0
            },
            preferences: {
                theme: 'light',
                fontSize: 16,
                highContrast: false,
                notifications: true
            },
            achievements: [],
            lastLogin: new Date().toISOString()
        };

        localStorage.setItem('saeb-users', JSON.stringify(this.users));
        this.login(email, password);
        
        return { success: true, message: '✅ Usuário registrado com sucesso!' };
    }

    /**
     * Faz login do usuário
     */
    login(email, password) {
        const user = this.users[email];

        if (!user) {
            return { success: false, message: '❌ Email não encontrado' };
        }

        if (!this.verifyPassword(password, user.password)) {
            return { success: false, message: '❌ Senha incorreta' };
        }

        this.currentUser = user;
        this.currentUser.lastLogin = new Date().toISOString();
        localStorage.setItem('saeb-current-user', email);
        localStorage.setItem('saeb-users', JSON.stringify(this.users));
        
        this.updateUILogin();
        return { success: true, message: `✅ Bem-vindo, ${user.name}!`, user: user };
    }

    /**
     * Faz logout do usuário
     */
    logout() {
        this.currentUser = null;
        localStorage.removeItem('saeb-current-user');
        this.updateUILogout();
        return { success: true, message: '✅ Desconectado com sucesso!' };
    }

    /**
     * Hash simples de senha (não use em produção!)
     */
    hashPassword(password) {
        return btoa(password); // Base64 - use bcrypt em produção!
    }

    /**
     * Verifica senha
     */
    verifyPassword(password, hash) {
        return btoa(password) === hash;
    }

    /**
     * Atualiza dados do usuário
     */
    updateUserProfile(data) {
        if (!this.currentUser) return { success: false, message: 'Não logado' };

        this.currentUser = { ...this.currentUser, ...data };
        this.users[this.currentUser.id] = this.currentUser;
        localStorage.setItem('saeb-users', JSON.stringify(this.users));
        
        return { success: true, message: '✅ Perfil atualizado!' };
    }

    /**
     * Retorna dados do usuário atual
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Retorna todos os usuários (para leaderboard)
     */
    getAllUsers() {
        return Object.values(this.users).map(user => ({
            name: user.name,
            email: user.email,
            level: user.progress.level,
            totalPoints: user.progress.totalPoints,
            averageScore: user.progress.averageScore,
            certificatesEarned: user.progress.certificatesEarned
        }));
    }

    /**
     * Incrementa pontos do usuário
     */
    addPoints(points) {
        if (!this.currentUser) return;

        this.currentUser.progress.totalPoints += points;
        
        // Level up a cada 1000 pontos
        const newLevel = Math.floor(this.currentUser.progress.totalPoints / 1000) + 1;
        if (newLevel > this.currentUser.progress.level) {
            this.currentUser.progress.level = newLevel;
            this.showNotification(`🎉 Subiu de nível! Você é nível ${newLevel}!`);
        }

        this.users[this.currentUser.id] = this.currentUser;
        localStorage.setItem('saeb-users', JSON.stringify(this.users));
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Este evento é configurado quando o documento está completamente carregado
        // Veja as funções globais no final deste arquivo
    }

    /**
     * Manipula login
     */
    handleLogin() {
        const email = document.getElementById('login-email')?.value;
        const password = document.getElementById('login-password')?.value;

        if (!email || !password) {
            alert('Preencha email e senha!');
            return;
        }

        const result = this.login(email, password);
        alert(result.message);

        if (result.success) {
            this.closeAuthModal();
        }
    }

    /**
     * Manipula registro
     */
    handleRegister() {
        const email = document.getElementById('register-email')?.value;
        const password = document.getElementById('register-password')?.value;
        const name = document.getElementById('register-name')?.value;

        if (!email || !password || !name) {
            alert('Preencha todos os campos!');
            return;
        }

        const result = this.register(email, password, name);
        alert(result.message);

        if (result.success) {
            this.closeAuthModal();
        }
    }

    /**
     * Atualiza UI após login
     */
    updateUILogin() {
        const authPanel = document.getElementById('auth-panel');
        if (authPanel) {
            authPanel.innerHTML = `
                <div class="user-menu">
                    <span>👤 ${this.currentUser.name}</span>
                    <button id="logout-btn" class="btn btn-secondary">Sair</button>
                </div>
            `;
            document.getElementById('logout-btn').addEventListener('click', () => this.logout());
        }

        // Mostrar badge de nível
        this.updateLevelBadge();
    }

    /**
     * Atualiza UI após logout
     */
    updateUILogout() {
        const authPanel = document.getElementById('auth-panel');
        if (authPanel) {
            authPanel.innerHTML = `
                <button id="auth-btn" class="btn btn-primary">🔐 Login / Registrar</button>
            `;
            document.getElementById('auth-btn').addEventListener('click', () => this.showAuthModal());
        }
    }

    /**
     * Mostra modal de autenticação
     */
    showAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (!modal) return;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Fecha modal de autenticação
     */
    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Atualiza badge de nível
     */
    updateLevelBadge() {
        if (!this.currentUser) return;

        const badge = document.getElementById('level-badge');
        if (badge) {
            badge.textContent = `Level ${this.currentUser.progress.level} ⭐`;
            badge.style.display = 'inline-block';
        }
    }

    /**
     * Mostra notificação
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }
}

// Inicializar na página
const auth = new AuthEngine();

// ========== FUNÇÕES GLOBAIS PARA FÁCIL ACESSO ==========
function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Vincular botões e listeners quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Botão de auth no header
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.addEventListener('click', showAuthModal);
    }
    
    // Modal
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAuthModal();
            }
        });
    }
    
    // Botões de login/registro
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => auth.handleLogin());
    }
    
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => auth.handleRegister());
    }
    
    // Atualizar UI se já logado
    if (auth.currentUser) {
        auth.updateUILogin();
    }
});
