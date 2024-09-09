import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditMailType from './EditMailType'; // Adjust the import based on your file structure
import DeleteButton from '../../../Helpers/DeleteButton'; // Adjust the import based on your file structure

function ActionMenu({ params, deleteFunction }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <MenuItem onClick={handleClose}>
          <EditMailType data={params.row} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DeleteButton
            id={params.row.id}
            deleteFunction={deleteFunction}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ActionMenu;
