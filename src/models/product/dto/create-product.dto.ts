import {IsString,MaxLength,IsNotEmpty,IsNumber } from 'class-validator'

export class CreateProductDto {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    price: Number

    @IsString()
    @IsNotEmpty()
    password: string
}
