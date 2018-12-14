<template>
  <div class="chat container">
    <h2 class="center-align teal-text"
        v-if="chatroom">{{chatroom.name}}</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages"
            v-chat-scroll
            v-if="messages.length">
          <li v-for="message in messages"
              :key="message.id">
            <i class="material-icons delete"
               v-if="message.name === name"
               @click="deleteMessage(message.id)">delete</i>
            <span class="teal-text">{{message.name}}</span>
            <span class="grey-text text-darken-3">{{message.content}}</span>
            <span class="grey-text time">{{message.timestamp}}</span>
          </li>
        </ul>
        <p v-if="!messages.length"
           class="center-align no-messages">
          Start typing to send a message
        </p>
      </div>
      <div class="card-action">
        <NewMessage :name="this.name"
                    :chatroomId="this.chatroomId"/>
      </div>
    </div>
    <p>
      Invite a friend to this chatroom by sharing the following link:
    </p>
    <SharingLink :chatroomId="chatroomId"/>
    <router-link :to="{name: 'Welcome'}">
      <button class="btn red">
        Back to welcome
      </button>
    </router-link>
  </div>
</template>

<script>
  import NewMessage from '@/components/NewMessage'
  import SharingLink from '@/components/SharingLink'
  import db from '@/firebase/init'
  import moment from 'moment'

  export default {
    name: 'Chat',
    components: {
      NewMessage,
      SharingLink
    },
    props: ['name', 'chatroomId'],
    data() {
      return {
        chatroom: null,
        messages: [],
        sharingLink: ''
      }
    },
    methods: {
      copyLinkToClipboard() {

      },
      deleteMessage(id) {
        db.collection('messages')
          .doc(id)
          .delete()
          .then(() => this.messages = this.messages.filter(message => message.id !== id))
          .catch(error => console.error(error));
      }
    },
    created() {
      db.collection('chatroom')
        .doc(this.chatroomId)
        .get()
        .then(chatroom => {
          this.chatroom = {
            id: this.chatroomId,
            ...chatroom.data()
          };
          this.sharingLink = `${window.location.origin}/?chatroomId=${this.chatroom.id}`;
        })
        .catch(error => console.error(error));
      let ref = db.collection('messages')
        .where('chatroomId', '==', this.chatroomId)
        .orderBy('timestamp');
      ref.onSnapshot(snapshot => {
        snapshot.docChanges()
          .filter(change => change.type === 'added')
          .map(change => change.doc)
          .map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              timestamp: moment(data.timestamp).format('lll'),
              name: data.name,
              content: data.content
            }
          })
          .forEach(message => this.messages.push(message));
      });
    }
  }
</script>

<style>
  .chat h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
  }

  .chat li span {
    font-size: 1.4em;
  }

  .chat .time {
    display: block;
    font-size: .8em;
  }

  .chat .messages {
    max-height: 300px;
    overflow: auto;
  }

  .chat .messages::-webkit-scrollbar {
    width: 3px;
  }

  .chat .messages::-webkit-scrollbar-track {
    background: #ddd;
  }

  .chat .messages::-webkit-scrollbar-thumb {
    background: #aaa;
  }

  .chat .delete {
    color: #ccc;
    font-size: 1.2em;
    cursor: pointer;
  }

  .chat .no-messages {
    color: #aaa;
  }
</style>
