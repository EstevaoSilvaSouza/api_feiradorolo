import { IUser } from "../../entity/user.entity";
import { IUserRepository } from "../../repository/user.interface";
import UserRepository from "../../repository/user.repository";

class UserFindByService {
    constructor(private UserRepository:IUserRepository){}

    executeHandle = async (Email:string): Promise<IUser | null> => {

        const user:IUser | null = await this.UserRepository.findWithEmail(Email);
        if(user){
            throw ({error:'Usuario já cadastrado no sistema'})
        }
        
        return user ? user : null;
    }
}

export default new UserFindByService(new UserRepository());