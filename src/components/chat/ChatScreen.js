/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChatItem from './ChatItem';
import { initChatClient } from '../../api/chat';

const styles = {
  textField: { width: '100%', borderWidth: 0, borderColor: 'transparent' },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: 'auto', height: '70vh' },
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: '#475a9e' },
  sendIcon: { color: 'white' },
  mainGrid: { paddingTop: 100, borderWidth: 1 },
};

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      messages: [],
      loading: false,
      channel: null,
    };

    this._isMounted = false;
    this.messagesEndRef = React.createRef();
    // this.scrollDiv = React.createRef();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  componentDidMount = async () => {
    this._isMounted = true;
    const { location } = this.props;
    const { state } = location || {};
    const {
      email,
      room,
      owner: { _id },
      userToJoin,
    } = state || {};

    if (!email || !room) {
      this._isMounted = false;
      this.props.history.replace('/');
    }

    if (this._isMounted) {
      this.setState({ loading: true });

      const client = await initChatClient(email);
      // const clientOwner = await initChatClient(_id);

      client.on('channelJoined', async channel => {
        // getting list of all messages since this is an existing channel
        if (channel.channelState.friendlyName === room) {
          const messages = await channel.getMessages();
          this.setState({ messages: messages.items || [] });
          this.scrollToBottom();
        }
      });
      try {
        const channel = await client.getChannelByUniqueName(room);
        await this.joinChannel(channel);
        // await channel.invite(_id);
        console.log('Canal encontrado:', channel);
        this.setState({ channel, loading: false });
      } catch {
        try {
          const channel = await client.createChannel({
            uniqueName: room,
            friendlyName: room,
          });
          await this.joinChannel(channel);
          if (userToJoin) {
            const clientToJoin = await initChatClient(userToJoin);
            const channelToJoin = await clientToJoin.getChannelByUniqueName(
              room,
            );
            await channelToJoin.join();
            console.log('Propietario unido al canal');
          }
          console.log('Canal creado:', channel);
          this.setState({ channel, loading: false });
        } catch {
          throw new Error('unable to create channel, please reload this page');
        }
      }
    }
  };

  joinChannel = async channel => {
    if (channel.channelState.status !== 'joined') {
      await channel.join();
    }
    channel.on('messageAdded', this.handleMessageAdded);
  };

  handleMessageAdded = message => {
    const { messages } = this.state;
    this.setState({
      messages: messages ? [...messages, message] : [message],
    });
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  sendMessage = () => {
    const { text, channel } = this.state;
    if (text && String(text).trim()) {
      this.setState({ loading: true });
      if (channel) channel.sendMessage(text);
      this.setState({ text: '', loading: false });
    }
  };

  previousPage = () => {
    this.props.history.goBack();
  };

  render() {
    const { loading, text, messages, channel } = this.state;
    const { location } = this.props;
    const { state } = location || {};
    const {
      email,
      adName,
      owner: { username },
    } = state || {};

    return (
      <Container component="main" maxWidth="md">
        <Backdrop open={loading} style={{ zIndex: 99999 }}>
          <CircularProgress style={{ color: 'white' }} />
        </Backdrop>
        <AppBar elevation={10}>
          <Toolbar>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                {`Advert: ${adName}, Owner: ${username}`}
              </Typography>
              <IconButton onClick={this.previousPage}>
                <ExitToAppIcon style={{ color: 'white' }} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Grid container direction="column" style={styles.mainGrid}>
          <Grid item style={styles.gridItemChatList} ref={this.scrollDiv}>
            <List dense>
              {messages &&
                messages.map(message => (
                  <ChatItem
                    key={message.index}
                    message={message}
                    email={email}
                  />
                ))}
            </List>
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={this.messagesEndRef}
            />
          </Grid>
          <Grid item style={styles.gridItemMessage}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item style={styles.textFieldContainer}>
                <TextField
                  required
                  style={styles.textField}
                  placeholder="Enter message"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={text}
                  disabled={!channel}
                  onChange={event =>
                    this.setState({ text: event.target.value })
                  }
                />
              </Grid>
              <Grid item>
                <IconButton
                  style={styles.sendButton}
                  onClick={this.sendMessage}
                  disabled={!channel || !text}
                >
                  <Send style={styles.sendIcon} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ChatScreen;
