document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateSGPA);
    }
});

function getGradePoint(marks) {
    if (marks >= 90 && marks <= 100) return 10;
    if (marks >= 80 && marks < 90) return 9;
    if (marks >= 70 && marks < 80) return 8;
    if (marks >= 60 && marks < 70) return 7;
    if (marks >= 50 && marks < 60) return 6;
    if (marks >= 40 && marks < 50) return 5;
    return 0; // Fail grade
}

function calculateSGPA() {
    // --- 1. VALIDATION STAGE ---
    const inputsToValidate = [
        { id: 'dbms-theory', name: 'Database Management System Theory' },
        { id: 'dbms-practical', name: 'Database Management System Practical' },
        { id: 'ai-theory', name: 'Artificial Intelligence Theory' },
        { id: 'dl-theory', name: 'Deep Learning Theory' },
        { id: 'dl-practical', name: 'Deep Learning Practical' },
        { id: 'image-processing-theory', name: 'Image Processing Theory' },
        { id: 'image-processing-practical', name: 'Image Processing Practical' },
        { id: 'nptel-theory', name: 'NPTEL Theory' }
    ];

    for (const input of inputsToValidate) {
        const element = document.getElementById(input.id);
        const valueStr = element.value;

        // Rule 1: Check if the field is empty
        if (valueStr.trim() === '') {
            alert(`The field for "${input.name}" is empty. Please enter the marks.`);
            return; // Stop the calculation
        }

        const valueNum = parseFloat(valueStr);

        // Rule 2: Check if marks are between 0 and 100
        if (isNaN(valueNum) || valueNum < 0 || valueNum > 100) {
            alert(`Invalid input for "${input.name}". Marks must be a number between 0 and 100.`);
            return; // Stop the calculation
        }
    }
    
    // --- 2. CALCULATION STAGE (only runs if validation passes) ---
    const credits = { dbms: 6, ai: 4, dl: 4, imageProcessing: 4, nptel: 2 };
    const totalCredits = 20;

    // Get validated values
    const dbmsTheory = parseFloat(document.getElementById('dbms-theory').value);
    const dbmsPractical = parseFloat(document.getElementById('dbms-practical').value);
    const aiTheory = parseFloat(document.getElementById('ai-theory').value);
    const dlTheory = parseFloat(document.getElementById('dl-theory').value);
    const dlPractical = parseFloat(document.getElementById('dl-practical').value);
    const ipTheory = parseFloat(document.getElementById('image-processing-theory').value);
    const ipPractical = parseFloat(document.getElementById('image-processing-practical').value);
    const nptelTheory = parseFloat(document.getElementById('nptel-theory').value);

    // Calculate final weighted marks
    const dbmsFinal = (dbmsTheory * 0.70) + (dbmsPractical * 0.30);
    const aiFinal = aiTheory;
    const dlFinal = (dlTheory * 0.75) + (dlPractical * 0.25);
    const imageProcessingFinal = (ipTheory * 0.75) + (ipPractical * 0.25);
    const nptelFinal = nptelTheory;
    
    // Get grade points
    const gradePoints = {
        dbms: getGradePoint(dbmsFinal),
        ai: getGradePoint(aiFinal),
        dl: getGradePoint(dlFinal),
        imageProcessing: getGradePoint(imageProcessingFinal),
        nptel: getGradePoint(nptelFinal)
    };

    // Calculate total weighted grade points
    const totalWeightedGradePoints = 
        (credits.dbms * gradePoints.dbms) +
        (credits.ai * gradePoints.ai) +
        (credits.dl * gradePoints.dl) +
        (credits.imageProcessing * gradePoints.imageProcessing) +
        (credits.nptel * gradePoints.nptel);

    // Calculate final SGPA
    const sgpa = totalWeightedGradePoints / totalCredits;

    // --- 3. DISPLAY RESULT ---
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your Final SGPA is: <strong>${sgpa.toFixed(2)}</strong>`;
    resultDiv.style.display = 'block';
}