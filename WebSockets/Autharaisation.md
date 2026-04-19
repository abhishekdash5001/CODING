## Webscoket handskae doesnot neccesrly measn useris authnecatted it measn http call is not upgraed to websocket

1.Cookie based Authentiaction
User is logged in the webaite broswer call the websocket may send cookie with it server then reads the cookie and attched it to user info

2. Authenticate after connection with first message

 first connection is made then client sends immediatly the token 
 Until auth succeeds:

do not allow join room
do not allow send message
maybe disconnect after timeout