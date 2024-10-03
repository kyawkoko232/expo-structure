export interface CategoryType {
    id: string;
    name: string;
    image: any; 
  }
  
  export interface ProductType{
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    favourite: boolean;
    star: number;
    discount: number;
    categories_id: string;
  
  
    // categories_id: string;
  }
  
  export interface CupSizes {
    label: string;
    value: string;
  }
  
  export interface Sugar {
    label: string;
    value: string;
  }
  
  export interface Radio {
    id: number;
    label: string;
    value: string;
  }
  