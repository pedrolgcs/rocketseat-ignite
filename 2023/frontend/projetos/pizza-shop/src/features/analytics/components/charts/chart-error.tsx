import { Button } from '@/components/ui/button'

type ChartErrorProps = {
  retry: () => void
}

export function ChartError({ retry }: ChartErrorProps) {
  return (
    <div className="flex h-[240px] flex-col items-center justify-center gap-3">
      <Button variant="destructive" onClick={retry}>
        Tentar novamente
      </Button>
      <p className="text-sm text-muted-foreground">
        Ops! Aconteceu algum erro. Por favor, tente novamente.
      </p>
    </div>
  )
}
