/**
 * Sistema de abas principal.
 */

let tabsInitialized = false;

function bindTabs() {
    if (tabsInitialized) return;
    tabsInitialized = true;

    const tabButtons = [...document.querySelectorAll('.tab-button')];
    const tabPanels = [...document.querySelectorAll('.tab-panel')];

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    if (tabButtons.length > 0) {
        activateTab(tabButtons[0].getAttribute('data-tab'));
    }
}

function activateTab(tabId) {
    const tabButtons = [...document.querySelectorAll('.tab-button')];
    const tabPanels = [...document.querySelectorAll('.tab-panel')];
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    const activePanel = document.getElementById(tabId);

    if (!activeButton || !activePanel) return;

    tabButtons.forEach((button) => {
        const isActive = button === activeButton;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
        button.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    tabPanels.forEach((panel) => {
        const isActive = panel === activePanel;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
        panel.style.display = isActive ? 'block' : 'none';
    });

    if (tabId === 'tab-quiz') {
        if (typeof resetQuizInterface === 'function') {
            resetQuizInterface();
        }
        if (typeof initQuiz === 'function') {
            initQuiz();
        }
    }
}

function resetQuizInterface() {
    const quizIntro = document.getElementById('quizIntro');
    const quizRound = document.getElementById('quizRound');
    const quizEnd = document.getElementById('quizEnd');
    const advancedQuizContainer = document.getElementById('advancedQuizContainer');
    const difficultySelector = document.querySelector('.difficulty-selector');

    if (quizIntro) {
        quizIntro.hidden = false;
        quizIntro.style.display = 'block';
    }

    if (quizRound) {
        quizRound.hidden = true;
        quizRound.style.display = 'none';
    }

    if (quizEnd) {
        quizEnd.hidden = true;
        quizEnd.style.display = 'none';
    }

    if (advancedQuizContainer) {
        advancedQuizContainer.hidden = true;
        advancedQuizContainer.style.display = 'none';
    }

    if (difficultySelector) {
        difficultySelector.hidden = false;
        difficultySelector.style.display = 'block';
    }

    if (typeof quizState !== 'undefined') {
        quizState.currentQuestion = 0;
        quizState.score = 0;
        quizState.answered = false;
        quizState.questions = [];
    }
}
