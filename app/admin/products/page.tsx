import Link from 'next/link';
import { getAllProducts, deleteProduct } from '@/lib/actions/product.actions';
import { formatCurrency, formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';
import { Package, Plus, Search, Filter, Eye, Edit } from 'lucide-react';

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  await requireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || '';
  const category = searchParams.category || '';

  const products = await getAllProducts({
    query: searchText,
    page,
    category,
  });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3'>
            <Package className='h-8 w-8 text-blue-600 dark:text-blue-400' />
            <span>Products Management</span>
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Manage your product catalog, inventory, and pricing
          </p>
        </div>
        <Button
          asChild
          className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
        >
          <Link
            href='/admin/products/create'
            className='flex items-center space-x-2'
          >
            <Plus className='h-4 w-4' />
            <span>Add Product</span>
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      {searchText && (
        <Card className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Search className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>
                  Filtered by:{' '}
                  <span className='font-semibold text-blue-700 dark:text-blue-300'>
                    &quot;{searchText}&quot;
                  </span>
                </span>
              </div>
              <Link href='/admin/products'>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-blue-300 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                >
                  Clear Filter
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl'>
        <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
          <CardTitle className='flex items-center space-x-2'>
            <Filter className='h-5 w-5 text-gray-600 dark:text-gray-400' />
            <span>Product Catalog</span>
            <span className='text-sm text-gray-500 dark:text-gray-400 font-normal'>
              ({products.data.length} products)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    ID
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Product
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300 text-right'>
                    Price
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Category
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Stock
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Rating
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300 text-center'>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.data.map((product) => (
                  <TableRow
                    key={product.id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors'
                  >
                    <TableCell className='font-mono text-sm text-gray-600 dark:text-gray-400'>
                      {formatId(product.id)}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center'>
                          <Package className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                        </div>
                        <div>
                          <p className='font-medium text-gray-900 dark:text-white'>
                            {product.name}
                          </p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <span className='font-semibold text-green-600 dark:text-green-400'>
                        {formatCurrency(product.price)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'>
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.stock > 10
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : product.stock > 0
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-1'>
                        <span className='text-sm font-medium text-gray-900 dark:text-white'>
                          {product.rating}
                        </span>
                        <div className='flex'>
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(Number(product.rating))
                                  ? 'text-yellow-400'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center justify-center space-x-2'>
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                        >
                          <Link href={`/product/${product.slug}`}>
                            <Eye className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className='h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/30'
                        >
                          <Link href={`/admin/products/${product.id}`}>
                            <Edit className='h-4 w-4 text-green-600 dark:text-green-400' />
                          </Link>
                        </Button>
                        <DeleteDialog id={product.id} action={deleteProduct} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {products.totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination page={page} totalPages={products.totalPages} />
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
