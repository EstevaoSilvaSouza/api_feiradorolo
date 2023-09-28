import { IUser } from "../../entity/user.entity";
import { IUserRepository } from "../../repository/user.interface";
import UserRepository from "../../repository/user.repository";

class UserFindByIdService {
    constructor(private UserRepository:IUserRepository){}

    executeHandle = async (Id:number): Promise<IUser | null> => {

        const user:IUser | null = await this.UserRepository.findOne(Id);
        if(!user){
            throw ({error:'Usuario não encontrado no sistema'})
        }
        
        return user ? user : null;
    }
}

export default new UserFindByIdService(new UserRepository());