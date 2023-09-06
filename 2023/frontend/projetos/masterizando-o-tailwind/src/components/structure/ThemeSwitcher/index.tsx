'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { IconMoon, IconSunHigh } from '@tabler/icons-react'
import { Button } from '@/components/ui'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="sr-only lg:not-sr-only">
      <Button
        className="hover:scale-110 active:scale-100"
        variant="outline"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'light' ? (
          <IconSunHigh className="h-4 w-4" />
        ) : (
          <IconMoon className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
