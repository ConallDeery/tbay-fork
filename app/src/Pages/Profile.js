import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import {
  Grid,
  Box,
  Typography,
  Stack,
  Card,
  CardMedia,
  Chip,
  CardContent,
  Collapse,
  Button,
} from "@mui/material/";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Dialog from "../component/deleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Profile = () => {
  var items = [];
  const [products, setItems] = useState([
    {
      iD: "",
      data: {
        category: "",
        description: "",
        image: "",
        price: "",
        sellerUserID: "",
        title: "",
        status: "",
      },
    },
  ]);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    nameProduct: "",
  });
  const idProductRef = useRef();
  const handleDialog = (message, isLoading, nameProduct) => {
    setDialog({
      message,
      isLoading,
      //Update
      nameProduct,
    });
  };

  const handleDelete = (product) => {
    handleDialog("You are about to delete", true, product.data.title);
    idProductRef.current = product.iD;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      deleteProduct(idProductRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const fetchProducts = () => {
    // Gets all products and filters ones matching logged in username
    try {
      fetch("http://localhost:3001/users/product")
        .then((res) => res.json())
        .then((result) => {
          if (result === false) console.log("Backend retrieval failed!");
          else {
            console.log("Retrieved products:", result);
            let items = [];
            for (let index = 0; index < result.length; index++) {
              if (
                result[index].data["sellerUserID"] ===
                localStorage.getItem("userEmail")
              ) {
                items.push(result[index]);
              }
            }
            setItems(items);
          }
        });
    } catch (e) {
      console.log("Error retrieving result: ", e.message);
    }
  };

  useEffect(() => {
    // Gets all products and filters ones matching logged in username
    try {
      fetch("http://localhost:3001/users/product")
        .then((res) => res.json())
        .then((result) => {
          if (result === false) console.log("Backend retrieval failed!");
          else {
            console.log("Retrieved products:", result);
            let items = [];
            for (let index = 0; index < result.length; index++) {
              if (
                result[index].data["sellerUserID"] ===
                localStorage.getItem("userEmail")
              ) {
                items.push(result[index]);
              }
            }
            setItems(items);
          }
        });
    } catch (e) {
      console.log("Error retrieving result: ", e.message);
    }
  }, []);

  const deleteProduct = (selectedID) => {
    try {
      var postData = {
        iD: selectedID,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };
      fetch("http://localhost:3001/users/delete-product", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Deleted product with ID = " + data);
          window.location.reload(false);
        });
    } catch (e) {
      console.log("Error logging in: ", e.message);
    }
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const unlistProduct = (selectedID) => {
    try {
      var postData = {
        iD: selectedID,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };
      fetch("http://localhost:3001/users/unlist-product", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Unlisted product with ID = " + data);
          fetchProducts();
        });
    } catch (e) {
      console.log("Error logging in: ", e.message);
    }
  };

  const relistProduct = (selectedID) => {
    try {
      var postData = {
        iD: selectedID,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };
      fetch("http://localhost:3001/users/relist-product", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("Relisted product with ID = " + data);
          fetchProducts();
        });
    } catch (e) {
      console.log("Error logging in: ", e.message);
    }
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <Grid item xs={12} sm={12} md={6}>
        <Box>
          <img className="welcomeImg" src={`${LoginImg}`} />
        </Box>
      </Grid>
    */}
        <Grid item xs={12} sm={12} md={12}>
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
            <Grid item xs={12}>
              <Typography className="sellProductTextPrimary" gutterBottom>
                Welcome back {localStorage.getItem("userEmail")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="productSectionTitle" gutterBottom>
                Your products
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <div className="container">
                {products &&
                  products.map((product) => (
                    <React.Fragment key={product.iD}>
                      <Card
                        className="productCard"
                        sx={{
                          mt: "2em",
                          mb: "2em",
                        }}
                      >
                        {dialog.isLoading && (
                          <Dialog
                            //Update
                            nameProduct={dialog.nameProduct}
                            onDialog={areUSureDelete}
                            message={dialog.message}
                          />
                        )}
                        <CardMedia
                          className="productImage"
                          component="img"
                          height="50%"
                          image={product.data.image}
                          alt={dialog.title}
                        />
                        <CardContent>
                          <Grid container>
                            <Grid item xs={12}>
                              <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="flex-start"
                              >
                                <Typography
                                  className="productInfoText productTitle"
                                  gutterBottom
                                >
                                  {product.data.title}
                                </Typography>
                                {product.data.status == "active" ? (
                                  <Button
                                    variant="outlined"
                                    onClick={() => unlistProduct(product.iD)}
                                  >
                                    Archive
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outlined"
                                    onClick={() => relistProduct(product.iD)}
                                  >
                                    Relist
                                  </Button>
                                )}
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDelete(product)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Stack>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography className="productInfoText productPrice">
                                  {product.data.price + `€`}
                                  {product.data.status == "active" ? (
                                    <Chip
                                      sx={{ ml: 1 }}
                                      label="Active"
                                      color="success"
                                    />
                                  ) : (
                                    <Chip
                                      sx={{ ml: 1 }}
                                      label="Inactive"
                                      color="error"
                                    />
                                  )}
                                </Typography>
                                <ExpandMore
                                  expand={expanded}
                                  onClick={handleExpandClick}
                                  aria-expanded={expanded}
                                  aria-label="show more"
                                >
                                  <ExpandMoreIcon />
                                </ExpandMore>
                              </Stack>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Stack
                              direction="column"
                              justifyContent="center"
                              alignItems="flex-start"
                              spacing={1}
                            >
                              <Chip label={product.data.category.title} />
                              <Typography
                                className="productInfoText"
                                align="left"
                              >
                                Item Description
                              </Typography>
                              <Typography align="left">
                                {product.data.description}
                              </Typography>

                              <Typography
                                className="productInfoText"
                                align="left"
                              >
                                Listing Status
                              </Typography>
                              {product.data.status == "active" ? (
                                <Typography align="left">Listed</Typography>
                              ) : (
                                <Typography align="left">Unlisted</Typography>
                              )}
                            </Stack>
                          </CardContent>
                        </Collapse>
                      </Card>
                    </React.Fragment>
                  ))}
              </div>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
