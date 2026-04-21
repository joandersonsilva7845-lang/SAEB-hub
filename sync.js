/**
 * ☁️ SISTEMA DE SINCRONIZAÇÃO CLOUD - SAEB Hub
 * Sincroniza dados entre dispositivos e cloud
 */

class CloudSyncEngine {
    constructor() {
        this.syncEnabled = localStorage.getItem('saeb-sync-enabled') === 'true';
        this.lastSync = localStorage.getItem('saeb-last-sync') || null;
        this.syncQueue = JSON.parse(localStorage.getItem('saeb-sync-queue')) || [];
        this.cloudServiceURL = 'https://sync.saebhub.cloud/api'; // URL simulada
        this.syncInterval = 5 * 60 * 1000; // 5 minutos
        this.initAutoSync();
    }

    /**
     * Habilita sincronização automática
     */
    enableSync() {
        this.syncEnabled = true;
        localStorage.setItem('saeb-sync-enabled', 'true');
        this.createLocalNotification('☁️ Sincronização ativada', 'success', 3000);
        this.performSync();
    }

    /**
     * Desabilita sincronização automática
     */
    disableSync() {
        this.syncEnabled = false;
        localStorage.setItem('saeb-sync-enabled', 'false');
        this.createLocalNotification('☁️ Sincronização desativada', 'info', 3000);
    }

    /**
     * Inicializa sincronização automática
     */
    initAutoSync() {
        if (this.syncEnabled) {
            // Sincronizar ao carregar
            this.performSync();

            // Sincronizar periodicamente
            setInterval(() => {
                if (this.syncEnabled && navigator.onLine) {
                    this.performSync();
                }
            }, this.syncInterval);

            // Sincronizar ao se conectar
            window.addEventListener('online', () => this.performSync());
        }
    }

    /**
     * Executa sincronização completa
     */
    async performSync() {
        if (!this.syncEnabled || !navigator.onLine) {
            console.warn('⚠️ Não está online ou sync desativado');
            return;
        }

        try {
            console.log('🔄 Iniciando sincronização...');

            // Sincronizar dados do usuário
            if (auth.currentUser) {
                await this.syncUserData(auth.currentUser);
            }

            // Sincronizar fila de ações pendentes
            await this.processSyncQueue();

            this.lastSync = new Date().toISOString();
            localStorage.setItem('saeb-last-sync', this.lastSync);

            this.updateSyncStatus('synced', '✅ Sincronizado agora mesmo');
            console.log('✅ Sincronização completa');
        } catch (error) {
            console.error('❌ Erro ao sincronizar:', error);
            this.updateSyncStatus('error', '❌ Erro na sincronização');
        }
    }

    /**
     * Sincroniza dados do usuário
     */
    async syncUserData(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            progress: user.progress,
            preferences: user.preferences,
            achievements: user.achievements,
            timestamp: new Date().toISOString()
        };

        return this.uploadToCloud('/user/sync', payload);
    }

    /**
     * Adiciona ação à fila de sincronização
     */
    addToSyncQueue(action, data) {
        this.syncQueue.push({
            id: Date.now(),
            action: action,
            data: data,
            timestamp: new Date().toISOString(),
            synced: false
        });

        localStorage.setItem('saeb-sync-queue', JSON.stringify(this.syncQueue));
        console.log(`📝 Ação adicionada à fila: ${action}`);
    }

    /**
     * Processa fila de sincronização
     */
    async processSyncQueue() {
        const pending = this.syncQueue.filter(item => !item.synced);

        for (const item of pending) {
            try {
                await this.uploadToCloud('/queue/process', item);
                item.synced = true;
            } catch (error) {
                console.warn(`⚠️ Falha ao processar ${item.action}:`, error);
            }
        }

        // Remover itens sincronizados
        this.syncQueue = this.syncQueue.filter(item => !item.synced);
        localStorage.setItem('saeb-sync-queue', JSON.stringify(this.syncQueue));
    }

    /**
     * Upload para cloud (simulado)
     */
    async uploadToCloud(endpoint, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular sucesso/falha aleatória (90% sucesso)
                if (Math.random() > 0.1) {
                    resolve({ success: true, data: data });
                } else {
                    reject(new Error('Falha na sincronização'));
                }
            }, 500);
        });
    }

    /**
     * Download de dados da cloud
     */
    async downloadFromCloud(endpoint) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, data: {} });
            }, 500);
        });
    }

    /**
     * Backup dos dados locais
     */
    async backupData() {
        const backup = {
            users: localStorage.getItem('saeb-users'),
            currentUser: localStorage.getItem('saeb-current-user'),
            session: localStorage.getItem('saeb-session'),
            leaderboard: localStorage.getItem('saeb-leaderboard'),
            friends: localStorage.getItem('saeb-friends'),
            challenges: localStorage.getItem('saeb-challenges'),
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        };

        try {
            await this.uploadToCloud('/backup/create', backup);
            this.createLocalNotification('✅ Backup criado com sucesso', 'success', 3000);
            return { success: true, backup: backup };
        } catch (error) {
            this.createLocalNotification('❌ Falha ao criar backup', 'error', 5000);
            return { success: false, error: error.message };
        }
    }

    /**
     * Restaura dados de um backup
     */
    async restoreFromBackup(backupId) {
        try {
            const backup = await this.downloadFromCloud(`/backup/${backupId}`);

            if (backup.data) {
                // Restaurar dados
                if (backup.data.users) localStorage.setItem('saeb-users', backup.data.users);
                if (backup.data.currentUser) localStorage.setItem('saeb-current-user', backup.data.currentUser);
                if (backup.data.session) localStorage.setItem('saeb-session', backup.data.session);

                this.createLocalNotification('✅ Backup restaurado com sucesso', 'success', 3000);
                location.reload();
                return { success: true };
            }
        } catch (error) {
            this.createLocalNotification('❌ Falha ao restaurar backup', 'error', 5000);
            return { success: false, error: error.message };
        }
    }

    /**
     * Retorna status de sincronização
     */
    getSyncStatus() {
        return {
            enabled: this.syncEnabled,
            online: navigator.onLine,
            lastSync: this.lastSync,
            pendingItems: this.syncQueue.filter(i => !i.synced).length,
            totalQueueSize: this.syncQueue.length
        };
    }

    /**
     * Limpa fila de sincronização
     */
    clearSyncQueue() {
        this.syncQueue = [];
        localStorage.setItem('saeb-sync-queue', JSON.stringify(this.syncQueue));
        this.createLocalNotification('🗑️ Fila de sincronização limpa', 'info', 3000);
    }

    /**
     * Atualiza status visual de sincronização
     */
    updateSyncStatus(status, message) {
        const indicator = document.getElementById('sync-indicator');
        if (indicator) {
            indicator.className = `sync-indicator sync-${status}`;
            indicator.title = message;
        }

        const text = document.getElementById('sync-text');
        if (text) {
            text.textContent = message;
        }
    }

    /**
     * Renderiza painel de sincronização
     */
    renderSyncPanel() {
        const container = document.getElementById('sync-settings-panel');
        if (!container) return;

        const status = this.getSyncStatus();

        container.innerHTML = `
            <div class="sync-panel">
                <h3>☁️ Sincronização na Cloud</h3>
                
                <div class="sync-status">
                    <div>Status: ${status.online ? '🟢 Online' : '🔴 Offline'}</div>
                    <div>Sincronização: ${status.enabled ? '✅ Ativada' : '❌ Desativada'}</div>
                    <div>Última sincronização: ${status.lastSync ? new Date(status.lastSync).toLocaleString() : 'Nunca'}</div>
                    <div>Itens pendentes: ${status.pendingItems}</div>
                </div>

                <div class="sync-controls">
                    <button class="btn btn-primary" onclick="cloudSync.${status.enabled ? 'disableSync' : 'enableSync'}()">
                        ${status.enabled ? '⏸️ Desativar' : '▶️ Ativar'} Sincronização
                    </button>
                    <button class="btn btn-secondary" onclick="cloudSync.performSync()">
                        🔄 Sincronizar Agora
                    </button>
                    <button class="btn btn-secondary" onclick="cloudSync.backupData()">
                        💾 Fazer Backup
                    </button>
                </div>

                <div class="sync-queue-info">
                    <p>Fila de sincronização: ${status.totalQueueSize} itens</p>
                    ${status.pendingItems > 0 ? 
                        `<button class="btn btn-sm btn-warning" onclick="cloudSync.clearSyncQueue()">
                            Limpar Fila
                        </button>` 
                        : ''
                    }
                </div>
            </div>
        `;
    }

    /**
     * Cria notificação local
     */
    createLocalNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            border-radius: 8px;
            z-index: 9999;
        `;

        document.body.appendChild(notification);
        if (duration > 0) {
            setTimeout(() => notification.remove(), duration);
        }
    }
}

// Inicializar cloud sync
const cloudSync = new CloudSyncEngine();
