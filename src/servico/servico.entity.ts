import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ArquitetoEntity } from "src/arquiteto/arquiteto.entity";
import { ClienteEntity } from "src/cliente/cliente.entity";

@Table({
  tableName: "arquiteto",
  modelName: 'arquiteto',
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
    type: DataType.STRING(150),
  })
  clientefk: string

  @ForeignKey(() => ArquitetoEntity)
  @Column({
    allowNull: false,
    type: DataType.STRING(150),
  })
  arquitetofk: string

  @Column({
    allowNull: false,
    type: DataType.TINYINT,
  })
  status: number

  @HasMany(() => ServicoEntity)
  servico: ServicoEntity
}