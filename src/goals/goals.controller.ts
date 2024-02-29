import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateGoalDto, UpdateGoalDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './entities/goal.entity';
import { Repository } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('goals')
export class GoalsController {


    constructor(@InjectRepository(Goal) private goalRepository: Repository<Goal>){}


    @Get()
    @UseGuards(JwtGuard)
    async findAll(){
        const goals: Goal[] = await this.goalRepository.find();
        return { success: true, count: goals.length, datas: goals}
    }

    @Get(':id')
    async findOne(@Param('id') id){
        console.log(id);
        const gaol : Goal = await this.goalRepository.findOneBy({id});

        if(!gaol){
            throw new NotFoundException();
        }
        return {success: true,data: gaol};
    }

    @Post()
    async create(@Body() data: CreateGoalDto){
        const newGoal: Goal = await this.goalRepository.save({
            ...data,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        })
        return {success: true, data: newGoal};
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() newData: UpdateGoalDto) {
        const gaol: Goal = await this.goalRepository.findOneBy({id});
        if(!gaol){
            throw new NotFoundException();
        }

        const data = await this.goalRepository.save({
            ...gaol,
            ...newData,
            createdAt: newData.createdAt ?? gaol.createdAt,
            updatedAt: newData.updatedAt ?? gaol.updatedAt,
        })

        return {success: true, data: data};
    }


    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const gaol: Goal = await this.goalRepository.findOneBy({id});

        if(!gaol){
            throw new NotFoundException();
        }
        await this.goalRepository.remove(gaol);
    }

}
