import Header from "./Header"
import { Story, Meta } from "@storybook/react"

export default {
  title: "GIPHY/Header",
  component: Header,
} as Meta

const Template: Story = (args) => <Header {...args} />

export const Primary = Template.bind({})
