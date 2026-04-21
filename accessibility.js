// accessibility.js - Funcionalidades de acessibilidade

class AccessibilityManager {
    constructor() {
        this.highContrastEnabled = false;
        this.largeFontEnabled = false;
        this.darkModeEnabled = false;
        this.init();
    }

    init() {
        this.createControls();
        this.loadPreferences();
        this.bindEvents();
        this.applyPreferences();
    }

    createControls() {
        // Controles já criados no HTML
        this.highContrastToggle = document.getElementById('highContrastToggle');
        this.fontSizeToggle = document.getElementById('fontSizeToggle');
        this.darkModeToggle = document.getElementById('darkModeToggle');
    }

    loadPreferences() {
        this.highContrastEnabled = localStorage.getItem('highContrast') === 'true';
        this.largeFontEnabled = localStorage.getItem('largeFont') === 'true';
        this.darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    }

    savePreferences() {
        localStorage.setItem('highContrast', this.highContrastEnabled);
        localStorage.setItem('largeFont', this.largeFontEnabled);
        localStorage.setItem('darkMode', this.darkModeEnabled);
    }

    bindEvents() {
        this.highContrastToggle.addEventListener('click', () => this.toggleHighContrast());
        this.fontSizeToggle.addEventListener('click', () => this.toggleFontSize());
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());

        // Suporte a atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.toggleHighContrast();
                        break;
                    case '2':
                        e.preventDefault();
                        this.toggleFontSize();
                        break;
                    case '3':
                        e.preventDefault();
                        this.toggleDarkMode();
                        break;
                }
            }
        });
    }

    toggleHighContrast() {
        this.highContrastEnabled = !this.highContrastEnabled;
        this.updateButtonState(this.highContrastToggle, this.highContrastEnabled);
        this.applyPreferences();
        this.savePreferences();
        this.announceChange('Modo alto contraste ' + (this.highContrastEnabled ? 'ativado' : 'desativado'));
    }

    toggleFontSize() {
        this.largeFontEnabled = !this.largeFontEnabled;
        this.updateButtonState(this.fontSizeToggle, this.largeFontEnabled);
        this.applyPreferences();
        this.savePreferences();
        this.announceChange('Fonte grande ' + (this.largeFontEnabled ? 'ativada' : 'desativada'));
    }

    toggleDarkMode() {
        this.darkModeEnabled = !this.darkModeEnabled;
        this.updateButtonState(this.darkModeToggle, this.darkModeEnabled);
        this.applyPreferences();
        this.savePreferences();
        this.announceChange('Modo escuro ' + (this.darkModeEnabled ? 'ativado' : 'desativado'));
    }

    updateButtonState(button, enabled) {
        button.setAttribute('aria-pressed', enabled);
        button.classList.toggle('active', enabled);
    }

    applyPreferences() {
        const body = document.body;
        body.classList.toggle('high-contrast', this.highContrastEnabled);
        body.classList.toggle('large-font', this.largeFontEnabled);
        body.classList.toggle('dark-mode', this.darkModeEnabled);
    }

    announceChange(message) {
        // Criar anúncio para leitores de tela
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'assertive');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        document.body.appendChild(announcement);
        announcement.textContent = message;

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Método para foco programático
    focusElement(element) {
        if (element) {
            element.focus();
            if (element.scrollIntoView) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // Método para navegação por teclado melhorada
    enhanceKeyboardNavigation() {
        // Adicionar navegação por teclado para accordions
        const accordionTitles = document.querySelectorAll('.accordion-title');
        accordionTitles.forEach(title => {
            title.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    title.click();
                }
            });
        });

        // Adicionar navegação por teclado para tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                let targetIndex = index;
                if (e.key === 'ArrowLeft') {
                    targetIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                } else if (e.key === 'ArrowRight') {
                    targetIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                } else if (e.key === 'Home') {
                    targetIndex = 0;
                } else if (e.key === 'End') {
                    targetIndex = tabButtons.length - 1;
                }

                if (targetIndex !== index) {
                    e.preventDefault();
                    tabButtons[targetIndex].focus();
                    tabButtons[targetIndex].click();
                }
            });
        });
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityManager = new AccessibilityManager();

    // Melhorar navegação por teclado após carregamento
    setTimeout(() => {
        accessibilityManager.enhanceKeyboardNavigation();
    }, 100);
});

// Exportar para uso global se necessário
window.AccessibilityManager = AccessibilityManager;