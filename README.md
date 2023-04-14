API Routes

/signup
Method: POST

This route is used to sign up a new user and add their details to the database.

Request Body

Field	Type	Required <br>
name	string	Yes <br>
email	string	Yes <br>
password	string	Yes <br>
Response <br>

Success <br>
Field	Type	Description <br>
id	string	ID of the new user. <br>
Errors <br>
Status Code	Description <br>
400	Missing required fields. <br>
500	Failed to add user or account exists, login. <br>
404	Server failed. <br>
/login <br> 
Method: POST <br>

This route is used to login a user with their email and password. <br>

Request Body <br>

Field	Type	Required <br>
email	string	Yes <br>
password	string	Yes <br>
Response <br>

Success <br>
Status Code	Description <br>
200	Logged in. <br>
Errors <br>
Status Code	Description <br>
400	Missing required fields. <br>
401	Wrong password. <br>
404	Account does not exist. <br>
500	Server failed. <br>
/logout <br>
Method: GET <br>

This route is used to logout a logged-in user. <br>

Response <br>

Success <br>
Status Code	Description <br>
204	Logged out. <br>
Errors <br>
Status Code	Description <br>
400	Already logged out. <br>
/changepass <br>
Method: PATCH <br>

This route is used to change the name and/or password of a logged-in user. <br>

Request Body <br>

Field	Type	Required <br>
name	string	No <br>
password	string	No <br>
Response <br>

Success <br>
Status Code	Description <br>
204	Updated. <br>
Errors <br>
Status Code	Description <br>
500	Please login to change password or email mismatch. <br>
404	User not found. <br>
500	Failed to update user. <br>
/user/addpost <br>
Method: POST <br>

This route is used to add a post to a logged-in user's profile. <br>

Request Body <br>

Field	Type	Required <br>
post	string	Yes <br>
Response <br>

Success <br>
Status Code	Description <br> <br>
200	Updated. <br>
Errors <br>
Status Code	Description <br>
401	Login first. <br>
404	User not found. <br>
500	Failed to update user. <br>
/adminData <br>
Method: GET <br>

This route is used to retrieve all the users' data in the database. <br>

Response <br>

Success <br>
Field	Type	Description <br>
List of users <br>
Errors <br>
Status Code	Description <br>
500	Server failed. <br>


