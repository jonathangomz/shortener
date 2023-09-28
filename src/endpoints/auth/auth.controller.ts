import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('auth')
  @Post('signup ')
  signup (@Body() newUser: UserDto) {
    return this.authService.signup (newUser);
  }

  @ApiTags('auth')
  @Post('login')
  login(@Body() user: UserDto) {
    return this.authService.login(user);
  }

  @Get(':id')
  findOne(@Body() findUserDto: FindUserDto) {
    return this.authService.findOne(findUserDto.email);
  }
}
