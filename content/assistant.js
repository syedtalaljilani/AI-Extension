const voiceButton = document.getElementById('voiceButton');
const responseDiv = document.getElementById('response');
const loadingDots = document.querySelector('.loading-dots');


async function handleVoiceCommand() {
    try {
        loadingDots.style.display = 'flex';
        responseDiv.style.display = 'none';
      

        loadingDots.style.display = 'none';
        responseDiv.style.display = 'block';
        
    } catch (error) {
        loadingDots.style.display = 'none';
        responseDiv.textContent = "Error processing request";
        responseDiv.style.display = 'block';
    }
}

voiceButton.addEventListener('click', handleVoiceCommand);
// Initialize Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false; // Only process final results
recognition.continuous = false; // Stop after each recognition

// AI Assistant Logic using Llama (replace with your Llama API endpoint)
const performAIQuery = async (query) => {
  try {
    responseDiv.textContent = `Thinking...`;

   const apiKey = '84ed774d3acd4909b2b5b7fb59c9a7f6'; // Replace with your AIML API key
    const baseURL = 'https://api.aimlapi.com/v1/chat/completions'; // AIML API endpoint

    // Request body for AIML API
    const body = {
      model: 'mistralai/Mistral-7B-Instruct-v0.2', // The model you want to use (change if needed)
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' }, // Set system message for context
        { role: 'user', content: query } // User query
      ],
      temperature: 0.7, // Control the creativity of the response
      max_tokens: 100, // Limit the length of the response
    };

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // Pass the API key in the Authorization header
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch AI response.');
    }

    const data = await response.json();
    responseDiv.textContent = `AI says: "${data.choices[0].message.content.trim() || 'I could not understand you.'}"`;
  } catch (error) {
    responseDiv.textContent = `Error: Unable to process AI request. ${error.message}`;
  }
};

// Function to open a website in a new tab
const openWebsite = (url) => {
  window.open(url, '_blank');
};

// Function to check if the input is a valid URL
const isValidUrl = (str) => {
  try {
    new URL(str); // Try to create a new URL object
    return true; // If no error, it's a valid URL
  } catch (_) {
    return false; // If error, it's not a valid URL
  }
};

// Function to open a YouTube search for the song
const playSongOnYouTube = (songName) => {
  const youtubeSearchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`;
  window.open(youtubeSearchURL, '_blank');
  responseDiv.textContent = `Searching YouTube for "${songName}"...`;
};

// Start Listening for Voice Commands
voiceButton.addEventListener('click', () => {
  responseDiv.textContent = 'Listening...';
  recognition.start();
});


// Process Voice Commands
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase().trim();
  responseDiv.textContent = `You said: "${transcript}"`;

  if (transcript.startsWith('me')) {
    const query = transcript.replace('me', '').trim();
    if (query) {
      performAIQuery(query);
    } else {
      responseDiv.textContent = 'Please ask me something.';
    }
  } else if (transcript.startsWith('open')) {
    const input = transcript.replace('open', '').trim();
    if (isValidUrl(input)) {
      openWebsite(input);
      responseDiv.textContent = `Opening the website: ${input}`;
    } else {
      openWebsite(`https://www.${input}.com`);
      responseDiv.textContent = `Opening ${input}...`;
    }
  } else if (transcript.startsWith('google')) {
    const searchQuery = transcript.replace('google', '').trim();
    if (searchQuery) {
      openWebsite(`https://www.google.com/search?q=${searchQuery}`);
      responseDiv.textContent = `Searching Google for: "${searchQuery}"...`;
    } else {
      responseDiv.textContent = 'Please provide a search query for Google.';
    }
  } else if (transcript.startsWith('youtube')) {
    const songName = transcript.replace('youtube', '').trim();
    if (songName) {
      playSongOnYouTube(songName);
    } else {
      responseDiv.textContent = 'Please provide the name of the song you want to play.';
    }
  } else {
    responseDiv.textContent = 'I didn\'t catch that. Please say "me" followed by your question, "open" followed by the website URL or name, "google" followed by your search query, or "youtube" followed by the song name.';
  }
};

// Handle Errors
recognition.onerror = (event) => {
  responseDiv.textContent = `Error: ${event.error}`;
};
