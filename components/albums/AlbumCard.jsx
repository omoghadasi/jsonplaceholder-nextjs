/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAlbumById } from "../../slice/albumsSlice";
import {
  selectPhotoByAlbumId,
  fetchPhotosByAlbumId,
} from "../../slice/photosSlice";
import AlbumUser from "./AlbumUser";

export default function AlbumCard({ albumId }) {
  const dispatch = useDispatch();
  const album = useSelector((state) => selectAlbumById(state, albumId));
  const albumPhotos = useSelector((state) =>
    selectPhotoByAlbumId(state, albumId)
  );
  useEffect(() => {
    if (!albumPhotos.length && album.id) {
      dispatch(fetchPhotosByAlbumId(album.id));
    }
  }, [album.id, albumPhotos.length, dispatch]);

  const albumPhotosSlice = albumPhotos.slice(0, 6);
  const content = albumPhotosSlice.map((photo) => (
    <img
      className="w-1/3 rounded-lg max-w-[123px]"
      src={photo.thumbnailUrl}
      key={photo.id}
      alt={photo.title}
    />
  ));
  return (
    <Link href={`albums/${albumId}`}>
      <a className="block bg-base-200 hover:bg-base-300 p-4 rounded-lg text-white">
        <h2 className="text-center">{album.title}</h2>
        <AlbumUser userId={album.userId} />
        <div className="flex flex-wrap gap-3 mt-3">{content}</div>
      </a>
    </Link>
  );
}
