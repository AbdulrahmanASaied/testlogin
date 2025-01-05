Goals

The task is to implement a login form following the given Figma design & back-end API URL.

Once logged in, the user will have access to a dashboard where he can log-out.

Normal Scenario

The user opens the URL of the app at http://localhost:3000
The system checks if authentication is saved & not expired by going to step 8 of this scenario
The system displays the following form:
Data:
E-Mail: string
Password: string
Actions:
Login button
Business Rules:
The Login button will be disabled if email or password is not provided
The Login button will be disabled if email is not a valid email (xxx@yyy.zzz)
The user inputs the following credentials and clicks on Login button:
Data:
E-Mail: dev.aert@gmail.com
Password: helloworld
The system calls the following login API to check that user credentials are valid (using previously entered values in <E-Mail> and <Password>):
URL: https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token
HTTP Method: POST
HTTP Headers: Content-Type: application/json
Body (JSON): {email: <E-Mail>, password: "<Password>", isEmployee: true}
The login API returns HTTP 200 & the following JSON structure: { token: ..., refresh: ..., ...}
Note: the access token value is in token attribute value, not in refresh attribute
The system stores the login API response token into HTTP Only Cookie
The system calls the user info API to retrieve the user name:
URL: https://api-yeshtery.dev.meetusvr.com/v1/user/info
HTTP Method: GET
HTTP Headers:
Content-Type: application/json
Authorization: Bearer <Saved Token Value>, (<Saved Token Value> will be empty if it's the first time call & step 6 was not executed yet)
Body (JSON): {email: <E-Mail>, password: "<Password>", isEmployee: true}
Depending on the success of the user info API call, the following alternate steps will be executed:
on success (HTTP 200): the user info API returns the following JSON structure: { id: ..., name: ..., ...} and step 10 is executedd
on failure (not HTTP 200): step 3 is executed
The system store the ID & the name of the user
The system displays the following dashboard page:
Data:
ID: from the stored user info API
Name: from the stored user info API
Actions:
Logout button
The user clicks on the Logout button
The system logs out the user & goes to step 1 of this scenario
Exceptional Scenarios

Step 4.a: the user inputs invalid email or empty password when clicking Login:
Display validation errors
Clear validation errors as soon as a change is done in the changed fields
Non Goals

The following are not needed for this test:

JWT or Refresh Token knowledge..., you can assume that the back-end will respond HTTP code 401 if the token is invalid or expired
Dashboard design..., we just need a simple page using a different layout than the login page so that we know we're in the dashboard section
Evaluation Criteria

Source code must be pushed to a publicly available Github or Gitlab repository.

The work result will be evaluated based on:

Figma to HTML/CSS conversion
NextJS code organization
React & Redux (or Zustand, we need at least one of the two to be used) usage
Proper authentication token saving and expiration handling
Git basic knowledge
Adherence to requirements
Additional Notes

You can test that the API can login by running this curl command:

curl https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token -X POST -H "Content-Type: application/json" -d '{"email": "dev.aert@gmail.com", "password": "helloworld", "isEmployee": true}'
