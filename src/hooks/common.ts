export const useInputBind = (initalValue: string) => {
  const [value, setValue] = useState(initalValue)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }
  return { value, onChange }
}

export const useFormattedNumberInputBind = (initalNumStr: string) => {
  const numberFormatter = new Intl.NumberFormat()
  const [value, setValue] = useState(initalNumStr)
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const plainNumStr = event.currentTarget.value.replaceAll(',', '')
    setValue(numberFormatter.format(+plainNumStr))
  }
  return { value, onChange }
}
