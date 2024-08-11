// Import Dexie
import Dexie from "dexie";

// Initialize the database
const db = new Dexie("GemLingua");

// Define the schema
db.version(1).stores({
  items: "++id,data",
});

// Helper function to add data
export const addItem = async (data) => {
  return await db.items.add(data);
};

// Helper function to update data
export const updateItemInDexie = async ({ id = 1, key, data }) => {
  try {
    getItemFromDexie(id).then((item) => {
      item[key] = data;
      return db.items.update(id, item);
    });
    return "success";
  } catch (e) {
    return "error";
  }
};

const getItem = async (id = 1) => {
  const item = await db.items.get(id);
  console.log({ item });
  return item;
};

// Helper function to get data
export const getItemFromDexie = async () => {
  return await getItem();
};

// Helper function to get all data
export const getAllItems = async () => {
  return await db.items.toArray();
};

// Helper function to delete data
export const deleteItem = async (id) => {
  return await db.items.delete(id);
};
