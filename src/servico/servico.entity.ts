import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ArquitetoEntity } from "src/arquiteto/arquiteto.entity";
import { ClienteEntity } from "src/cliente/cliente.entity";

@Table({
  tableName: "servico",
  modelName: 'servico',
  updatedAt: false
})
export class ServicoEntity extends Model {
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
  descricao: string

  @ForeignKey(() => ClienteEntity)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  clientefk: number

  @ForeignKey(() => ArquitetoEntity)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  arquitetofk: number

  @Column({
    allowNull: false,
    type: DataType.TINYINT,
  })
  status: number
}