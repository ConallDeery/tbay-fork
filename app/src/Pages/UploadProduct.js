import "../Styles/App.css";
import React, { useState } from "react";
import { Button, TextField, Box, Grid, Typography } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";

// import Autocomplete from "./TempAutocomplete.js";
import Autocomplete from "@mui/material/Autocomplete";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import { styled } from "@mui/material/styles";

import UploadIcon from "@mui/icons-material/Upload";

const Input = styled("input")({
  display: "none",
});

function UploadProduct() {
  let navigate = useNavigate();
  var postedFlag = false;
  const [category, setCategory] = useState(
    {
      title: ""
    });

  function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
  }

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleFileSelected = async (e) => {
    let index = 0;
    let filesArray = []
    for (const file of Array.from(e.target.files)) {
      const contents = await handleFileChosen(file);
      filesArray.push(contents)
      index++;
    }
    // console.log("Number of files:", index)
    setSelectedFile(filesArray);
    setIsFilePicked(true);
  }

  const handleFileChosen = async (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let image;
    //handle product requirements (required fields)
    if (data.get("productTitle").toString().length < 3) {
      alert("Title must be more than two characters in length.")
      return;
    }
    if (data.get("productPrice").toString().length < 2 || !isNumeric(data.get("productPrice").toString())) {
      alert("Must specify a valid product price.")
      return;
    }
    if (category.title == "") {
      alert("Must select a category.")
      return;
    }


    try {
      let image = null;
      if (!isFilePicked) image = null
      else image = selectedFile;
      var postData = {
        category: category.title,
        description: data.get("productDesc"),
        image: image,
        price: data.get("productPrice"),
        sellerUserID: localStorage.getItem("userEmail"),
        title: data.get("productTitle"),
        status: "active",
      };

      // Simple PUT request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      };
      fetch("http://localhost:3001/users/post-product", requestOptions)
        .then(response => response.json())
        .then((data) => {
          console.log("Created product with ID = " + data);
          postedFlag = true;
          navigate("/");
        });
    } catch (e) {
      console.log("Error logging in: ", e.message);
    }
  };

  function submitCategory(value) {
    if (value !== null) {
      setCategory({
        title: value
      })
    }
    else {
      setCategory({
        title: "",
      });
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${LoginImg}`} />
        </Box>
      </Grid>
    */}
      <Grid item xs={12} sm={12} md={6}>
        <Box
          sx={{
            mt: "1em",
            mb: "5em",
            mx: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography className="sellProductTextPrimary" gutterBottom>
            Sell your item
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileSelected}
              />
              <Button
                className="photosUploadButton"
                fullWidth
                variant="outlined"
                component="span"
              >
                <UploadIcon />
                Add Image
              </Button>
            </label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="productTitle"
              label="Title"
              name="productTitle"
              variant="outlined"
            />
            <FormControl required margin="normal" fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="productPrice"
                name="productPrice"
                startAdornment={
                  <InputAdornment position="start">€</InputAdornment>
                }
                label="Price"
              />
            </FormControl>

            <Autocomplete
              clearOnEscape
              id="category"
              onChange={(event, value) => submitCategory(value)}
              options={categories}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  placeholder="Category"
                  margin="normal"
                  variant="standard"
                  required
                />
              )}
            />
            <TextField
              margin="normal"
              fullWidth
              multiline
              rows={4}
              id="productDesc"
              label="Description"
              name="productDesc"
              variant="outlined"
            />
            <Button
              className="buttonMain"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sell
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
const categories = [
  { title: "Mobile" },
  { title: "Laptops" },
  { title: "Books" },
  { title: "Furniture" },
  { title: "Clothes" },
];

export default UploadProduct;
