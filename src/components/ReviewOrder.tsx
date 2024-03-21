import { Box, Divider, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppSelector } from "../redux/hook";
import dayjs from "dayjs";

export default function ReviewOrder() {
  const { totalPrice, place, menuPrice, decoration } = useAppSelector(
    (state) => state.orderSlice
  );
  return (
    <Box className="flex flex-col mt-16 gap-16">
      <Typography variant="h4">REVIEW YOUR ORDER</Typography>
      <Box className="flex w-full justify-between">
        <Box className="flex flex-col gap-4 w-[60%]">
          <Box className="flex w-full gap-4">
            <TextField fullWidth label="Name" />
            <TextField fullWidth label="Phone" />
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs().add(2, "day")}
              minDate={dayjs().add(2, "day")}
              sx={{
                ".MuiInputBase-root": {
                  color: "white!important",
                },
                ".MuiIconButton-root": {
                  color: "#6b6b6b",
                },
                ".MuiOutlinedInput-notchedOutline ": {
                  borderColor: "#6b6b6b",
                },
              }}
            />
          </LocalizationProvider>
          <TextField label="Note" multiline minRows={6} />
        </Box>
        <Box className="flex flex-col max-h-xl gap-4 w-[30%]">
          <Typography variant="h4" fontWeight="bold">
            Order summary
          </Typography>
          <Box>
            <Typography variant="caption" fontWeight="bold">
              Order id
            </Typography>
            <Typography variant="h6">OrderName</Typography>
          </Box>
          <Divider className="bg-gray-600"></Divider>

          <Box className="flex flex-col ">
            <Box className="flex justify-between items-end w-full">
              <Typography>Place</Typography>
              <Typography variant="h6" fontWeight="bold">
                {place.price}.000VNĐ
              </Typography>
            </Box>
            <Box className="flex justify-between items-end w-full">
              <Typography>Menu</Typography>
              <Typography variant="h6" fontWeight="bold">
                {menuPrice}.000VNĐ
              </Typography>
            </Box>
            <Box className="flex justify-between items-end w-full">
              <Typography>Decoration</Typography>
              <Typography variant="h6" fontWeight="bold">
                {decoration.price}.000VNĐ
              </Typography>
            </Box>
          </Box>

          <Divider className="bg-gray-600"></Divider>

          <Box className="flex justify-between items-end w-full">
            <Typography>Total price</Typography>
            <Typography variant="h6" fontWeight="bold">
              {totalPrice}.000VNĐ
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
