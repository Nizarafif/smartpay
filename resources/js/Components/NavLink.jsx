import { Link } from '@inertiajs/react';

export default function NavLink({
  active = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
        ${active
          ? 'bg-teal-100 text-teal-700 shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
        ${className}`}
    >
      {children}
    </Link>
  );
}
