import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

const ChatPage = ({ route, navigation }) => {
    const [messages, setMessages] = useState([])
    const { token, id, surname, name, userId, role } = route.params;
    const ldate = ''
    const [chatId, setChatId] = useState('')

    const s = require('../styles/styles');

    const [count, setCount] = useState(0);

    useEffect(() => {
        global.userId = userId
        createChat()
        getMessages()
        setTimeout(() => {
            setCount(count + 1);
        }, 1000);
    }, [count])

    const createChat = async () => {
        await fetch(global.URL + 'chat/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                user1: userId,
                user2: id,
                createdDate: ldate
            }),
        }).then(response => response.json())
            .then(data => {
                setChatId(data.id)
            })
            .catch(error => console.error(error));
    }

    const getMessages = async () => {
        await fetch(global.URL + `message/messages/${chatId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => {
                const formattedMessages = data.map((message) => ({ // format messages to fit GiftedChat data structure
                    _id: message.id,
                    text: message.message,
                    createdAt: new Date(message.timestamp),
                    user: {
                        _id: message.senderId,
                        name: `${surname} ${name}`,
                        isCurrentUser: message.senderId === userId
                    },
                }));
                formattedMessages.sort((a, b) => b.createdAt - a.createdAt); // sort messages by createdAt property
                setMessages(formattedMessages);
            })
            .catch(error => console.error(error));
    }

    const onSend = async (newMessages = []) => {
        setMessages(GiftedChat.prepend(messages, newMessages));

        await fetch(global.URL + `message/create`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                chatId: chatId,
                senderId: userId,
                recipientId: id,
                timestamp: ldate,
                message: newMessages[0].text,
            }),
        }).then(response => response.json())
            .then(data => {})
            .catch(error => console.error(error));
    }

    const renderBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#fd5e53',
                    },
                    left: {
                        backgroundColor: 'gainsboro',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerChat}>
                <TouchableOpacity onPress={() => navigation.navigate("ChatScreen", { token: token, userId: userId, role: role })}>
                    <Text style={styles.headerText}>{'\u25C0'} {surname} {name}</Text>
                </TouchableOpacity>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{ _id: userId }}
            renderBubble={renderBubble}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerChat: {
        backgroundColor: '#E3241D',
        height: 80,
        width: '100%',
        justifyContent: 'flex-end',
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 40,
        marginBottom: 20,
        fontWeight: 'bold',
    }
})

export default ChatPage