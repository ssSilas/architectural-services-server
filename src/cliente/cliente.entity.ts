import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ServicoEntity } from "src/servico/servico.entity";

@Table({
  tableName: "cliente",
  modelName: 'cliente',
  updatedAt: false
})
export class ClienteEntity extends Model {
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
    allowNull: false,
    type: DataType.STRING(),
  })
  password: string

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

  @HasMany(() => ServicoEntity)
  servico: ServicoEntity
}