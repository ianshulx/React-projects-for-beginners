const Button = (props: any) => {
  const { buttonTitle } = props;

  return (
    <button className="bg-[#d13639] px-6 py-2 rounded-full text-[12px] text-black font-bold tracking-wider">
      {buttonTitle}
    </button>
  );
};

export default Button;
