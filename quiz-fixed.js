/**
 * quiz-fixed.js
 * Fluxo único e previsível para quiz básico e avançado.
 */

const quizState = {
    mode: 'basic',
    difficulty: 'easy',
    questions: [],
    currentQuestion: 0,
    score: 0,
    answered: false
};

let quizInitialized = false;

function initQuiz() {
    if (quizInitialized) return;
    quizInitialized = true;

    const bindWhenReady = () => {
        if (!Array.isArray(window.saebQuizQuestions) || window.saebQuizQuestions.length === 0) {
            setTimeout(bindWhenReady, 100);
            return;
        }

        document.getElementById('startQuizButton')?.addEventListener('click', () => {
            startBasicQuiz();
        });

        document.querySelectorAll('[data-difficulty]').forEach((button) => {
            button.addEventListener('click', () => {
                startAdvancedQuiz(button.dataset.difficulty);
            });
        });

        document.getElementById('nextQuestionButton')?.addEventListener('click', nextQuestion);
        document.getElementById('advNextQuestionButton')?.addEventListener('click', nextQuestion);
        document.getElementById('restartQuizButton')?.addEventListener('click', restartQuiz);
    };

    bindWhenReady();
}

function startBasicQuiz() {
    quizState.mode = 'basic';
    quizState.difficulty = 'basic';
    quizState.questions = [...window.saebQuizQuestions.slice(0, 10)];
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answered = false;

    const intro = document.getElementById('quizIntro');
    const round = document.getElementById('quizRound');
    const end = document.getElementById('quizEnd');

    if (intro) intro.style.display = 'none';
    if (round) {
        round.hidden = false;
        round.classList.remove('hidden');
        round.style.display = 'block';
    }
    if (end) {
        end.hidden = true;
        end.classList.add('hidden');
        end.style.display = 'none';
    }

    renderQuestion();
}

function startAdvancedQuiz(difficulty) {
    const counts = { easy: 5, medium: 10, hard: 15 };
    const count = counts[difficulty] || 5;
    const filtered = window.saebQuizQuestions.filter((question) => question.difficulty === difficulty);

    quizState.mode = 'advanced';
    quizState.difficulty = difficulty;
    quizState.questions = shuffle(filtered).slice(0, count);
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answered = false;

    const advancedContainer = document.getElementById('advancedQuizContainer');
    const difficultySelector = document.querySelector('.difficulty-selector');

    if (difficultySelector) difficultySelector.style.display = 'none';
    if (advancedContainer) {
        advancedContainer.hidden = false;
        advancedContainer.style.display = 'block';
    }

    renderQuestion();
}

function getQuizUI() {
    if (quizState.mode === 'advanced') {
        return {
            current: document.getElementById('advQuizCurrent'),
            total: document.getElementById('advQuizTotal'),
            progress: document.getElementById('advQuizProgress'),
            questionText: document.getElementById('advQuizQuestionText'),
            options: document.getElementById('advQuizOptions'),
            feedback: document.getElementById('advQuizFeedback'),
            next: document.getElementById('advNextQuestionButton')
        };
    }

    return {
        current: document.getElementById('quizCurrent'),
        total: document.getElementById('quizTotal'),
        progress: document.getElementById('quizProgress'),
        questionText: document.getElementById('quizQuestionText'),
        options: document.getElementById('quizOptions'),
        feedback: document.getElementById('quizFeedback'),
        next: document.getElementById('nextQuestionButton')
    };
}

function renderQuestion() {
    const question = quizState.questions[quizState.currentQuestion];
    const ui = getQuizUI();

    if (!question || !ui.options || !ui.questionText) return;

    quizState.answered = false;

    if (ui.current) ui.current.textContent = String(quizState.currentQuestion + 1);
    if (ui.total) ui.total.textContent = String(quizState.questions.length);
    if (ui.progress) {
        const percentage = ((quizState.currentQuestion + 1) / quizState.questions.length) * 100;
        ui.progress.style.width = `${percentage}%`;
    }

    ui.questionText.textContent = question.question;
    ui.options.replaceChildren();

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'quiz-option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        ui.options.appendChild(button);
    });

    if (ui.feedback) {
        ui.feedback.innerHTML = '';
        ui.feedback.classList.add('hidden');
        ui.feedback.style.display = 'none';
    }

    if (ui.next) {
        ui.next.disabled = true;
    }
}

function selectAnswer(selectedIndex) {
    if (quizState.answered) return;

    const question = quizState.questions[quizState.currentQuestion];
    const ui = getQuizUI();
    const buttons = [...ui.options.querySelectorAll('.quiz-option')];
    const correctIndex = Number(question.correct);

    quizState.answered = true;

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) button.classList.add('correct');
        if (index === selectedIndex && index !== correctIndex) button.classList.add('incorrect');
    });

    if (selectedIndex === correctIndex) {
        quizState.score += 10;
    }

    if (ui.feedback) {
        const success = selectedIndex === correctIndex;
        ui.feedback.innerHTML = success
            ? `<div style="background:#4caf50;color:#fff;padding:14px;border-radius:10px;"><strong>Correto!</strong><br>${question.explanation || ''}</div>`
            : `<div style="background:#f44336;color:#fff;padding:14px;border-radius:10px;"><strong>Incorreto.</strong><br>Resposta correta: ${question.options[correctIndex]}<br>${question.explanation || ''}</div>`;
        ui.feedback.classList.remove('hidden');
        ui.feedback.style.display = 'block';
    }

    if (ui.next) {
        ui.next.disabled = false;
    }
}

function nextQuestion() {
    quizState.currentQuestion += 1;

    if (quizState.currentQuestion >= quizState.questions.length) {
        showResults();
        return;
    }

    renderQuestion();
}

function showResults() {
    const total = quizState.questions.length * 10;
    const percentage = total > 0 ? Math.round((quizState.score / total) * 100) : 0;
    const passed = percentage >= 70;

    if (typeof analytics !== 'undefined') {
        analytics.trackQuizCompletion(percentage);
    }

    if (typeof notifications !== 'undefined') {
        notifications.notifyQuizCompleted(percentage, passed);
    }

    if (quizState.mode === 'basic') {
        const round = document.getElementById('quizRound');
        const end = document.getElementById('quizEnd');
        const score = document.getElementById('quizScore');
        const message = document.getElementById('quizMessage');

        if (round) {
            round.hidden = true;
            round.classList.add('hidden');
            round.style.display = 'none';
        }

        if (end) {
            end.hidden = false;
            end.classList.remove('hidden');
            end.style.display = 'block';
        }

        if (score) score.textContent = String(percentage);
        if (message) {
            message.textContent = passed
                ? 'Parabéns! Você concluiu o quiz com ótimo aproveitamento.'
                : 'Você concluiu o quiz. Tente novamente para melhorar sua pontuação.';
        }

        return;
    }

    const advancedContainer = document.getElementById('advancedQuizContainer');
    if (!advancedContainer) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'quiz-results';
    wrapper.style.cssText = 'background: var(--surface-strong, #fff); padding: 30px; border-radius: 18px; text-align: center;';

    const title = document.createElement('h2');
    title.textContent = 'Seus Resultados';

    const summary = document.createElement('p');
    summary.textContent = `Você fez ${percentage}% de aproveitamento (${quizState.score} de ${total} pontos).`;

    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'btn btn-primary';
    retry.textContent = 'Fazer Novamente';
    retry.addEventListener('click', restartQuiz);

    wrapper.append(title, summary);

    if (passed) {
        const certificateButton = document.createElement('button');
        certificateButton.type = 'button';
        certificateButton.className = 'btn btn-success';
        certificateButton.style.marginRight = '10px';
        certificateButton.textContent = 'Gerar Certificado';
        certificateButton.addEventListener('click', () => showCertificateModal(percentage));
        wrapper.appendChild(certificateButton);
    }

    wrapper.appendChild(retry);

    advancedContainer.replaceChildren(wrapper);
    advancedContainer.hidden = false;
    advancedContainer.style.display = 'block';
}

function restartQuiz() {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.answered = false;

    const intro = document.getElementById('quizIntro');
    const round = document.getElementById('quizRound');
    const end = document.getElementById('quizEnd');
    const selector = document.querySelector('.difficulty-selector');
    const advancedContainer = document.getElementById('advancedQuizContainer');

    if (intro) intro.style.display = 'block';
    if (round) {
        round.hidden = true;
        round.classList.add('hidden');
        round.style.display = 'none';
    }
    if (end) {
        end.hidden = true;
        end.classList.add('hidden');
        end.style.display = 'none';
    }
    if (selector) selector.style.display = 'block';
    if (advancedContainer) {
        advancedContainer.hidden = true;
        advancedContainer.style.display = 'none';
    }
}

function showCertificateModal(percentage) {
    const modal = document.createElement('div');
    modal.id = 'certificateModal';
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;z-index:9999;padding:16px;';

    const panel = document.createElement('div');
    panel.style.cssText = 'background:#fff;padding:28px;border-radius:18px;max-width:420px;width:100%;';

    const title = document.createElement('h2');
    title.textContent = 'Gerar Certificado';

    const copy = document.createElement('p');
    copy.textContent = 'Digite seu nome para gerar o certificado.';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'certificateName';
    input.placeholder = 'Seu nome completo';
    input.style.cssText = 'width:100%;min-height:46px;padding:0 12px;margin-bottom:16px;border:1px solid #bbb;border-radius:10px;';

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:10px;';

    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'btn btn-primary';
    confirm.textContent = 'Gerar';
    confirm.addEventListener('click', () => generateCertificatePDF(percentage));

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'btn btn-secondary';
    cancel.textContent = 'Cancelar';
    cancel.addEventListener('click', () => modal.remove());

    actions.append(confirm, cancel);
    panel.append(title, copy, input, actions);
    modal.appendChild(panel);
    document.body.appendChild(modal);
    input.focus();
}

function generateCertificatePDF(percentage) {
    const input = document.getElementById('certificateName');
    const name = input?.value.trim();
    if (!name) {
        alert('Digite seu nome para gerar o certificado.');
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0b4d91';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffc107';
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICADO DE CONCLUSAO', canvas.width / 2, 140);
    ctx.font = '24px Arial';
    ctx.fillText('SAEB Hub', canvas.width / 2, 190);
    ctx.font = '20px Arial';
    ctx.fillText('Certificamos que', canvas.width / 2, 290);
    ctx.fillStyle = '#ffc107';
    ctx.font = 'bold 38px Arial';
    ctx.fillText(name.toUpperCase(), canvas.width / 2, 360);
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`concluiu o quiz com ${percentage}% de aproveitamento.`, canvas.width / 2, 430);
    ctx.fillText(`Data: ${new Date().toLocaleDateString('pt-BR')}`, canvas.width / 2, 520);

    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `certificado_saeb_${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('certificateModal')?.remove();
}

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}
