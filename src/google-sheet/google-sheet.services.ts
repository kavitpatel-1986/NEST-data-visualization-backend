import { Injectable, UnauthorizedException } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleSheetsService {
  private sheets;

  constructor(private readonly prisma: PrismaService) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: 'gsheet@fourth-cedar-438908-c6.iam.gserviceaccount.com',
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwm1E/u2NGlXBz\npNG/lzQkbYM2uOH6HKaRRasZAe0Rjmc7EbCDq3YoMBm5d52BPYJvYp6cgwix+8W9\ns/RW0SLCmhtUwIjUr2d17ElALmZ3KjOTzcWbfKdLANhH74HU+I6SwxwNAxvHekG8\nhFzyG6p1gtMiZ4cv3EL7h7Jgopk/lMMiykOUJ0k4SXEtlhxO5/FZo4dsa6qSINOV\n70q+L2BzhFsGSM2ZLvL8LGRLk6974iFk54/shfyNMHUn9G+BOh7QHqBxITB9AqvL\nW+/JbQU0hURZEe/ISnm4b0dMcP8gzGldQrj5TJbOuTNhOubb3LzgpVx9UXm/sjRc\nf5hmfmbNAgMBAAECggEABHG7Q5Xe1yKoQpC/zSyWz2/eEqt2ZTtzHvT7+g09Wz5N\nKEt+OKkkf0eD7jV0uALh6qNveUV8N/n0kPJUev3t36wHIETCUExOl6jEOj7pkPnn\nc+1LmdtPh1NUc1hPvKgrSBrd9J80oE+vaVy7zSjQZ6m+lxuboE20IHuh0vgPM+AH\nVY/URGdFfxRsTE9aUeaE7grk9QfYL9KicAN3akowUfYyn0DUUNtoGdGthPg/X4lT\nL1U9WJaJggD3RGRVkO2JOUVRfuOk6dpMzvr0ZkRo4VSrHUcmdr8/nBo0vNX833pU\nHraFcM4W8drN4wAfi87NP4OxVf5eF8dHIBl9C0htIQKBgQD3YVQyf/meOkOqBmJP\ntAmp+iGHUqG1PtviWUEYjWS2jVgUsmMHvJav+wqzYzsgocvs7YEsmnrFLsm/daOR\noi/DBns/9YRBWhtPl/U1jPk4yGba0+nANUkHPeKEEwkVy3kj/DePG7TBgeTO+Rw7\n3G7tn6t+1RmoPU/wM+kbsaGw+QKBgQC2wq15ViJejMpAQKlhB4iEg20u3pfFDOB0\nTSHFmwtHyn8/Hgz9q6fk66Q3isgYFjkJKPrmzifMF/EgzDs18koqtwNpNlOcykWV\nFxnVEqPpnEG7/L4NXyu3ZVAK9045TiLrq4Vab00fa3/nZRmZQtiPnUZhXu3U76OU\nOvtGT1LtdQKBgAxfk+SKviOJ6oSAmT4/VRRpbG/mVCxKnpjtufHOcLEo1LUETyu9\n5ROcTOa4GecB8L9DCej/ORDPzEuFSM8p+5WXp2aFkz3pkeAjS6KIEJckfvCHFPQG\nNkbkc4YDpbqvWLnSDb1ct2fOZXFsyFq+JdZA3EUVx5jAqFTtY8V81weRAoGAb6kn\n5e9bVls8ot8e3XqFzTijN7SmE62XYVdS3/GnhbhR4FVS6JW9IZ9bGNhBAn5pYJBa\nIzQnmomyODCvqHkdGVXxzpFzqmLm+n0/ujAGV4+xldKIp5DTG9zZd6m7cEWuDkEg\nW62O+Dhs0Aq0BjCSMcSMoKcoNiYn0kPrC/0hFJUCgYEAiDvfiWegV0IR59R0upLn\nv2n5Fj+aG0g2LeyRnQMIb6/MdMCJZojzxYv4yNyPRXY4GTvJTAKO0wTQLLKsNKNS\nCHLooCcENIpqSonPBtvsibIocxU+Y0oSSCvlZ9HK9qCgzWJX22yu9jltHwjqKSFS\n9/OY5U1d08uzXzTfQZfMO+A=\n-----END PRIVATE KEY-----\n',
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getSpreadsheet(
    userId: string,
    spreadsheetId: string,
    sheetName: string,
  ) {
    // const user = await this.prisma.user.findUnique({where:{id:userId}})
    // if(!user) throw new UnauthorizedException("User doesn't exists !")
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });
    return response.data.values;
  }

  async getDataByRange(spreadsheetId: string, range: string) {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  }
}
