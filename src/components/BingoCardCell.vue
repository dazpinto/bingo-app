<template>
  <div class='bingo-cell'>
    <button
      v-if='!isEmpty'
      @click='dabIt'
      class='bingo-cell_button'
      :data-value-of-the-cell-stop-cheating="value"
    >
      <span
        v-if='!isEmpty'
        :class="['bingo-cell_dab', dabberClass, isDabbed ? 'bingo-cell_dab--dabbed' : '']"
        :style='dabStyles'>
      </span>
    </button>
  </div>
</template>

<script>
import { clamp } from 'lodash';
import { mapGetters } from 'vuex';

export default {
  props: {
    value: {
      type: Number,
    },
  },
  data() {
    return {
      isDabbed: false,
      dabPositionX: '50%',
      dabPositionY: '50%',
    }
  },
  computed: {
    ...mapGetters([
      'dabberClass',
    ]),
    isEmpty: function () {
      return this.value === null;
    },
    dabStyles: function () {
      return {
        top: this.dabPositionY,
        left: this.dabPositionX,
      };
    }
  },
  methods: {
    dabIt: function (event) {
      this.isDabbed = !this.isDabbed;

      const percentX = (event.offsetX / event.target.offsetWidth) * 100;
      const percentY = (event.offsetY / event.target.offsetHeight) * 100;

      if (this.isDabbed === true) {
        this.dabPositionX = `${clamp(percentX, 20, 80)}%`;
        this.dabPositionY = `${clamp(percentY, 20, 80)}%`;
      }
    },
  },
};
</script>

<style lang='scss'>
@import '../base';

.bingo-cell {
  position: relative;
  background-color: #DEDEDE;
  border: 1px solid #666;

  button {
    appearance: none;
    display: block;
    width: 100%;
    height: 100%;
    font-family: $family-secondary;
    border: 0 none;
    background: white;
    font-size: 1.4em;
    cursor: pointer;
    padding: 12px 0;
    &::before {
      content: attr(data-value-of-the-cell-stop-cheating);
    }
  }

}

.bingo-cell_dab {
  position: absolute;
  display: block;
  /* top/left dependant on where user clicks it */
  transform: translate(-50%, -50%) scale(0);
  border-radius: 100%;
  opacity: .8;
  width: 80%;
  transition: transform 0.2s ease-in-out;
  z-index: 10;
  &::before {
    content: "";
    display: block;
    height: 0;
    padding-top: 100%;
  }
  &.bingo-cell_dab--dabbed {
    transform: translate(-50%, -50%) scale(1);
  }
}

</style>