import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './dto';

@Controller('students')
export class StudentController {

    constructor(@InjectRepository(Student) private studentRepo: Repository<Student>){}

    @Get()
    async findAll(){
        const students: Student[] = await this.studentRepo.find();
        return {success:true, count: students.length, datas: students};
    }

    @Get(':id')
    async getstudent(@Param('id') id){
        const student: Student = await this.studentRepo.findOneBy({id});
        if(!student)
            throw new NotFoundException();
        
        return {success:true, data: student};
    }

    @Post()
    async addStudent(@Body() data: CreateStudentDto ){
        const newStudent: Student = await this.studentRepo.save({
            ...data,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
        return {success: true, data: newStudent};
    }

    @Patch(':id')
    async updateStudent(@Param('id') id, @Body() data: UpdateStudentDto){
        const student: Student = await this.studentRepo.findOneBy({id});

        if(!student)
            throw new NotFoundException();
        const newdata: Student = await this.studentRepo.save({
            ...student,
            ...data,
            createdAt: data.createdAt ?? student.createdAt,
            updatedAt: data.updatedAt ?? student.updatedAt,
        })

        return {success: true, data: newdata};
        
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        const student: Student = await this.studentRepo.findOneBy({id});

        if(!student){
            throw new NotFoundException();
        }
        await this.studentRepo.remove(student);
    }
}
