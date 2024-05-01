import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Cabins could not be fetched");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // * 1. Create/edit cabin
  let query = supabase.from("cabins");

  // * 1A. Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // * 1B. Edit
  else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be created");
  }

  // * 2. Upload image
  if (hasImagePath) return data; // No need to upload image if it's already hosted
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    deleteCabin(data.id);
    console.error(storageError.message);
    throw new Error("Cabin image could not be uploaded. Cabin was not created");
  }

  return data;
}
