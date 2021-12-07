firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){

  firebase.auth().signOut();
}

function submit(submittedName) {
  var database = firebase.database();
  var firebaseMediasCollection = database.ref().child('medias');

  firebaseMediasCollection.child(submittedName).set({
      fullName: $('#fullNameField').val(),
      notes: $('#notesField').val(),
  });
};

function loadDB(){
  return firebase.database();
}

function completed(submittedName, notes){
  var database = firebase.database();
  var firebaseMediasCollection = database.ref().child('medias');
  firebaseMediasCollection.child(submittedName).set(null);
  firebaseMediasCollection = database.ref().child('completeds');
  firebaseMediasCollection.child(submittedName).set({
    fullName: submittedName,
    notes: notes,
  });
}

function remove(submittedName){
  var database = firebase.database();
  var firebaseMediasCollection = database.ref().child('completeds');
  firebaseMediasCollection.child(submittedName).set(null);
}