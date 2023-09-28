import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { authConfig } from 'src/configuration';
import { ConfigType } from '@nestjs/config';
import { emit } from 'process';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(authConfig.KEY) private readonly auth: ConfigType<typeof authConfig>,
    private jwtService: JwtService,
    ) {}

  async create(newUser: UserDto) {
    // Check if exist
    let user: UserDocument = await this.userModel.findOne({ email: newUser.email });
    if(user) {
      throw new BadRequestException(`An user with the email ${newUser.email} already exists`);
    }

    // Hash password
    const saltOrRounds: number = Number.parseInt(this.auth.saltOrRounds);
    let hassedPassword: string = await bcrypt.hash(newUser.password, saltOrRounds);

    // Save
    await this.userModel.create({
      ...newUser,
      password: hassedPassword,
    });

    return { email: newUser.email }
  }

  async login(loginUser: UserDto) {
    // Check if exist
    const user = await this.userModel.findOne({email: loginUser.email});
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
    return this.userModel.findOne({ email });
  }
}
