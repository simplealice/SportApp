import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = () => {
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    fetch(URL + 'chat/messages/{chatId}')
      .then(response => response.json())
      .then(result => setMessages(result))
      .catch(error => console.error(error))
  }, [])

  const onSend = newMessages => {
    setMessages(GiftedChat.append(messages, newMessages))
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ChatScreen