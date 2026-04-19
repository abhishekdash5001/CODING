const WebSocket = require('ws')

const url = require('url')

const PORT = process.env.PORT || 8080


function verifyToken(token) {
    if (token === "admin-token") {
      return { id: 1, name: "Athena", role: "admin" };
    }
  
    if (token === "user-token") {
      return { id: 2, name: "Sam", role: "user" };
    }
  
    return null;
  }


async function start() {


    const wss = new WebSocket.Server({port:PORT})

    wss.on('connection',(ws,req)=>{
        console.log("conncetion amde")
     const parsedUrl = url.parse(req.url,true)
     const token =  parsedUrl.query.token;
debugger
     const user = verifyToken(token);

     if(!user){
        ws.close(1008,'invalid token')
        return
     }

     ws.user = user;

     ws.send(
        JSON.stringify({
          type: "info",
          message: `Connected as ${ws.user.name} with role ${ws.user.role}`,
        })
      );


      ws.on('message',(message)=>{
        const parsed = JSON.parse(message.toString())

        if(parsed.type === 'delete_message'){
            if(ws.user.role !== 'admin'){
                ws.send(
                    JSON.stringify({
                      type: "error",
                      message: "You are not allowed to delete messages",
                    })
                  );
                  return;
            }

            ws.send(
                JSON.stringify({
                  type: "succes",
                  message: "done",
                })
              );

        }
      })
    

   

      
    })
    console.log(`WebSocket server running on port ${PORT}`);
}

start().catch(console.error)