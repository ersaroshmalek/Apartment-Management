import { Members } from '../entity/Members';
import { Context } from 'src/types';
import { Arg, Ctx, Field, Mutation, ObjectType, Query } from 'type-graphql';
import { Maintenance } from '../entity/Maintenance';

@ObjectType()
class Output {
  @Field()
  flatNo: number;
  @Field()
  due: number;
  @Field()
  amount: number;
}

export class MaintenanceResolver {
  @Mutation(() => Output)
  async addMaintenance(
    @Arg('flatNo') flatNo: number,
    @Arg('date') date: string,
    @Arg('amountPaid') amountPaid: number,
    @Arg('email') email: string,
    @Ctx() { em }: Context
  ) {
    const output = new Output();
    const options = {
      flatNo: flatNo,
      date: date,
      amountPaid: amountPaid,
      email: email,
    };
    try {
      const result = await em.findOne(Members, { flatNo: options.flatNo });
      if (!result) {
        throw new Error('flat id not found');
      }

      // add Monthly maintenance paid
      const data = await em.create(Maintenance, options);
      await em.persistAndFlush(data);

      if (data) {
        const calAmnt = result?.amountDue + options.amountPaid;
        result.amountDue = calAmnt;
        // update total due or advance in Members collection
        const newMem = await em.create(Members, result);
        await em.persistAndFlush(newMem);
        output.flatNo = options.flatNo;
        output.due = newMem.amountDue;
        output.amount = data.amountPaid;
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return output;
  }

  @Query(() => [Members])
  async getPendingMembers(@Ctx() { em }: Context): Promise<Members[]> {
    return await em.find(Members, { amountDue: { $lt: 0 } });
  }

  @Query(() => [Members])
  async getAllMembers(@Ctx() { em }: Context): Promise<Members[]> {
    return await em.find(Members, {});
  }

  @Query(() => [Maintenance])
  async getHistory(
    @Ctx() { em }: Context,
    @Arg('apartmentId') apartmentId: number
  ): Promise<Maintenance[]> {
    return await em.find(Maintenance, { flatNo: apartmentId });
  }
}
