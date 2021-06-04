import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, HasMany, BelongsTo } from 'sequelize-typescript';


@Table({
    tableName: 'users',
    timestamps:true,
    createdAt:'createAt',
    updatedAt:'updateAt',
    indexes:[{
        name: 'ix_user_name',
        fields: ['name']
    },{
        name: 'ix_user_address',
        fields: ['address']
    }]
})

export default class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    userId: number;

    @Column({
        field : 'name',
        type: DataType.STRING(500),
        allowNull : true
    })
    name: string;

    @Column({
        field : 'address',
        type: DataType.STRING(500),
        allowNull : true
    })
    address: string;

    @Column({
        field : 'phone',
        type:DataType.STRING(200),
        allowNull : true
    })
    phone : string
}