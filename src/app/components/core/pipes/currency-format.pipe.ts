import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyFormat', standalone: true })
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currency: string = '₹'): string {
    if (value === null || value === undefined) return '';
    return `${currency}${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)}`;
  }
}

