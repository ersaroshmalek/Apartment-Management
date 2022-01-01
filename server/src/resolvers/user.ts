import { User } from '../entity/User';
import { Context } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from 'type-graphql';
import { validateRegister } from '../uitilities/validateResolver';

@InputType()
export class NewUser {
  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export class RegisterResolver {
  bcrypt = require('bcrypt');
  @Query(() => String)
  async hello() {
    return 'hellow';
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('userNameOrEmail') userName: string,
    @Arg('password') password: string,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      $or: [{ userName: userName }, { email: userName }],
    });
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'invalide user name or password',
          },
        ],
      };
    }
    const valid = this.bcrypt.compareSync(password, user.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: 'invalide user name or password',
          },
        ],
      };
    }

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('option') options: NewUser,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const saltRounds = 10;
    const user = new User();
    (user.userName = options.userName), (user.email = options.email);
    const hashedPassword = this.bcrypt.hashSync(options.password, saltRounds);
    user.password = hashedPassword;

    try {
      const result = em.create(User, user);
      await em.persistAndFlush(result);
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        };
      }
    }

    return { user };
  }
}
