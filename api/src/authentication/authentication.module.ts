import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.contoller';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticationSerializer } from './passport/session.serializer';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionAuthenticationGuard } from './guards/session-authentication.guards';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    AuthenticationService,
    LocalAuthGuard,
    AuthenticationSerializer,
    LocalStrategy,
    SessionAuthenticationGuard,
  ],
  controllers: [AuthenticationController],
  exports: [SessionAuthenticationGuard],
})
export class AuthenticationModule {}
