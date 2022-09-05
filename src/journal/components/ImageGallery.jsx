import { ImageListItem, ImageList } from "@mui/material";
import { useSelector } from "react-redux";

export const ImageGallery = () => {
  const { active: note } = useSelector((state) => state.journal);
  const { imageUrls } = note;
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {imageUrls.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="note image"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
