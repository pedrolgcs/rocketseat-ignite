class Formatters {
  public static currency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  public static date(date: string): string {
    return new Date(date).toLocaleDateString('pr-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}

export { Formatters };
