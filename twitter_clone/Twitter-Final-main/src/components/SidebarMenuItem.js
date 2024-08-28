const SidebarMenuItem = ({ text, Icon, active }) => {
  return (
    <div className="hoverEffect flex items-end text-gray-700 justify-center xl:justify-start text-lg space-x-3 ">
      <Icon className="h-7 " />
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
};

export default SidebarMenuItem;
