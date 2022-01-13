const PostsHeaderTitle = ({text, border, category}) => {
  if (border) {
    return (
      <h3 className="text-2xl md:text-2xl font-bold mb-3 border-b-2 pb-2">{text} {category ? <span className="text-green-900">{category}</span> : null}</h3>
    );
  } else {
    return (
      <h3 className="text-2xl md:text-3xl font-bold mb-3">{text}</h3>
    );
  }
}
 
export default PostsHeaderTitle;