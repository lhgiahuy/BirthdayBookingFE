import { Avatar, Box, Divider, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { setDate, setNote } from "../redux/slice/orderSlice";

interface Customer {
  name: string;
  phone: number;
  email: string;
}

export default function ReviewOrder() {
  const { order } = useAppSelector((state) => state.orderSlice);
  const customerId = localStorage.getItem("id");
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer>();
  const dispatch = useAppDispatch();
  const handleNoteChange = (input: string) => {
    dispatch(setNote(input));
  };

  const handleDatePickerChange = (date: Dayjs | null) => {
    const dateString = date?.toISOString();
    if (dateString !== undefined) dispatch(setDate(dateString));
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://swdbirthdaypartybooking.somee.com/api/getaccount?Id=${customerId}`,
          {
            headers: {
              accept: "text/plain",
            },
          }
        );
        const { name, phone, email } = response.data.data;
        setCustomer({ name, phone, email });
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className="flex flex-col mt-16 gap-16">
      <Typography variant="h4">REVIEW YOUR ORDER</Typography>
      <Box className="flex w-full justify-between">
        <Box component="form" className="flex flex-col gap-4 w-[60%]">
          <Box className="flex w-full gap-4">
            <TextField
              fullWidth
              label="Name"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={customer?.name}
            />
            <TextField
              fullWidth
              label="Phone"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={customer?.phone}
            />
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
              onChange={(date: Dayjs | null) => handleDatePickerChange(date)}
            />
          </LocalizationProvider>
          <TextField
            label="Note"
            multiline
            minRows={6}
            onChange={(event) => handleNoteChange(event.target.value)}
          />
        </Box>
        <Box className="flex flex-col max-h-xl gap-4 w-[30%]">
          <Typography variant="h4" fontWeight="bold">
            Order summary
          </Typography>
          <Box className="flex gap-4 items-center">
            <Avatar
              alt="avatar"
              src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/269922981_3016543585235258_3132946373432292991_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHyXr4F3Z-7d9fd9FodVyaH3eIc7-Lebuvd4hzv4t5u69TRSbqyc-nQJ4FCTPnEYsdvHCrH_NfhmndMvvTwTLm5&_nc_ohc=hibNpN-JsJgAX_ZRGqG&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAUMDS01ew0CeKkFvsV9LTw3w3q1mEaBP0lyw7h0aHHog&oe=660146D6"
            ></Avatar>
            <Typography variant="h6">{customer?.email}</Typography>
          </Box>
          <Divider className="bg-gray-600"></Divider>
          <Box className="flex flex-col ">
            <Box className="flex justify-between items-end w-full">
              <Typography>Place</Typography>
              <Typography variant="h6" fontWeight="bold">
                ${order.place.price}
              </Typography>
            </Box>
            <Box className="flex justify-between items-end w-full">
              <Typography>Menu</Typography>
              <Typography variant="h6" fontWeight="bold">
                ${order.menuPrice}
              </Typography>
            </Box>
            <Box className="flex justify-between items-end w-full">
              <Typography>Decoration</Typography>
              <Typography variant="h6" fontWeight="bold">
                ${order.decoration.price}
              </Typography>
            </Box>
          </Box>

          <Divider className="bg-gray-600"></Divider>

          <Box className="flex justify-between items-end w-full">
            <Typography>Total price</Typography>
            <Typography variant="h6" fontWeight="bold">
              ${order.totalPrice}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
