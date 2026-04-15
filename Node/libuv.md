

  ## 5. What is libuv? think of it has differnt operation teem that taes heaver ork mange vent loop and update js when things are done

  libuv is c library that isused by node js to do haeavy async task
  read wrtei acyc i/o network calls api calls compression crypto

   libuv has two methodds
   1.Event notificatoin for networks calls webs sockets tiemrs it tells the os that when this is thing is done let me know

   2.thread  pooling
   some work cannot be done by event notifcication comporessn read write so libuv give thread ppol default size 4 if we more work then first 4 will start working as callback is puchsed in that call stack thread will go tother

    we can inceare thread side but it is not always good it can inceare cpu usage

    UV_THREADPOOL_SIZE=8 node app.js



    4. Does thread pool mean Node JS is multithreaded?

JS execution is mainly single-threaded, but runtime uses helper threads.