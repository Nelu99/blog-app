import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    BlogModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
