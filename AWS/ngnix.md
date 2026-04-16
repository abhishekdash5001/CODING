Browser https://api.myapp.com
   ↓ 443
ALB
   ↓ 80
EC2 Nginx
   ↓ 3000
Node app


Can ALB send directly to Node without Nginx?
Yes


Nginx

Works inside one EC2/server

It decides:

forward request to Node app on port 3000
maybe serve static files directly
maybe route /api to Node and / to frontend
maybe add gzip/cache/proxy settings