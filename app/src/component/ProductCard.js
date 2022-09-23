import "../Styles/App.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";

export default function ProductCard() {
  return (
    <Card className="productCard">
      <CardMedia
        className="productImage"
        component="img"
        height="50%"
        image="test.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Stack
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Typography className="productInfoText productTitle" gutterBottom>
                Macbook Air 2021 M1 256gb aaaa
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className="productInfoText productPrice">
                {`1050` + `€`}
              </Typography>
              <Chip
                className="productInfoText productOwnerInfo"
                icon={<FaceIcon />}
                label={`by ` + `John Doe`}
                variant="outlined"
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
