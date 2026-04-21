/**
 * 🔔 SISTEMA DE NOTIFICAÇÕES - SAEB Hub
 * Gerencia notificações push, lembretes e alertas
 */

class NotificationEngine {
    constructor() {
        this.notifications = JSON.parse(localStorage.getItem('saeb-notifications')) || [];
        this.reminders = JSON.parse(localStorage.getItem('saeb-reminders')) || [];
        this.setupPushNotifications();
        this.setupReminders();
    }

    /**
     * Solicita permissão para notificações push
     */
    async setupPushNotifications() {
        if (!('Notification' in window)) {
            console.log('⚠️ Navegador não suporta notificações');
            return;
        }

        if (Notification.permission === 'default') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('✅ Notificações ativadas');
            }
        }
    }

    /**
     * Envia notificação push
     */
    sendPushNotification(title, options = {}) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                icon: '🎓',
                badge: '✅',
                ...options
            });

            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            return notification;
        }
    }

    /**
     * Cria notificação local (no app)
     */
    createLocalNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                ${this.getIcon(type)} ${message}
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">✕</button>
        `;

        const container = document.getElementById('notification-container') || this.createContainer();
        container.appendChild(notification);

        if (duration > 0) {
            setTimeout(() => notification.remove(), duration);
        }

        return notification;
    }

    /**
     * Cria container para notificações
     */
    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        return container;
    }

    /**
     * Retorna ícone baseado no tipo
     */
    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            quiz: '🎯',
            certificate: '🏆',
            achievement: '🎉',
            reminder: '🔔'
        };
        return icons[type] || 'ℹ️';
    }

    /**
     * Agenda um lembrete
     */
    scheduleReminder(title, message, delayMinutes) {
        const reminder = {
            id: Date.now(),
            title: title,
            message: message,
            scheduledFor: new Date(Date.now() + delayMinutes * 60 * 1000),
            sent: false
        };

        this.reminders.push(reminder);
        localStorage.setItem('saeb-reminders', JSON.stringify(this.reminders));

        this.createLocalNotification(`⏰ Lembrete agendado: ${title}`, 'info', 3000);
    }

    /**
     * Configura verificação de lembretes
     */
    setupReminders() {
        setInterval(() => {
            const now = new Date();
            this.reminders.forEach(reminder => {
                if (!reminder.sent && new Date(reminder.scheduledFor) <= now) {
                    this.sendPushNotification(reminder.title, {
                        body: reminder.message
                    });
                    this.createLocalNotification(reminder.message, 'reminder', 8000);
                    reminder.sent = true;
                    localStorage.setItem('saeb-reminders', JSON.stringify(this.reminders));
                }
            });
        }, 60000); // Verificar a cada minuto
    }

    /**
     * Notificações de eventos principais
     */
    notifyQuizCompleted(score, isPassing) {
        const message = isPassing 
            ? `🎉 Parabéns! Você tirou ${score}%!` 
            : `Tente novamente! Sua nota: ${score}%`;
        
        this.createLocalNotification(message, isPassing ? 'success' : 'warning', 5000);
        
        if (isPassing) {
            this.sendPushNotification('🏆 Certificado Conquistado!', {
                body: `Parabéns! Você passou com ${score}%`
            });
        }
    }

    /**
     * Notificação de nova conquista
     */
    notifyAchievementUnlocked(achievementName, description) {
        this.createLocalNotification(
            `🏆 Nova Conquista Desbloqueada: ${achievementName}!`,
            'achievement',
            6000
        );

        this.sendPushNotification('🏆 Conquista Desbloqueada!', {
            body: `${achievementName}: ${description}`
        });
    }

    /**
     * Notificação de novo documento
     */
    notifyNewDocument(documentName, year) {
        this.createLocalNotification(
            `📄 Novo documento disponível: ${documentName} (${year})`,
            'info',
            5000
        );

        this.sendPushNotification('📄 Novo Documento', {
            body: `${documentName} (${year})`
        });
    }

    /**
     * Notificação de streak
     */
    notifyStreakMilestone(days) {
        this.createLocalNotification(
            `🔥 Parabéns! ${days} dias de estudo consecutivos!`,
            'achievement',
            6000
        );
    }

    /**
     * Notificação de nível up
     */
    notifyLevelUp(newLevel) {
        this.createLocalNotification(
            `⭐ Você subiu para o Nível ${newLevel}!`,
            'achievement',
            6000
        );

        this.sendPushNotification('⭐ Nível Alcançado!', {
            body: `Você é agora Nível ${newLevel}`
        });
    }

    /**
     * Notificação de sincronização
     */
    notifySyncStatus(success) {
        if (success) {
            this.createLocalNotification('🔄 Dados sincronizados com sucesso', 'success', 3000);
        } else {
            this.createLocalNotification('⚠️ Erro na sincronização', 'warning', 5000);
        }
    }

    /**
     * Sugere estudar competência
     */
    suggestCompetency(competencyName, difficulty) {
        const message = `💡 Sugestão: Estude ${competencyName} (${difficulty})`;
        this.createLocalNotification(message, 'info', 7000);
    }

    /**
     * Retorna histórico de notificações
     */
    getHistory(limit = 10) {
        return this.notifications.slice(-limit);
    }

    /**
     * Limpa notificações antigas
     */
    clearOldNotifications(daysToKeep = 7) {
        const cutoff = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
        this.notifications = this.notifications.filter(n => n.timestamp > cutoff);
        localStorage.setItem('saeb-notifications', JSON.stringify(this.notifications));
    }
}

// Inicializar notificações
const notifications = new NotificationEngine();
