const firebaseConfig = {
  apiKey: "AIzaSyAPQdCMIRT9KosVygLiL7E5kkUpR4msVQE",
  authDomain: "birthdaywit-3e56a.firebaseapp.com",
  projectId: "birthdaywit-3e56a",
  storageBucket: "birthdaywit-3e56a.appspot.com",
  messagingSenderId: "644766201872",
  appId: "1:644766201872:web:74dcc99c75af22c3577295"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
//This function will return the input value typed in the i/p box from the user

const getFormInput=(id)=> {
    return $(`.${id}`).val();
}

//this function will post the given value passed in object to our database.
const postToFirebase=async (obj,uid)=> {
    console.log(uid);
    const ref = firebase.database().ref('UserAuthList/'+ uid);
    console.log('ref'+ref);
    ref.set({
      nameValue: obj.name,
      dateOfBirthValue : obj.dateOfBirth
    })
    console.log('ref set'+ref);
}
  
//this function is the callback function that we are going to set for click evvent of the submit button.
const signUpButton = $('#signUpBtn');
signUpButton.on('click', (e) =>{
    e.preventDefault();
    const email = getFormInput("emailCls");
    const password = getFormInput("passwordCls");
    let uid='';
    auth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
        uid = credential.user.uid;
        console.log("User created",uid);
        //call the method to post the other values to the realtime database.
        postToFirebase(obj,uid);
        setTimeout(()=>{
            const db = firebase.database();
            const dbref = db.ref('UserAuthList/'+ credential.user.uid);
            dbref.once('value').then(snapshot =>{
                if(snapshot.exists){
                    console.log(JSON.stringify(snapshot));
                    sessionStorage.setItem("user-info", JSON.stringify({
                        name: snapshot.val().nameValue,
                        dateOfBirth: snapshot.val().dateOfBirthValue
                    }))
                    sessionStorage.setItem("user-creds", JSON.stringify(credential.user));
                    window.location.href = 'home.html';
                }
            })
        },2000);
    }).catch((error)=>{
      console.log("Error", error.message);
      if(error.message.includes('The email address is already in use by another account.')){
        alert('The email address is already in use by another account.');
      }else if(error.message.includes('Password should be at least 6 characters')){
        alert('Password should be at least 6 characters ');
      }else if(error.message.includes('The email address is badly formatted. ')){
        alert('Please enter email in correct format. ');
      }
      
    })
    //this builds an object with data given by the user.
    const obj = {
        name: getFormInput("name"),
        dateOfBirth: getFormInput("dateOfBirth"),
    }
    
    
    
})

  
