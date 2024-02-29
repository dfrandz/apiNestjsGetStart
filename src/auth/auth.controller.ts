import { Body, Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalGuard)
    connexion(@Body() authPayloadDto: AuthPayloadDto) {
        return this.authService.valideUser(authPayloadDto);
    }


    @Post('register')
    register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto);
    }


    @Get('status')
    @UseGuards(JwtGuard)
    status(@Req() req: Request){
        return req.user
    }
}
