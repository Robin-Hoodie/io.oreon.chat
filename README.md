# Oreon Chat

Realtime chat application written in Vue!


On the back end a firestore database is hosted on Firebase while [Materialize](https://materializecss.com/) is used as the Material Design CSS framework 

## Local setup

- Clone project
- Install dependencies `npm install` or `yarn install`
- Set up a [firestore database](https://firebase.google.com/docs/firestore/quickstart)
- Set up a `src/firebase/init.js` file with the following contents:
```
import firebase from 'firebase'

const config = {
  //You can find this config in your firebase console under 'General Settings' -- 'Add Firebase to your Webapp'
};


const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({
  timestampsInSnapshots: true
});
export default firebaseApp.firestore();
```
- Serve with hot reload at `localhost:8080` with `npm run dev` or `yarn dev`
- Build for production with `npm run build` or `yarn build`

## Live project

A live version of the project can be interacted with at https://chat.oreon.io

As this is just a pet project of mine, no authentication is included and you're free to send chat messages to try this out. Please do be mindful as not to spam the whole channel
