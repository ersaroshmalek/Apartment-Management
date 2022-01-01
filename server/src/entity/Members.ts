import {
  BaseEntity,
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Members extends BaseEntity<Members, '_id'> {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field()
  @SerializedPrimaryKey()
  id!: string;

  @Field()
  @Property({ type: 'number', unique: true })
  flatNo!: number;

  @Field()
  @Property({ type: 'string', unique: true })
  email!: string;

  @Field()
  @Property({ type: 'text' })
  fullName!: string;

  @Field()
  @Property({ type: 'number' })
  contact!: number;

  @Field()
  @Property({ type: 'number' })
  amountDue!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updateAt = new Date();
}
