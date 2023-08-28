import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateCardDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '44154-5454-4545'})

    number: String

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '2024-5-05'})
    expiration: Date

    @IsInt()
    @ApiProperty({example: 114 })
    cvv: Number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'felipe betancur' })
    headline: String
}
