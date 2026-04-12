function distance(array) {
  let result = [];
  let positions = {};

  for (let i = 0; i < array.length; i++) {
    if (!positions[array[i]]) {
      positions[array[i]] = [];
    }
    positions[array[i]].push(i);
  }

  for (let prop in positions) {
    const pos = positions[prop];
    const n = pos.length;

    const prefixSum = new Array(n).fill(0);

    prefixSum[0] = pos[0];

    for (let i = 1; i < n; i++) {
      prefixSum[i] = prefixSum[i - 1] + pos[i];
    }

    for (let k = 0; k < n; k++) {
      const idx = pos[k];//0
      const leftSum = k > 0 ? idx * k - prefixSum[k - 1] : 0;
      const rightSum =
        k < n - 1 ? prefixSum[n - 1] - prefixSum[k] - idx * (n - k - 1) : 0;
      result[idx] = leftSum + rightSum;
    }
  }

  return result;
}

console.log(distance([1, 2, 1, 3, 3, 1]));
