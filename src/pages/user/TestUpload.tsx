import { ChangeEvent, useState } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import { Avatar, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { styled } from '@mui/material/styles';

const TestUpload = () => {

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUpload, setImageUpload] = useState<File | null>(null);

    const uploadFile = (file: File) => {
        if (file == null) return;
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImageUpload(file);
            uploadFile(file);
        }
    };

    return (
        <div>
            <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleImageChange}
                hidden
            />
            <label htmlFor="icon-button-file">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <ModeEditIcon />
                </IconButton>
            </label>
            {imageUrls.length > 0 && (
                <Avatar
                    alt="Uploaded Image"
                    src={imageUrls[imageUrls.length - 1]}
                    sx={{ width: 100, height: 100 }}
                />
            )}
        </div>
    );
};

export default TestUpload;