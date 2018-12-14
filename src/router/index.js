import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'
import CreateChat from '@/components/CreateChat'

Vue.use(Router);

const beforeEnter = (to, from, next) => {
  console.log(to);
  if (to.params.name) {
    next();
  } else {
    next({
      name: Welcome.name
    });
  }
};

export default new Router({
  routes: [
    {
      path: '/',
      name: Welcome.name,
      component: Welcome
    },
    {
      path: '/chat/:chatroomId',
      name: Chat.name,
      component: Chat,
      props: true,
      beforeEnter
    },
    {
      path: '/create-chat',
      name: CreateChat.name,
      component: CreateChat
    }
  ],
  mode: 'history'
})
