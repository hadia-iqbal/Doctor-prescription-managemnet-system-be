import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { AddAssistantDto } from './dto/add-assistant.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatches = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const normalizedRole = user.role.toLowerCase();

    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      role: normalizedRole,
    });

    return {
      message: `Welcome ${normalizedRole === 'doctor' ? 'Doctor' : 'Assistant'}!`,
      token,
      role: normalizedRole,
      username: user.username,
    };
  }

  async addAssistant(addAssistantDto: AddAssistantDto) {
    const { username, password, email, phone } = addAssistantDto;

    if (username.length > 20) {
      throw new BadRequestException('Username cannot exceed 20 characters.');
    }

    const specialCharRegEx = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8 || password.length > 25) {
      throw new BadRequestException('Password must be between 8 and 25 characters.');
    }
    if (!specialCharRegEx.test(password)) {
      throw new BadRequestException('Password must contain at least one special character.');
    }

    const existing = await this.prisma.user.findUnique({ where: { username } });
    if (existing) {
      throw new BadRequestException('This username is already taken.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        phone,
        role: 'assistant',
      },
    });

    return { message: 'Assistant created successfully!' };
  }

  async viewAssistants() {
    const assistants = await this.prisma.user.findMany({
      where: { role: 'assistant' },
      select: { id: true, username: true, email: true, phone: true },
    });
    return { assistants };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}