const ROW = 12;
const COLUMN = 13;
const FORMULA_ARR = 12;
const INTERVAL_VEC = 6;
const PREINTERVAL_VEC = 11;

const NOTES = new Map([
  [11, "B"],
  [10, "A<sup>♯</sup>"],
  [9, "A"],
  [8, "G<sup>♯</sup>"],
  [7, "G"],
  [6, "F<sup>♯</sup>"],
  [5, "F"],
  [4, "E"],
  [3, "D<sup>♯</sup>"],
  [2, "D"],
  [1, "C<sup>♯</sup>"],
  [0, "C"],
  [12, "C"],
]);

const INTERVALS = new Map([
  [-11, "-7M"],
  [-10, "-7m"],
  [-9, "-6M"],
  [-8, "-6m"],
  [-7, "-5j"],
  [-6, "-4+"],
  [-5, "-4j"],
  [-4, "-3M"],
  [-3, "-3m"],
  [-2, "-2M"],
  [-1, "-2m"],
  [0, "1"],
  [1, "2m"],
  [2, "2M"],
  [3, "3m"],
  [4, "3M"],
  [5, "4j"],
  [6, "4+"],
  [7, "5j"],
  [8, "6m"],
  [9, "6M"],
  [10, "7m"],
  [11, "7M"],
  [12, "8j"],
]);

exports.ROW = ROW;
exports.COLUMN = COLUMN;
exports.FORMULA_ARR = FORMULA_ARR;
exports.INTERVAL_VEC = INTERVAL_VEC;
exports.PREINTERVAL_VEC = PREINTERVAL_VEC;
exports.NOTES = NOTES;
exports.INTERVALS = INTERVALS;
