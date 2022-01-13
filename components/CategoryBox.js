const CategoryBox = ({ category }) => {
  return (
    <div className="bg-green-100 w-min px-3 py-1 font-semibold rounded mt-2 cursor-pointer">
      {category}
    </div>
  );
}
 
export default CategoryBox;