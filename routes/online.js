var express = require('express');
var router = express.Router();
var FB = require('fb');
FB.options({appSecret:'448fbdd4a888c54a8bc58f987c25a23e'});

//chat partner search algorithm

router.post('/', function(req, res, next) {
 	//we compare new users with present users to check if they have a relationship - friend or friend of friends
 	if(!req.body.uid || !req.body.tok)
 	res.send('some error');	

 	requestingUser = req.body.uid;
 	requestingUserToken = req.body.tok;

	global.users[requestingUser]={
		id:requestingUser,
		token:requestingUserToken,
		socket:''
		status:'wait' // wait chat	
	}	
 	if(global.waitUsers.length === 0){
 		global.waitUsers.push(requestingUser);
 	}
 	else if(global.waitUsers.length >= 1)
 	{	

 		//loop throught async requests
	 	for(var i=0;i<waitUsers.length;i++){ 
	 		isFriend(waitUsers[i],requestingUser,requestingUserToken,function(){
	 			//find it's current socket id
	 		});
	 	}
	 	//add to the list
	 	global.waitUsers.push(requestingUser);

 	}
});

function isFriend(target_id,source_id,token,callback){

//target_id=id of user to check relationship
//source_id=logged in user
	FB.setAccessToken(token);
	FB.api(
    "/"+source_id+"/friends/"+target_id,
    function (response) {
      if(response.data.length>0){
      	//friends
      	callback();
      }
    });
}

module.exports = router;
/*

FB.api('fql', { q: 'SELECT uid, name, work FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = '+target_id+' AND uid2='+source_id+') ORDER BY name' }, function(res) {
  
  //if not empty then friends
  console.log(res);
});
if(!empty($user_info)) 
{
      $degree='friend';
}
else {
    $query="SELECT uid, name, work FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 IN (SELECT uid2 FROM friend WHERE uid1 = $target_id) AND uid2=$source_id) ORDER BY name";

	$user_info=$this->facebook->api(array('method'=>'fql.query','query'=>$query));

	// we can check friend-of-friend for app user friends

   if(!empty($user_info)) {
       $degree='friend-of-friend'; 
   }else{
		$degree='none';
	}
}
*/



/*
reference http://stackoverflow.com/questions/9480747/get-relationship-friend-friend-of-friend-between-two-facebook-ids-by-facebook

A list of Facebook friends that the session user and the request user have in common.
/{user-id}.context/mutual_friends

FB.setAccessToken(req.body.tok);
//need to attach appsecret_proof parameter plus the user access token.

FB.api(
    "/"+req.body.uid,
     {
    "fields": "context.fields(all_mutual_friends.limit(100))"
	},	
    function (res) {
      if (res && !res.error) {
        console.log(res);
   		return;
      }
    }
);

*/
