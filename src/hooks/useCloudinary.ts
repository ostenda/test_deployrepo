import { Cloudinary } from "@cloudinary/url-gen";

export default function useCloudinary(){
    const cloud = new Cloudinary({
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }
    });

    return { Cloudinary: cloud}
}