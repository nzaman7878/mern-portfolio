import { PROJECT_CATEGORIES, SORT_OPTIONS } from '../../utils/constants'

const ProjectFilters = ({ filters, onFilterChange, categories = [] }) => {
  const allCategories = [...new Set([...Object.keys(PROJECT_CATEGORIES), ...categories])]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category || ''}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {PROJECT_CATEGORIES[cat] || cat}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Filter */}
        <div>
          <label htmlFor="featured" className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            id="featured"
            value={filters.featured === true ? 'true' : filters.featured === false ? 'false' : ''}
            onChange={(e) => {
              const value = e.target.value
              onFilterChange({ 
                featured: value === '' ? undefined : value === 'true' 
              })
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Projects</option>
            <option value="true">Featured Only</option>
            <option value="false">Regular Only</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={filters.sort || '-createdAt'}
            onChange={(e) => onFilterChange({ sort: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ 
              category: '', 
              featured: undefined, 
              sort: '-createdAt' 
            })}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectFilters
