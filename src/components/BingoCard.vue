<template>
  <div class='bingo-card-wrapper'>
    <div class='level'>
      <div class='level-left'>
        <div class='level-item'>
          <h4 class='is-family-secondary is-size-4'>Card: {{ cardNo }}</h4>
        </div>
      </div>
      <div class='level-right'>
        <div class='level-item'>
          <b-button
            type='is-white'
            icon-pack='far'
            icon-left="copy"
            v-clipboard:copy="shareCode"
          >
          </b-button>
        </div>
      </div>
    </div>

    <div class='bingo-card'>
      <BingoCardCell v-for="cell in cells" :value='cell' />
    </div>
  </div>
</template>

<script>
import { each, map, range, sampleSize, shuffle } from 'lodash';
import SimpleCrypto from "simple-crypto-js";

import BingoCardCell from './BingoCardCell';
import bingoNumbersGenerator from '../lib/bingoNumbersGenerator';

export default {
  components: {
    BingoCardCell,
  },
  props: {
    cardNo: '',
    cells: {
      type: Array,
      default: () => bingoNumbersGenerator(),
    }
  },

  computed: {
    shareCode: function () {
      return new SimpleCrypto('flubber').encrypt(this.cells.join('-'));
    },
  },
};

</script>

<style lang='scss'>
.bingo-card-wrapper {
  margin: 0 auto;
  max-width: 700px;
  .level {
    margin-bottom: 4px;
  }
}

.bingo-card {
  border: 2px solid #333;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
</style>