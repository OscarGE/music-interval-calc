const {
  ROW,
  COLUMN,
  NOTES,
  INTERVALS,
  FORMULA_ARR,
  PREINTERVAL_VEC,
  INTERVAL_VEC
} = require("../constants");

/*
The matrix indicates the distance between two selected notes in a binary vector. In case of selecting more than two notes, the vector is partitioned and the matrix will give you the distance between two notes of each fragment in the vector. 
A 12x13 matrix (preIntervalMatrix) is created, a binary vector (input) and a vector that will contain the numbers related to the notes (NOTES) are declared.
 */
const interval_matrix = (input) => {
  var preIntervalMatrix = [[], [], [], [], [], [], [], [], [], [], [], [], []];
  var intervalMatrix = [[], [], [], [], [], [], [], [], [], [], [], [], []];
  var intervalMatrixSort = [[], [], [], [], [], [], [], [], [], [], [], [], []];
  //Arrays are looped through and filled with the empty character
  for (let i = 0; i <= ROW; i++) {
    for (let j = 0; j <= COLUMN; j++) {
      preIntervalMatrix[i][j] = "";
      intervalMatrix[i][j] = "";
      if (j < 13) {
        intervalMatrixSort[i][j] = "";
      }
    }
  }
  /* 
  The matrix is ​​traversed with two for loops and in each cell the binary vector is 
  evaluated to determine which section of the table it is in, and thus use a formula to determine its value.
  */
  for (let i = 0; i <= ROW; i++) {
    for (let j = 0; j <= COLUMN; j++) {
      //Identifies the first cell of the [0][0] array
      if (i == 0 && j == 0) {
        preIntervalMatrix[i][j] = "";
        input[11] == 0
          ? (intervalMatrix[i][j] = "")
          : (intervalMatrix[i][j] = NOTES.get(0)); //C
      }
      //Identifies the top end of the second column
      if (i == 0 && j == 1) {
        input[11] == 0
          ? (preIntervalMatrix[i][j] = "")
          : (preIntervalMatrix[i][j] = 12);
        NOTES.has(preIntervalMatrix[i][j])
          ? (intervalMatrix[i][j] = NOTES.get(preIntervalMatrix[i][j]))
          : (intervalMatrix[i][j] = "");
      }
      //Identifies the first column and first row
      if (i != 0 && j == 0) {
        input[i - 1] == 0
          ? (preIntervalMatrix[i][j] = "")
          : (preIntervalMatrix[i][j] = Array.from(NOTES.keys())[i - 1]);
        NOTES.has(preIntervalMatrix[i][j])
          ? (intervalMatrix[i][j] = NOTES.get(preIntervalMatrix[i][j]))
          : (intervalMatrix[i][j] = "");
      }
      if (i == 0 && j >= 2) {
        input[j - 2] == 0
          ? (preIntervalMatrix[i][j] = "")
          : (preIntervalMatrix[i][j] = Array.from(NOTES.keys())[j - 2]);
        NOTES.has(preIntervalMatrix[i][j])
          ? (intervalMatrix[i][j] = NOTES.get(preIntervalMatrix[i][j]))
          : (intervalMatrix[i][j] = "");
      }
      //Identifies the second column after its top end
      if (j == 1 && i != 0) {
        input[i - 1] == 1 && input[11] == 1
          ? (preIntervalMatrix[i][j] =
              preIntervalMatrix[0][j] - preIntervalMatrix[0][i + 1])
          : (preIntervalMatrix[i][j] = "");
        INTERVALS.has(preIntervalMatrix[i][j])
          ? (intervalMatrix[i][j] = INTERVALS.get(preIntervalMatrix[i][j]))
          : (intervalMatrix[i][j] = "");
      }
      //Identify the main diagonal
      if (j - i == 1 && i != 0 && j != 1) {
        if (input[j - 2] == 0) {
          preIntervalMatrix[i][j] = "";
          intervalMatrix[i][j] = "";
        } else {
          preIntervalMatrix[i][j] = 0;
          intervalMatrix[i][j] = Array.from(NOTES.values())[i - 1];
        }
      }
      //Identify the upper triangular matrix
      if (i < j && j - i != 1 && i >= 1) {
        input[j - 2] == 1 && input[i - 1] == 1
          ? (preIntervalMatrix[i][j] =
              preIntervalMatrix[0][j] - preIntervalMatrix[0][i + 1])
          : (preIntervalMatrix[i][j] = "");
        INTERVALS.has(preIntervalMatrix[i][j])
          ? (intervalMatrix[i][j] = INTERVALS.get(preIntervalMatrix[i][j]))
          : (intervalMatrix[i][j] = "");
      }
      //Identify the lower triangular matrix
      if (i >= j && j != 0 && j != 1) {
        input[j - 2] == 1 && input[i - 1] == 1
          ? (preIntervalMatrix[i][j] =
              preIntervalMatrix[0][j] - preIntervalMatrix[0][i + 1])
          : (preIntervalMatrix[i][j] = "");
        INTERVALS.has(preIntervalMatrix[i][j])
          ? (intervalMatrix[i][j] = INTERVALS.get(preIntervalMatrix[i][j]))
          : (intervalMatrix[i][j] = "");
      }
    }
  }
  //Sort the matrix by reversing the columns after the first and removing the last
  for (let i = 0; i <= ROW; i++) {
    for (let j = 0; j <= COLUMN - 1; j++) {
      if (j == 0) {
        intervalMatrixSort[i][j] = intervalMatrix[i][j];
      }
      if (j > 0 && j < 13) {
        intervalMatrixSort[i][j] = intervalMatrix[i][COLUMN - j];
      }
    }
  }
  return intervalMatrixSort;
};

const intervalic_formula = (input) => {
  var intervalForm = new Array(FORMULA_ARR).fill("");
  var preIntervalForm = new Array(FORMULA_ARR - 1).fill("");
  var firstPreIntervalForm = FORMULA_ARR;
  /*
  Calculate the pre-interval formula (preIntervalForm[11]) 
  The input binary vector is traversed, if a 1 is found (note activated) 
  the vector is traversed from its position to find another 1 and calculate 
  the distance between the gaps, 
  eg : 1 0 0 0 0 1 0 0 0 0 0 0, there is a distance of 5 gaps between the 1s. 
  The variable k is the gap counter.
  */
  for (let i = 0; i < FORMULA_ARR - 1; i++) {
    if (input[i] == 1) {
      for (let j = i + 1, k = 1; j <= 11; j++, k++) {
        if (input[j] == 1) {
          preIntervalForm[i] = k;
          break;
        }
      }
    }
  }
  /*
  Calculate variable that will be the first element of the interval formula (firstPreIntervalForm). 
  firstPreIntervalForm is equal to 12 minus the sum of all the elements of preIntervalForm.
  */
  for (let i = 0; i < FORMULA_ARR - 1; i++) {
    if (preIntervalForm[i] != "") {
      firstPreIntervalForm -= preIntervalForm[i];
    }
  }
  /*
  Add the variable firstPreIntervalForm in the first position of the preIntervalForm.
  */
  preIntervalForm.unshift(firstPreIntervalForm);
  /*
  Define the interval formula, intervalForm = substitute numbers from the preIntervalForm 
  by the corresponding intervals and invert their positions.
  */
  for (let i = 0; i < FORMULA_ARR; i++) {
    if (preIntervalForm[i] != "") {
      intervalForm[i] = INTERVALS.get(preIntervalForm[i]);
    }
  }
  return intervalForm.reverse();
}

const intervalic_vector = (input) => {
  var preIntervalMatrix = [[], [], [], [], [], [], [], [], [], [], [], [], []];
  var preIntervalVector = Array(PREINTERVAL_VEC).fill(0);
  var intervalVector = Array(INTERVAL_VEC).fill(0);

  for (let i = 0; i <= ROW; i++) {
    for (let j = 0; j <= COLUMN; j++) {
      preIntervalMatrix[i][j] = "";
    }
  }
  /*
  Again it will be necessary to construct the intervallic matrix. 
  The array is traversed with two for loops and in each cell the binary vector 
  is evaluated to determine which section of the table it is in. 
  This time it is only required to locate the first row of the table and the lower triangular matrix.
  */
  for (let i = 0; i <= ROW; i++) {
    for (let j = 0; j <= COLUMN; j++) {
      //Identify the first row.
      if (i == 0 && j >= 2) {
        input[j - 2] == 0
          ? (preIntervalMatrix[i][j] = "")
          : (preIntervalMatrix[i][j] = Array.from(NOTES.keys())[j - 2]);
      }
      //Identify the lower triangular matrix.
      if (i >= j && j != 0 && j != 1) {
        input[j - 2] == 1 && input[i - 1] == 1
          ? (preIntervalMatrix[i][j] =
              preIntervalMatrix[0][j] - preIntervalMatrix[0][i + 1])
          : (preIntervalMatrix[i][j] = "");
      }
    }
  }
  /*
  Each diagonal of the lower triangular matrix is ​​traversed, from top to bottom, 
  and each respective value is added to that matrix. 
  The results of that sum are entered into the vector preIntervalVector, 
  at the position corresponding to the diagonal of the lower triangular matrix.
  */
  for (let i = 0; i <= ROW; i++) {
    for (let j = 0; j <= COLUMN; j++) {
      if (
        i - j >= 0 &&
        i - j < PREINTERVAL_VEC &&
        preIntervalMatrix[i][j] != ""
      ) {
        preIntervalVector[i - j] += preIntervalMatrix[i][j];
      }
    }
  }
  /*
  The vector preIntervalVector is traversed to divide each of its values ​​by 
  a number that starts at 1 and that will increase in each position of the array.
  */
  for (var i = 0, j = 1; i < PREINTERVAL_VEC; i++, j++) {
    preIntervalVector[i] = preIntervalVector[i] / j;
  }
  /*
  The vector preIntervalVector is traversed again and its extremums are added, 
  and its result will be entered in the next vector position intervalVector. 
  In each iteration the extremes will get closer to the center, 
  and once there the original value will be maintained.
  */
  for (let i = 0, j = PREINTERVAL_VEC - 1; i < INTERVAL_VEC; i++, j--) {
    i == j
      ? (intervalVector[i] = preIntervalVector[i])
      : (intervalVector[i] = preIntervalVector[i] + preIntervalVector[j]);
  }

  return intervalVector;
}

module.exports = {
  interval_matrix,
  intervalic_formula,
  intervalic_vector
};