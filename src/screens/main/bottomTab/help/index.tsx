import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../assets';
import { botResponses } from '../../../../assets/JSON/Chat';
import { Container, HeaderView } from '../../../../components';
import TypingAnimation from '../../../../components/typingAnimation';

interface Message {
  id: string;
  text: string | undefined;
  fromUser: boolean;
  isTyping?: boolean;
  type?: string | undefined;
  choices?: string[] | undefined;
}

export function HelpScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [hasWrong, setHasWrong] = useState<number>(0);

  const handleMessageSend = () => {
    if (inputText.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: inputText, fromUser: true, isTyping: false }]);
      setInputText('');
      scrollToBottom();
      setTimeout(() => {
        const selectedChoice = getBotReply(inputText);
        if (selectedChoice === "I'm sorry, I don't understand. Could you please repeat or ask another question?") {
          setHasWrong(prev => prev + 1);
        }
        if (selectedChoice) {
          setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: selectedChoice?.botReply ?? selectedChoice, fromUser: false, isTyping: true, type: selectedChoice?.type, choices: selectedChoice?.choices ?? [] }]);
          scrollToBottom();
          setTimeout(() => {
            setMessages(prevMessages => {
              const updatedMessages = prevMessages.map(message => {
                if (!message.fromUser && message.isTyping) {
                  return { ...message, isTyping: false };
                }
                return message;
              });

              return updatedMessages;
            });
          }, 1000);
        }
      }, 1000);
    }
  };

  const onClickAnswer = (choice: string) => {
    setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: choice, fromUser: true, isTyping: false }]);
    setInputText('');
    scrollToBottom();
    setTimeout(() => {
      const selectedChoice = getBotReply(choice);
      if (selectedChoice) {
        setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: selectedChoice?.botReply ?? selectedChoice, fromUser: false, isTyping: true, type: selectedChoice?.type, choices: selectedChoice?.choices }]);
        scrollToBottom();
        setTimeout(() => {
          setMessages(prevMessages => {
            const updatedMessages = prevMessages.map(message => {
              if (!message.fromUser && message.isTyping) {
                return { ...message, isTyping: false };
              }
              return message;
            });
            return updatedMessages;
          });
        }, 1000);
      }
    }, 1000);
  };

  const getBotReply = (message: string): any => {
    const selectedChoice = botResponses.choices.find(choice => choice.text.toLowerCase() === message.toLowerCase());
    if (selectedChoice) {
      return selectedChoice;
    } else {
      return "I'm sorry, I don't understand. Could you please repeat or ask another question?";
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    return (
      <View style={[_styles.row, { alignSelf: item.fromUser ? 'flex-end' : 'flex-start' }]}>
        {!item.fromUser && <Image source={require('../../../../assets/icons/ic_bot.png')} style={_styles.profile} />}
        <View
          style={[
            _styles.messageContainer,
            {
              backgroundColor: item.fromUser ? Colors.ACCENT : Colors.PRIMARY,
              borderTopLeftRadius: item.fromUser ? 10 : 1,
              borderTopRightRadius: item.fromUser ? 1 : 8,
            },
          ]}>
          {item.isTyping ? <TypingAnimation /> : <Text style={item.fromUser ? _styles.userMessageText : _styles.botMessageText}>{item.text}</Text>}
        </View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={_styles.headerContainer}>
        <Text style={_styles.buttonMessageText}>Conversation with EdumaQ Bot</Text>
      </View>
    );
  };

  const renderChoices = () => {
    const lastMessage = messages[messages.length - 1];

    if ((lastMessage && lastMessage?.fromUser) || (!lastMessage?.fromUser && lastMessage?.isTyping)) {
      return null;
    }
    if (lastMessage?.type === 'choice') {
      return (
        <View style={_styles.row}>
          {lastMessage?.choices?.map((item, index) => (
            <TouchableOpacity key={index} style={_styles.choiceButton} activeOpacity={0.7} onPress={() => onClickAnswer(item)}>
              <Text style={_styles.buttonMessageText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    if (lastMessage?.type === 'button') {
      return (
        <View>
          {lastMessage?.choices?.map((item, index) => (
            <TouchableOpacity key={index} style={_styles.detailButton} activeOpacity={0.7} onPress={() => onClickAnswer(item)}>
              <Text style={_styles.buttonMessageText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  const scrollToBottom = () => {
    flatListRef?.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    const firstMessage = botResponses.choices.find(choice => choice.isFirst);
    if (messages.length === 0) {
      setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: firstMessage?.botReply, fromUser: false, isTyping: true, type: firstMessage?.type, choices: firstMessage?.choices }]);
      setTimeout(() => {
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.map(message => {
            if (!message.fromUser && message.isTyping) {
              return { ...message, isTyping: false };
            }
            return message;
          });

          return updatedMessages;
        });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToBottom);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', scrollToBottom);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const firstMessage = botResponses.choices.find(choice => choice.isFirst);
    if (hasWrong === 2 && lastMessage?.isTyping === false) {
      setHasWrong(0);
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), text: firstMessage?.botReply, fromUser: false, isTyping: true, type: firstMessage?.type, choices: firstMessage?.choices }]);
        setTimeout(() => {
          setMessages(prevMessages => {
            const updatedMessages = prevMessages.map(message => {
              if (!message.fromUser && message.isTyping) {
                return { ...message, isTyping: false };
              }
              return message;
            });

            return updatedMessages;
          });
        }, 1000);
      }, 1500);
    }
  }, [hasWrong, messages]);

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView isDrawer isSearch isNotification />
        {renderHeader()}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item?.id}
          contentContainerStyle={_styles.messagesContainer}
          onContentSizeChange={scrollToBottom}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderChoices()}
        />

        <View style={_styles.inputContainer}>
          <TextInput style={_styles.inputText} placeholder="Write your message here" value={inputText} onChangeText={setInputText} onSubmitEditing={handleMessageSend} blurOnSubmit={false} />
          <TouchableOpacity activeOpacity={0.7} style={_styles.proceedBtn} onPress={handleMessageSend}>
            <Text style={_styles.proceedBtnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.ACCENT,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    maxWidth: '80%',
  },
  headerContainer: {
    backgroundColor: '#F6F6F9',
    paddingHorizontal: 12,
    paddingVertical: 16,
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
  },
  messageContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    marginLeft: 8,
    maxWidth: '80%',
  },
  profile: {
    width: 28,
    height: 28,
  },
  userMessageText: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.WHITE,
    lineHeight: 16,
  },
  botMessageText: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.WHITE,
    lineHeight: 16,
  },
  buttonMessageText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.PRIMARY,
    lineHeight: 16,
  },
  choiceButton: {
    alignSelf: 'baseline',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  detailButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 6,
    borderRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  inputText: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  proceedBtn: {
    backgroundColor: Colors.ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  proceedBtnText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
});
