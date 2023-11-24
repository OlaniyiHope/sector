import { Breadcrumbs, Hidden, Icon, styled, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

const BreadcrumbRoot = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
}));

const BreadcrumbName = styled("h4")(() => ({
  margin: 0,
  fontSize: "16px",
  paddingBottom: "1px",
  verticalAlign: "middle",
  textTransform: "capitalize",
}));

const SubName = styled("span")(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));

const Separator = styled("h4")(({ theme }) => ({
  margin: 0,
  marginLeft: 8,
  paddingBottom: "3px",
  color: theme.palette.text.hint,
}));

const StyledIcon = styled(Icon)(() => ({
  marginLeft: 8,
  marginBottom: "4px",
  verticalAlign: "middle",
}));

const Breadcrumb = ({ routeSegments }) => {
  const theme = useTheme();
  const hint = theme.palette.text.hint;

  return (
    <BreadcrumbRoot>
      <Breadcrumbs
        sx={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <NavLink to="/"></NavLink>
      </Breadcrumbs>
    </BreadcrumbRoot>
  );
};

export default Breadcrumb;
