import { Box } from "@mui/material";
import { styled } from "@mui/system";

//good for reusing css as a component
//can pass css properties in here
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
