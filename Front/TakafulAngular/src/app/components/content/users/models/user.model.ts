export interface User {
    id: string;
    nameAr: string;
    nameEn: string;
    lastNameAr: string;
    lastNameEn: string;
    username: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    role: string;
    isActive: boolean;
    canPrint: boolean;
  }

  export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  }