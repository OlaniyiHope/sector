import {
  Box,
  Card,
  Grid,
  Icon,
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import { Breadcrumb } from "app/components";
import { Small, H3 } from "app/components/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import "./Style.css";
import useAuth from "app/hooks/useAuth";

const Welcome = () => {
  const { logout, user } = useAuth();
  return (
    <div className="all print-cover page-break">
      <div className="logo">
        <b>
          <h3>Hello {user.username}</h3>
        </b>
      </div>
      <div>
        <b>
          <h3 style={{ fontSize: "20px" }}> Welcome to your dashboard</h3>
        </b>
      </div>
    </div>
  );
};

export default Welcome;
