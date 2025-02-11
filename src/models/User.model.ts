import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

export interface UserInterface extends Model {
    id: number
    username: string
    password: string
}

@Table({
    tableName: 'Usuarios',
    timestamps: false
})

class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({ type: DataType.STRING(150) })
    username!: string

    @Column({ type: DataType.STRING(100) })
    password!: string


}

export default User