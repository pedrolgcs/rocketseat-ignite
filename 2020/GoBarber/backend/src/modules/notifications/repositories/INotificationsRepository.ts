// interfaces
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

// Schema
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
