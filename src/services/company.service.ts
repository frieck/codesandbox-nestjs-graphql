import { Injectable, Scope } from '@nestjs/common';
import { Company, CompaniesData } from 'src/models';
import companies from '../data/companies';

@Injectable({ scope: Scope.REQUEST })
export class CompanyService {
  private companyCache = new Map<number, Company>();

  findAll(skip: number, total: number, context): CompaniesData {
    console.log(`Returning ${total} companies, skipping the first ${skip}`);
    context.dbQueryCount++;
    return {
      data: companies.slice(skip, skip + total),
      total: companies.length,
    };
  }

  find(id: number, context): Company {
    if (this.companyCache.has(id)) {
      console.log(`-- Returning cached company => ${id}`);
      return this.companyCache.get(id);
    }
    console.log(`++ Looking for company => ${id}`);
    context.dbQueryCount++;
    const company = companies.find((c) => c.id === id);
    this.companyCache.set(id, company);
    return company;
  }
}
