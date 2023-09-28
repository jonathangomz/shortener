import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './endpoints/user/dto/user.dto';
import { AuthService } from './services/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    ) {}

  @ApiTags('auth')
  @Post('auth/signup')
  signup (@Body() newUser: UserDto) {
    return this.authService.signup (newUser);
  }

  @ApiTags('auth')
  @Post('auth/login')
  login(@Body() user: UserDto) {
    return this.authService.login(user);
  }
}
