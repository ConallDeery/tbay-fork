var express = require('express');
var router = express.Router();
var firebase = require("firebase");
const admin = require('firebase-admin')
const cors = require('cors');
//Address of private key
var serviceAccount = require("./../../../../tbay-c2e0d-firebase-adminsdk-ouq9q-f91bf19d0d.json");
const firebaseConfig = {
  apiKey: "AIzaSyAZajE4nOJqlYs170-ND9YMYooPg3tA5JE",
  authDomain: "tbay-c2e0d.firebaseapp.com",
  projectId: "tbay-c2e0d",
  storageBucket: "tbay-c2e0d.appspot.com",
  messagingSenderId: "633870967402",
  appId: "1:633870967402:web:bea053d2e77afd0915e013",
  measurementId: "G-WJNMPW4VJZ",
  databaseURL: "https://tbay-c2e0d-default-rtdb.europe-west1.firebasedatabase.app"
};
firebase.initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var database = firebase.database();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// Create a storage reference from our storage service
var storageRef = storage.ref();

router.get('/', cors(), function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', cors(), (req, res) => {
  let email = req.query.email;
  let password = req.query.password; 
  console.log(email, password)
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("Created user:", user)
      return res.status(200).send(JSON.stringify('Sign up complete!'));
    })
    .catch((error) => {
      console.log("Signup error!", error)
      return res.status(200).send(JSON.stringify(false)); //return false
    });
});

router.get('/login', cors(), function(req, res) {
  let email = req.query.email;
  let password = req.query.password; 

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    return user.getIdToken().then((idToken) => {
      return res.status(200).send(JSON.stringify({ idToken, userID: user.uid })); //return ID Token to client
    });
  })
  .catch((error) => {
    console.log("Error while signing in!", error)
    return res.status(200).send(JSON.stringify(false)); //return false
  });
});

router.get('/verify', cors(), (req, res) => {
  let idToken = req.body["idToken"];
  console.log("verify")
  // idToken comes from the client app
  admin.auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log("verified")
      return res.status(200).send("Verified!");
    })
    .catch((error) => {
      console.log(error)
      return res.status(200).send("Token verification failed!");
    });
});

router.get('/logout', cors(), (req, res) => {
  let email = req.body["email"];
  let password = req.body.password; 

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
});

// Get all products
router.get('/product', cors(), function(req, res) {
  try{
    firebase.database().ref('/products').once('value').then((snapshot) => {
      const data = snapshot.val();
      return res.status(200).send(data);
    });
  } catch(error){
    console.log("Error retrieving data!", error)
    return res.status(200).send(JSON.stringify(false));
  };
});

// Create a product
router.post('/post-product', cors(), function(req, res) {
  var postData = {
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    sellerUserID: req.body.sellerUserID,
    title: req.body.title
  };

  let imagePath = "";
  if(postData.image!==null){
    let index = 0;
    postData.image.forEach(element => {
      try{
        let postFix = ""
        if(element.startsWith("data:image/jpeg")) postFix = '.jpg'
        else if(element.startsWith("data:image/png")) postFix = '.png'
        
        imagePath ='products/'+postData.title + ''+ index + postFix;
        var imageRef = storageRef.child(imagePath);

        imageRef.putString(element, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string to the following path:', snapshot.metadata.fullPath);
        });
      } catch(error){
        console.log("Error Posting Image!", error)
        return res.status(404).send(JSON.stringify(false));
      };
    });
  }
  postData.image = imagePath;
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('products').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/products/' + newPostKey] = postData;
  try{
    firebase.database().ref().update(updates).then(() => {
      return res.status(200).send(JSON.stringify("Post Successful, post ID = "+newPostKey));
    });
  } catch(error){
    console.log("Error retrieving data!", error)
    return res.status(200).send(JSON.stringify(false));
  };
});

// Update a product
router.post('/update-product', cors(), function(req, res) {
  var productKey = req.body.productKey;

  var postData = {
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    sellerUserID: req.body.sellerUserID,
    title: req.body.title
  };
  try{
    firebase.database().ref('products/' + productKey).update(postData).then(() => {
      return res.status(200).send("Update Successful!");
    });
  } catch(error){
    console.log("Error retrieving data!", error)
    return res.status(200).send(JSON.stringify(false));
  };
});

module.exports = router;