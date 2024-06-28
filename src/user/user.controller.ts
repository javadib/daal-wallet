import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from '../transaction/dto/create-transaction.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary:
      'Create a new instance of the model and persist it into the data source.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary:
      'Find all instances of the model matched by filter from the data source.',
  })
  @Get()
  findAll(query: any) {
    return this.userService.findAll(query);
  }

  @ApiOperation({
    summary: 'Find a model instance by {{id}} from the data source.',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return user;
  }

  @ApiOperation({
    summary:
      'Patch attributes for a model instance and persist it into the data source.',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: "Delete a model instance by '{id}' from the data source.",
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return this.userService.delete(id);
  }

  @ApiOperation({
    summary: 'Get balance of specific user',
  })
  @Get(':user_id/balance')
  async getBalance(@Param('user_id') userId: number) {
    return this.userService.getBalance(userId);
  }

  @ApiOperation({
    summary: 'add/subtract amount to user wallet',
  })
  @Post('money')
  async addMoney(@Body() body: CreateTransactionDto) {
    if (body.amount == 0) {
      throw new UnprocessableEntityException(
        'amount should more/less than doer',
      );
    }

    return this.userService.addMoney(body.user_id, body.amount);
  }
}
