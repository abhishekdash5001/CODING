const WebSocket = require('ws')
const PORT = 8080
const wss = new WebSocket.Server({port:PORT}) // wss = websocket serve

wss.on('connection',(ws)=>{ //wss.on means litsne to an event 'connection' is when clinet is connected //(ws)=>{} is the callback for that connected clinet ws socket object for theat specific clent
    let count = 0; // each clinet will get there own client will start from 0

    const interval = setInterval(()=>{
        const message = JSON.stringify({
            id:count++,
            number :Math.random()*1000,
         
            timeStamp:Date.now()
        })

        if(ws.readyState === WebSocket.OPEN){ // checking the connect ready state with  WebSocket.OPEN it means connection is open and can send request
            ws.send(message)  //Sends the JSON string to the connected client. this will be sent to the connected client

        }
    },1500)
    ws.on('close',()=>{ // lisen to close evetn
        clearInterval(interval)
        console.log('connection closed')
    })

})

console.log(`websocket running at ${PORT}`)