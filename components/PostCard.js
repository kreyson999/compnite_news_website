import Image from 'next/image'
import { FormattedDate } from '.';
import CategoryBox from './CategoryBox';
import Link from 'next/link'

const PostCard = ({row, post, small}) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <a className='block cursor-pointer hover:opacity-70'>
        <div className={row ? "grid grid-cols-2 space-x-4 " : "grid grid-cols-2 md:grid-cols-1 space-x-4 md:space-x-0 md:space-y-2"}>
          <Image
          src={post.image.url}
          width={row ? 320 : 640}
          height={row ? 180 : 360}
          className='rounded object-cover'
          alt={`${post.title}`}
          />
          <div>
            {small ? null : <FormattedDate date={post.createdAt} />}
            <h3 className={`line-clamp-4 lg:line-clamp-3 xl:line-clamp-4 font-semibold cursor-pointer ${row || small ? 'text-lg lg:text-normal' : 'text-lg'}`}>{post.title}</h3>
            {row || small ? null : <CategoryBox category={post.category.name}/>}
          </div>
        </div>
      </a>
    </Link>
  );
}
 
export default PostCard;