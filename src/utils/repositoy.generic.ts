import { FilterQuery, Model, SortOrder } from 'mongoose';
import { PageQueryDto as PageQueryDto } from './pagination-query.dto';

export abstract class BaseRepository<T, C, U> {
  constructor(private readonly model: Model<T>) {}

  async findAllQuery(): Promise<T[]> {
    return await this.model.find<T>().exec();
  }

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return await this.model.find<T>(filter).exec();
  }

  async findPageQuery(
    { skip, limit, sort }: PageQueryDto,
    populate?: string,
  ): Promise<T[]> {
    const query = this.model
      .find<T>()
      .limit(limit)
      .skip(skip)
      .sort([sort] as [string, SortOrder][]);
    if (populate) {
      return await query.populate(populate).exec();
    }
    return await query.exec();
  }

  async countAllQuery(): Promise<number> {
    return await this.model.estimatedDocumentCount().exec();
  }

  async findOneQuery(id: string, populate?: string): Promise<T> {
    if (populate)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.model.findById(id).populate(populate).exec();
    return this.model.findById(id).exec();
  }

  async createQuery(dto: C): Promise<T> {
    return await this.model.create(dto);
  }

  async updateOneQuery(id: string, dto: U): Promise<T> {
    return await this.model.findByIdAndUpdate<T>(id, dto, {
      new: true,
    });
  }

  async deleteOneQuery(id: string) {
    return await this.model.deleteOne({ _id: id }).exec();
  }

  async createManyQuery(dtoArray: C[]): Promise<T[]> {
    return await this.model.create(dtoArray);
  }

  async deleteManyQuery(condition: object) {
    return await this.model.deleteMany(condition);
  }
}