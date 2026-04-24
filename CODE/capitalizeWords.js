/**
 * O(n)
 * S(n)
 */

function capitalizeWords(str) {
  if (str === "") {
    return "";
  }
  const parts = str.split(" ");
  let string = "";

  for (let i = 0; i < parts.length; i++) {
    if (string !== "") {
      string = string + " ";
    }
    const a = parts[i].charAt(0);
    string = string + parts[i].replace(a, a.toUpperCase());
  }
  return string;
}

console.log(capitalizeWords("hello world")); // "Hello World"
console.log(capitalizeWords("javascript is fun")); // "Javascript Is Fun"
console.log(capitalizeWords("a quick fox")); // "A Quick Fox"
console.log(capitalizeWords("")); // ""
