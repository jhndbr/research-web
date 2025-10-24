'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, User } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Research', href: '/research' },
    { name: 'Books', href: '/books' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 nav-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white gradient-text">
              Cristiano De Angelis
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                {session.user?.role === 'ADMIN' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-white/80">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{session.user?.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-white/80 hover:text-white"
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => signIn()}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Sign in
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-900/95 backdrop-blur-lg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="border-t border-white/10 mt-4 pt-4">
              {session ? (
                <div className="space-y-2">
                  {session.user?.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <div className="text-white/80 px-3 py-2 text-sm">
                    Signed in as {session.user?.name}
                  </div>
                  <button
                    onClick={() => {
                      signOut()
                      setIsOpen(false)
                    }}
                    className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 w-full text-left"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signIn()
                    setIsOpen(false)
                  }}
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 w-full text-left"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}