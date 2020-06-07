import { each, map, pull, range, sampleSize, shuffle } from 'lodash';

export default function () {
  const TOTAL_NUMBERS_TO_FIND = 15;
  const MAX_ROWS = 3;

  const availableNumbers = range(1,90);
  let totalChosen = 0;

  let chosenNumbersBy10s = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  };

  while (totalChosen < TOTAL_NUMBERS_TO_FIND) {
    const candidates = sampleSize(availableNumbers, TOTAL_NUMBERS_TO_FIND - totalChosen);

    // populate chosenNumbersBy10s by 10s
    each(candidates, (value) => chosenNumbersBy10s[Math.floor(value / 10)].push(value));

    // check there are less than 3 numbers for each 10th
    each(chosenNumbersBy10s, (nums, key) => {
      if (nums.length > MAX_ROWS) {
        chosenNumbersBy10s[key] = sampleSize(nums, MAX_ROWS);
      }

      pull(availableNumbers, ...chosenNumbersBy10s[key]);

      totalChosen += chosenNumbersBy10s[key].length;
    });
  }

  // make sure all cells in a bingo card have a value
  map(chosenNumbersBy10s, (numbers) => {
    while (numbers.length < 3) {
      numbers.push(null);
    }

    numbers;
  });

  // randomise where the null values are
  chosenNumbersBy10s = map(chosenNumbersBy10s, shuffle);

  // combine into 1 dimensional array in the right order
  const cells = [];
  each(range(0, 3), (i) => {
    each(chosenNumbersBy10s, (nums) => cells.push(nums[i]));
  });

  return cells;
}