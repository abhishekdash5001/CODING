## node js hanldes concurency so wel beacsu when ever a sync call comes node moves a head fgive this jon to 
## libuv it has two methonds watch of event notfication ad assign thread to read write zipping crypto 
## threads are not heeavey so it doesnot put much of pressure on cpu ad we know api call gql db call they are not cpu heady so node js call waand move to the next when data comes and call stack is empty vent loosp puch that completed call back in the que

API call / DB call / network call usually do not need one thread each. they use event notifucation

## Node is efficient not because threads are cheap, but because it often avoids needing many threads for network I/O.