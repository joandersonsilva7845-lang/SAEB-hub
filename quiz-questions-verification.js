// quiz-questions-verification.js

// Data structures for question sets by difficulty level
const quizData = {
    easy: [],
    medium: [],
    hard: []
};

// Function to add questions, ensuring unique questions for each difficulty level
function addQuestion(difficulty, question, answer, explanation) {
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        throw new Error('Invalid difficulty level');
    }
    if (quizData[difficulty].some(q => q.question === question)) {
        throw new Error('Duplicate question found');
    }
    quizData[difficulty].push({ question, answer, explanation });
}

// Function to validate explanations
function validateExplanations() {
    return quizData.easy.every(q => q.explanation.length > 0) &&
           quizData.medium.every(q => q.explanation.length > 0) &&
           quizData.hard.every(q => q.explanation.length > 0);
}

// Function to log statistics about question coverage
function logStatistics() {
    console.log(`Easy questions: ${quizData.easy.length}`);
    console.log(`Medium questions: ${quizData.medium.length}`);
    console.log(`Hard questions: ${quizData.hard.length}`);
}

// Function to export questions
function exportQuestions() {
    return JSON.stringify(quizData);
}

// Add questions with variety covering different SAEB topics
// Easy Questions
addQuestion('easy', 'What is the methodology used in SAEB?', 'Answer 1', 'This explanation should detail the methodology.');
// Add more easy questions here...

// Medium Questions
addQuestion('medium', 'What results does SAEB produce?', 'Answer 2', 'This explanation should describe the results.');
// Add more medium questions here...

// Hard Questions
addQuestion('hard', 'How are SAEB policies applied?', 'Answer 3', 'This explanation should cover the application of policies.');
// Add more hard questions here...

// Validate explanations
if (!validateExplanations()) {
    console.error('There are questions with invalid explanations.');
}

// Log statistics
logStatistics();

// Export questions
const exportedData = exportQuestions();
console.log(exportedData);