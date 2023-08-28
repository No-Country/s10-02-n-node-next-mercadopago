import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './jwtstrategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),

    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    {
      provide: 'authService',
      useClass: AuthService,
    },
  ],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
