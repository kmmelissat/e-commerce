import { Metadata } from 'next';
import { getAllUsers, deleteUser } from '@/lib/actions/user.actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
import { Badge } from '@/components/ui/badge';
import DeleteDialog from '@/components/shared/delete-dialog';
import { requireAdmin } from '@/lib/auth-guard';
import {
  Users,
  Search,
  Filter,
  Edit,
  Shield,
  User,
  Mail,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Users',
};

const AdminUserPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
  }>;
}) => {
  await requireAdmin();

  const { page = '1', query: searchText } = await props.searchParams;

  const users = await getAllUsers({ page: Number(page), query: searchText });

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3'>
            <Users className='h-8 w-8 text-purple-600 dark:text-purple-400' />
            <span>Users Management</span>
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            Manage user accounts, roles, and permissions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      {searchText && (
        <Card className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800'>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Search className='h-4 w-4 text-purple-600 dark:text-purple-400' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>
                  Filtered by:{' '}
                  <span className='font-semibold text-purple-700 dark:text-purple-300'>
                    &quot;{searchText}&quot;
                  </span>
                </span>
              </div>
              <Link href='/admin/users'>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-purple-300 text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                >
                  Clear Filter
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-xl'>
        <CardHeader className='border-b border-gray-200 dark:border-gray-700'>
          <CardTitle className='flex items-center space-x-2'>
            <Filter className='h-5 w-5 text-gray-600 dark:text-gray-400' />
            <span>User Directory</span>
            <span className='text-sm text-gray-500 dark:text-gray-400 font-normal'>
              ({users.data.length} users)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    User ID
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Profile
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Email
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Role
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300'>
                    Joined
                  </TableHead>
                  <TableHead className='font-semibold text-gray-700 dark:text-gray-300 text-center'>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user) => (
                  <TableRow
                    key={user.id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors'
                  >
                    <TableCell className='font-mono text-sm text-gray-600 dark:text-gray-400'>
                      {formatId(user.id)}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center'>
                          {user.role === 'admin' ? (
                            <Shield className='h-5 w-5 text-purple-600 dark:text-purple-400' />
                          ) : (
                            <User className='h-5 w-5 text-purple-600 dark:text-purple-400' />
                          )}
                        </div>
                        <div>
                          <p className='font-medium text-gray-900 dark:text-white'>
                            {user.name}
                          </p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            {user.role === 'admin'
                              ? 'Administrator'
                              : 'Customer'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        <Mail className='h-4 w-4 text-gray-400' />
                        <span className='text-sm text-gray-700 dark:text-gray-300'>
                          {user.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === 'admin' ? (
                        <Badge className='bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'>
                          <Shield className='h-3 w-3 mr-1' />
                          Admin
                        </Badge>
                      ) : (
                        <Badge
                          variant='secondary'
                          className='bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        >
                          <User className='h-3 w-3 mr-1' />
                          User
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-2'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <span className='text-sm text-gray-700 dark:text-gray-300'>
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : 'N/A'}
                        </span>
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
                          <Link href={`/admin/users/${user.id}`}>
                            <Edit className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                          </Link>
                        </Button>
                        <DeleteDialog id={user.id} action={deleteUser} />
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
      {users.totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination page={Number(page) || 1} totalPages={users?.totalPages} />
        </div>
      )}
    </div>
  );
};

export default AdminUserPage;
