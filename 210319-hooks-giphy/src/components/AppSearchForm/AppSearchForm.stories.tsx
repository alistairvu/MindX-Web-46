import AppSearchForm, { AppSearchFormProps } from "./AppSearchForm"
import { Story, Meta } from "@storybook/react"

export default {
  title: "GIPHY/AppSearchForm",
  component: AppSearchForm,
} as Meta

const Template: Story<AppSearchFormProps> = (args) => <AppSearchForm {...args} />

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
