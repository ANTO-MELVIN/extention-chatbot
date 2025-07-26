const chatlog = document.getElementById('chatlog');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Show user message on chatlog
  chatlog.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  input.value = '';
  chatlog.scrollTop = chatlog.scrollHeight;

  try {
    // Replace this URL with your chatbot's API endpoint
    const response = await fetch('https://your-chatbot-api.example.com/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' /*, 'Authorization': 'Bearer YOUR_API_KEY' */ },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    // Show bot response (adjust field name depending on your API's response)
    const botReply = data.reply || data.response || 'Sorry, no response.';
    chatlog.innerHTML += `<div><strong>Bot:</strong> ${botReply}</div>`;
    chatlog.scrollTop = chatlog.scrollHeight;
  } catch (error) {
    chatlog.innerHTML += `<div><strong>Bot:</strong> Error connecting to chatbot.</div>`;
  }
});

// Optional: allow press Enter to send message
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});
