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
      const apiKey = 'Add Your API KEY';
      const baseURL = 'https://api.aimlapi.com/v1/chat/completions';

      // Modified system message to encourage code formatting
      const body = {
          model: 'mistralai/Mistral-7B-Instruct-v0.2',
          messages: [
              { 
                  role: 'system', 
                  content: 'When providing code, format it in triple backticks with language specification. Be concise and focus on best practices.'
              },
              { role: 'user', content: query }
          ],
          temperature: 0.5, // Lower temperature for more precise code
          max_tokens: 300   // Allow longer responses for code
      };

      const response = await fetch(baseURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data)
      const responseText = data.choices[0].message.content.trim();
      responseDiv.innerHTML = formatCodeBlocks(responseText);
      addCopyButtons();
  } catch (error) {
      responseDiv.textContent = `Error: ${error.message}`;
  }
};

// Format code blocks with syntax highlighting
const formatCodeBlocks = (text) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]+?)```/g;
  return text.replace(codeBlockRegex, (match, lang, code) => {
      return `
          <div class="code-block">
              <div class="code-header">
                  <span class="language">${lang || 'code'}</span>
                  <button class="copy-button">📋 Copy</button>
              </div>
              <pre><code class="${lang}">${hljs.highlightAuto(code.trim()).value}</code></pre>
          </div>
      `;
  });
};

// Add copy functionality
const addCopyButtons = () => {
  document.querySelectorAll('.copy-button').forEach(button => {
      button.addEventListener('click', () => {
          const code = button.parentElement.nextElementSibling.textContent;
          navigator.clipboard.writeText(code).then(() => {
              button.textContent = 'Copied!';
              setTimeout(() => button.textContent = '📋 Copy', 2000);
          });
      });
  });
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
