import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "arquiteto",
  modelName: 'arquiteto',
  updatedAt: false
})
export class ArquitetoEntity extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.STRING(150),
  })
  nome: string

  @Column({
    allowNull: false,
    type: DataType.STRING(150),
  })
  email: string

  @Column({
    allowNull: true,
    type: DataType.STRING(15),
  })
  telefone: string

  @Column({
    allowNull: false,
    type: DataType.STRING(20),
  })
  genero: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER({ length: 3 }),
  })
  idade: number
}