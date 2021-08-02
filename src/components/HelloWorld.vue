<template>
  <div
  >
    <ul>
      <li v-for="(coordinate, idx) in model.coordinates"
          :key="idx"
      >
        {{coordinate.deviceId}}: ({{coordinate.x}}, {{coordinate.y}})
      </li>
    </ul>
    <div class="map">
      <img
        @click="update(Msg.onTapImg($event))"
        src="/bg.png"
        class="background"
      />
    </div>
    <div class="flags">
      <div
        v-for="(coordinate, idx) in model.coordinates"
        :key="idx"
        :style="`top:${coordinate.y}px; left:${coordinate.x}px`"
        class="flag"
      >
        <img src="/flag.jpg" />
        <span>{{ coordinate }}</span>
      </div>
    </div>

    <div
      v-if="model.pos !== null"
      class="modal"
      >
      <div
        @click="update(Msg.cancel())"
        class="modal-bg"
      >
      </div>
      <div class="modal-content">
        <label>型番: </label>
        <input @input="update(Msg.onInputDeviceId($event.currentTarget.value))" />
        <label> ( </label>
        <input :value="model.pos.x" />, <input :value="model.pos.y" />
        <label> ) </label>
        <div>
          <button
            @click="update(Msg.add())"
          >
            add
          </button>
          <button
            @click="update(Msg.cancel())"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Model, Msg, update} from '../input';

export default {
  name: 'HelloWorld',
  props: {
  },
  data: () => {
    return {
      Msg
    , model: Model.main('', null, [])
    }
  },
  methods: {
    update(msg) {
      this.model = update(msg, this.model);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  border: solid 1px black;
  overflow: auto;
  position: absolute;
}
img.background {
  width: 100%;
}
.flags {
  position: absolute;
}
.flag {
  position: absolute;
}
.flag img {
  width: 20px;
  height: 20px;
}
.modal {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-bg {
  position: fixed;
  background: rgba(50, 50, 50, 0.3);
  width: 100%;
  height: 100%;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: solid 1px black;
  padding: 20px;
}
</style>
