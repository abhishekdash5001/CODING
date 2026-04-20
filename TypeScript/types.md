# its liek created object with some props

1.they dont extends they intersect

```ts
type Person1 = {
  name: string;
};

type Person2 = {
  id: number;
};

type Person3 = Person1 & Person2;

const p1: Person3 = {
  name: "string",
  id: 23,
};
```

2 they can do unionso ftypes and premitive types

```ts
type PersonUnion = Person1 | Person2;

const p2: PersonUnion = {
  id: 23,
};
```

3.Tupple

```ts
type Mytuple = [Person1, Person2, Person3];

const amu: Mytuple = [{ name: "sd" }, { id: 32 }, { id: 23, name: "ssd" }];
```



4.Extract So Extract works well with unions like:

string unions
union of object types

```ts
type Lion ={
    legs:string
}

type Address={
    pincode:string
}

type ThemUnion = Lion| Address

type AN= Extract<ThemUnion,Lion>
```



5.Partial

```ts
type PersonA = {
  name: string;
  age: number;
  addahr: number;
};

const refugee: Partial<PersonA> = {
  name: "abhishek",
};



```


6.Pick


```ts

type PersonA={
  name:string
  age:number,
  adhar:string
  DL:string
}


type REefugge = Pick<PersonA,'name'>

type REefugge = {
    name: string;
}

```


7.Omit

```ts
type PersonA={
  name:string
  age:number,
  adhar:string
  DL:string
}


type REefugge = Omit<PersonA,'name'>

type REefugge = {
    age: number;
    adhar: string;
    DL: string;
}
```


8 Exclude

to remove a typpe from union


```ts

type State='succes'|'loading'|'failed'


type FinalState = Exclude<State,'loading'>
type FinalState = "succes" | "failed

```
