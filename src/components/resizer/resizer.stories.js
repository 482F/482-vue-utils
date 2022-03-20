import Resizer from './resizer.vue'

export default {
  title: 'resizer',
  component: Resizer,
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['right', 'left', 'top', 'bottom'],
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    Resizer,
  },
  data() {
    return {
      valueByInput: 0,
      valueByChange: 0,
    }
  },
  template: `
    <div>
      <resizer
        v-bind="$props"
        @input="onInput"
        @change="onChange"
      >
        <div style="
          background-color: lightgray;
          width: 400px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
          <div>abcdef</div>
        </div>
      </resizer>
      <div>value by input: {{valueByInput}}</div>
      <div>value by change: {{valueByChange}}</div>
    </div>
  `,
  methods: {
    onInput(newValue) {
      this.valueByInput = newValue
    },
    onChange(newValue) {
      this.valueByChange = newValue
    },
  },
})

export const Primary = Template.bind({})
Primary.args = {
  direction: 'right',
  maxSize: 800,
  minSize: 100,
  handleSize: 8,
  intervalMs: 10,
}
