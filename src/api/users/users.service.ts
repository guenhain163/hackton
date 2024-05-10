import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@utils/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(data: CreateUserDto) {
    // For now, create a personal org for each user
    const existingUser = await this.findByWalletAddress(data.walletAddress);
    if (existingUser) {
      throw new HttpException(
        `Error: A user with wallet addess ${data.walletAddress} already exists`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.prismaService.user.create({
      data: {
        name: data.name,
        walletAddress: data.walletAddress,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findByWalletAddress(walletAddress: string) {
    return this.prismaService.user.findUnique({
      where: { walletAddress: walletAddress },
    });
  }
}
