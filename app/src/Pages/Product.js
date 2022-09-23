import "../Styles/App.css";
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";

const Input = styled("input")({
  display: "none",
});

function Product() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={12} md={6} square>
        <Box
          sx={{
            mt: "1em",
            mb: "1em",
            mx: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {" "}
          <img
            className="productFeatured productImage"
            src={"test.jpg"}
            alt="Logo"
          />
        </Box>
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
          <Typography className="productInfoText productTitle">test</Typography>
          <Typography className="productInfoText productPrice" gutterBottom>
            {`1050` + `€`}
          </Typography>
          <Typography
            className="productInfoText productSectionTitle"
            gutterBottom
          >
            Seller’s Description
          </Typography>
          <Typography className=" productDescription" gutterBottom>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed
            adipiscing diam donec adipiscing tristique risus. Magna etiam tempor
            orci eu lobortis.`}
          </Typography>
          <Typography
            sx={{ mt: "1em" }}
            className="productInfoText productSectionTitle"
            gutterBottom
          >
            Seller Information
          </Typography>

          <Chip
            className="productInfoText productOwnerInfoTest"
            icon={<FaceIcon />}
            label={`John Doe`}
          />
          <Button
            className="buttonMain"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Message Seller
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Product;
