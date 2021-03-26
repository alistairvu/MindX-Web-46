import SearchForm, { SearchFormProps } from "./SearchForm"
import { Story, Meta } from "@storybook/react"

export default {
  title: "GIPHY/SearchForm",
  component: SearchForm,
} as Meta

const Template: Story<SearchFormProps> = (args) => <SearchForm {...args} />

export const Primary = Template.bind({})
Primary.args = {
  handleSearch: (keyword: string) => {
    console.log(keyword)
  },
  isLoading: false,
}

export const Loading = Template.bind({})
Loading.args = {
  handleSearch: (keyword: string) => {
    console.log(keyword)
  },
  isLoading: true,
}
