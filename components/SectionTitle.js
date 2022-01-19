const PostsHeaderTitle = ({text, border, category}) => {
  if (border) {
    return (
      <h2 className="text-2xl md:text-2xl font-bold mb-3 border-b-2 pb-2">{text} {category && <span className="text-green-900">{category}</span>}</h2>
    );
  } else {
    return (
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{text}</h2>
    );
  }
}
 
export default PostsHeaderTitle;