import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function PostCard({ post }) {
  return (
    <article className="bg-white rounded-2xl border border-ink-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
      {/* Image */}
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/9] bg-ink-100 flex-shrink-0">
        {post.featuredImage?.url ? (
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-ink-300">📝</div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category badge */}
        {post.category && (
          <Link to={`/category/${post.category.slug}`}
            className="inline-block mb-3 text-xs font-semibold text-brand-600 uppercase tracking-wider hover:text-brand-700">
            {post.category.name}
          </Link>
        )}

        {/* Title */}
        <h2 className="font-serif font-bold text-ink-900 text-lg leading-snug mb-2 group-hover:text-brand-700 transition-colors line-clamp-2">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-ink-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-ink-50">
          {post.author?.avatar ? (
            <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">
              {post.author?.name?.[0] || 'A'}
            </div>
          )}
          <span className="text-xs text-ink-600 font-medium">{post.author?.name || 'Unknown'}</span>
          <span className="text-ink-300 text-xs">·</span>
          <span className="text-xs text-ink-400">{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
          {post.readingTime && (
            <>
              <span className="text-ink-300 text-xs">·</span>
              <span className="text-xs text-ink-400">{post.readingTime} min read</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
