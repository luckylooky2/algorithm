function getMaxDigit(arr) {
  let maxDigit = -Infinity;

  arr.map((v) => {
    let digit = 1;
    let quotient = Math.floor(v / 10);
    while (quotient > 0) {
      digit++;
      quotient = Math.floor(quotient / 10);
    }
    maxDigit = Math.max(digit, maxDigit);
  });

  return maxDigit;
}

function radixSort(arr) {
  const POS = 0,
    NEG = 1;
  let sorted = [[], []];
  const maxDigit = [];
  arr.map((v) => sorted[v < 0 ? NEG : POS].push(Math.abs(v)));
  for (let i = 0; i < 2; i++) maxDigit[i] = getMaxDigit(sorted[i]);

  for (let i = 0; i < 2; i++) {
    for (let i = 0; i < maxDigit[i]; i++) {
      const base = new Array(10).fill(null).map((v) => new Array());
      let tmp = [];
      sorted[i].map((v) => {
        // i 자리 숫자를 구함
        const lst = String(v).split("");
        const res =
          i > lst.length - 1 ? null : parseInt(lst[lst.length - 1 - i], 10);
        if (res !== null) base[res].push(v);
        else base[0].push(v);
      });
      for (let i = 0; i < 10; i++) tmp = tmp.concat(base[i]);
      sorted[i] = tmp;
    }
  }

  return sorted[NEG].map((v) => v * -1).concat(sorted[POS]);
}

module.exports = radixSort;
