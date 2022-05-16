import { IsString, MaxLength, IsNotEmpty, IsEmail, IsNumber } from 'class-validator'

export class UserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number

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
