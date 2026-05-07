# express → to create backend APIs
# cors → to allow frontend localhost:3000 to call backend localhost:4000
# dotenv → to read secret keys from .env
# nodemon → auto restart server during development

## 1. Checks cartId exists
## 2. Finds cart from  DB
## 3. Hardcodes logged-in user as user_1
## 4. Checks cart belongs to user
## 5. Calculates amount from backend data
## 6. Creates pending order
## 7. Returns order details


## payment gate way keys and validation logicn should never live in front end so need a deciateer backned server for this
## also fotont onlys neds cart id bacned checks cart id is preset ot or then user belongs to card id or not then calcuates the apmount then call payemtn gateway create apending order sends it to front end


# cart means user is still shoping
# order means we have frozen the amount 


# rajorpay
 ## we dont install razor pay chaeckout page like npm packages insteaed checkout sprcipt tis loaded in the front end  then window.razorpay is aviablae
 ## we create razopr pay instance and then open the popup