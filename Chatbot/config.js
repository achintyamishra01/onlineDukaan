import { createChatBotMessage } from 'react-chatbot-kit';

const config = { 
  botName: "LearningBot",
  initialMessages: [createChatBotMessage("Hi, I'm here to help ? i can help you with ")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#667eea",
    },
    chatButton: {
      backgroundColor: "#667eea",
    },
  },
}

export default config