import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

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
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 gradient-text">
              Published Books
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Explore the academic publications by Dr. Cristiano Trindade De Angelis, focusing on 
              Knowledge Management, Organizational Intelligence, and Public Administration.
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="glass-card p-6 flex flex-col h-full hover:bg-white/10 transition-all duration-300"
              >
                {/* Book Image */}
                {book.imageUrl && (
                  <div className="mb-6 text-center">
                    <Image
                      src={book.imageUrl}
                      alt={`Book cover: ${book.title}`}
                      width={200}
                      height={300}
                      className="mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {/* Book Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                    <span className="text-white font-medium">{book.country}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="text-white/80 text-sm mb-4 flex-1">
                    {book.description}
                  </p>

                  {/* Book Metadata */}
                  <div className="space-y-2 mb-6 text-xs text-white/60">
                    {book.publisher && (
                      <div>Publisher: {book.publisher}</div>
                    )}
                    {book.year && (
                      <div>Year: {book.year}</div>
                    )}
                    {book.language && (
                      <div>Language: {book.language === 'en' ? 'English' : book.language === 'pt' ? 'Portuguese' : 'Spanish'}</div>
                    )}
                  </div>

                  {/* Purchase Button */}
                  {book.purchaseUrl && (
                    <Button
                      onClick={() => window.open(book.purchaseUrl, '_blank')}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                    >
                      <span className="mr-2">📖</span>
                      View Book
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {books.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-white mb-4">
                  No books available
                </h3>
                <p className="text-white/70">
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