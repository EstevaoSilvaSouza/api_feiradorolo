import JWT from 'jsonwebtoken';


class AuthToken {
    generateToken = (data:any):string | null => {
        return JWT.sign(data,'1234', {expiresIn:'1h'})
    }
}

export default new AuthToken();