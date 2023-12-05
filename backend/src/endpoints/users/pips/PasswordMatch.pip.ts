import { PipeTransform, Injectable, ArgumentMetadata,BadRequestException } from '@nestjs/common';
import { addUserDTO } from '../dtos/AddUser.dto';

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(user: addUserDTO , metadata: ArgumentMetadata) {
    if(user.password !== user.rePassword) throw new BadRequestException("password and rePassword should be matched!")
    else return user;
  }
}
