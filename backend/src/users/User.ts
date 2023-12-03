import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username:string;

    @Column()
    password: string;

    @Column({default:IMAGES.defaultUserProfileImage})
    profileImageUrl: string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    bio:string;

    // @OneToOne(() => Profile)
    // @JoinColumn()
    // profile: Profile;

    // @OneToMany(()=> Post, (post)=>post.user)
    // posts: Post[];



}