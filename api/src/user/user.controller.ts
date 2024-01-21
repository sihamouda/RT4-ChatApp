import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SearchUserDto } from './dto/search-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get(':query')
    async find(@Param('query') query: SearchUserDto){
        const user = this.userService.searchUsers(query);
    }

    @Put("change-status")
    async register(@Body() )
}
