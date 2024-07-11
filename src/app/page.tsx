const Page = () => {
  return (
    <div className="text-white bg-black grid gap-5 p-5">
      <div className="w-full h-5 rounded-xl bg-red-400">
        <div className="w-[50%] h-full rounded-xl bg-green-400 transition-all"></div>
      </div>
      <MyButton
        className=""
        variant={'primary'}
        size={'pc'}
        buttonStatus={'loading'}
      >
        <Font_MochiyPopPOne>button here</Font_MochiyPopPOne>
      </MyButton>
      <MyButton
        className=""
        variant={'primary'}
        size={'mobile'}
        buttonStatus={'forward'}
      >
        <Font_MochiyPopPOne>button here</Font_MochiyPopPOne>
      </MyButton>
      <MyButton className="" variant={'outline'} size={'pc'} suffixSlot={'😈'}>
        <Font_MochiyPopPOne>button here</Font_MochiyPopPOne>
      </MyButton>
      <MyButton className="" variant={'outline'} size={'mobile'}>
        <Font_MochiyPopPOne>button here</Font_MochiyPopPOne>
      </MyButton>
      <MyButton className="" variant={'disabled'} size={'pc'}>
        <Font_MochiyPopPOne>button here</Font_MochiyPopPOne>
      </MyButton>
      <MyButton className="" variant={'disabled'} size={'mobile'}>
        <Font_MochiyPopPOne>button here</Font_MochiyPopPOne>
      </MyButton>
      <Accordian
        accordianId={1}
        titleSlot={<div className={cn()}>Accordian Title</div>}
      >
        Here is Accordian Text.
      </Accordian>
    </div>
  )
}

export default Page
