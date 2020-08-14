import { Injectable } from '@nestjs/common';
import { User, UsersData } from 'src/models';
import users from '../data/users';

@Injectable()
export class UserService {
  findAll(skip: number, total: number, context): UsersData {
    console.log(`Returning ${total} users, skipping the first ${skip}`);
    context.dbQueryCount++;
    return {
      data: users.slice(skip, skip + total),
      total: users.length,
    };
  }

  find(id: number): User {
    console.log(`Looking for user => ${id}`);
    return users.find((u) => u.id === id);
  }
}
