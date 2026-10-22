import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

//Post(create) new assigner profile

export const createAssignerprofile = async (req, res) => {
  const { data, error } = await supabase
    .from("assigner")
    .insert({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      id: req.body.id,
    })
    .select()
    .single();

  // if statement to verify no errors occured during creation of profile
  if (error) {
    return res.status(500).send({ success: false, error: error.message });
  }

  //if statement if the creation failed
  if (!data || data.length === 0) {
    return res.status(400).send({
      success: false,
      error: "Couldn't create a new profile.",
      data: data,
    });
  }

  //successfully created a profile
  return res.status(201).send({
    success: true,
    message: "Profile has been created.",
    data: data,
  });
};

// Get assigner profile

export const getAssignerById = async (req, res) => {
  const { data, error } = await supabase
    .from("assigner")
    .select()
    .eq("id", id)
    .single();

  //if statement to verify no errors occured during getting the profile
  if (error) {
    return res.status(500).send({
      success: false,
      message: "Couldn't load profile.",
      error: error.message,
    });
  }

  //return once the profile has successfully been loaded
  return res.status(200).send({
    success: true,
    message: "Profile successfully loaded!",
    data,
  });
};

//Patch(update) assigner profile

export const updateAssignerProfile = async (req, res) => {
  const { data, error } = await supabase
    .from("assigner")
    .update({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    })
    .eq("id", id)
    .select()
    .single();

  //If statement to verify no errors during updating profile
  if (error) {
    return res.status(400).send({
      success: false,
      message: "Couldn't upade the profile.",
      error: error.message,
    });
  }

  //Successfully updated profile
  return res.status(200).send({
    success: true,
    message: "Profile has been updated.",
    data: data,
  });
};

//Delete profile

export const deleteAssignerProfile = async (req, res) => {
  const { data, error } = await supabase
    .from("assigner")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Could not delete profile.",
      error: error.message,
    });
  }

  if (!data || data.length === 0) {
    return res.status(404).send({
      success: false,
      message: "Profile not found.",
      error: "No profile matches that id.",
    });
  }

  return res.status(200).send({
    success: true,
    message: "Profile deleted.",
    data: data,
  });
};
