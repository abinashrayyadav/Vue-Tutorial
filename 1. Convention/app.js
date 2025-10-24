const app = Vue.createApp({
  data() {
    return {
      message: 'Hello Vue 3!',
      count: 0,
      showMessage: false,
      x:0,
      y:0,
      arr: ["Item first", "Item second", "Item third", "Item fourth"],
    };
  },
  methods: {
    increaseCount() {
      this.count += 1;
    },
    decreaseCount() {
      this.count -= 1;
    },
    decreaseCountBy2(num) {
      this.count -= num;
    },
    toggleMessage() {
      this.showMessage = !this.showMessage;
    },
    handleEvent(e) {
      console.log(e);
    },
    handleEventPos(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  },
  mounted() {
    console.log('Component mounted...')
  },
  computed: {
    countMessage() {
      if (this.count > 0) return `Count is positive: ${this.count}`;
      if (this.count < 0) return `Count is negative: ${this.count}`;
      return `Count is zero`;
    },

    itemCount() {
      return this.arr.length;
    }
  },
});

app.mount('#app');
