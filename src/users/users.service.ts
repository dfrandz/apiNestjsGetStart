import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async findOneByEmail(email: string) {
        const userList = await this.userRepo.find();
        console.log("liste user",userList);
        if(userList.length == 0){
            return null
        }
        return userList.find(user => user.email == email)
    }

    async create(user: CreateUserDto){
        const user1: CreateUserDto = await this.userRepo.save({
            ...user,
        });
        return {success: true, data: user1};
    }
}
