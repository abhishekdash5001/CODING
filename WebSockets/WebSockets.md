# Websockets are used when there need to be continous communication b.w server and browseer so there 2 speeds 
  1.Speed by wich server sends info to browser
  2.Speed by which borwser process that info if procuess speed is less then then it starts pillin up in the memory and is called back pressure problem


Suppose:

server sends 1000 messages/second
your UI code can handle only 200 messages/second

Then every second, 800 extra messages are waiting.

Those waiting messages sit in buffers / queues.

After some time:

memory usage grows
CPU becomes busy trying to catch up
UI becomes laggy
browser may freeze