// analytics.js - Sistema de Analytics e Rastreamento

class AnalyticsEngine {
    constructor() {
        this.session = {
            startTime: new Date(),
            documentViews: 0,
            quizzesCompleted: 0,
            averageScore: 0,
            totalTimeSpent: 0,
            completedCompetencies: [],
            certificatesEarned: 0,
            streak: 0
        };
        
        this.loadSession();
        this.trackPageView();
        this.setupEventListeners();
    }

    loadSession() {
        const saved = localStorage.getItem('saeb-session');
        if (saved) {
            try {
                this.session = JSON.parse(saved);
            } catch (e) {
                console.error('Erro ao carregar sessão:', e);
            }
        }
    }

    saveSession() {
        localStorage.setItem('saeb-session', JSON.stringify(this.session));
        this.updateStatsDisplay();
    }

    trackPageView() {
        this.logEvent('page_view', {
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
    }

    trackDocumentView(docTitle) {
        this.session.documentViews++;
        this.logEvent('document_view', { title: docTitle });
        this.saveSession();
    }

    trackQuizCompletion(score) {
        this.session.quizzesCompleted++;
        const newAverage = (this.session.averageScore * (this.session.quizzesCompleted - 1) + score) / this.session.quizzesCompleted;
        this.session.averageScore = Math.round(newAverage);
        
        if (score >= 70) {
            this.session.certificatesEarned++;
        }
        
        this.logEvent('quiz_completed', { score });
        this.saveSession();
    }

    trackCompetencyCompleted(competency) {
        if (!this.session.completedCompetencies.includes(competency)) {
            this.session.completedCompetencies.push(competency);
        }
        this.logEvent('competency_completed', { competency });
        this.saveSession();
    }

    logEvent(eventName, data = {}) {
        const event = {
            name: eventName,
            timestamp: new Date().toISOString(),
            data: data
        };
        
        console.log('[Analytics]', event);
        
        // Enviar para servidor (se disponível)
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) });
    }

    getTimeSpent() {
        const now = new Date();
        const elapsed = now - this.session.startTime;
        return Math.floor(elapsed / 1000 / 60); // minutos
    }

    getProgress() {
        const totalItems = 50; // documentos + competências + quiz
        const completed = this.session.documentViews + this.session.quizzesCompleted + this.session.completedCompetencies.length;
        return Math.floor((completed / totalItems) * 100);
    }

    updateStatsDisplay() {
        // Atualizar dashboard de estatísticas
        const docElem = document.getElementById('stat-documents');
        const quizElem = document.getElementById('stat-quizzes');
        const certElem = document.getElementById('stat-certificates');
        const avgElem = document.getElementById('stat-avg-score');
        const progElem = document.getElementById('stat-progress');
        const timeElem = document.getElementById('stat-time');
        
        if (docElem) docElem.textContent = this.session.documentViews;
        if (quizElem) quizElem.textContent = this.session.quizzesCompleted;
        if (certElem) certElem.textContent = this.session.certificatesEarned;
        if (avgElem) avgElem.textContent = this.session.averageScore + '%';
        if (progElem) progElem.textContent = this.getProgress() + '%';
        if (timeElem) timeElem.textContent = Math.floor(this.getTimeSpent() / 60) + 'h';
        
        // Atualizar header stats
        const userProgressElem = document.getElementById('userProgress');
        if (userProgressElem) userProgressElem.textContent = this.getProgress() + '%';
    }

    setupEventListeners() {
        // Rastrear cliques em documentos
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-doc-title]')) {
                const title = e.target.closest('[data-doc-title]').dataset.docTitle;
                this.trackDocumentView(title);
            }
        });
        
        // Atualizar stats a cada 30 segundos
        setInterval(() => this.updateStatsDisplay(), 30000);
    }

    exportData() {
        const data = {
            session: this.session,
            timestamp: new Date().toISOString()
        };
        
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `saeb-data-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    resetData() {
        if (confirm('Tem certeza que deseja redefinir todos os dados?')) {
            this.session = {
                startTime: new Date(),
                documentViews: 0,
                quizzesCompleted: 0,
                averageScore: 0,
                totalTimeSpent: 0,
                completedCompetencies: [],
                certificatesEarned: 0,
                streak: 0
            };
            this.saveSession();
            this.updateStatsDisplay();
            alert('Dados redefinidos com sucesso!');
        }
    }

    generateCertificate(score) {
        if (score < 70) return null;
        
        return {
            title: 'Certificado de Conclusão - SAEB Hub',
            score: score,
            date: new Date().toLocaleDateString('pt-BR'),
            issuer: 'SAEB Hub - Plataforma Educacional',
            code: 'CERT-' + Date.now()
        };
    }

    downloadCertificate(cert) {
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 700;
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = '#0b4d91';
        ctx.fillRect(0, 0, 1000, 700);
        
        // Border
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 10;
        ctx.strokeRect(50, 50, 900, 600);
        
        // Texto
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(cert.title, 500, 150);
        
        ctx.font = '30px Arial';
        ctx.fillText('Parabéns! Você completou o curso com pontuação de ' + cert.score + '%', 500, 300);
        ctx.fillText('Data: ' + cert.date, 500, 400);
        ctx.fillText('Código: ' + cert.code, 500, 500);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'certificado-' + Date.now() + '.png';
            a.click();
            URL.revokeObjectURL(url);
        });
    }
}

// Inicializar Analytics
const analytics = new AnalyticsEngine();
