<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (enter to add):</label>
      <input type="text"
             name="new-message"
             id="new-message"
             v-model="newMessage">
      <p class="red-text"
         v-if="feedback">{{this.feedback}}</p>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'NewMessage',
    props: ['name', 'chatroomId'],
    data() {
      return {
        newMessage: '',
        feedback: ''
      }
    },
    methods: {
      addMessage() {
        if (this.newMessage) {
          db.collection('messages')
            .add({
              content: this.newMessage,
              timestamp: Date.now(),
              name: this.name,
              chatroomId: this.chatroomId
            })
            .catch(error => console.error(error));
          this.feedback = '';
          this.newMessage = '';
        } else {
          this.feedback = 'You must enter a message in order to send one'
        }
      }
    }
  }
</script>
