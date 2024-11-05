import { Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript'

@Table({
    tableName: 'Estado_puerta'
})

class Estado extends Model {
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id?: number

    @Column({ type: DataType.INTEGER })
    descripcion!: number
}

export default Estado