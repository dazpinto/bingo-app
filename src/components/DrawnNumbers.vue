<template>
  <div class='hero is-info' v-if='lastCoupleOfNumbers.length > 0'>
    <div class='hero-body'>
      <div class='container'>
        <div class='last-drawn-numbers'>
          <ZoomCenterTransition group>
            <div v-for="number in numbersSet" :key='number' class='last-drawn-numbers_number has-text-info'>
              {{ number }}
            </div>
          </ZoomCenterTransition>
        </div>

        <div class="field show-all-container" v-show='hasMoreNumbers'>
          <b-switch v-model="showAll">
            Show All
          </b-switch>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { reverse, tail, takeRight } from 'lodash';
import { mapState } from 'vuex';

import { ZoomCenterTransition } from 'vue2-transitions'

const numberToShow = 5;

export default {
  name: 'DrawnNumbers',
  components: {
    ZoomCenterTransition,
  },
  data() {
    return {
      showAll: false,
    };
  },
  computed: {
    ...mapState([
      'drawnNumbers',
    ]),

    numbersSet() {
      return this.showAll ? this.allNumbersSorted : this.lastCoupleOfNumbers;
    },

    lastCoupleOfNumbers() {
      const last = takeRight(this.drawnNumbers, numberToShow + 1);
      return tail(reverse(last));
    },

    hasMoreNumbers() {
      return this.drawnNumbers.length > numberToShow;
    },

    allNumbersSorted() {
      return this.drawnNumbers.sort((a, b) => a - b);
    }
  },
}
</script>

<style lang='scss'>
  .last-drawn-numbers {
    font-size: 2em;
  }

  .last-drawn-numbers_number {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
    width: 1.8em;
    height: 1.8em;
    text-align: center;
    background: white;
    font-weight: bold;
    border-radius: 100%;
    opacity: .8;
  }

  .show-all-container {
    margin: 8px 0;
    font-size: 0.8em;
  }
</style>
