## connection pool means howo are we connected with the db
if get a request from client open the connection with db ad thenget the data and close next request will do the same thing this is expensive
theat connection is kept open and when new reeust comes just fethc the data and return to the clentnand then wait for anuther own


## Why creating a connection is expensive

1.Dta base sesion create
TCP hadnsake
2 authencation

## let assume ppol size is 10 new reeust db gives a pool and works starts in all 10 are full the the new request will wait


```js
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "secret",
  database: "mydb",
  max: 10, // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "DB error" });
  }
});


```

## 13. Manual borrow and release example

```js


const client = await pool.connect();

try {
  const result = await client.query("SELECT * FROM users");
  console.log(result.rows);
} finally {
  client.release();
}

if not reeasle then abver time all pools will oaccupred
```

## this is needer some sutation want same conncetion rather random like transaction of amount


## Pool helps, but does not fix slow queries

```js
const { Pool } = require("pg");

const pool = new Pool({ max: 10 });

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});



```



