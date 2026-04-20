//This is called deriving a union type from an object’s values using:


const STATE={
    SUCCESS:'SUCCESS',
    ERROR:'ERROR',
    LOADING:'LOADING'

} as const // wihotut this State-sd will become string



type State_sd =(typeof STATE)[keyof typeof STATE]


