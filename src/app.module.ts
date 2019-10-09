import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Constants } from './common/constants';
import { HeroModule } from './hero/hero.module';
import { MicroServiceModule } from './microservice/microservice.module';
import { HeroController } from './hero/hero.controller';
import { Config } from './config';

@Module({
    imports: [
        TypeOrmModule.forRoot(Object.assign(Config.MYSQL_OPTIONS, { entities: Constants.db.entities })),
        UsersModule,
        AuthModule,
        HeroModule,
        MicroServiceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    constructor(private readonly connection: Connection) {}

    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        // console.log('MiddlewareConsumer ===>>>');
        consumer
            .apply(LoggerMiddleware)
            // .with('AppModule')
            // .forRoutes('users');
            // .exclude({ path: 'users', method: RequestMethod.DELETE })
            // .forRoutes({ path: 'users', method: RequestMethod.ALL });
            // .forRoutes(UsersController, HeroController);
            // return undefined;
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
