
$(document).ready(function(){
    
    
    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
     });
     
    var firebaseConfig = {
    //    YOUR CONFIG 
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    var db = firebase.firestore();
    
    //prevent default refresh of form 
    $("#login-form").submit(function(e) {
        e.preventDefault();
    });

    $("#register-form").submit(function(e) {
        e.preventDefault();
    });


    //if user is logged in then go to user_portal
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            window.location = 'user_portal.html';
            }
    });
    
    $('#log_me_in').click(function() {
      login();
    });

    $('#register_new').click(function() {
      register_me();
    });

    $('#log_button').click(function()
    {
        logout();
    });


});

function logout()
{
    firebase.auth().signOut().then(function() {
        console.log("logout done");
        window.location = 'usr_login.html';
    }).catch(function(error) {
        console.log("error");
    });
}

function register_me(){
    //get input data
    var db = firebase.firestore();

    var name = document.getElementById("usr_name").value;
    var Password = document.getElementById("usr_pass").value;
    var Email = document.getElementById("usr_email").value;
    var Roll_number = document.getElementById("usr_roll").value;
    var date_of_birth = document.getElementById("usr_dob").value;
    var books = [];

    //firebase register
    firebase.auth().createUserWithEmailAndPassword(Email, Password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("error ", errorMessage);
    });

    db.collection("users").doc(Roll_number).set({
        name: name,
        Email: Email,
        Roll_Number: Roll_number,
        DOB: date_of_birth,
        books: books
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

}

function login(){
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(email === "admin@gmail.com")
    {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
        });
    }    
}

