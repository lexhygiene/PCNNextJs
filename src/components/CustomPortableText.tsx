import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            return (
                <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Article Image'}
                        fill
                        className="object-cover"
                    />
                </div>
            )
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-serif font-bold mt-8 mb-4 text-slate-900">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-serif font-bold mt-8 mb-4 text-eco-green border-b border-gray-200 pb-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-serif font-bold mt-6 mb-3 text-slate-800">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-bold mt-4 mb-2 text-gold">{children}</h4>,
        normal: ({ children }) => <p className="text-lg text-slate-700 leading-relaxed mb-4">{children}</p>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-gold pl-4 italic text-slate-600 my-6 bg-gray-50 py-4 pr-4 rounded-r-lg">{children}</blockquote>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <Link href={value.href} rel={rel} className="text-eco-green hover:text-gold underline transition-colors font-medium">
                    {children}
                </Link>
            )
        },
        strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    },
}

export function CustomPortableText({ value }: { value: any }) {
    return <PortableText value={value} components={components} />
}
