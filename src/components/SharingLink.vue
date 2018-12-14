<template>
  <div class="sharing-link">
    <div class="card">
      <div class="card-content sharing-link__content">
        <span>{{sharingLink}}</span>
        <i class="material-icons" @click="copyLinkToClipboard">file_copy</i>
        <span class="sharing-link__popup" ref="sharingLinkPopup">
          Link copied to clipboard
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SharingLink',
    props: ['chatroomId'],
    data() {
      return {
        sharingLink: '',
        showPopup: false
      }
    },
    methods: {
      copyLinkToClipboard() {
        const el = document.createElement('textarea');
        el.value = this.sharingLink;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.$refs.sharingLinkPopup.classList.add('is-active');
        setTimeout(() => this.$refs.sharingLinkPopup.classList.remove('is-active'), 1000);
      }
    },
    created() {
      this.sharingLink = `${window.location.origin}/?chatroomId=${this.chatroomId}`;
    }
  }
</script>

<style>
  .sharing-link .sharing-link__content {
    color: teal;
  }

  .sharing-link i {
    cursor: pointer;
    font-size: 1.4em;
    color: #ccc;
  }

  .sharing-link i:hover {
    animation: pulse 200ms cubic-bezier(0, 0, 0.2, 1) forwards;
  }

  .sharing-link__popup {
    color: white;
    opacity: 0;
    background: black;
    padding: 10px;
    border-radius: 5px;
    transition: opacity .5s linear;
  }

  .sharing-link__popup.is-active {
    opacity: .7;
  }
</style>
