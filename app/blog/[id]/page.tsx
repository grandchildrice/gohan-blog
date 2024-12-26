import { getPostById } from '@/lib/notion'
import NotionBlocks from '@/components/notion-blocks'
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.date && (
        <time className="text-sm text-gray-500 mb-4 block">
          {new Date(post.date).toLocaleDateString()}
        </time>
      )}
      {post.language && (
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-4">
          {post.language}
        </span>
      )}
      {post.categories.map((category) => (
        <span key={category} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-4">
          {category}
        </span>
      ))}
      <div className="prose lg:prose-xl">
        <NotionBlocks blocks={post.content} />
      </div>
    </div>
  )
}

