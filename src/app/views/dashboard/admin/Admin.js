import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Fragment, React, useState } from "react";
import useFetch from "hooks/useFetch";
import { Box } from "@mui/system";
import {
  Card,
  Button,
  Grid,
  styled,
  useTheme,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RowCards from "../shared/RowCards";
import PaginationTable from "app/views/material-kit/tables/PaginationTable";
import FormDialog from "app/views/material-kit/dialog/FormDialog";
import { Breadcrumb } from "app/components";
import DeleteCOnfirm from "./DeleteConfirm";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const Admin = () => {
  const { data, loading, error } = useFetch("/get-sectors");
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteSectorId, setDeleteSectorId] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDeleteSector = async (sectorId) => {
    // Implement the logic to delete the sector with the given ID
    // You can use fetch or any library you prefer for API calls
    try {
      const response = await fetch(`/api/delete-sector/${sectorId}`, {
        method: "DELETE",
        // Additional headers or body if needed
      });

      if (response.ok) {
        // Handle success, maybe update the UI or fetch sectors again
        console.log("Sector deleted successfully");
      } else {
        // Handle error
        console.error("Failed to delete sector");
      }
    } catch (error) {
      console.error("Error deleting sector:", error);
    } finally {
      setDeleteSectorId(null); // Close the confirmation modal
    }
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <h4>Sector Component</h4>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Add Sector" }]} />

          <FormDialog />
        </Box>

        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="left">Sector Name</TableCell>

                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={item?._id}>
                    <TableCell align="center"> {index + 1}</TableCell>
                    <TableCell align="left">{item.name}</TableCell>

                    <TableCell align="right">
                      <IconButton
                        aria-controls={`action-menu-${item._id}`}
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={`action-menu-${item._id}`}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem>
                          <Link to={`/edit-sector/${item._id}`}>
                            Edit Sector
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="btn btn-danger btn-xs"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete"
                          >
                            Delete Sector
                            {/*}   <DeleteIcon
                              onClick={() => setDeleteSectorId(item._id)}
                              style={{ cursor: "pointer" }}
                />*/}
                            <DeleteCOnfirm
                              open={deleteSectorId === item._id}
                              onClose={() => setDeleteSectorId(null)}
                              onConfirm={() => handleDeleteSector(item._id)}
                            />
                          </a>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={data.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
          />
        </Box>

        {/* <TopSellingTable />
            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <UpgradeCard />
            <Campaigns />*/}
      </ContentBox>
    </Fragment>
  );
};

export default Admin;
