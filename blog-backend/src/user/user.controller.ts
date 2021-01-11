import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllusers() {
        const user = await this.userService.getUsers();
        return user;
    }

    @Post()
    async adduser(
        @Body('name') userName: string,
        @Body('password') userPassword: string,
        @Body('email') userEmail: string,
        @Body('photoUrl') userImage: string,
        @Body('interests') userInterests: string[],
        @Body('role') userRole: string
    ) {
        const user = await this.userService.insertUser(
            userName,
            userPassword,
            userEmail,
            userImage,
            userInterests,
            userRole
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'user added successfully',
            data: user,
        };
    }

    @Post('login')
    async loginuser(
        @Body('password') userPassword: string,
        @Body('email') userEmail: string
    ) {
        return await this.userService.loginUser(
            userPassword,
            userEmail
        );
    }

    @Get(':id')
    async getuser(@Param('id') userId: string) {
        return this.userService.getSingleUser(userId);
    }

    @Get('email/:email')
    async getblog(@Param('email') userEmail: string) {
        return this.userService.isEmailInUse(userEmail);
    }

    @Patch(':id')
    async addUserInterest(
        @Param('id') userId: string,
        @Body('interest') userInterest: string,
    ) {
        return await this.userService.addInterest(userId, userInterest);
    }

    @Patch('remove/:id')
    async removeUserInterest(
        @Param('id') userId: string,
        @Body('interest') userInterest: string,
    ) {
        return await this.userService.removeInterest(userId, userInterest);
    }

    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        const isDeleted = await this.userService.deleteUser(userId);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'user deleted successfully',
            };
        }
    }
}