// MenuItem type and enums for production-grade canteen app

export enum MenuCategory {
  DOSA = "Dosa",
  IDLI = "Idli",
  PARATHA = "Paratha",
  RICE = "Rice",
  STARTER = "Starter",
  CURRY = "Curry",
  DESSERT = "Dessert",
  BEVERAGE = "Beverage",
  SANDWICH = "Sandwich",
  ROLL = "Roll",
  BIRYANI = "Biryani",
  UTTAPAM = "Uttapam",
  ICE_CREAM = "IceCream",
  OTHER = "Other"
}

export interface MenuItemVariant {
  name: string;
  pricePaise: number;
}

export interface MenuItemAddon {
  name: string;
  pricePaise: number;
}

export interface MenuItem {
  id: number;
  category: MenuCategory;
  name: string;
  isVeg: boolean;
  deliveryEligible: boolean;
  pricePaise: number;
  variants?: MenuItemVariant[];
  addons?: MenuItemAddon[];
  description?: string;
  imageUrl?: string;
}
