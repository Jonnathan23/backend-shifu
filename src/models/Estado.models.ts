import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table({
    tableName: 'Estado_puerta',
    timestamps: false
})

class Estado extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({ type: DataType.INTEGER })
    descripcion!: number
}

export default Estado