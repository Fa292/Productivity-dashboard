import ProductExplorer from '../components/ProductExplorer'

export default function Products() {
  return (
    <div className="space-y-6">

      {/* Page header — replaces the explorer's own widget-scale title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
          Products
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Workspace gear curated for your team
        </p>
      </div>

      {/* Full explorer: search + category filters + complete grid.
          showHeader={false} hides its internal title so it doesn't clash with the page header. */}
      <ProductExplorer showHeader={false} />

    </div>
  )
}
