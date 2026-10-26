import { useState, useMemo } from 'react'
import Card from './Card'
import Button from './Button'
import Chip from './Chip'
import Input from './Input'
import { Icons } from './Icons'

const PRODUCTS = [
  { id: 1, name: 'Halo Studio Headphones', cat: 'Headphones', price: 289, compare: 329, rating: 4.8, reviews: 142, stock: 12, tag: 'Bestseller', tagTone: 'brand'   },
  { id: 2, name: 'Pebble Mech Keyboard',   cat: 'Keyboards',  price: 159,              rating: 4.6, reviews: 88,  stock: 7,  tag: 'New',        tagTone: 'success' },
  { id: 3, name: 'Aurora Desk Lamp',        cat: 'Lighting',   price: 79,               rating: 4.7, reviews: 54,  stock: 3,  tag: 'Low stock',  tagTone: 'warn'    },
  { id: 4, name: 'Skylift Monitor Arm',     cat: 'Stands',     price: 129, compare: 149, rating: 4.5, reviews: 31,  stock: 18                                         },
  { id: 5, name: 'Nimbus Wireless Earbuds', cat: 'Headphones', price: 179,              rating: 4.4, reviews: 206, stock: 22                                         },
  { id: 6, name: 'Glyph 65 Keyboard',       cat: 'Keyboards',  price: 209,              rating: 4.9, reviews: 64,  stock: 9,  tag: 'Editor pick',tagTone: 'info'    },
]

const CATS = ['All', 'Headphones', 'Keyboards', 'Lighting', 'Stands']

const ProductCard = ({ p }) => (
  <Card className="overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150">
    {/* Image placeholder */}
    <div className="relative h-40 w-full bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20"
      style={{
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(99,102,241,.08) 0 8px, rgba(99,102,241,.03) 8px 16px)'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 dark:text-indigo-500">
          {p.cat}
        </span>
      </div>
      {/* Favourite button */}
      <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors shadow-sm">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-4.5-9.5-9A5.2 5.2 0 0 1 12 5a5.2 5.2 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9z" />
        </svg>
      </button>
      {/* Tag */}
      {p.tag && (
        <div className="absolute top-3 left-3">
          <Chip tone={p.tagTone} size="sm">{p.tag}</Chip>
        </div>
      )}
    </div>

    {/* Info */}
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">{p.cat}</div>
          <div className="text-sm font-semibold mt-0.5 truncate text-gray-900 dark:text-white">{p.name}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-bold tabular-nums text-gray-900 dark:text-white">${p.price}</div>
          {p.compare && (
            <div className="text-xs text-gray-400 line-through tabular-nums">${p.compare}</div>
          )}
        </div>
      </div>

      {/* Rating + stock */}
      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-400" fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.6-5.2 4.7 1.6 6.7L12 16.9 5.8 20.3l1.6-6.7L2.2 8.9l6.9-.6z" />
        </svg>
        <span className="font-medium tabular-nums text-gray-700 dark:text-gray-300">{p.rating}</span>
        <span className="text-gray-400">({p.reviews})</span>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <span className={`font-medium ${p.stock > 5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
          {p.stock > 5 ? 'In stock' : 'Low stock'}
        </span>
      </div>

      <Button variant="secondary" className="w-full mt-4" size="sm">Add to cart</Button>
    </div>
  </Card>
)

export default function ProductExplorer({ compact = false, showHeader = true }) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = useMemo(() =>
    PRODUCTS.filter(p =>
      (cat === 'All' || p.cat === cat) &&
      (query === '' || p.name.toLowerCase().includes(query.toLowerCase()))
    ),
    [cat, query]
  )

  const shown = compact ? filtered.slice(0, 3) : filtered

  return (
    <Card className="p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        {showHeader && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product explorer</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Workspace gear curated for your team</p>
          </div>
        )}
        <div className="w-full sm:w-auto sm:min-w-[220px]">
          <Input
            leading={<Icons.Search className="w-4 h-4" />}
            placeholder="Search products…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category filters */}
      {!compact && (
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`h-8 px-3 rounded-lg text-xs font-medium transition-all duration-150 ${
                cat === c
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {shown.length === 0 ? (
        <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
          No products match "<span className="font-medium">{query}</span>"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </Card>
  )
}
