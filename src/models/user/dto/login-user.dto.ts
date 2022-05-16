import { IsString, MaxLength, IsNotEmpty, IsEmail, IsNumber } from 'class-validator'

export class LoginUserDto {

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}
