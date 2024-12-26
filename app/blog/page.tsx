import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'

export default async function BlogPage() {
  try {
    const posts = await getAllPosts()

    if (posts.length === 0) {
      return (
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
          <p className="text-gray-600">No posts available at the moment.</p>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="font-bold text-2xl mb-2">{post.title}</h2>
              {post.date && (
                <time className="text-sm text-gray-500 mb-2 block">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              )}
              {post.language && (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {post.language}
                </span>
              )}
              {post.categories.map((category) => (
                <span key={category} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {category}
                </span>
              ))}
            </Link>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <p className="text-gray-600">Error loading blog posts. Please try again later.</p>
      </div>
    );
  }
}

