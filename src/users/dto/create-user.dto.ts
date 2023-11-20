import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    profilePicture: string;

}
