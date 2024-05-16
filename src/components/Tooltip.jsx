function Tooltip({ children, tooltip }) {
  return (
    <div className="group realative inline-block">
      {children}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-customBlue text-white p-1 rounded absolute mt-[-30px] ml-[-24px]">
        {tooltip}
      </span>
    </div>
  );
}

export default Tooltip;
