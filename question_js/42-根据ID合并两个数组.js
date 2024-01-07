const join = (arr1, arr2) => {
  const d = new Map(arr1.map(item => [item.id, item]));

  arr2.forEach((x) => {
    if (d.has(x.id)) {
      d.set(x.id, { ...d.get(x.id), ...x });
    } else {
      d.set(x.id, x);
    }
  })

  return [...d.values()].sort((a, b) => a.id - b.id);
}

let arr1 = [
  { "id": 1, "b": { "b": 94 }, "v": [4, 3], "y": 48 }
]
let arr2 = [
  { "id": 1, "b": { "c": 84 }, "v": [1, 3] }
]

const arr = join(arr1, arr2);
console.log(arr);

const list = new Map([
  { "id": 1, "b": { "b": 94 }, "v": [4, 3], "y": 48 }
])
