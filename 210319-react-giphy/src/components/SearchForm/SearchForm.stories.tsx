import SearchForm, { SearchFormProps } from "./SearchForm"
import { Story, Meta } from "@storybook/react"

export default {
  title: "GIPHY/SearchForm",
  component: SearchForm,
} as Meta

const Template: Story<SearchFormProps> = (args) => <SearchForm {...args} />

export const Primary = Template.bind({})
Primary.args = {
  keyword: "Hi",
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submit")
  },
  setKeyword: (value: React.SetStateAction<string>) => console.log(value),
  isLoading: false,
}

export const Loading = Template.bind({})
Loading.args = {
  keyword: "Hi",
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submit")
  },
  setKeyword: (value: React.SetStateAction<string>) => console.log(value),
  isLoading: true,
}
