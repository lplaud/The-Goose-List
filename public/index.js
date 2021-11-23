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

function submit() {
  var database = firebase.database();
  var firebaseOrdersCollection = database.ref().child('orders');
  //Grab order data from the form
  var order = {
    fullName: $('#fullNameField').val(), //another way you could write is $('#myForm [name="fullname"]').
    notes: $('#notesField').val(), //another way you could write is $('#myForm [name="fullname"]').
  };
  
  //'push' (aka add) your order to the existing list
  firebaseOrdersCollection.push(order); //'orders' is the name of the 'collection' (aka database table)
};

function loadDB(){
  return firebase.database();
}