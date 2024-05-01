import supabase, { supabaseUrl } from "./supabase";

export async function signInWithEmailAndPassword({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function signUpWithEmailAndPassword({
  fullName,
  email,
  password,
}) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // * Build update object
  let updateData;
  if (password) {
    updateData = { password };
  } else if (fullName) {
    updateData = { data: { fullName } };
  }
  // * 1. Update password OR full name
  const { data, error: updateError } = await supabase.auth.updateUser(
    updateData
  );
  if (updateError) {
    throw new Error(updateError.message);
  }
  // * 2. Upload avatar image (if provided)
  if (!avatar) {
    return data;
  }

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // * 3. Update avatar in the user
  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateAvatarError) {
    throw new Error(updateAvatarError.message);
  }

  return updatedUser;
}
