import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function AuthLayout() {
  return (
    <div
      className={cn(
        'grid min-h-screen grid-cols-1 antialiased',
        'lg:grid-cols-2',
      )}
    >
      <div
        className={cn(
          'hidden',
          'lg:flex lg:h-full lg:flex-col lg:justify-between lg:border-r lg:border-foreground/5 lg:bg-muted lg:p-10 lg:text-muted-foreground',
        )}
      >
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>
        <footer className="text-sm">
          Painel do parceiro &copy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
