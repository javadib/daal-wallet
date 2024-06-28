import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction')
@ApiExcludeController()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({
    summary:
      'Create a new instance of the model and persist it into the data source.',
  })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @ApiOperation({
    summary:
      'Find all instances of the model matched by filter from the data source.',
  })
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @ApiOperation({
    summary: 'Find a model instance by {{id}} from the data source.',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.transactionService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Transaction does not exist!`);
    }

    return user;
  }

  @ApiOperation({
    summary:
      'Patch attributes for a model instance and persist it into the data source.',
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @ApiOperation({
    summary: "Delete a model instance by '{id}' from the data source.",
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const user = await this.transactionService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return this.transactionService.delete(id);
  }
}
