import { Button, Stack, Typography } from "@mui/material";

function Dialog({ message, onDialog, nameProduct }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.7)",
      }}
      onClick={() => onDialog(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",

          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "2em",
          borderRadius: "10px",
        }}
      >
        <Stack sx={{ mb: 1 }}>
          <Typography className="productInfoText">
            {message} <b>{nameProduct}</b>
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-evenly" spacing={2}>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={() => onDialog(true)}
          >
            Confirm
          </Button>
          <Button fullWidth variant="contained" onClick={() => onDialog(false)}>
            Go back
          </Button>
        </Stack>
      </div>
    </div>
  );
}
export default Dialog;
