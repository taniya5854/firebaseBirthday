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

const loginBtn = $('#loginBtn');

//Add an event handler to login button
loginBtn.on('click', (e) =>{
    e.preventDefault();
    //read values on button click
    const email = $('.emailCls').val();
    const password = $('.passwordCls').val();

    auth.signInWithEmailAndPassword(email, password).
    then(credential => {
        console.log("User logged in");
        const db = firebase.database();
        const dbref = db.ref('UserAuthList/'+ credential.user.uid);
        dbref.get().then(snapshot =>{
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
    }).catch(function(error){
        console.log("Error",error.message);
        alert('Invalid Login Credentials. Please enter correct details!');
    }); 
});

const signUpButton = $('#signUpBtn');
signUpButton.on('click', ()=>{
    window.location.href = 'singUpPage.html';
})
