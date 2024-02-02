import { Button } from '@/components/ui/button'

type CardErrorProps = {
  retry: () => void
}

export function CardError({ retry }: CardErrorProps) {
  return (
    <div className="space-y-1">
      <Button variant="destructive" size="sm" onClick={retry}>
        Tentar novamente
      </Button>
      <p className="text-xs text-muted-foreground">
        Ops! Aconteceu algum erro. Por favor, tente novamente.
      </p>
    </div>
  )
}
