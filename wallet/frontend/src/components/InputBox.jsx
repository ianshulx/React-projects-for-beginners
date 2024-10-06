
export const InputBox = ({ label, onChange, placeholder }) => {
  return (
    <div>
      <div className="text-xs font-primaryMedium text-left py-1">
        {label}
      </div>
      <div>
        <input onChange={onChange} placeholder={placeholder} className="text-xs w-full px-2 py-1 border rounded-sm border-slate-200 focus:outline-none focus:border-[#76ABAE] font-primaryRegular" />
      </div>
    </div>
  )
}
