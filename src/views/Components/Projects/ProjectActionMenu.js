import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditProjects from './EditProjects'; // Adjust the import based on your file structure
import CreateReport from './CreateReport'; // Adjust the import based on your file structure
import ProjectReport from './ProjectReport'; // Adjust the import based on your file structure
import RemarkUpdate from './RemarkUpdate'; // Adjust the import based on your file structure
import DocumentUpload from './DocumentUpload'; // Adjust the import based on your file structure
import AddCaption from './AddCaption'; // Adjust the import based on your file structure
import InventriesUpload from './InventriesUpload'; // Adjust the import based on your file structure
import NpaProperties from './NpaProperties'; // Adjust the import based on your file structure
import DedupeProjects from './DedupeProjects';

function ProjectActionMenu({ data, project_page, page, rowsPerPage }) {
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
        {project_page.update_status == "1" && (
          <>
            <MenuItem onClick={handleClose}>
              <EditProjects
                data={data.row}
                index={data.row.id}
                data2={{
                  pageno: page + 1,
                  pageSize: rowsPerPage,
                }}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <CreateReport
                data={data.row}
                index={data.row.id}
                data2={{
                  pageno: page + 1,
                  pageSize: rowsPerPage,
                }}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ProjectReport
                data={data.row}
                index={data.row.id}
                data2={{
                  pageno: page + 1,
                  pageSize: rowsPerPage,
                }}
              />
            </MenuItem>
          </>
        )}
        <MenuItem onClick={handleClose}>
          <RemarkUpdate
            data={data.row}
            index={data.row.id}
            data2={{
              pageno: page + 1,
              pageSize: rowsPerPage,
            }}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DocumentUpload data={data.row.id} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <AddCaption data={data.row.id} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <InventriesUpload data={data.row.id} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NpaProperties data={data.row.id} />
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <DedupeProjects 
           data={data.row}
           index={data.row.id}
           data2={{
             pageno: page + 1,
             pageSize: rowsPerPage,
           }}
            />
        </MenuItem> */}
      </Menu>
    </div>
  );
}

export default ProjectActionMenu;
