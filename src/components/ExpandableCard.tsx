import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { Box, Chip, IconButton, Rating, Tooltip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandableCardProps {
  name: string;
  description: string;
  tag: string;
  rating: string;
}

export default function ExpandableCard(props: ExpandableCardProps) {
  return (
    //   sx={{
    //     backgroundColor: "transparent",
    //     boxShadow: "none",
    //     color: "white",
    //     maxWidth: "320px",
    //     transition: "all .5s ease",
    //     "&:hover": {
    //       maxWidth: "400px",
    //     },
    //   }}
    //   onMouseEnter={() => setExpanded(true)}
    //   onMouseLeave={() => setExpanded(false)}
    // >
    //   <CardMedia
    //     component="img"
    //     height="194"
    //     image="https://mui.com/static/images/cards/paella.jpg"
    //     alt="Paella dish"
    //   />
    //   <Collapse in={expanded} unmountOnExit>
    //     <CardContent>
    //       <Box className="flex items-center w-full justify-between">
    //         <Typography variant="h4">{props.name}</Typography>
    //         <Chip
    //           label={`${props.tag}`}
    //           size="small"
    //           color="primary"
    //           icon={<VerifiedIcon />}
    //         ></Chip>
    //       </Box>
    //       <Box className="flex items-center gap-2">
    //         <Rating defaultValue={1} max={1} />
    //         <Typography component="legend">{props.rating}</Typography>
    //       </Box>
    //       <Typography paragraph>{props.description}</Typography>
    //       <Box className="flex items-center w-full justify-end">
    //         <Tooltip title="View detail">
    //           <IconButton
    //             size="small"
    //             sx={{
    //               border: "2px solid gray",
    //               color: "white",
    //               "&:hover": {
    //                 border: "2px solid white",
    //               },
    //             }}
    //           >
    //             <ExpandMoreIcon fontSize="large" />
    //           </IconButton>
    //         </Tooltip>
    //       </Box>
    //     </CardContent>
    //   </Collapse>
    // </Card>
    <div className="group rounded bg-zinc-900 col-span relative h-[12vw]">
      <img
        src="https://mui.com/static/images/cards/paella.jpg"
        alt="Movie"
        draggable={false}
        className="
      cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-md
      group-hover:opacity-90
      sm:group-hover:opacity-0
      delay-300
      w-full
      h-[12vw]
    "
      />
      <div
        className="
      opacity-0
      absolute
      top-0
      transition
      duration-200
      z-10
      invisible
      sm:visible
      delay-300
      w-full
      scale-0
      group-hover:scale-110
      group-hover:-translate-y-[6vw]
      group-hover:translate-x-[2vw]
      group-hover:opacity-100
    "
      >
        <img
          src="https://mui.com/static/images/cards/paella.jpg"
          alt="Movie"
          draggable={false}
          className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[12vw]
      "
        />
        <div
          className="
        z-10
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md
        "
        >
          <Box className="flex items-center w-full justify-between">
            <Typography variant="h5">{props.name}</Typography>
            <Chip
              label={`${props.tag}`}
              size="small"
              color="primary"
              icon={<VerifiedIcon />}
            ></Chip>
          </Box>
          <Box className="flex items-center gap-2">
            <Rating defaultValue={1} max={1} />
            <Typography component="legend">{props.rating}</Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ color: "gray" }}>
            {props.description}
          </Typography>
          <Box className="flex items-center w-full justify-end">
            <Tooltip title="View detail">
              <IconButton
                size="small"
                sx={{
                  border: "2px solid gray",
                  color: "white",
                  "&:hover": {
                    border: "2px solid white",
                  },
                }}
              >
                <ExpandMoreIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>
        </div>
      </div>
    </div>
  );
}
