import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { AiOutlineCamera } from "react-icons/ai";

const NewsCard = ({ image, date, title, link }) => {
  const isImageLink = image.match(/\.(jpeg|jpg|png)$/);

  return (
    <div className="flex-shrink-0 sm:w-1/2  lg:w-1/3 xl:w-1/4 px-2 mb-8">
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
              {date}
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default NewsCard;
