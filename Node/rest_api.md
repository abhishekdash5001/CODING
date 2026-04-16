# 1. First idea: think in resources, not actions
 order 
 product
 post
 blogs

# 2. Use HTTP methods correctly
   1 get read data
   2.post - create data
   3 put - update data
   4. patch - partially update
   5. deelte



```js

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
});

 ```