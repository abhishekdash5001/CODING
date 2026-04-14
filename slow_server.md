# 1. Database is slow

User → Backend API → Database → Backend API → User
GET /product/iphone
SELECT * FROM products WHERE slug = 'iphone';

so db will searhc whole table to get the row wher slug is ihpne
ot make it fast create index for slug --> so same query will go to index page look for slug ='ipjone'  on the right we have the page number jump to that page

# 2. Too many DB calls / N+1 problem

1 query to fethc 20 product and 20 query to fethc there caegroy
insread make 1 query


 # 3. Server is overloaded
  cachine
  SSG /ISR
  Load balance aws ec2 instance same code deployed in dieffernt machines

# 4 Cachine




