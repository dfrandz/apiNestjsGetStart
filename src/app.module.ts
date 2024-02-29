import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoalsController } from './goals/goals.controller';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfigProd from './config/orm.config.prod';
import { Goal } from './goals/entities/goal.entity';
import { StudentController } from './student/student.controller';
import { Student } from './student/entities/student.entity';
import { StudentService } from './student/student.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    TypeOrmModule.forFeature([Goal, Student, User]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, GoalsController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
