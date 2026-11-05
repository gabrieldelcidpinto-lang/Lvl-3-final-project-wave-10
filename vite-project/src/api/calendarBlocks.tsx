import { useState } from "react";
import { supabase } from "../config/supabaseClient";

//Post (insert) new calendar block
type Blocks = {
  id: number;
  type: string;
  start_date: string;
  end_date: string;
  start_time: string | null;
  end_time: string | null;
  profile_id: string;
};
export const createNewBlock = async (block: Blocks) => {
  const { type, start_date, end_date, start_time, end_time } = block;

  const { data, error } = await supabase
    .from("calendar_blocks")
    .insert({
      type,
      start_date,
      end_date,
      start_time,
      end_time,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

// GET calendar block

//Getting calendar_blocks by email because they will be connected to each players profile?
export const getCalendarBlock = async (profileId: string) => {
  const { data, error } = await supabase
    .from("calendar_blocks")
    .select()
    .eq("profile_id", profileId)
    .order("start_date");
  if (error) throw error;
  return data;
};

//Delete calendar block

export const deleteCalendarBlock = async (id: number) => {
  const { data, error } = await supabase
    .from("calendar_blocks")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};
