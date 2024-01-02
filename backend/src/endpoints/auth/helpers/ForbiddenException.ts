import { HttpException, HttpStatus } from "@nestjs/common";


export class ForbiddenException403 extends HttpException {
    constructor(message?: string) {
      super(message || 'Forbidden', HttpStatus.FORBIDDEN);
    }
  }