import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-gray-200 py-4">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          🍚 Blog
        </Link>
        <div className="space-x-6">
          <Link href="/blog" className="hover:text-gray-600">
            Blog
          </Link>
          <Link href="/about" className="hover:text-gray-600">
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}

