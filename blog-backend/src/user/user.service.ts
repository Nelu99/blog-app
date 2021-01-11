import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users.map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            interests: user.interests,
            role: user.role
        }));
    }

    async addInterest(id: string, interest: string) {
        const user = await this.findUser(id);
        if (!user.interests.includes(interest.toString())) {
            user.interests.push(interest.toString());
        }
        user.save();

        return {
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            interests: user.interests
        };
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find user.');
        }
        return true;
    }

    async removeInterest(id: string, interest: string) {
        const user = await this.findUser(id);
        if (user.interests.includes(interest.toString())) {
            user.interests.forEach((item, index) => {
                if (item === interest.toString()) user.interests.splice(index, 1);
            });
        }
        user.save();

        return {
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            interests: user.interests
        };
    }

    async insertUser(name: string, password: string, email: string, img: string, int: string[], role: string) {
        if (await this.isEmailInUse(email) === true) {
            throw new HttpException('Email already in use.', HttpStatus.FORBIDDEN);
        }

        const newuser = new this.userModel({
            name: name,
            password: password,
            email: email,
            photoUrl: img,
            interests: [],
            role: role
        });
        const result = await newuser.save();
        return result;
    }

    async getSingleUser(userId: string) {
        const user = await this.findUser(userId);
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            interests: user.interests,
            role: user.role
        };
    }

    async loginUser(userPassword: string, userEmail: string) {
        let user: User;
        try {
            user = await this.userModel.findOne({ email: userEmail }).exec();
        } catch (error) {
            throw new NotFoundException('Email is not associated to an account.');
        }
        if (!user) {
            throw new NotFoundException('Email is not associated to an account.');
        }
        if (user.password != userPassword) {
            throw new NotFoundException('Email and password do not match.');
        }
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            interests: user.interests,
            role: user.role
        };
    }

    async isEmailInUse(userEmail: string) {
        let user: User;
        try {
            user = await this.userModel.findOne({ email: userEmail }).exec();
        } catch (error) {
            return false;
        }
        if (!user) {
            return false;
        }
        return true;
    }

    private async findUser(id: string): Promise<User> {
        let user: User;
        try {
            user = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find user.');
        }
        if (!user) {
            throw new NotFoundException('Could not find user.');
        }
        return user;
    }
}
