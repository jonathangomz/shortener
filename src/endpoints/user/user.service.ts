import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,) {}

  create(newUser: UserDto) {
    return this.userModel.create(newUser);
  }

  find(email: string) {
    return this.userModel.findOne({ email });
  }
}
