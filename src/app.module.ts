import { Module } from '@nestjs/common';
import { AssetsModule } from './modules/assets/module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    AssetsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
