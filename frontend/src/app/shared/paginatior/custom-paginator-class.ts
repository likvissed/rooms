import { Subject } from "rxjs";
import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginatorClass implements MatPaginatorIntl {
  changes = new Subject<void>();

  nextPageLabel = 'Следующая';
  previousPageLabel = 'Предыдущая';
  firstPageLabel = 'Первая';
  lastPageLabel = 'Последняя';
  itemsPerPageLabel = 'Количество записей на странице';;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return "Страница 1 из 1";
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Страница ${page + 1} из ${amountPages}`;
  }
}
