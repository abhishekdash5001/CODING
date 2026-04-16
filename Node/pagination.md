## instead of asking for “page 3”, client asks for “give me next items after this last item”

```js

//GET /products?page=3&limit=10
//GET /products?cursor=40&limit=10


```


## normal pagiantion if offset become high db becomes slow 

offset = (page - 1) * limit db has to skiip these much rows

cursot tell give medata form this to that  but we cant jumdirectly to page 8 for this normal pagiantion 

```js
const express = require("express");
const app = express();

const products = [
  { id: 1, name: "P1" },
  { id: 2, name: "P2" },
  { id: 3, name: "P3" },
  { id: 4, name: "P4" },
  { id: 5, name: "P5" },
  { id: 6, name: "P6" },
  { id: 7, name: "P7" },
  { id: 8, name: "P8" },
  { id: 9, name: "P9" },
  { id: 10, name: "P10" },
];

app.get("/products", (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 3, 10);
  const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

  let filtered = products;

  if (cursor !== null) {
    filtered = products.filter((item) => item.id > cursor);
  }

  const paginated = filtered.slice(0, limit);

  const nextCursor =
    paginated.length > 0 ? paginated[paginated.length - 1].id : null;

  res.json({
    data: paginated,
    nextCursor,
    hasMore: filtered.length > limit,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});




```