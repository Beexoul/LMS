$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyBe2_rEnqHoM8xpoCVaGbSGJ2f_1wUv-WQ",
        authDomain: "library-management-syste-600fe.firebaseapp.com",
        projectId: "library-management-syste-600fe",
        storageBucket: "library-management-syste-600fe.appspot.com",
        messagingSenderId: "862240832262",
        appId: "1:862240832262:web:f63f2753d70d1e1c20bc87",
        measurementId: "G-0JNB40FHHH"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();

    $("#book-form").submit(function(e) {
        e.preventDefault();
    });

    $('#submit').click(function() {
        add_this();
    });

    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            window.location = 'index.html';
        }
    });
});

function add_this() {
    var BookCode = document.getElementById("book_code").value;
    var BookName = document.getElementById("book_name").value;
    var Author1 = document.getElementById("author1").value;
    var Author2 = document.getElementById("author2").value;
    var Subject = document.getElementById("Subject").value;
    var tags = document.getElementById("tags").value;
    var db = firebase.firestore();

    db.collection("books").doc(BookCode).set({
        bookcode: BookCode,
        bookname: BookName,
        author1: Author1,
        author2: Author2,
        subject: Subject,
        tags: tags
    })
    .then(function() {
        console.log("Document successfully written!");
        window.alert("Successfully Book Added");
        window.location = 'admin_portal.html';
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}