class Formatters {
  public static currency(value: number): string {
    return new Intl.NumberFormat('pr-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  public static date(value: Date): string {
    return new Intl.DateTimeFormat('pr-BR').format(value);
  }
}

export { Formatters };
