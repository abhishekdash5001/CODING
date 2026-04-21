const WebSocket = require("ws");
const { createClient } = require("redis"); // redis being used as pub /subs means 1 server can publish and all server can subsribe to it

const PORT = process.env.PORT || 8080;

const pub = createClient(); // creating 1 redis client to publish
const sub = createClient(); // creating 1 redis client to subscribe
const channel = 'room-chat' // this name is importat all publish will happend to this chanell and subscriber in this cahnnel can litsen to it

async function start() {
 
  await pub.connect()  // this connects the publisher redis client to redis server
  await sub.connect() // this connects the subscriber redis client to redis server

  const clients = new Set();

  function heartBeat() {
    this.isAlive = true; // yes server is alive
  } // this is means current webscoket and we call this when call pong

  const wss = new WebSocket.Server({ port: PORT });


  wss.on('connection',(ws)=>{

    ws.isAlive = true // mark newly connected client to be alive
    ws.on('pong',heartBeat) // this function gets called when connection is open or we receive ping frm the server this mark it as alive again // so 

    clients.add(ws)

    ws.on('message',async(message)=>{

        try{
            await pub.publish(channel,JSON.stringify({ // publish to redis server and subsriber wathcing this chanell will subscribe it this scalling
                port:PORT,
                message:message.toString()
            }))
        }catch(e){
            console.log(e)
        }

    })

    ws.on('close',()=>{
        clients.delete(ws)
    })

    ws.on('error',()=>{
        clients.delete(ws)
    })

  })

  await sub.subscribe(channel,(message)=>{ // so whenever any server piblishe somethin got this cahnell this callback function is called 
    for(const ws of clients){
      if(ws.readyState === WebSocket.OPEN){
        ws.send(message) // send to ui 
      }
    }
  })

  const interval = setInterval(() => {
    for (const ws of clients) {
      if (ws.isAlive === false) {
        console.log('deleting the websocket ')
        clients.delete(ws);
        ws.terminate();
        continue;
      }
      ws.isAlive = false
      ws.ping()
      //server ---- ping ----> client
      //server <--- pong ---- client
    }
  }, 10000);

  wss.on('close',()=>{
    clearInterval(interval)
  })

  wss.on('error',()=>{
    clearInterval(interval)
  })
}

 start().catch(console.error);
