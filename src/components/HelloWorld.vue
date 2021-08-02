<template>
  <div
  >
{{ model.pos }}
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
        <div
          class="box"
          @mouseover="update(Msg.onHoverCoordinate(idx, true))"
          @mouseout="update(Msg.onHoverCoordinate(idx, false))"
        >
          <img src="/flag.jpg" class="image is-16x16 is-inline mr-1"/>
          <span>{{ coordinate.deviceId }}</span>
          <span class="" :class="{ 'is-hidden': coordinate.show === false }">
            ({{ coordinate.x }}, {{ coordinate.y }})
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="model.pos !== null"
      class="modal is-active"
      >
      <div
        @click="update(Msg.cancel())"
        class="modal-background"
      >
      </div>
      <div class="modal-content">
        <div class="box">
          <div class="field">
            <div class="control">
              <label>型番: </label>
              <input
                class="input is-inline is-small"
                @input="update(Msg.onInputDeviceId($event.currentTarget.value))"
              />
              <label> ( </label>
              <input
                class="input is-inline is-small"
                :value="model.pos.x"
              /> ,
              <input
                class="input is-inline is-small"
                :value="model.pos.y"
              />
              <label> ) </label>
            </div>
          </div>
          <div class="buttons is-flex is-justify-content-center">
            <button
              @click="update(Msg.add())"
              class="button"
              aria-label="close"
            >
              add
            </button>
            <button
              class="button"
              @click="update(Msg.cancel())"
            >
              cancel
            </button>
          </div>
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
  position: relative;
}
.flag {
  position: absolute;
}
</style>
