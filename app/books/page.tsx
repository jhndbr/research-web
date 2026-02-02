import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { Globe } from 'lucide-react'

export const metadata = {
  title: 'Books - Dr. Cristiano De Angelis',
  description: 'Published books by Dr. Cristiano De Angelis on Knowledge Management, Organizational Intelligence, and Public Administration.',
}

async function getBooks() {
  return await prisma.book.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16 pb-8 border-b border-gray-200">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Published Books
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Academic publications on Knowledge Management, Organizational Intelligence, 
              and Public Administration
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <article
                key={book.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all flex flex-col h-full"
              >
                {/* Book Image */}
                {book.imageUrl && (
                  <div className="bg-gray-50 p-8 flex items-center justify-center border-b border-gray-200">
                    <Image
                      src={book.imageUrl}
                      alt={`Book cover: ${book.title}`}
                      width={180}
                      height={270}
                      className="rounded shadow-md"
                    />
                  </div>
                )}

                {/* Book Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4 text-xs">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
                      {book.country}
                    </span>
                    {book.year && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
                        {book.year}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 leading-tight">
                    {book.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Book Metadata */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-t border-gray-100 pt-4 text-xs text-gray-600">
                    {book.language && (
                      <div className="flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" />
                        <span>{book.language === 'en' ? 'English' : book.language === 'pt' ? 'Portuguese' : 'Spanish'}</span>
                      </div>
                    )}
                    {book.publisher && (
                      <span>• {book.publisher}</span>
                    )}
                  </div>

                  {/* Purchase Button */}
                  {book.purchaseUrl && (
                    <a
                      href={book.purchaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded font-medium transition-colors text-sm"
                    >
                      View Book Details
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {books.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  No books available
                </h3>
                <p className="text-gray-600">
                  Book publications will be displayed here when available.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}