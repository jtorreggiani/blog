import fs from 'fs'
import matter from 'gray-matter'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'


export default function Home() {
  const postsDirectory = `${process.cwd()}/app/posts`;
  const filenames = fs.readdirSync(postsDirectory).filter((filename => filename !== 'layout.tsx'));
  const pages = filenames.map((filename) => {
    const path = `${postsDirectory}/${filename}/page.mdx`;
    let file = fs.readFileSync(path, 'utf8');
    const { data } = matter(file);
    return data;
  });

  return (
    <main className="mt-12 mx-auto w-3/4">
      <h1 className="text-4xl">Joe Torreggiani&apos;s Blog</h1>
      <h3 className="text-2xl">Recent posts</h3>
      <div>
        {pages.map((page) => (
          <div className="my-6" key={page.slug}>
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1 p-0 m-0">
                <Image
                  alt={page.title}
                  src={page.image as ImageProps['src']}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="col-span-3 p-0 m-0">
                <Link className="block text-2xl pt-[1px] m-0 leading-4" href={`/posts/${page.slug}`}>
                  <span className="block pt-0 m-0">{page.title}</span>
                </Link>
                <p className="mt-6 w-full">
                  {page.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
