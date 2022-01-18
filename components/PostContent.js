import Image from "next/image";
import React from 'react'
import { getTournamentById, getPostById } from "../services";
import { TournamentCard, PostCard } from '.'
import { useState, useEffect } from 'react'

const PostContent = ({content}) => {

  const [formattedContent, setFormattedContent] = useState([])
  const [fetchedModels, setFetchedModels] = useState({tournament: null, post: null})

  useEffect(() => {
    const formatContent = () => {
      const contentList = content.raw.children.map((obj, index) => {
        const checkTextChildren = (obj) => {
          return obj.children.map((child, childIndex) => {
            let modifiedText = child.text;
            if (child) {
              if (child.bold) {
                modifiedText = (<b key={childIndex}>{child.text}</b>);
              }

              if (child.italic) {
                modifiedText = (<em key={childIndex}>{child.text}</em>);
              }

              if (child.underline) {
                modifiedText = (<u key={childIndex}>{child.text}</u>);
              }
              if (child.type === 'link') {
                modifiedText = (<a key={childIndex} className="text-green-900 font-semibold" target={"_blank"} href={child.href} rel="noreferrer">{child.children[0].text}</a>)
              }
            }
            return modifiedText
          })
        }

        switch (obj.type) {
          case 'heading-three':
            return <h3 key={index} className="text-2xl font-semibold mb-8 border-b-2 pb-6">{checkTextChildren(obj)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8 text-lg">{checkTextChildren(obj)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-xl font-semibold mb-2">{checkTextChildren(obj)}</h4>;
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
          case 'numbered-list':
            return (
              <ol className="text-lg my-8 list-decimal list-inside ml-4 md:ml-8" key={index}>
                {obj.children.map(item => {
                  return item.children.map(item2 => {
                    return item2.children.map(item3 => {
                      return (<li key={item3.text}>{item3.text}</li>)
                    })
                  })
                })}
              </ol>
            );
          case 'embed':
            if (fetchedModels.tournament !== null) {
              return (
                <div key={index} className="w-full grid place-content-center my-8">
                  <div className="max-w-xs">
                    <TournamentCard tournament={fetchedModels.tournament} withoutTimer/>
                  </div>
                </div>
              );
            } else if (fetchedModels.post !== null) {
              return (
                <div key={index} className="w-full grid place-content-center my-8">
                  <div className="max-w-xs">
                    <PostCard post={fetchedModels.post}/>
                  </div>
                </div>
              );
            }
          default:
            return <p className="text-sm text-red-600 font-semibold" key={index}>W tym miejscu znajduje się element, który nie został dobrze sformatowany. Skontaktuj się z administratorem strony!</p>
        }
      })
      setFormattedContent(contentList)
    }
    formatContent()
  }, [content.raw.children, fetchedModels])

  useEffect(() => {
    content.raw.children.forEach(obj => {
      if (obj.type !== 'embed') return
      const fetchEmbededModel = async () => {
        if (obj.nodeType === 'Tournament') {
          const tournament = await getTournamentById(obj.nodeId)
          setFetchedModels(state => ({
            post: state.post,
            tournament: tournament
          }))
        } else if (obj.nodeType === 'Post') {
          const post = await getPostById(obj.nodeId)
          setFetchedModels(state => ({
            post: post,
            tournament: state.tournament
          }))
        }
      }
    fetchEmbededModel()
    })
  }, [content.raw.children])

  return (
    <div>
      {formattedContent}
    </div>
  );
}
 
export default PostContent;