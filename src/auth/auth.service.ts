import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) { }


  //verifier si l utilisateur existe
  async valideUser(authPayloadDto: AuthPayloadDto) {
    const findUser: User = await this.userService.findOneByEmail(authPayloadDto.username);
    if (!findUser) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(authPayloadDto.password, findUser.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    const payload = { email: findUser.email };
    return this.jwtService.sign(payload);
  }

  //connexion utilisateur
  async login(user: CreateUserDto): Promise<{ access_token: string }> {
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  //creation de compte
  async register(user: CreateUserDto): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser != null) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    await this.userService.create(newUser);
    return this.login(newUser);
  }
}
