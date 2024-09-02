import { SelectQueryBuilder, FindOptionsWhere } from 'typeorm';

// Utility function to build a query dynamically
export function buildQuery<T>(
  queryBuilder: SelectQueryBuilder<T>,
  conditions: FindOptionsWhere<T>,
  entityAlias: string = 'entity', // Default alias for the main entity
): SelectQueryBuilder<T> {
  for (const [key, value] of Object.entries(conditions)) {
    if (value !== undefined && value !== null) {
      // Handle relationships and aliases differently
      if (typeof value === 'object' && !(value instanceof Date)) {
        // If `key` is `owner`, add a join for the owner table
        if (key === 'owner') {
          queryBuilder
            .leftJoinAndSelect(`${entityAlias}.owner`, 'owner') // Correctly reference the relationship
            .addSelect(['owner.id', 'owner.name', 'owner.email']) // Explicitly select fields excluding 'password'
            .andWhere('owner.id = :ownerId', { ownerId: (value as any).id });
        } else {
          // Handle other relationships, if needed
          queryBuilder
            .leftJoinAndSelect(`${entityAlias}.${key}`, key)
            .andWhere(`${key}.id = :${key}Id`, {
              [`${key}Id`]: (value as any).id,
            });
        }
      } else {
        // Handle non-object conditions with explicit alias for column references
        queryBuilder.andWhere(`${entityAlias}.${key} = :${key}`, {
          [`${key}`]: value,
        });
      }
    }
  }

  return queryBuilder;
}
