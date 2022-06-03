type Query = {
  page: number;
  perPage: number;
  endAt: Date | null;
  orderBy: 'asc' | 'desc';
};

class QueryBuilder {
  private query: Query;

  constructor(data: Record<string, unknown>) {
    this.query = {
      page: this.setPage(data.page),
      perPage: this.setPerPage(data.perPage),
      endAt: this.setEndAt(data.endAt),
      orderBy: this.setOrderBy(data.orderBy),
    };
  }

  private setPage(page: unknown): number {
    if (page) {
      return Number(page);
    } else {
      return 0;
    }
  }

  private setPerPage(perPage: unknown): number {
    if (perPage) {
      return Number(perPage);
    } else {
      return 20;
    }
  }

  private setEndAt(endAt: unknown): Date | null {
    if (endAt) {
      return new Date(String(endAt));
    } else {
      return null;
    }
  }

  private setOrderBy(orderBy: unknown): 'asc' | 'desc' {
    if (orderBy === 'asc' || orderBy === 'desc') {
      return orderBy;
    } else {
      return 'desc';
    }
  }

  public build(): Query {
    return this.query;
  }
}

export { QueryBuilder };
