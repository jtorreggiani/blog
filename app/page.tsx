import fs from 'fs'
import matter from 'gray-matter'


export default async function Home() {
  const postsDirectory = `${process.cwd()}/app/posts`;
  const filenames = fs.readdirSync(postsDirectory).filter((filename => filename !== 'layout.tsx'));
  const pages = filenames.map((filename) => {
    const path = `${postsDirectory}/${filename}/page.mdx`;
    let file = fs.readFileSync(path, 'utf8');
    const { data } = matter(file);
    return data;
  });

  return (
    <main className="mx-auto w-1/2">
      <h1>Joe's Blog</h1>
      <h3 className="text-2xl">Recent posts</h3>
      <ul>
        {pages.map((page) => (
          <li>
            <a href={`/posts/${page.slug}`}>
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
