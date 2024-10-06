
export const Balance = ({value}) => {
  return (
    <div className="mt-5">
      <div className="font-primaryBold text-2xl">
        Balance
      </div>
      <div className="font-primaryLight text-md mt-4">
        AVAILABLE NOW
        <div className="font-primaryMedium text-5xl mt-4">
          ${value}
        </div>
      </div>
    </div>
  )
}
