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

/**
 * UserController handles requests related to user management and wallet transactions.
 */
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   * @param {CreateUserDto} createUserDto - Data Transfer Object containing user creation data.
   * @returns {Promise<User>} The created user.
   */
  @ApiOperation({
    summary:
      'Create a new instance of the model and persist it into the data source.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Finds all users.
   * @param {any} query - Query parameters for filtering the users.
   * @returns {Promise<User[]>} List of all users.
   */
  @ApiOperation({
    summary:
      'Find all instances of the model matched by filter from the data source.',
  })
  @Get()
  findAll(query: any) {
    return this.userService.findAll(query);
  }

  /**
   * Finds a user by ID.
   * @param {number} id - The ID of the user to find.
   * @returns {Promise<User>} The found user.
   * @throws {NotFoundException} If the user is not found.
   */
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

  /**
   * Updates a user by ID.
   * @param {number} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto - Data Transfer Object containing user update data.
   * @returns {Promise<User>} The updated user.
   */
  @ApiOperation({
    summary:
      'Patch attributes for a model instance and persist it into the data source.',
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Deletes a user by ID.
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<void>} A promise indicating the deletion result.
   * @throws {NotFoundException} If the user is not found.
   */
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

  /**
   * Gets the balance of a specific user.
   * @param {number} userId - The ID of the user to get the balance for.
   * @returns {Promise<{balance: number}>} The user's balance.
   */
  @ApiOperation({
    summary: 'Get balance of specific user',
  })
  @Get(':user_id/balance')
  async getBalance(@Param('user_id') userId: number) {
    return this.userService.getBalance(userId);
  }

  /**
   * Adds or subtracts money to/from a user's wallet.
   * @param {CreateTransactionDto} body - Data Transfer Object containing the transaction details.
   * @returns {Promise<{reference_id: number}>} The transaction reference ID.
   * @throws {UnprocessableEntityException} If the amount is zero.
   */
  @ApiOperation({
    summary: 'add/subtract amount to specific user wallet',
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
