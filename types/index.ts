// Category interface
export interface CategoryType {
  id: string;
  name: string;
  image: string;
}

// Product interface
export interface ProductType {
  id: string; // Unique identifier for the product (UUID)
  name: string; // Name of the product
  description: string; // Description of the product
  image: string; // URL for the product image
  price: number; // Regular price of the product
  favourite: boolean; // Indicates if the product is a favorite
  star: number; // Rating of the product (e.g., 4.9 stars)
  discount: number; // Discounted price of the product
  categoryId: string; // ID of the associated category (matching CategoryType)
  sugarOptions: Sugar[]; // Array of sugar options available for the product
}

// Cup Sizes interface
export interface Size {
  label: string; // Label for the cup size (e.g., "Small", "Medium", "Large")
  value: string; // Value associated with the cup size (e.g., "small", "medium", "large")
}

// Sugar options interface
export interface Sugar {
  label: string; // Label for the sugar option (e.g., "0%", "25%")
  value: string; // Value associated with the sugar option (e.g., "0", "25")
}

// Radio button options interface
export interface RadioOption {
  id: number; // Unique identifier for the radio option
  label: string; // Label for the radio option
  value: string; // Value associated with the radio option
}
