import Image from "next/image";
import React from 'react'

const PostContent = ({content}) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-2xl font-semibold mb-8 border-b-2 pb-6">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8 text-lg">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-xl font-semibold mb-2">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <div key={index} className="w-full flex justify-center my-8">
            <Image
              alt={obj.title}
              height={obj.height}
              width={obj.width}
              src={obj.src}
              className="rounded"
            />
          </div>
        );
      case 'bulleted-list':
        return (
          <ul className="text-lg my-8 list-disc list-inside ml-4 md:ml-8" key={index}>
            {obj.children.map(item => {
              return item.children.map(item2 => {
                return item2.children.map(item3 => {
                  return (<li key={item3.text}>{item3.text}</li>)
                })
              })
            })}
          </ul>
        );
        
      default:
        return modifiedText;
    }
  };

  return (
    <div>
      {content.raw.children.map((typeObj, index) => {
        const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
        return getContentFragment(index, children, typeObj, typeObj.type)
      })}
    </div>
  );
}
 
export default PostContent;