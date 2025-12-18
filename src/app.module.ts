import { Module } from '@nestjs/common';
import { AssetsModule } from './modules/assets/module';

@Module({
  imports: [AssetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
