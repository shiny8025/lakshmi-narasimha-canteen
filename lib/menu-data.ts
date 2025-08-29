

// Placeholder: menuItems array is now empty after migration cleanup. Replace with new-format items as needed.
import { MenuItem, MenuCategory } from "./types";
export const menuItems: MenuItem[] = [
  // Tandoori Items
  { id: 1, category: MenuCategory.STARTER, name: "Tandoori Chicken", isVeg: false, deliveryEligible: true, pricePaise: 12000 },
  { id: 2, category: MenuCategory.STARTER, name: "Tangdi Kabab", isVeg: false, deliveryEligible: true, pricePaise: 12000 },
  { id: 3, category: MenuCategory.STARTER, name: "Chicken Tikka", isVeg: false, deliveryEligible: true, pricePaise: 12000, variants: [{ name: "4 Pcs", pricePaise: 12000 }] },
  { id: 4, category: MenuCategory.STARTER, name: "Malai Tikka", isVeg: false, deliveryEligible: true, pricePaise: 12000, variants: [{ name: "4 Pcs", pricePaise: 12000 }] },

  // Tandoori Roti Items
  { id: 5, category: MenuCategory.BREADS, name: "Tandoori Roti", isVeg: true, deliveryEligible: true, pricePaise: 2000 },
  { id: 6, category: MenuCategory.BREADS, name: "Tandoori Naan", isVeg: true, deliveryEligible: true, pricePaise: 3000 },
  { id: 7, category: MenuCategory.BREADS, name: "Tandoori Kulcha", isVeg: true, deliveryEligible: true, pricePaise: 3000 },
  { id: 8, category: MenuCategory.BREADS, name: "Garlic Naan", isVeg: true, deliveryEligible: true, pricePaise: 3000, addons: [{ name: "Extra Butter", pricePaise: 500 }] },

  // Sandwich
  { id: 9, category: MenuCategory.SANDWICH, name: "Veg Sandwich", isVeg: true, deliveryEligible: true, pricePaise: 4000 },
  { id: 10, category: MenuCategory.SANDWICH, name: "Paneer Sandwich", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 11, category: MenuCategory.SANDWICH, name: "Chicken Sandwich", isVeg: false, deliveryEligible: true, pricePaise: 6000 },
  { id: 12, category: MenuCategory.SANDWICH, name: "Chief Special Sandwich", isVeg: false, deliveryEligible: true, pricePaise: 8000, addons: [ { name: "Cheese + Peri-peri Extra", pricePaise: 1000 } ] },

  // Shawarma
  { id: 13, category: MenuCategory.ROLL, name: "Normal Shawarma", isVeg: false, deliveryEligible: true, pricePaise: 9000 },
  { id: 14, category: MenuCategory.ROLL, name: "Special Shawarma", isVeg: false, deliveryEligible: true, pricePaise: 11000 },
  { id: 15, category: MenuCategory.ROLL, name: "Grill Shawarma", isVeg: false, deliveryEligible: true, pricePaise: 12000, addons: [ { name: "Peri-peri Extra", pricePaise: 1000 }, { name: "Cheese Extra", pricePaise: 1000 } ] },

  // Indian Veg Course
  { id: 16, category: MenuCategory.CURRY, name: "Paneer Masala", isVeg: true, deliveryEligible: true, pricePaise: 12000 },
  { id: 17, category: MenuCategory.CURRY, name: "Paneer Butter Masala", isVeg: true, deliveryEligible: true, pricePaise: 12000 },
  { id: 18, category: MenuCategory.CURRY, name: "Methi Chaman", isVeg: true, deliveryEligible: true, pricePaise: 12000 },
  { id: 19, category: MenuCategory.CURRY, name: "Mushroom Curry", isVeg: true, deliveryEligible: true, pricePaise: 12000 },
  { id: 20, category: MenuCategory.CURRY, name: "Kadai Veg Curry", isVeg: true, deliveryEligible: true, pricePaise: 12000 },

  // Indian Non-Veg Course
  { id: 21, category: MenuCategory.CURRY, name: "Egg Masala", isVeg: false, deliveryEligible: true, pricePaise: 10000 },
  { id: 22, category: MenuCategory.CURRY, name: "Chicken Masala (Bone)", isVeg: false, deliveryEligible: true, pricePaise: 12000 },
  { id: 23, category: MenuCategory.CURRY, name: "Kadai Chicken Masala (Bone)", isVeg: false, deliveryEligible: true, pricePaise: 12000 },
  { id: 24, category: MenuCategory.CURRY, name: "Kolapuri Chicken Masala", isVeg: false, deliveryEligible: true, pricePaise: 12000 },
  { id: 25, category: MenuCategory.CURRY, name: "Kaju Chicken Masala", isVeg: false, deliveryEligible: true, pricePaise: 12000 },
  { id: 26, category: MenuCategory.CURRY, name: "Hyderabadi Chicken (Bone)", isVeg: false, deliveryEligible: true, pricePaise: 12000 },

  // Biryani Items - Normal
  { id: 27, category: MenuCategory.BIRYANI, name: "Veg Biryani", isVeg: true, deliveryEligible: true, pricePaise: 8500, variants: [ { name: "Half", pricePaise: 8500 }, { name: "Full", pricePaise: 12500 } ] },
  { id: 28, category: MenuCategory.BIRYANI, name: "Chicken Biryani", isVeg: false, deliveryEligible: true, pricePaise: 9000, variants: [ { name: "Half", pricePaise: 9000 }, { name: "Full", pricePaise: 16000 } ] },
  { id: 29, category: MenuCategory.BIRYANI, name: "Egg Biryani", isVeg: false, deliveryEligible: true, pricePaise: 14000 },

  // Biryani Items - Special
  { id: 30, category: MenuCategory.BIRYANI, name: "Special Biryani", isVeg: false, deliveryEligible: true, pricePaise: 11000, variants: [ { name: "Half", pricePaise: 11000 }, { name: "Full", pricePaise: 18000 } ] },
  { id: 31, category: MenuCategory.BIRYANI, name: "Kaju Paneer Biryani", isVeg: true, deliveryEligible: true, pricePaise: 12000, variants: [ { name: "Half", pricePaise: 12000 } ] },
  { id: 32, category: MenuCategory.BIRYANI, name: "Paneer Biryani", isVeg: true, deliveryEligible: true, pricePaise: 12000, variants: [ { name: "Half", pricePaise: 12000 } ] },
  { id: 33, category: MenuCategory.BIRYANI, name: "Mushroom Biryani", isVeg: true, deliveryEligible: true, pricePaise: 12000, variants: [ { name: "Half", pricePaise: 12000 } ] },
  { id: 34, category: MenuCategory.BIRYANI, name: "Boneless Chicken Biryani", isVeg: false, deliveryEligible: true, pricePaise: 12000, variants: [ { name: "Half", pricePaise: 12000 } ] },
  { id: 35, category: MenuCategory.BIRYANI, name: "Fried Piece Chicken Biryani", isVeg: false, deliveryEligible: true, pricePaise: 12000, variants: [ { name: "Half", pricePaise: 12000 } ] },
  { id: 36, category: MenuCategory.BIRYANI, name: "Mughlai Chicken Biryani", isVeg: false, deliveryEligible: true, pricePaise: 12000, variants: [ { name: "Half", pricePaise: 12000 } ] },
  { id: 37, category: MenuCategory.BIRYANI, name: "Chicken 65 Biryani", isVeg: false, deliveryEligible: true, pricePaise: 12000, variants: [ { name: "Half", pricePaise: 12000 } ] },

  // Dosa Items
  { id: 38, category: MenuCategory.DOSA, name: "Plain Dosa", isVeg: true, deliveryEligible: true, pricePaise: 2500 },
  { id: 39, category: MenuCategory.DOSA, name: "Podi Dosa", isVeg: true, deliveryEligible: true, pricePaise: 3500 },
  { id: 40, category: MenuCategory.DOSA, name: "Masala Dosa", isVeg: true, deliveryEligible: true, pricePaise: 3500 },
  { id: 41, category: MenuCategory.DOSA, name: "K.M. Dosa", isVeg: true, deliveryEligible: true, pricePaise: 4500 },
  { id: 42, category: MenuCategory.DOSA, name: "Ghee M Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 43, category: MenuCategory.DOSA, name: "Ghee K.M. Dosa", isVeg: true, deliveryEligible: true, pricePaise: 7000 },
  { id: 44, category: MenuCategory.DOSA, name: "Butter Dosa", isVeg: true, deliveryEligible: true, pricePaise: 5000 },
  { id: 45, category: MenuCategory.DOSA, name: "B.M. Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 46, category: MenuCategory.DOSA, name: "Cheese M Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 47, category: MenuCategory.DOSA, name: "Paneer M Dosa", isVeg: true, deliveryEligible: true, pricePaise: 7000 },
  { id: 48, category: MenuCategory.DOSA, name: "P.B.M. Dosa", isVeg: true, deliveryEligible: true, pricePaise: 8000 },
  { id: 49, category: MenuCategory.DOSA, name: "Onion Dosa", isVeg: true, deliveryEligible: true, pricePaise: 3500 },
  { id: 50, category: MenuCategory.DOSA, name: "O M Dosa", isVeg: true, deliveryEligible: true, pricePaise: 4500 },
  { id: 51, category: MenuCategory.DOSA, name: "Cheese K Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 52, category: MenuCategory.DOSA, name: "B O Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 53, category: MenuCategory.DOSA, name: "B K Onion Dosa", isVeg: true, deliveryEligible: true, pricePaise: 7000 },
  { id: 54, category: MenuCategory.DOSA, name: "Karam Dosa", isVeg: true, deliveryEligible: true, pricePaise: 4000 },
  { id: 55, category: MenuCategory.DOSA, name: "Cheese Dosa", isVeg: true, deliveryEligible: true, pricePaise: 5000 },
  { id: 56, category: MenuCategory.DOSA, name: "Paneer Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 57, category: MenuCategory.DOSA, name: "Ghee K Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 58, category: MenuCategory.DOSA, name: "B Cheese Dosa", isVeg: true, deliveryEligible: true, pricePaise: 6000 },
  { id: 59, category: MenuCategory.DOSA, name: "B Paneer Cheese Dosa", isVeg: true, deliveryEligible: true, pricePaise: 8000 },
  { id: 60, category: MenuCategory.DOSA, name: "Rava Pudi Dosa", isVeg: true, deliveryEligible: true, pricePaise: 3000 },
  { id: 61, category: MenuCategory.DOSA, name: "Rava Onion Dosa", isVeg: true, deliveryEligible: true, pricePaise: 4500 },
  { id: 62, category: MenuCategory.DOSA, name: "Rava Masala Dosa", isVeg: true, deliveryEligible: true, pricePaise: 4500 },

  // Idli
  { id: 63, category: MenuCategory.IDLI, name: "Idly", isVeg: true, deliveryEligible: true, pricePaise: 3000 },
  { id: 64, category: MenuCategory.IDLI, name: "Karam Idly", isVeg: true, deliveryEligible: true, pricePaise: 4000 },
  { id: 65, category: MenuCategory.IDLI, name: "Ghee Idly", isVeg: true, deliveryEligible: true, pricePaise: 5000 },
  { id: 66, category: MenuCategory.IDLI, name: "Butter Idly", isVeg: true, deliveryEligible: true, pricePaise: 5000 },
];

export const getMenuByMode = (mode: "delivery" | "dinein" | "takeaway") => {
  if (mode === "delivery") {
    return menuItems.filter((item) => item.deliveryEligible)
  }
  return menuItems
}

export const getExtraCharge = (mode: "delivery" | "dinein" | "takeaway") => {
  switch (mode) {
    case "delivery":
      return 40
    case "dinein":
      return 0 // No service charge for dine-in
    case "takeaway":
      return 20
    default:
      return 0
  }
}
