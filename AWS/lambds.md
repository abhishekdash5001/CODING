## is like we nnot running the whle node server in ec2 instead we have aws a function and request comes in aws executed that function]

EC@i is like you opened the 24 7 
labmsa when order comes you give a ktichen for some time


User picks file in browser
        ↓
Frontend asks your backend: "Can I upload this file?"
        ↓
Backend creates temporary signed permission permanent AWS credentials admin access to your bucket AWS secret key    
        ↓
Backend sends that signed URL/policy back
        ↓
Browser uploads file directly to S3
        ↓
S3 stores file
        ↓
S3 triggers Lambda


1. Open AWS Lambda
Click Create function 
Fill basic details rntuime function name
execution role s3bucket  writing to DynamoDB
creatfunction 
then we can write the code there itslef
deploy


USER selects file
FRONTEND sends file metadata to BACKEND
BACKEND creates signed S3 upload URL
BACKEND returns signed URL to FRONTEND
FRONTEND uploads file directly to S3
S3 stores file
S3 triggers LAMBDA
LAMBDA processes uploaded file
LAMBDA optionally saves result + updates DB