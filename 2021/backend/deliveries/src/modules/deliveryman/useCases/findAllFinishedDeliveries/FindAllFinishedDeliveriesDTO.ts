export type FindAllFinishedDeliveriesDTO = {
  id_deliveryman: string;
  query: {
    page: number;
    perPage: number;
    endAt: Date | null;
    orderBy: 'asc' | 'desc';
  };
};
