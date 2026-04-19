# XSS cross site scripting
hacker can inject malicious code by comment section chat and wite something in porfile name that is script

Nice post <script>alert('xss')</script>
Profile Name <img src="x" onerror="alert('xss')">
Payload through Url https://myapp.com/search?q=<script>alert(1)</script>

```html

 <div id="box"></div>



<script>
  const userInput = '<img src=x onerror=alert("xss")>';
  document.getElementById('box').innerHTML = userInput;
</script>
<!-- bad -->




<script>
  const userInput = '<img src=x onerror=alert("xss")>';
  document.getElementById('box').textContent = userInput;
</script>

<script>


export default function App() {
  const comment = '<img src=x onerror=alert("xss")>';

  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
}
//unsafe


export default function App() {
  const comment = '<img src=x onerror=alert("xss")>';

  return <div>{comment}</div>;
}

// safe
</script>


```

# Avoiding innerHTML  Use textContent


```js

import DOMPurify from 'dompurify';

const dirty = `
  <p>Hello</p>
  <img src="x" onerror="alert(1)">
`;

const clean = DOMPurify.sanitize(dirty);

document.getElementById('box').innerHTML = clean;



```


## SQL injection cannot be avoided by ui bcz hackers can use post man to send 
1.Parameterized queries  keep SQL fixed, plug user input only as data”
```js
const email = req.body.email;

const query = `SELECT * FROM users WHERE email = $1`;
await pool.query(query, [email]);

```