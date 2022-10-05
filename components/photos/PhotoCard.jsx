/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectPhotoById } from "../../slice/photosSlice";
import { selectPostById } from "../../slice/postsSlice";
import { selectAlbumById } from "../../slice/albumsSlice";

export default function PhotoCard({ photoId }) {
  const photo = useSelector((state) => selectPhotoById(state, photoId));
  const album = useSelector((state) => selectAlbumById(state, photo.albumId));
  return (
    <div className="group bg-base-200 overflow-hidden rounded-lg text-white">
      <img src={photo.url} alt={photo.title} />
      <Link href={`photos/${photo.id}`}>
        <a
          className="
        overlay 
        absolute 
        inset-0 
        bg-base-200 
        rounded-lg 
        bg-opacity-80 
        flex items-end 
        p-5 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
        >
          <div className="flex items-center">
            <img
              className="rounded-full max-w-[70px] mr-3"
              src={photo.thumbnailUrl}
              alt={photo.title}
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold">{photo.title}</span>
              <span className="text-xs">
                Album: {album ? album.title : "Unknown Alboum"}
              </span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
