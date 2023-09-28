import sequelize  from "sequelize";

class DatConnection {
    public conn!:sequelize.Sequelize;

    constructor(){
        this.openConnection();
    }

    openConnection = () => {
        this.conn = new sequelize.Sequelize({
            username:'freedb_tilindo14',
            password:'kDT?rcD%rdzj*D2',
            host:'sql.freedb.tech',
            port:3306,
            database:'freedb_foxdevhobby',
            dialect:'mysql'
        });
    }
}

export const DataConnection = new DatConnection().conn;