import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.contoller';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticationSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionAuthenticationGuard } from './session-authentication.guards';

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
