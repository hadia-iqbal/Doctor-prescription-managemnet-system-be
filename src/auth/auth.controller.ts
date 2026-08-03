import { Controller, Post, Get, Body, Headers, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AddAssistantDto } from './dto/add-assistant.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('add-assistant')
  addAssistant(@Body() addAssistantDto: AddAssistantDto, @Headers('authorization') authHeader: string) {
    const decoded = this.checkDoctor(authHeader);
    return this.authService.addAssistant(addAssistantDto);
  }

  @Get('assistants')
  viewAssistants(@Headers('authorization') authHeader: string) {
    this.checkDoctor(authHeader);
    return this.authService.viewAssistants();
  }

  private checkDoctor(authHeader: string) {
    if (!authHeader) throw new UnauthorizedException('No token provided.');
    const token = authHeader.split(' ')[1];
    const decoded = this.authService.verifyToken(token);
    if (decoded.role.toLowerCase() !== 'doctor') {
      throw new ForbiddenException('Access denied. Doctor only.');
    }
    return decoded;
  }
}