import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { AiOutlineCamera } from "react-icons/ai";

const NewsCard = ({ image, date, title, link }) => {
  // Function to format the date and time

  const formatDate = (dateString) => {
    const dateTime = new Date(dateString);
    const today = new Date();

    // Check if the date is today
    if (
      dateTime.getUTCFullYear() === today.getUTCFullYear() &&
      dateTime.getUTCMonth() === today.getUTCMonth() &&
      dateTime.getUTCDate() === today.getUTCDate()
    ) {
      const hours = dateTime.getUTCHours();
      const minutes = dateTime.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${hours % 12 || 12}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${ampm}`;
      return { formattedDate: "Today", formattedTime };
    }

    // Extract date components
    const monthAbbreviation = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(dateTime);
    const day = dateTime.getUTCDate();

    let hours = dateTime.getUTCHours();
    const minutes = dateTime.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    const formattedDate = `${monthAbbreviation} ${day}`;
    const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;

    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(date);

  const isImageLink = image.match(/\.(jpeg|jpg|png)$/);

  return (
    <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-6 mb-8 ">
      <Card variant="outlined" sx={{ width: 320 }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            {isImageLink ? (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={image} srcSet={image} loading="lazy" alt={title} />
              </a>
            ) : (
              <a href={link} target="_blank" rel="noopener noreferrer">
                <AiOutlineCamera
                  size={200}
                  className="w-full h-48 rounded-lg object-cover"
                />
              </a>
            )}
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Typography level="title-lg">{title}</Typography>
          </a>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              {formattedDate}
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              {formattedTime}
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default NewsCard;
