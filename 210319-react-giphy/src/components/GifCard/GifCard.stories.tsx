import GifCard, { GifCardProps } from "./GifCard"
import { Story, Meta } from "@storybook/react"

export default {
  title: "GIPHY/GifCard",
  component: GifCard,
} as Meta

const Template: Story<GifCardProps> = (args) => <GifCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  image:
    "https://media2.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif?cid=a395f9bc2d3bv6u2yo9tctdejsfb2hb7nfn87f1lp93wik55&rid=giphy.gif",
  title: "Tom Hanks Hello GIF",
}
