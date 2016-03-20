var express = require('express');
var router = express.Router();
var FB = require('fb');
FB.options({appSecret:'448fbdd4a888c54a8bc58f987c25a23e'});

//chat partner search algorithm

router.post('/', function(req, res, next) {
	//check if not already present

	 	//we compare new users with present users to check if they have a relationship - friend or friend of friends

	 	if(Object.keys(global.waitList).length === 0)
	 	global.waitList[req.body.uid]=req.body.tok;	

	 	console.log(global.waitList);

	 	for(var waitingUser in global.waitList)
	 	relationship(waitingUser,req.body.uid,req.body.tok);
	 	/*
	 	if(relationship(waitingUser,req.body.uid,req.body.tok)){
	 		//if there is a relationship
	 		//delete waitList[waitingUser];
	 	}else{
	 		//user not found - add this user
	 		global.waitList[req.body.uid]=req.body.tok;	
	 	}
	 	*/
  	res.send('hooray');
});

function relationship(target_id,source_id,token){

//target_id=id of user to check relationship
//source_id=logged in user
	FB.setAccessToken(token);
	console.log('checking relationship...have some patience');
	FB.api('fql', { q: 'SELECT uid, name, work FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1 = '+target_id+' AND uid2='+source_id+') ORDER BY name' }, function(res) {
	  
	  //if not empty then friends
	  console.log(res.data);
	});
	return false;

/*
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

}


module.exports = router;


/*
reference http://stackoverflow.com/questions/9480747/get-relationship-friend-friend-of-friend-between-two-facebook-ids-by-facebook

two people friends or not
/{user-a-id}/friends/{user-b-id} 

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
