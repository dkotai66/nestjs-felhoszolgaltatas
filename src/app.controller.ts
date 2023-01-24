import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import TarhelyAdatokDto from './tarhelyadatok.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/tarhely')
  async tarhelyekadata(){
    const [adatok] = await db.execute(
      'SELECT * FROM tarhelycsomagok ORDER BY id'
    );
    return {adatok:adatok};
  }

  @Post('/api/tarhely')
  async tarhelyRegister(@Body() tarhelyadat: TarhelyAdatokDto) {
    await db.execute('INSERT INTO tarhelycsomagok (nev, meret, ar) VALUES (?, ?, ?)', [
      tarhelyadat.nev, tarhelyadat.meret, tarhelyadat.ar
    ]);
  }

  @Delete('/api/tarhely/:id')
  async torles(@Param('id') id:number){
    await db.execute(
      'DELETE FROM tarhelycsomagok WHERE id = ?', 
      [id],
    );
  }
  
}
