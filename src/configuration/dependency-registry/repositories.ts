// import { Global, Module } from "@nestjs/common";

// infrastructure/repositories/repositories.module.ts
// @Global() // Optional: Makes repositories available everywhere without re-importing
// @Module({
//   providers: [
//     {
//       provide: 'USER_REPOSITORY_PORT',
//       useClass: SqlUserRepository,
//     },
//   ],
//   exports: ['USER_REPOSITORY_PORT', 'ORDER_REPOSITORY_PORT'],
// })
// export class RepositoriesModule {}