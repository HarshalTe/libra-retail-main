import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LinearProgressWithCase(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          color="success"
          sx={{
            height: 10,
            borderRadius: 5,
          }}
        />
      </Box>
      <Box sx={{ minWidth: 60 }}>
        <Typography style={{"width": "max-content"}} variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}% case progress`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithCase.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
