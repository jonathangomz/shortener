import { PickType } from "@nestjs/mapped-types";
import { UserDto } from "./create-user.dto";

export class FindUserDto extends PickType(UserDto, ['email', 'password'] as const) {}
