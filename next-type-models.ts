// new types

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: Date | null;
  password: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  orders?: Order[]; // User can have multiple orders
  favorites?: Favorite[]; // User can have multiple favorite products
  cart?: Cart | null; // User has one cart
  comments?: Comment[]; // User can have multiple comments
  accounts?: Account[]; // User can have multiple accounts
  sessions?: Session[]; // User can have multiple sessions
  Authenticator?: Authenticator[]; // For WebAuthn support
};

export type Order = {
  id: string;
  discountAmount: number | null;
  price: number;
  status: string; // Could be 'PENDING', 'DELIVERED', or 'RETURNED'
  createdAt: Date;
  updatedAt: Date;
  // Relations
  user: User; // The user who placed the order
  userId: string; // User ID reference
  products: Product[]; // Many-to-many relation with products
};

export type Product = {
  id: string;
  title: string;
  model: string;
  brand: string;
  description: string;
  price: number; // Stored in cents
  category: string;
  rating: number | null;
  discount: number | null;
  isInDiscountSection: boolean;
  isInHeroSection: boolean;
  // Relations
  images?: ProductImage[]; // Product can have multiple images
  stock?: Stock[]; // Product can have stock variations
  features?: Feature[]; // Must have at least one feature
  favorites?: Favorite[]; // Users who favorited this product
  comments?: Comment[]; // Comments related to this product
  orders?: Order[]; // Many-to-many relation with orders
  cartItems?: CartItem[]; // Products related to cart items
};

export type Feature = {
  id: string;
  title: string;
  description: string;
  product: Product; // Relation to product
  productId: string;
};

export type Favorite = {
  id: string;
  user: User; // Relation to the user
  userId: string;
  product: Product; // Relation to the product
  productId: string;
};

export type Cart = {
  id: string;
  createdAt: Date;
  user: User; // Relation to the user
  userId: string;
  items: CartItem[]; // Items in the cart
};

export type CartItem = {
  id: string;
  quantity: number;
  createdAt: Date;
  product: Product; // Relation to the product in the cart
  productId: string;
  cart: Cart; // Relation to the cart
  cartId: string;
};

export type Comment = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  user: User; // Author of the comment
  userId: string;
  product: Product; // Product the comment is related to
  productId: string;
  parent?: Comment | null; // Nullable for replies (parent comments)
  parentId?: string | null;
  children?: Comment[]; // Replies to the comment
};

export type ProductImage = {
  id: string;
  url: string; // URL of the image
  product: Product; // Relation to the product
  productId: string;
};


export type Stock = {
  id: string; // UUID for the stock entry
  size: string; // Size of the product
  quantity: number; // Quantity available in stock
  productId?: string; // Reference to the Product's ID
  colorId?: string | null; // Optional reference to the Color's ID
  product?: Product; // Related product
  color?: Color | null; // Optional related color
};

export type Color = {
  id: string; // UUID for the color
  title: string; // Name of the color (e.g., 'red')
  hex: string; // Hexadecimal code of the color (e.g., '#FF0000')
  persian: string; // Persian name of the color (e.g., 'قرمز')
  stocks?: Stock[]; // Related stock entries that use this color
};



export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User; // Relation to user
};

export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User; // Relation to user
};

export type Authenticator = {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string | null;
  user: User; // Relation to user
};

export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};


// search queries
export type SearchQueries = {
  page?: string;
  selectedCategory?: string;
  sort?: string;
  colors?: string[];
  sizes?: string[];
  searchInput?: string;
  minPrice?: string;
  maxPrice?: string;
};