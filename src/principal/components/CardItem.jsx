import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Link,
  Button,
} from "@mui/material";
import { addFavoriteCharacter } from "../../store/principal/thunks";
import { setActiveCharacter } from "../../store/principal/characterSlice";
import { FavoriteButton } from "./FavoriteButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { isInfavorite } from "../../helpers/isInfavorites";

import "sweetalert2/dist/sweetalert2.css";
import CheckIcon from "@mui/icons-material/Check";

export const CardItem = ({
  title,
  url,
  image,
  id,
  species,
  name,
  created,
  status,
}) => {
  const { favorites } = useSelector((state) => state.characters);

  const dispatch = useDispatch();

  const onClickAddFavorite = () => {
    dispatch(
      addFavoriteCharacter({ url, image, species, name, id, created, status })
    );
  };

  const onCLickSelectCharacter = () => {
    dispatch(setActiveCharacter({ image, id, species, name, created, status }));
  };


  return (
    <Card
      sx={{ maxWidth: 450, marginBottom: 2 }}
      key={title}
      onClick={onCLickSelectCharacter}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          alt={title}
          sx={{ padding: 1, marginBottom: 1 }}
          src={image}
        />
        <CardContent sx={{display: { xs: 'none', lg: 'block', xl: 'block' }}}>
          {isInfavorite(created, favorites) ? (
            <FavoriteIcon
              style={{
                position: "absolute",
                bottom: "390px",
                left: "300px",
                fontSize: "40px",
                
              }}
              
              color="success"
            />
          ) : (
            <FavoriteIcon
              color="warning"
              style={{
                position: "absolute",
                bottom: "390px",
                left: "300px",
                fontSize: "40px",
                
              }}
            />
          )}

          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {species}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isInfavorite(created, favorites) ? (
          <>
            {" "}
            <CheckIcon color="warning" />
          </>
        ) : (
          <Button onClick={onClickAddFavorite}>
            <FavoriteButton />
          </Button>
        )}

        <Link
          component={RouterLink}
          size="small"
          color="primary"
          to={`character/${id}`}
        >
          <Button onClick={onCLickSelectCharacter}>Más información </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
