<template>
  <div class="about">

    <section class='box'>
      <div class='level'>
        <div class='level-left'>
          <div class='level-item'>
            <b-field>
              <p class="control">
                <span class="button is-static">Number of cards</span>
              </p>
              <b-numberinput
                v-model.number='noOfCards'
                min='1'
                max='100'
                controls-position="compact"
              />
            </b-field>
          </div>

          <div class='level-item'>
            <b-field>
              <p class='control'><span class='button is-static'>Dabber: </span></p>
              <b-radio-button
                v-for='(style, i) in dabberStyles'
                v-model="dabberStyle"
                :native-value="style"
                type="is-warning"
                :key='i'
              >
                <div :class="['dab-preview', 'dab--'+style]"></div>
              </b-radio-button>
            </b-field>
          </div>
        </div>
      </div>
    </section>

    <div class='bingo-cards'>
      <div class='bingo-cards_card' v-for="(card, index) in cards" :key='index'>
        <BingoCard :cardNo='index + 1' />
      </div>
    </div>
  </div>
</template>

<script>
import { range } from 'lodash';

import { mapState } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import BingoCard from '../components/BingoCard.vue';

export default {
  components: {
    BingoCard,
  },

  data() {
    return {
      noOfCards: 1,
    };
  },

  computed: {
    ...mapState([
      'dabberStyles'
    ]),
    ...mapFields([
      'dabberStyle',
    ]),
    cards: function () {
      return range(0, this.noOfCards);
    },
  },
};
</script>

<style lang='scss'>
.bingo-cards {
  display: flex;
  flex-wrap: wrap;
}

.bingo-cards_card {
  flex: 1 1 40%;
  padding: 8px 12px;
  @media screen and (max-width: 800px) {
    flex-basis: 100%;
  }
  @media screen and (min-width: 1280px) {
    flex-basis: 33%;
  }
  @media screen and (min-width: 1800px) {
    flex-basis: 25%;
  }
}

.dab-preview {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
}

</style>
