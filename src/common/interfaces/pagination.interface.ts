export abstract class IPagination<T> {
  data: T[]; // Array of items for the current page

  totalCount: number; // Total number of items in the entire collection

  listSize: number; // Number of items per page

  currentPage: number; // Current page number

  totalPages: number; // Total number of pages
}
