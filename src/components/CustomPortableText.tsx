import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
}

const getBlockText = (value: any) => {
    return value.children?.map((child: any) => child.text).join('') || ''
}

const getComponents = (isDark: boolean): PortableTextComponents => ({
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
        htmlEmbed: ({ value }) => {
            if (!value?.code) return null;
            return <div dangerouslySetInnerHTML={{ __html: value.code }} className="my-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_h1]:text-4xl [&_h1]:font-serif [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-slate-900 [&_h2]:text-3xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-eco-green [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:pb-2 [&_h3]:text-2xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-slate-800 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-gold" />
        },
        externalImage: ({ value }) => {
            if (!value?.url) return null;
            return (
                <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={value.url}
                        alt={value.alt || 'External Image'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            )
        },
    },
    block: {
        h1: ({ children }) => <h1 className={`text-4xl font-serif font-bold mt-8 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{children}</h1>,
        h2: ({ children, value }) => {
            const id = slugify(getBlockText(value));
            return <h2 id={id} className={`text-3xl font-serif font-bold mt-8 mb-4 border-b pb-2 scroll-mt-24 ${isDark ? 'text-white border-white/20' : 'text-eco-green border-gray-200'}`}>{children}</h2>
        },
        h3: ({ children, value }) => {
            const id = slugify(getBlockText(value));
            return <h3 id={id} className={`text-2xl font-serif font-bold mt-6 mb-3 scroll-mt-24 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{children}</h3>
        },
        h4: ({ children, value }) => {
            const id = slugify(getBlockText(value));
            return <h4 id={id} className={`text-xl font-bold mt-4 mb-2 scroll-mt-24 ${isDark ? 'text-gold' : 'text-gold'}`}>{children}</h4>
        },
        normal: ({ children }) => <p className={`text-lg leading-relaxed mb-4 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{children}</p>,
        blockquote: ({ children }) => <blockquote className={`border-l-4 border-gold pl-4 italic my-6 py-4 pr-4 rounded-r-lg ${isDark ? 'text-slate-300 bg-white/10' : 'text-slate-600 bg-gray-50'}`}>{children}</blockquote>,
    },
    list: {
        bullet: ({ children }) => <ul className={`list-disc pl-6 my-6 space-y-2 marker:text-gold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{children}</ul>,
        number: ({ children }) => <ol className={`list-decimal pl-6 my-6 space-y-2 marker:text-gold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{children}</ol>,
    },
    listItem: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
    marks: {
        link: ({ children, value }) => {
            let href = value.href;
            const rel = !href.startsWith('/') && !href.startsWith('#') ? 'noreferrer noopener' : undefined

            // Auto-fix anchor links to match generated IDs (case-insensitive)
            if (href.startsWith('#')) {
                href = '#' + slugify(href.substring(1));
                return (
                    <a href={href} className={`underline transition-colors font-medium ${isDark ? 'text-gold hover:text-white' : 'text-eco-green hover:text-gold'}`}>
                        {children}
                    </a>
                )
            }

            return (
                <Link href={href} rel={rel} className={`underline transition-colors font-medium ${isDark ? 'text-gold hover:text-white' : 'text-eco-green hover:text-gold'}`}>
                    {children}
                </Link>
            )
        },
        strong: ({ children }) => <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{children}</strong>,
    },
})

export function CustomPortableText({ value, isDark = false }: { value: any, isDark?: boolean }) {
    return <PortableText value={value} components={getComponents(isDark)} />
}
