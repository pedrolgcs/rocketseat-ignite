import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const checkUser = this.usersRepository.findById(user_id);

    if (!checkUser) {
      throw new Error("User does not exists");
    }

    if (!checkUser.admin) {
      throw new Error("User provided is not an admin");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
