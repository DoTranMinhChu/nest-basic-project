import {IsString,MaxLength,IsNotEmpty,IsEmail } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}
