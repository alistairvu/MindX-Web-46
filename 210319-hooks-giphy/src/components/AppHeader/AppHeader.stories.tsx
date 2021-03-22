import AppHeader from "./AppHeader"
import { Story, Meta } from "@storybook/react"

export default {
  title: "GIPHY/AppHeader",
  component: AppHeader,
} as Meta

const Template: Story = (args) => <AppHeader {...args} />

export const Primary = Template.bind({})
