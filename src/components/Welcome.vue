<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>
        <form novalidate
              @submit.prevent="enterChat">
          <label for="name">Enter your name</label>
          <input type="text"
                 name="name"
                 id="name"
                 v-model="name">
          <p class="red-text"
             v-if="feedback">{{feedback}}</p>
          <button class="btn teal"
                  type="submit">Enter chat
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    data() {
      return {
        name: '',
        feedback: ''
      }
    },
    methods: {
      enterChat() {
        if (this.name) {
          this.$router.push({
            name: 'Chat', params: {
              name: this.name
            }
          });
        } else {
          this.feedback = 'You need to enter a name to start chatting';
        }
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
