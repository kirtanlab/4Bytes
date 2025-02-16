// Replace with your actual API key
const API_KEY = '';

// The endpoint for the Gemini API
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// DOM Elements
const inputPrompt = document.getElementById('inputPrompt');
const generateButton = document.getElementById('generateButton');
const outputResponse = document.getElementById('outputResponse');

// Function to send a prompt to the Gemini API
async function getRoadmap(prompt) {
    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error fetching roadmap:', error);
        return "An error occurred while generating the roadmap. Please try again.";
    }
}

// Event listener for the Generate button
generateButton.addEventListener('click', async () => {
    const prompt = inputPrompt.value.trim();
    if (!prompt) {
        alert("Please enter a learning goal.");
        return;
    }

    outputResponse.textContent = "Generating roadmap...";
    const roadmap = await getRoadmap(prompt);
    outputResponse.textContent = roadmap;
});