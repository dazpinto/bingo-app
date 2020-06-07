<template>
  <div>
    <input type='text' v-model='encryptedCode' />

    <BingoCard
      v-if='hasEncryptedCode'
      :cells='unEncryptedData'
    />
  </div>
</template>

<script>
import SimpleCrypto from "simple-crypto-js";

import BingoCard from './BingoCard';

export default {
  name: 'CheckCard',
  components: {
    BingoCard,
  },

  data() {
    return {
      encryptedCode: '',
    };
  },
  computed: {
    hasEncryptedCode: function () {
      return this.encryptedCode.length > 5;
    },
    unEncryptedData: function () {
      if (this.hasEncryptedCode) {
        return new SimpleCrypto('flubber').decrypt(this.encryptedCode).split('-');
      }
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
