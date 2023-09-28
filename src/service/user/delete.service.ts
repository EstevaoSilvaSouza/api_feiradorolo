import { IUser } from "../../entity/user.entity";
import { IUserRepository } from "../../repository/user.interface";
import UserRepository from "../../repository/user.repository";
import { IResponseList, ParamsList } from "../../type/paramsObject";

class UserDeleteService {
    constructor(private UserRepository:IUserRepository){}

    executeHandle = async (Id:number): Promise<number | null> => {

        const user:number | null = await this.UserRepository.delete(Id);
        if(!user){
            throw ({error:'Falha sistemica ao deletar usuario'})
        }
        
        return user ? 1 : null;
    }
}

export default new UserDeleteService(new UserRepository());
