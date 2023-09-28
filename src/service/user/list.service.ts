import { IUser } from "../../entity/user.entity";
import { IUserRepository } from "../../repository/user.interface";
import UserRepository from "../../repository/user.repository";
import { IResponseList, ParamsList } from "../../type/paramsObject";

class UserListService {
    constructor(private UserRepository:IUserRepository){}

    executeHandle = async (params:ParamsList): Promise<IResponseList | null> => {

        const user:IResponseList | null = await this.UserRepository.list(params);
        if(!user){
            throw ({error:'Falha sistemica ao gerar lista de usuarios'})
        }
        
        return user ? user : null;
    }
}

export default new UserListService(new UserRepository());