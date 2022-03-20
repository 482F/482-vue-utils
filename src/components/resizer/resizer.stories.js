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
  components: { Resizer },
  template: `
    <div>
      <resizer v-bind="$props">
        <div style="background-color: lightgray; width: 400px; height: 400px;">abcdef</div>
      </resizer>
    </div>
  `,
})

export const Primary = Template.bind({})
Primary.args = {
  direction: 'right',
  maxSize: 800,
  minSize: 100,
  handleSize: 8,
}
