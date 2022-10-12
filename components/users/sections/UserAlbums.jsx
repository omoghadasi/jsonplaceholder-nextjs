import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAlbumsByUserId,
  fetchAlbumsByUserId,
} from "../../../slice/albumsSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper";
import "swiper/css/effect-creative";
import AlbumCard from "../../albums/AlbumCard";

export default function UserAlbums({ userId }) {
  const dispatch = useDispatch();
  const userAlbums = useSelector((state) =>
    selectAlbumsByUserId(state, userId)
  );
  useEffect(() => {
    if (!userAlbums.length && userId) {
      dispatch(fetchAlbumsByUserId(userId));
    }
  }, [dispatch, userAlbums.length, userId]);

  const content = userAlbums.map((album) => (
    <SwiperSlide key={album.id}>
      <AlbumCard albumId={album.id} />
    </SwiperSlide>
  ));
  return (
    <div>
      <h1 className="font-extrabold text-2xl mb-4">User Albums</h1>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="albumsSwiper"
      >
        {content}
      </Swiper>
    </div>
  );
}
