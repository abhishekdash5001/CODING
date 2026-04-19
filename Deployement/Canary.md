## Canary deployment strategiy is  away where we rollout out new version to a small amout of users first then gradually increaese to 100%

## Goal is when we rooling out our new version we need to be 100% sure it will not cause in outage

## we deplout need version in one for the server and montior vitals its is there increase in cpu or memmory and incerase in error or eeceptionn if there is no spike then
do side by side comparision with new infra and old infra and we also check our business logic in this sever

will gradulaly increase the servers on v2 if some thing wrong rollback


# Step 1 
We create 1 pod there we clone the new changes that version of code and run our server 

# step 2

We add some configuartion to load balancer of aws to route 5% to canary pod 95% to stable pod







# Pros 
you can test your code in production
Roll back is so simple
Minimum blast radius
Zero downtype
we can also ship when we are unsure about the changes
A/B testing done trebutcher feature falgs 0% first then add ur user taste it some other devs tess then change condig 5% likethis

we can shose user based location like whatapp upi internall emplyes or age group

# Cons
We get used to test in production
Arcitecture iscosntly like trebutchet ALB 
Montioring


# when canary is must 
1. Auth changes 