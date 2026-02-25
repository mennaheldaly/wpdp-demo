// Assessment functionality
const questionCards = document.querySelectorAll('.question-card');
const optionButtons = document.querySelectorAll('.option-btn');
const resultSection = document.getElementById('resultSection');
const resultStage = document.getElementById('resultStage');

// Store answers
const answers = {};

// Option button click handlers
optionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const questionCard = this.closest('.question-card');
        const questionIndex = questionCard.getAttribute('data-question');
        const value = this.getAttribute('data-value');
        
        // Remove selected state from other options in this question
        questionCard.querySelectorAll('.option-btn').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected state to clicked option
        this.classList.add('selected');
        
        // Store answer
        answers[questionIndex] = value;
        
        // Check if all questions are answered
        checkAllAnswered();
    });
});

function checkAllAnswered() {
    const allAnswered = questionCards.length === Object.keys(answers).length;
    
    if (allAnswered) {
        // Calculate result stage (simplified logic - you can enhance this)
        const stage = calculateStage(answers);
        resultStage.textContent = `STAGE ${stage.number}: ${stage.name}`;
        resultSection.style.display = 'block';
        
        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function calculateStage(answers) {
    // Simplified stage calculation logic
    // You can enhance this with more sophisticated scoring
    
    const age = answers['0'];
    const rally = answers['1'];
    const contact = answers['2'];
    const serve = answers['3'];
    const movement = answers['4'];
    const tactical = answers['5'];
    
    // Basic scoring logic (you can refine this)
    let score = 0;
    
    // Age scoring
    if (age === 'under-6' || age === '6-8') score += 1;
    else if (age === '9-10') score += 2;
    else if (age === '11-13') score += 3;
    else if (age === '14-16') score += 4;
    else score += 5;
    
    // Rally scoring
    if (rally === '0-2') score += 1;
    else if (rally === '3-6') score += 2;
    else if (rally === '7-12') score += 3;
    else if (rally === '13-20') score += 4;
    else score += 5;
    
    // Contact scoring
    if (contact === 'rarely-clean') score += 1;
    else if (contact === 'sometimes-clean') score += 2;
    else if (contact === 'mostly-clean') score += 3;
    else if (contact === 'consistent') score += 4;
    else score += 5;
    
    // Serve scoring
    if (serve === 'underhand') score += 1;
    else if (serve === 'basic-overhand') score += 2;
    else if (serve === 'can-start') score += 3;
    else if (serve === 'can-vary') score += 4;
    else score += 5;
    
    // Movement scoring
    if (movement === 'basic-stiff') score += 1;
    else if (movement === 'early-patterns') score += 2;
    else if (movement === 'recovers') score += 3;
    else if (movement === 'efficient') score += 4;
    else score += 5;
    
    // Tactical scoring
    if (tactical === 'none') score += 1;
    else if (tactical === 'simple-aiming') score += 2;
    else if (tactical === 'basic-patterns') score += 3;
    else if (tactical === 'intentional') score += 4;
    else score += 5;
    
    // Determine stage based on total score
    const avgScore = score / 6;
    
    if (avgScore <= 1.5) {
        return { number: 1, name: 'ACTIVE START' };
    } else if (avgScore <= 2.5) {
        return { number: 2, name: 'FUNDAMENTALS' };
    } else if (avgScore <= 3.5) {
        return { number: 3, name: 'DEVELOPMENT' };
    } else if (avgScore <= 4.5) {
        return { number: 4, name: 'CONSOLIDATION' };
    } else {
        return { number: 5, name: 'PERFORMANCE' };
    }
}

// Result button handlers
document.getElementById('viewResourcesBtn').addEventListener('click', function() {
    const stageNumber = resultStage.textContent.match(/STAGE (\d+)/)[1];
    // TODO: Navigate to stage coaching resources
    alert(`Navigating to Stage ${stageNumber} coaching resources...`);
});

document.getElementById('reviewAnswersBtn').addEventListener('click', function() {
    resultSection.style.display = 'none';
    // Scroll to first question
    questionCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

