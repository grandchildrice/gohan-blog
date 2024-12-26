import { getAllPosts } from '@/lib/notion'
import Link from 'next/link'

export default async function Home() {
  try {
    const posts = await getAllPosts()
    const recentPosts = posts.slice(0, 3)

    if (posts.length === 0) {
      return (
        <div className="container mx-auto px-4 py-12">
          <p className="text-gray-600">No posts available at the moment.</p>
        </div>
      )
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <p className="text-xl text-gray-600">
            Exploring the world of tech.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-xl mb-2">{post.title}</h3>
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
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              View All Posts
            </Link>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Tech Blog</h1>
        <p className="text-gray-600">Error loading posts. Please try again later.</p>
      </div>
    );
  }
}

