// quiz.js
function initQuiz() {
    var startButton = document.getElementById('startQuizButton');
    var restartButton = document.getElementById('restartQuizButton');
    var nextButton = document.getElementById('nextQuestionButton');
    var quizIntro = document.getElementById('quizIntro');
    var quizRound = document.getElementById('quizRound');
    var quizQuestionText = document.getElementById('quizQuestionText');
    var quizOptions = document.getElementById('quizOptions');
    var quizFeedback = document.getElementById('quizFeedback');
    var quizCurrent = document.getElementById('quizCurrent');
    var quizTotal = document.getElementById('quizTotal');
    var quizScore = document.getElementById('quizScore');

    var currentQuestion = 0;
    var score = 0;
    var answered = false;

    function showElement(el) {
        el.classList.remove('hidden');
    }

    function hideElement(el) {
        el.classList.add('hidden');
    }

    function renderQuestion() {
        var data = saebQuizQuestions[currentQuestion];
        quizQuestionText.textContent = data.question;
        quizOptions.innerHTML = '';
        quizFeedback.textContent = '';
        hideElement(quizFeedback);
        nextButton.disabled = true;
        answered = false;

        data.options.forEach(function(option, index) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', function() {
                if (answered) return;
                answered = true;
                var correct = index === data.correct;
                if (correct) {
                    score += 10;
                    button.classList.add('correct');
                    quizFeedback.textContent = 'Correto! ' + data.explanation;
                } else {
                    button.classList.add('incorrect');
                    quizFeedback.textContent = 'Errado. ' + data.explanation;
                }
                quizScore.textContent = score;
                document.querySelectorAll('.quiz-option').forEach(function(opt, optIndex) {
                    opt.disabled = true;
                    if (optIndex === data.correct) {
                        opt.classList.add('correct');
                    }
                });
                showElement(quizFeedback);
                nextButton.disabled = false;
                if (currentQuestion === saebQuizQuestions.length - 1) {
                    nextButton.textContent = 'Ver resultado';
                } else {
                    nextButton.textContent = 'Próxima';
                }
            });
            quizOptions.appendChild(button);
        });

        quizCurrent.textContent = currentQuestion + 1;
        quizTotal.textContent = saebQuizQuestions.length;
    }

    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        quizScore.textContent = score;
        hideElement(quizIntro);
        showElement(quizRound);
        hideElement(restartButton);
        renderQuestion();
    }

    function finishQuiz() {
        quizQuestionText.textContent = 'Fim do jogo! Você marcou ' + score + ' pontos.';
        quizOptions.innerHTML = '';
        quizFeedback.textContent = 'Obrigado por jogar. Clique em jogar novamente para tentar melhorar sua pontuação.';
        showElement(quizFeedback);
        nextButton.disabled = true;
        hideElement(nextButton);
        showElement(restartButton);
    }

    startButton.addEventListener('click', function() {
        startQuiz();
        showElement(nextButton);
    });

    nextButton.addEventListener('click', function() {
        if (!answered) return;
        currentQuestion += 1;
        if (currentQuestion >= saebQuizQuestions.length) {
            finishQuiz();
            return;
        }
        renderQuestion();
    });

    restartButton.addEventListener('click', function() {
        startQuiz();
        showElement(nextButton);
    });
}
