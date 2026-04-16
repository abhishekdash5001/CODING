# Elastic compute cloud

EC2 is a virtual machine in aws and we run our app in that selct configurtion 
before ec2 we have to buy real server and wait produremtn
with ec2 i can create instance an time modify it and close it any time  pay as per usage

when we create ec2 aws gives us os ram disk secuoty network login method


# EC2 instance

pending → being created
running → active  -biiling
stopping  billing
stopped  billing
shutting-down  billing
terminated  billing stoped

instance is our virtaual macine


## how do we install node js in ec2
 node js
 app code 
 ngnix laod bancler 
 env vairable
 pm2 docer so that app crashed it can <-- if node js app crashed pm2 starts it ec2 restarts or remboot pm2 starts it


## 6) How do you deploy a Node.js app to EC2?
 first we create ec2 instance in amaxon console confgure it then aws gives ip 

 ssh -i mykey.pem ubuntu@<public-ip>

sudo apt update
sudo apt install nodejs npm git -y
sudo npm install -g pm2
git clone <your-repo-url>
cd your-project
npm install
pm2 start server.js --name my-app

in ec2 is localhost 3000 but client calls http://<ec2-public-ip>


## 9) On which port does Node app run?
Expected:
Usually internal port like 3000, while public traffic comes through Nginx or ALB on 80/443.

user -->load balncer/ngnix-->ec2 ->db cache

## 12) What ports would you open for a Node app?
  80/443 for load balnacer

## 18) What is Auto Scaling?
Expected:
“It automatically adds or removes EC2 instances based on policies and maintains desired capacity.” AWS Auto Scaling keeps the desired number of instances running and can replace unhealthy ones.


21) How would you make a Node app highly available on EC2?
Expected:

multiple instances
multiple AZs
load balancer
auto scaling
stateless app design


# 22) Describe production architecture for Node.js on EC2.
Strong answer:
# “ALB in front,  , app load balnce
 # Node app on multiple EC2 instances in Auto Scaling Group, 
 
   # DB separate,
   #  IAM role for AWS access,  - so that ec2 can talk to aws ervice
   #  CloudWatch for logs and metrics.”

#Security Groups -> firewall rules
    #  nate  gaeway so that ec2 can dowalg updates


```js

                 Internet
                    |
                 Route53<<---
                    |
               ALB (public) port 88/441 ngnix
              /            \
             /              \
     EC2 Node App       EC2 Node App
   (private subnet)   (private subnet)
          |                  |
          +-------- DB -------+
             (RDS private)

Support:
- ASG manages EC2 count  checkedn ec2 is healthy  pm2 checks if nodde has crahsed
- IAM role gives AWS permissions
- CloudWatch monitors logs/metrics


```

## Auto Scaling adds instances based on rules you configure. It does not “understand traffic” by itself.


if average CPU > 70%, add 1 instance
if average CPU < 30%, remove 1 instance