import { PipeTransform } from '@nestjs/common';
import { PageQueryDto } from './pagination-query.dto';

export class PageQueryPipe
  implements
    PipeTransform<{ page: string; take: string; sort: string }, PageQueryDto>
{
  transform(value: { page: string; take: string; sort: string }) {
    let skip: number, limit: number;

    const sort = ['_id', 'asc'];
    if (value.sort) {
      const sortQuery = value.sort.split(' ');
      sort[0] = sortQuery[0];
      if (sortQuery[1].toLowerCase() === 'desc') sort[1] = 'desc';
    }

    parseInt(value.page)
      ? (skip = Math.abs(parseInt(value.page)) - 1)
      : (skip = 0);
    parseInt(value.take)
      ? (limit = Math.abs(parseInt(value.take)))
      : (limit = 10);
    return { skip, limit, sort } as PageQueryDto;
  }
}
