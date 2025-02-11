import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'
import User from './User.model'


@Table({
    tableName: 'Tokens',
    timestamps: false
})

class Token extends Model {

    @Column({ type: DataType.INTEGER })
    declare token: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    declare user_id: number

    
}

export default Token;