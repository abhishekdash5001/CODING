## pool in event loop is actualy the phase where node waits procuess the i.o

## I/O in poll is when file read or socket is availbel or data from netowrk call is avaiablable

#### poll has 2 things 
   Execute the call back when I/o is ready
   or wait for new i/o if nothing else isready
   