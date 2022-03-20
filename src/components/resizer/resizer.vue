<template>
  <div class="resizer" :style="{ '--size': handleSize + 'px' }">
    <div class="horizontal">
      <div
        class="resize-handle left"
        v-if="direction === 'left'"
        @mousedown.left="(e) => resizeStart(e)"
      />
      <div class="vertical">
        <div
          class="resize-handle top"
          v-if="direction === 'top'"
          @mousedown.left="(e) => resizeStart(e)"
        />
        <slot ref="slot" />
        <div
          class="resize-handle bottom"
          v-if="direction === 'bottom'"
          @mousedown.left="(e) => resizeStart(e)"
        />
      </div>
      <div
        class="resize-handle right"
        v-if="direction === 'right'"
        @mousedown.left="(e) => resizeStart(e)"
      />
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'

export default {
  name: 'resizer',
  props: {
    direction: {
      type: String,
      required: true,
    },
    maxSize: {
      type: Number,
      default: Infinity,
    },
    minSize: {
      type: Number,
      default: 4,
    },
    handleSize: {
      type: Number,
      default: 8,
    },
    intervalMs: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    resizeStart(e) {
      e.preventDefault()
      const slotElement =
        this.$slots.default?.[0]?.elm ?? this.$slots.default?.[0]
      const sign = ['right', 'bottom'].includes(this.direction) ? 1 : -1
      const [clientSize, clientPos, size] = ['right', 'left'].includes(
        this.direction
      )
        ? ['clientWidth', 'clientX', 'width']
        : ['clientHeight', 'clientY', 'height']
      const initSize = slotElement[clientSize]
      const start = e[clientPos]
      const resizing = throttle((e) => {
        const delta = sign * (e[clientPos] - start)
        const newSize = Math.max(
          Math.min(initSize + delta, this.maxSize),
          this.minSize
        )
        slotElement.style[size] = newSize + 'px'
        this.$emit('input', newSize)
        return newSize
      }, this.intervalMs)
      const resizeEnd = (e) => {
        document.removeEventListener('mousemove', resizing)
        document.removeEventListener('mouseup', resizeEnd)
        const newSize = resizing(e)
        this.$emit('change', newSize)
      }
      document.addEventListener('mousemove', resizing)
      document.addEventListener('mouseup', resizeEnd)
    },
  },
}
</script>

<style lang="scss" scoped>
.resizer {
  --width: -8px;
  .horizontal {
    display: flex;
  }
  .vertical {
    display: flex;
    flex-direction: column;
  }
  .resize-handle {
    z-index: 1;
    &.left {
      margin-right: calc(-1 * var(--size));
    }
    &.right {
      margin-left: calc(-1 * var(--size));
    }
    &.top {
      margin-bottom: calc(-1 * var(--size));
    }
    &.bottom {
      margin-top: calc(-1 * var(--size));
    }
    &.left,
    &.right {
      cursor: ew-resize;
      width: var(--size);
    }
    &.top,
    &.bottom {
      cursor: ns-resize;
      height: var(--size);
    }
  }
}
</style>
