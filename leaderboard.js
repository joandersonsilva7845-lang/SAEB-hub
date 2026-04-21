/**
 * 🏆 SISTEMA DE LEADERBOARD - SAEB Hub
 * Competição entre usuários e ranking global
 */

class LeaderboardEngine {
    constructor() {
        this.leaderboard = JSON.parse(localStorage.getItem('saeb-leaderboard')) || [];
        this.friends = JSON.parse(localStorage.getItem('saeb-friends')) || [];
        this.challenges = JSON.parse(localStorage.getItem('saeb-challenges')) || [];
    }

    /**
     * Adiciona usuário ao leaderboard
     */
    addToLeaderboard(user) {
        // Remover se já existe
        this.leaderboard = this.leaderboard.filter(u => u.email !== user.email);

        // Adicionar novo
        this.leaderboard.push({
            name: user.name,
            email: user.email,
            level: user.progress.level,
            totalPoints: user.progress.totalPoints,
            averageScore: user.progress.averageScore,
            certificatesEarned: user.progress.certificatesEarned,
            streak: user.progress.streak,
            updatedAt: new Date().toISOString()
        });

        // Ordenar
        this.leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

        localStorage.setItem('saeb-leaderboard', JSON.stringify(this.leaderboard));
    }

    /**
     * Retorna leaderboard global (top 10)
     */
    getGlobalLeaderboard(limit = 10) {
        return this.leaderboard.slice(0, limit).map((user, index) => ({
            rank: index + 1,
            ...user
        }));
    }

    /**
     * Retorna posição de um usuário
     */
    getUserRank(email) {
        const index = this.leaderboard.findIndex(u => u.email === email);
        return index !== -1 ? {
            rank: index + 1,
            outOf: this.leaderboard.length,
            user: this.leaderboard[index]
        } : null;
    }

    /**
     * Retorna leaderboard de amigos
     */
    getFriendsLeaderboard() {
        const friendsData = this.leaderboard.filter(user =>
            this.friends.some(friend => friend.email === user.email)
        );

        return friendsData.sort((a, b) => b.totalPoints - a.totalPoints).map((user, index) => ({
            rank: index + 1,
            ...user
        }));
    }

    /**
     * Adiciona um amigo
     */
    addFriend(email, name) {
        if (this.friends.some(f => f.email === email)) {
            return { success: false, message: '👥 Este amigo já está na lista' };
        }

        this.friends.push({
            email: email,
            name: name,
            addedAt: new Date().toISOString(),
            blocked: false
        });

        localStorage.setItem('saeb-friends', JSON.stringify(this.friends));
        return { success: true, message: `✅ ${name} adicionado como amigo!` };
    }

    /**
     * Remove um amigo
     */
    removeFriend(email) {
        this.friends = this.friends.filter(f => f.email !== email);
        localStorage.setItem('saeb-friends', JSON.stringify(this.friends));
        return { success: true, message: '✅ Amigo removido' };
    }

    /**
     * Cria um desafio para um amigo
     */
    createChallenge(fromEmail, toEmail, type, difficulty) {
        const challenge = {
            id: Date.now(),
            from: fromEmail,
            to: toEmail,
            type: type, // 'quiz', 'competency', 'streak'
            difficulty: difficulty,
            createdAt: new Date().toISOString(),
            acceptedAt: null,
            completedAt: null,
            result: null,
            status: 'pending' // pending, accepted, completed
        };

        this.challenges.push(challenge);
        localStorage.setItem('saeb-challenges', JSON.stringify(this.challenges));

        return {
            success: true,
            message: '🎯 Desafio enviado!',
            challenge: challenge
        };
    }

    /**
     * Aceita um desafio
     */
    acceptChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return { success: false, message: 'Desafio não encontrado' };

        challenge.acceptedAt = new Date().toISOString();
        challenge.status = 'accepted';
        localStorage.setItem('saeb-challenges', JSON.stringify(this.challenges));

        return { success: true, message: '✅ Desafio aceito!' };
    }

    /**
     * Completa um desafio
     */
    completeChallenge(challengeId, result) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return { success: false, message: 'Desafio não encontrado' };

        challenge.completedAt = new Date().toISOString();
        challenge.result = result;
        challenge.status = 'completed';
        localStorage.setItem('saeb-challenges', JSON.stringify(this.challenges));

        return { success: true, message: '✅ Desafio completado!' };
    }

    /**
     * Retorna desafios pendentes
     */
    getPendingChallenges(userEmail) {
        return this.challenges.filter(c => c.to === userEmail && c.status === 'pending');
    }

    /**
     * Retorna estatísticas de competição
     */
    getCompetitionStats(email) {
        const userRank = this.getUserRank(email);
        const friendsRank = this.getFriendsLeaderboard();
        const userFriendsRank = friendsRank.find(f => f.email === email);

        return {
            globalRank: userRank,
            friendsRank: userFriendsRank,
            totalPlayers: this.leaderboard.length,
            totalFriends: this.friends.length,
            activeChallenges: this.challenges.filter(c => c.status !== 'completed').length
        };
    }

    /**
     * Renderiza leaderboard global
     */
    renderGlobalLeaderboard() {
        const container = document.getElementById('global-leaderboard');
        if (!container) return;

        const leaderboard = this.getGlobalLeaderboard();
        
        container.innerHTML = `
            <div class="leaderboard-header">
                <h3>🏆 Ranking Global</h3>
                <span class="leaderboard-count">${this.leaderboard.length} jogadores</span>
            </div>
            <div class="leaderboard-list">
                ${leaderboard.map((user, index) => `
                    <div class="leaderboard-item rank-${index + 1}">
                        <div class="rank-badge">#${user.rank}</div>
                        <div class="user-info">
                            <div class="user-name">${this.getRankMedal(user.rank)} ${user.name}</div>
                            <div class="user-stats">
                                Level ${user.level} • ${user.totalPoints} pts • ⭐ ${user.averageScore.toFixed(1)}%
                            </div>
                        </div>
                        <button class="btn btn-sm btn-secondary" onclick="leaderboard.addFriend('${user.email}', '${user.name}')">
                            Adicionar
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Renderiza leaderboard de amigos
     */
    renderFriendsLeaderboard() {
        const container = document.getElementById('friends-leaderboard');
        if (!container) return;

        const friendsBoard = this.getFriendsLeaderboard();

        if (friendsBoard.length === 0) {
            container.innerHTML = '<p>Nenhum amigo adicionado ainda. Adicione amigos para competir!</p>';
            return;
        }

        container.innerHTML = `
            <div class="leaderboard-header">
                <h3>👥 Ranking de Amigos</h3>
                <span class="leaderboard-count">${friendsBoard.length} amigos</span>
            </div>
            <div class="leaderboard-list">
                ${friendsBoard.map((user, index) => `
                    <div class="leaderboard-item">
                        <div class="rank-badge">#${user.rank}</div>
                        <div class="user-info">
                            <div class="user-name">${user.name}</div>
                            <div class="user-stats">
                                Level ${user.level} • ${user.totalPoints} pts
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="leaderboard.createChallenge(getCurrentUserEmail(), '${user.email}', 'quiz', 'medium')">
                            Desafiar
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Renderiza desafios
     */
    renderChallenges(userEmail) {
        const container = document.getElementById('challenges-container');
        if (!container) return;

        const pending = this.getPendingChallenges(userEmail);
        const sent = this.challenges.filter(c => c.from === userEmail && c.status === 'pending');

        container.innerHTML = `
            <div class="challenges-panel">
                <div class="challenges-section">
                    <h4>🎯 Desafios Recebidos (${pending.length})</h4>
                    ${pending.length === 0 ? '<p>Nenhum desafio pendente</p>' : 
                        pending.map(ch => `
                            <div class="challenge-card">
                                <div>De: ${this.getFriendName(ch.from)}</div>
                                <div>Tipo: ${ch.type} (${ch.difficulty})</div>
                                <button class="btn btn-sm btn-success" onclick="leaderboard.acceptChallenge(${ch.id})">
                                    Aceitar
                                </button>
                            </div>
                        `).join('')
                    }
                </div>

                <div class="challenges-section">
                    <h4>📤 Desafios Enviados (${sent.length})</h4>
                    ${sent.length === 0 ? '<p>Nenhum desafio enviado</p>' : 
                        sent.map(ch => `
                            <div class="challenge-card">
                                <div>Para: ${this.getFriendName(ch.to)}</div>
                                <div>Tipo: ${ch.type} (${ch.difficulty})</div>
                                <div class="badge">Aguardando resposta...</div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
    }

    /**
     * Retorna medalha baseada no rank
     */
    getRankMedal(rank) {
        const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
        return medals[rank] || '⭐';
    }

    /**
     * Retorna nome do amigo
     */
    getFriendName(email) {
        const friend = this.friends.find(f => f.email === email);
        return friend ? friend.name : email;
    }
}

// Inicializar leaderboard
const leaderboard = new LeaderboardEngine();
