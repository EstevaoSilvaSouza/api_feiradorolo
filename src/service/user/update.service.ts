import { IUser } from "../../entity/user.entity";
import { IUserRepository } from "../../repository/user.interface";
import UserRepository from '../../repository/user.repository';
import ObjectFactory from "../../type/objectfactory";

class UserUpdateService {
    constructor(private UserRepository:IUserRepository){}

    executeHandle = async (payload:IUser): Promise<string | null> => {
        const data = new ObjectFactory<IUser>().createObject(payload);
        const user:number[] | null | null = await this.UserRepository.update(data);
        if(!user){
            throw ({error:'Falha sistemica ao atualizar o usuarios'})
        }
        
        return user ? 'Atualizado' : null;
    }
}

export default new UserUpdateService(new UserRepository());