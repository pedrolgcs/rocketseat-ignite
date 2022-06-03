export type FindAllCurrentDeliveriesDTO = {
  id_deliveryman: string;
  query: {
    page: number;
    perPage: number;
    orderBy: 'asc' | 'desc';
  }
}