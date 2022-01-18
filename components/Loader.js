const Loader = ({colSpan}) => {
  return (
    <div className={`h-full w-full flex justify-center items-center ${colSpan ? `col-span-${colSpan}` : null}`}>
      <div className="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
 
export default Loader;