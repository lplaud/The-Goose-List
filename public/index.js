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

  setTimeout(function(){
    window.location.reload();
  }, 1000);
}

function logout(){

  firebase.auth().signOut();
}

function submit(submittedName) {
  if($('#fullNameField').val() == ""){
    alert("Enter a name you silly goose!")
    return 0;
  }

  if($('#linkField').val() == ""){
    alert("You forgot your link! If you don't have one thats okay, just enter anything there :) There is a safe 404 page!")
    return 0;
  }

  if($('#genreField').val() == null || $('#typeField').val() == null){
    alert("Please enter a type of media AND genre of the media you're adding baby :)")
    return 0;
  }

  var database = firebase.database();
  var firebaseMediasCollection = database.ref().child('medias');

  firebaseMediasCollection.child(submittedName).set({
      fullName: $('#fullNameField').val(),
      link: $('#linkField').val(),
      genre: $('#genreField').val(),
      type: $('#typeField').val(),
  });

  var form = document.getElementById("subform");
  form.reset();
};

function loadDB(){
  return firebase.database();
}

function completed(submittedName, link, genre, type){
  var database = firebase.database();
  var firebaseMediasCollection = database.ref().child('medias');
  firebaseMediasCollection.child(submittedName).set(null);
  firebaseMediasCollection = database.ref().child('completeds');
  firebaseMediasCollection.child(submittedName).set({
    fullName: submittedName,
    link: link,
    genre: genre,
    type: type,
  });
}

function remove(submittedName){
  var database = firebase.database();
  var firebaseMediasCollection = database.ref().child('completeds');
  firebaseMediasCollection.child(submittedName).set(null);
}

function sortTable(table, n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(table);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}