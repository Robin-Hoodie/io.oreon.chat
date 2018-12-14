<template>
  <div class="create-chat container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Create Chat</h2>
        <form novalidate
              @submit.prevent="createChat">
          <div class="field">
            <label for="owner">Owner (your name)</label>
            <input type="text"
                   name="owner"
                   id="owner"
                   v-model="owner">
          </div>
          <div class="field">
            <label for="name">Room name</label>
            <input type="text"
                   name="name"
                   id="name"
                   v-model="name">
          </div>
          <p class="red-text"
             v-if="feedback">{{feedback}}</p>
          <button class="btn teal"
                  type="submit">Create chatroom
          </button>
        </form>
        <router-link :to="{name: 'Welcome'}">
          <button class="btn red">
            Back
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'CreateChat',
    data() {
      return {
        name: '',
        feedback: '',
        owner: this.$route.query.owner || ''
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      createChat() {
        if (!this.name || !this.owner) {
          this.feedback = 'You need to enter an owner and name to create a chatroom';
        } else {
          this.feedback = null;
          db.collection('chatroom')
            .add({
              name: this.name
            })
            .then(doc => {
              console.log(doc);
              this.$router.push({
                name: 'Chat',
                params: {
                  name: this.owner,
                  chatroomId: doc.id
                }
              });
            })
            .catch(error => console.error(error));
        }
      }
    }
  }
</script>

<style>
  .create-chat {
    max-width: 400px;
    margin-top: 100px;
  }

  .create-chat h2 {
    font-size: 3em;
  }

  .create-chat button {
    margin: 30px auto;
  }
</style>
