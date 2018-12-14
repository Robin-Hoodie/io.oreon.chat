<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <form novalidate
              @submit.prevent="enterChatroom">
          <div class="field">
            <label for="name">Enter your name</label>
            <input type="text"
                   name="name"
                   id="name"
                   v-model="name">
          </div>
          <div class="field">
            <label for="chatroomId">Enter chatroom id</label>
            <input type="text"
                   name="chatroomId"
                   id="chatroomId"
                   v-model="chatroomId">
          </div>
          <p class="red-text"
             v-if="feedback ">{{feedback}}</p>
          <button class="btn teal"
                  type="submit">Enter chat room
          </button>
        </form>
        <button class="btn teal"
                @click="enterRandomChatroom">Enter random chat room
        </button>
      </div>
    </div>
    <div class="center-align">
      <router-link :to="{name: 'CreateChat', query: {
       owner: this.name
      }}">
        <button class="btn teal">
          Create chat room
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'Welcome',
    data() {
      return {
        name: '',
        feedback: '',
        chatroomId: this.$route.query.chatroomId || '',
        chatroomIds: []
      }
    },
    methods: {
      enterChatroom() {
        if (this.name && this.chatroomId) {
          this.$router.push({
            name: 'Chat', params: {
              name: this.name,
              chatroomId: this.chatroomId
            }
          });
        } else {
          this.feedback = 'You need to enter a name and chatroom id to start chatting. You can also opt to enter a random chat room by clicking the button down below';
        }
      },
      enterRandomChatroom() {
        if (this.name) {
          this.chatroomId = this.chatroomIds[Math.floor(Math.random() * this.chatroomIds.length)];
          this.$router.push({
            name: 'Chat', params: {
              name: this.name,
              chatroomId: this.chatroomId
            }
          });
        } else {
          this.feedback = 'You need to enter a name to start chatting';
        }
      }
    },
    created() {
      db.collection('chatroom')
        .get()
        .then(snapshot => snapshot.forEach(doc => this.chatroomIds.push(doc.id)));
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === 'Chat') {
        db.collection('chatroom')
          .doc(this.chatroomId)
          .get()
          .then(doc => {
            if (doc.exists) {
              next();
            } else {
              this.feedback = 'No chatroom with that id exists';
            }
          });
      } else {
        next();
      }
    }
  }
</script>

<style>
  .welcome {
    max-width: 400px;
    margin-top: 100px;
  }

  .welcome h2 {
    font-size: 3em;
  }

  .welcome button {
    margin: 30px auto;
  }
</style>
