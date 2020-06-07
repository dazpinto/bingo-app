<template>
  <div>
    <section class='section'>
      <b-button
        type='is-success'
        size="is-large"
        @click='magicDrawNumber'
        :disabled="isDrawing"
        :loading="isDrawing"
      >
        <span v-show='!isDrawing'>Draw a number</span>
      </b-button>
    </section>

    <section class="hero is-primary" v-show='lastDrawnNumber'>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            <span v-if='hasLastBingoCall' class='is-family-secondary'>{{ lastBingoCall }}: </span>
            <span style='font-size:1.6em'>{{ lastDrawnNumber }}</span>
          </h1>
        </div>
      </div>
    </section>

    <DrawnNumbers />

    <CheckCard />



  </div>
</template>

<script>
import { random } from 'lodash';
import { mapGetters, mapMutations } from 'vuex';

import DrawnNumbers from '@/components/DrawnNumbers';
import CheckCard from '@/components/CheckCard';

export default {
  name: 'Home',
  components: {
    CheckCard,
    DrawnNumbers,
  },
  data() {
    return {
      name: 'aaa',
      isDrawing: false,
      encryptedCode: '',
    };
  },
  computed: {
    ...mapGetters([
      'hasLastBingoCall',
      'lastDrawnNumber',
      'lastBingoCall',
    ]),
  },
  methods: {
    ...mapMutations([
      'drawNumber',
    ]),
    magicDrawNumber() {
      const delay = random(0, 1, true);
      this.isDrawing = true;

      window.setTimeout(() => {
        this.drawNumber();
        this.isDrawing = false;
      }, delay * 1000);

    },
  },
}
</script>
