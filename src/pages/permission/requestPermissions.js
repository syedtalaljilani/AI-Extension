// requestPermission.js

/**
 * Requests microphone permission from the user.
 * @returns {Promise<void>} A Promise that resolves when permission is granted, or rejects with an error.
 */
async function getUserPermission() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // Permission granted, stop the stream to prevent recording indicator
          console.log("Microphone access granted");
  
          // Stop the audio tracks to avoid the recording indicator
          stream.getTracks().forEach((track) => track.stop());
  
          resolve();
        })
        .catch((error) => {
          console.error("Error requesting microphone permission:", error);
          reject(error);
        });
    });
  }
  
  // Request the permission when the iframe is loaded
  getUserPermission()
    .then(() => console.log("Microphone permission granted"))
    .catch((error) => console.error("Failed to obtain microphone permission:", error));
  