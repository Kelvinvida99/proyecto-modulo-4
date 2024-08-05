import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../Users/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Inicia sesión de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
  signIn(@Body() credentials: LoginUserDto) {
    return this.authService.signIn(credentials);
  }
}
