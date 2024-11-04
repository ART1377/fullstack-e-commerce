
// Define a type for Color
export type Color = {
  id: string;
  title: string;
  hex: string;
  persian: string;
};

export type ProductColor = Color & {
  sizes: string[];
};

// Define a type for Product
export type Product = {
  id: string; // Unique identifier for the product
  title: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  discount?: number;
  description: string;
  category: string;
  images: string[];
  stock: Stock[];
  rating: number;
};

export type Stock = {
  id: string;
  color: string;
  quantity: number;
  size: string;
};

// footer
export type FooterItemLinkType = {
  title: string;
  path: string;
};
export type FooterItemType = {
  header: string;
  links: FooterItemLinkType[];
};

// feature
export type Feature = {
  id: string;
  title: string;
  description: string;
};

// comment
export type Comment = {
  id: string;
  title: string;
  description: string;
  creator: {
    id: string;
    name: string;
    image: string;
  };
  date: string;
  rating: number;
  product: {
    id: string;
  };
  numberOfLikes: number;
  numberOfDislikes: number;
};

// order
export type Order = {
  id: string;
  discountAmount?: number; // Discount amount for the order
  price: number; // Total price of the order
  date: string; // Order date in format: YYYY/MM/DD
  status: "pending" | "delivered" | "returned"; // Status of the order
  products: string[]; // Array of product IDs
};

// user
export type User = {
  id: string;
  name: UserName;
  email: string;
  city: string;
  joinDate: string; // Format: YYYY/MM/DD
  image: string;
  orders: Order[]; // Array of orders
  favorites: string[]; // Array of favorite product IDs
};

// username
export type UserName = {
  firstName: string;
  lastName: string;
};

// notification
export type Notification = {
  id: string; // Unique identifier for each notification
  userId: string; // Numeric string from "1" to "9"
  description: string; // Notification description
  isRead: boolean; // Whether the notification has been read
  date: Date; // The actual date of the notification
};

// user session
export type UserSession = {
  id: string;
  email: string;
  image?: string;
  firstName: string;
  lastName: string;
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





// // user session
// export type UserSession = {
//   id: string;
//   email: string;
//   image?: string;
//   firstName: string;
//   lastName: string;
// };



// // new types




// export type User = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   emailVerified: Date | null;
//   password: string;
//   image: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   // Relations
//   orders?: Order[]; // User can have multiple orders
//   favorites?: Favorite[]; // User can have multiple favorite products
//   cart?: Cart | null; // User has one cart
//   comments?: Comment[]; // User can have multiple comments
//   accounts?: Account[]; // User can have multiple accounts
//   sessions?: Session[]; // User can have multiple sessions
//   Authenticator?: Authenticator[]; // For WebAuthn support
// };


// export type Order = {
//   id: string;
//   discountAmount: number | null;
//   price: number;
//   status: string; // Could be 'PENDING', 'DELIVERED', or 'RETURNED'
//   createdAt: Date;
//   updatedAt: Date;
//   // Relations
//   user: User; // The user who placed the order
//   userId: string; // User ID reference
//   products: Product[]; // Many-to-many relation with products
// };

// export type Product = {
//   id: string;
//   title: string;
//   brand: string;
//   description: string;
//   price: number; // Stored in cents
//   category: string;
//   rating: number | null;
//   discount: number | null;
//   isInDiscountSection: boolean;
//   isInHeroSection: boolean;
//   // Relations
//   images?: ProductImage[]; // Product can have multiple images
//   stock?: Stock[]; // Product can have stock variations
//   favorites?: Favorite[]; // Users who favorited this product
//   comments?: Comment[]; // Comments related to this product
//   orders?: Order[]; // Many-to-many relation with orders
//   cartItems?: CartItem[]; // Products related to cart items
// };

// export type Favorite = {
//   id: string;
//   user: User; // Relation to the user
//   userId: string;
//   product: Product; // Relation to the product
//   productId: string;
// };

// export type Cart = {
//   id: string;
//   createdAt: Date;
//   user: User; // Relation to the user
//   userId: string;
//   items: CartItem[]; // Items in the cart
// };

// export type CartItem = {
//   id: string;
//   quantity: number;
//   createdAt: Date;
//   product: Product; // Relation to the product in the cart
//   productId: string;
//   cart: Cart; // Relation to the cart
//   cartId: string;
// };

// export type Comment = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: Date;
//   user: User; // Author of the comment
//   userId: string;
//   product: Product; // Product the comment is related to
//   productId: string;
//   parent?: Comment | null; // Nullable for replies (parent comments)
//   parentId?: string | null;
//   children?: Comment[]; // Replies to the comment
// };

// export type ProductImage = {
//   id: string;
//   url: string; // URL of the image
//   product: Product; // Relation to the product
//   productId: string;
// };


// export type Stock = {
//   id: string;
//   color: string;
//   size: string;
//   quantity: number;
//   product: Product; // Relation to the product
//   productId: string;
// };


// export type Account = {
//   id: string;
//   userId: string;
//   type: string;
//   provider: string;
//   providerAccountId: string;
//   refresh_token?: string | null;
//   access_token?: string | null;
//   expires_at?: number | null;
//   token_type?: string | null;
//   scope?: string | null;
//   id_token?: string | null;
//   session_state?: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   user: User; // Relation to user
// };


// export type Session = {
//   id: string;
//   sessionToken: string;
//   userId: string;
//   expires: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   user: User; // Relation to user
// };

// export type Authenticator = {
//   credentialID: string;
//   userId: string;
//   providerAccountId: string;
//   credentialPublicKey: string;
//   counter: number;
//   credentialDeviceType: string;
//   credentialBackedUp: boolean;
//   transports?: string | null;
//   user: User; // Relation to user
// };



// export type VerificationToken = {
//   identifier: string;
//   token: string;
//   expires: Date;
// };
