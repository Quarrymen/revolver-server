mcount = 0;
//********* page functionality


//********* socket programming
var socket = io();

$('#send_message').click(function(){
  socket.emit('chat message',$('#message').val());
  $('#message').val('');
  return false;
});

$('#message').keypress(function(event){
  if(event.which == 13){
    socket.emit('chat message',$('#message').val());
    $('#message').val('');
    return false;  
  }
});

socket.on('chat message', function(msg){
	$('#messages').append($('<li id=m'+mcount+'>').text(msg));
	Materialize.showStaggeredList('#m'+mcount)
	mcount++;
});

function goOnline(){
	$.post("http://localhost:3000/status", { uid: userId, tok: accessToken,status:'online' }).done(function(data, status){
			//use toasts here #fix
	        console.log("Data: " + data + "\nStatus: " + status);
		});

}
function goOffline(){
	$.post("http://localhost:3000/status", { uid: userId, tok: accessToken,status:'offline' }).done(function(data, status){
			//use toasts here #fix
	        console.log("Data: " + data + "\nStatus: " + status);
	});
}

//********** facebook js sdk


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log(response);
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    accessToken = response.authResponse.accessToken;
     userId = response.authResponse.userID;
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

function invite(){
//invite friends dialog box facebook api
}
/*
The Login Dialog lets people decline to share certain permissions with your app that you ask for. Your app should handle this case. Learn more about this in our permissions dialog.
*/
