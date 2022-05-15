import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ name: 'name', type: 'nvarchar', length: 255, nullable: false })
    name: string

    @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
    email: string

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
    password: string


    @OneToMany(()=>Product,(porduct)=>porduct.user)
    products?: Product[]

}
