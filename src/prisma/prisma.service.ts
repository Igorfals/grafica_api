import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const dbUrl = configService.get<string>('DATABASE_URL');
    
    if (!dbUrl) {
      throw new Error('❌ DATABASE_URL não está definida! Verifique suas variáveis de ambiente.');
    }

    console.log('🔗 Conectando ao banco de dados...');
    super({ 
      datasources: { 
        db: { url: dbUrl } 
      } 
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Conectado ao banco de dados com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao conectar ao banco de dados:', error);
      throw error;
    }
  }
}
