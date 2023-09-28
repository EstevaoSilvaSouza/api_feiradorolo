import { IUser } from "../../entity/user.entity";
import { IUserRepository } from "../../repository/user.interface";
import UserRepository from "../../repository/user.repository";
import ObjectFactory from "../../type/objectfactory";
import UserFindByService from './findone.service';


class UserCreateService {
    constructor(private UserRepository:IUserRepository){}

    executeHandle = async (payload:IUser): Promise<IUser | null> => {
        const findUser:IUser | null = await UserFindByService.executeHandle(payload.Email!);

        if(findUser){
            throw({Message:'Email já cadastrado no sistema', StatusCode:400,error:findUser})
        }
        const data = new ObjectFactory<IUser>().createObject(payload);
        const newUser:IUser | null = await this.UserRepository.create(data);

        return newUser ? newUser : null;
    }
}

export default new UserCreateService(new UserRepository());