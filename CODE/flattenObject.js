function flattenObject(obj, parentProp) {
  const result = {};

  function helper(obj, preFix) {
    for (let prop in obj) {
      const e = obj[prop];
      const newKey = preFix ? preFix + "." + prop : prop;
      if (typeof e === "object" && typeof e !== null) {
        helper(e, newKey);
      } else {
        result[newKey]= e
      }
    }
  }

  helper(obj, "");
  return result;
}

const input = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: {
        g: 1,
      },
    },
  },
};

console.log(flattenObject(input));
/*
  {
    "a": 1,
    "b.c": 2,
    "b.d.e": 3
  }
  */
