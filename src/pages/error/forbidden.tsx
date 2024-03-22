import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Forbidden</h1>
      <p>You are not authorized to access this resource.</p>

      <Button
        variant="contained"
        onClick={() => {
          navigate(-2);
        }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Forbidden;
