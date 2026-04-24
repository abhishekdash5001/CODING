const s = "cbaebabacd";
const pList = ["abc", "bca", "a", "", null, "acb"];

function findAllAnagramIndices(str, list) {
  let obj = {};

  for (let i = 0; i < list.length; i++) {
    const e = list[i];
    if(!e){
        continue
    }
    const map = new Map();
    for (let k = 0; k < e.length; k++) {
      if (map.has(e.charAt(k))) {
        map.set(e.charAt(k), map.get(e.charAt(k)) + 1);
      } else {
        map.set(e.charAt(k), 1);
      }
    }
    console.log(map);

    for (let z = 0; z <= str.length - e.length; z++) {
      const map2 = new Map([...map]);
      let newSubstr = str.substr(z, e.length);

      for (let k = 0; k < newSubstr.length; k++) {
        let o = newSubstr.charAt(k);

        if (map2.has(o)) {
          map2.set(o, map2.get(o) - 1);
        }
      }

      let counter = true;
      for (let v of map2.values()) {
        if (v !== 0) {
          counter = false;
          break
        }
      }
      if (counter) {
        if (!obj.hasOwnProperty(e)) {
          obj[e] = [];
        }
        obj[e].push(z);
      }
    }
  }

  return obj
}

console.log(findAllAnagramIndices(s, pList));

/*📤 Expected Output

{
  abc: [0, 6],
  bca: [0, 6],
  a: [2, 5, 7],
  acb: [0, 6]
}
*/
