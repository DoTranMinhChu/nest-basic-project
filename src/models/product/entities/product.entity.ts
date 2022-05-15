import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name', type: 'nvarchar', length: 255, nullable: false })
    name: string;

    @Column({ name: 'price', type: 'float', nullable: false })
    price: number;

    @Column({ name: 'userID', nullable: false })
    userID: number

    @ManyToOne(()=>User, (user)=>user.products)
    @JoinColumn({name:'userID'})
    user?: User

}
