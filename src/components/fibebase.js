import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/storage';
import uuid from 'uuid/v1';

const config = {
  apiKey: 'AIzaSyDxmWK4IR7-H7PBYqSiTo4AXqoAUgsyuLU',
  authDomain: 'slides-clone-team-project.firebaseapp.com',
  databaseURL: 'https://slides-clone-team-project.firebaseio.com',
  projectId: 'slides-clone-team-project',
  storageBucket: 'slides-clone-team-project.appspot.com',
  messagingSenderId: '687517653002',
  appId: '1:687517653002:web:048610375b7d71becaa7f3',
  measurementId: 'G-3MN91TKKGD'
};

// Initialize Firebase

class firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storageRef = app.storage();
    // app.analytics();
  }

  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout(email, password) {
    return this.auth.signOut();
  }
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({ displayName: name });
  }
  getUser() {
    const user = { ...this.auth.currentUser };
    return user;
  }
  createUserDeck(user) {
    // console.log(user);
    this.db
      .collection('Users')
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
        decks: []
      })
      .then(function() {
        // console.log('Document successfully written!');
      })
      .catch(function(error) {
        // console.error('Error writing document: ', error);
      });
  }
  async fetchUserDecks(user) {
    // console.log(user.uid, 'in fetch');
    const docRef = this.db.collection('Decks');
    const query = docRef.where('uid', '==', user.uid);

    let data = [];
    await query
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          let deck = { ...doc.data() };
          deck.idDeck = doc.id;
          data.push(deck);
        });
      })
      .catch(function(error) {
        // console.log('Error getting documents: ', error);
      });

    return data;
  }
  async newDeckForUser(user, description, title) {
    let idDeck = '';
    await this.db
      .collection('Decks')
      .add({
        name: user.displayName,
        uid: user.uid,
        description: description,
        title: title,
        slides: [
          {
            idSlide: uuid(),
            position: 1,
            idDeck: -1,
            backgroundColor: 'white',
            blocks: [
              {
                id: uuid(),
                type: 'text',
                value: 'Hello world',
                format: 'h2',
                top: 100,
                left: 120,
                textAlign: 'center',
                color: 'black',
                backgroundColor: 'white'
              }
            ]
          }
        ]
      })
      .then(function(docRef) {
        // console.log('Document written with ID: ', docRef.id);
        idDeck = docRef.id;
      })
      .catch(function(error) {
        // console.error('Error adding document: ', error);
      });
    return idDeck;
  }

  async fetchUserDeck(idDeck) {
    var deckRef = this.db.collection('Decks').doc(idDeck);
    let deck = null;

    await deckRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          deck = doc.data();
        } else {
          // doc.data() will be undefined in this case
          // console.log('No such document!');
        }
      })
      .catch(function(error) {
        // console.log('Error getting document:', error);
      });
    return deck;
  }

  async updateSlides(slides, idDeck) {
    // console.log('update Slides firebase', idDeck);
    var deckRef = this.db.collection('Decks').doc(idDeck);
    let response = null;
    // Set the "capital" field of the city 'DC'
    await deckRef
      .update({
        slides: slides
      })
      .then(function() {
        // console.log('Document successfully updated!');
        response = true;
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        // console.error('Error updating document: ', error);
        response = false;
      });
    return response;
  }

  // For dashboard Refresh
  async fetchUserDetails(uid) {
    // console.log('fetching user Details');
    var userRef = this.db.collection('Users').doc(uid);
    let user = null;

    await userRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          user = doc.data();
        } else {
          // doc.data() will be undefined in this case
          // console.log('No such document!');
        }
      })
      .catch(function(error) {
        // console.log('Error getting document:', error);
      });
    return user;
  }

  async fetchAllDecks() {
    let decks = [];
    await this.db
      .collection('Decks')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          let deck = { ...doc.data() };
          // console.log(deck, typeof deck);
          deck.idDeck = doc.id;
          // console.log(deck);
          decks.push(deck);
        });
      });
    return decks;
  }
  async deleteDeckById(idDeck) {
    this.db
      .collection('Decks')
      .doc(idDeck)
      .delete()
      .then(function() {
        // console.log('Document successfully deleted!');
      })
      .catch(function(error) {
        // console.error('Error removing document: ', error);
      });
  }

  async uploadImage(fileDetails) {
    console.log('firebase Upload Image:', fileDetails);
    // var imagesRef = this.storageRef.child('deckImages/' + filename);
    const snapshot = await this.storageRef
      .ref('deckImages/' + uuid() + fileDetails.name)
      .put(fileDetails);
    const downloadURL = await snapshot.ref.getDownloadURL();
    // console.log(downloadURL);
    return downloadURL;
    // Listen for state changes, errors, and completion of the upload.
  }
}
const FIREBASE = new firebase();

export default FIREBASE;
