import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { authConfig } from 'src/configuration';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/endpoints/user/user.service';
import { UserDto } from 'src/endpoints/user/dto/user.dto';
import { UserDocument } from 'src/endpoints/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private readonly auth: ConfigType<typeof authConfig>,
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

  async signup (newUser: UserDto) {
    // Check if exist
    let user: UserDocument = await this.userService.find(newUser.email);
    if(user) {
      throw new BadRequestException(`An user with the email ${newUser.email} already exists`);
    }

    // Hash password
    const saltOrRounds: number = Number.parseInt(this.auth.saltOrRounds);
    let hassedPassword: string = await bcrypt.hash(newUser.password, saltOrRounds);

    // Save
    await this.userService.create({
      ...newUser,
      password: hassedPassword,
    });

    return { email: newUser.email }
  }

  async login(loginUser: UserDto) {
    // Check if exist
    const user = await this.userService.find(loginUser.email);
    if (user) {
      // Check password
      let passWordIsOk = await bcrypt.compare(loginUser.password, user.password);
      if(passWordIsOk) {
        // Sign jwt
        return {
          access_token: this.jwtService.sign({
            email: user.email,
          }),
        };
      }
    }

    throw new UnauthorizedException(`Wrong credentials`);
  }

  findOne(email: string) {
    return this.userService.find(email);
  }
}
