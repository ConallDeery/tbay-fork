import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function TempAutocomplete() {
  return (
    <Autocomplete
      multiple
      id="category"
      options={categories}
      getOptionLabel={(option) => option.title}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          placeholder="Category"
          margin="normal"
          required
        />
      )}
    />
  );
}

const categories = [
  { title: "Mobile" },
  { title: "Laptops" },
  { title: "Books" },
  { title: "Furniture" },
  { title: "Clothes" },
];
