class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase()
    const arr=["hello" ,"hi","good morning" ,"good after noon","good night"];
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (lowerCaseMessage.includes(element)) {
        return this.actionProvider.greet()
      }
      
    }
    this.actionProvider.cannot();
  }
}

export default MessageParser