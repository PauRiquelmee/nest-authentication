import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://uc2otji7v6gyyjzca0mz:vIlWfQ9MNxZI5kEEql7C@be5xxbyq60mvzzz-mongodb.services.clever-cloud.com:27017/be5xxbyq60mvzzz',
    ),
  ],
})
export class MongoModule {}
