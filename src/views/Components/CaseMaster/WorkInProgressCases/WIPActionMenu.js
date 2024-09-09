import * as React from 'react';
import { Link as DomLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Reasign from './Reasign'; // Adjust the import based on your file structure
import HistoryWIP from './HistoryWIP'; // Adjust the import based on your file structure
import Reschedule from './Reschedule'; // Adjust the import based on your file structure

function WIPActionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log("objectprops",props)

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <>
            <MenuItem onClick={handleClose}>
            <DomLink
            to={`/admin/viewWorkInProgress/${props.data?.id}`}
          >
           <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
        }}
        >
          <i className="" aria-hidden="true"></i>View In Case
        </div>
          </DomLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Reasign data={props.data}/>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <HistoryWIP data={props.row} />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Reschedule data={props.row} />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  color: '#5e72e6',
                }}
              >
                Hold TAT
              </div>
            </MenuItem>
          </>
      </Menu>
    </div>
  );
}

export default WIPActionMenu;
