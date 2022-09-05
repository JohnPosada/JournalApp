export const fileUpload = async (file) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/dvy1lvxmu/upload";

  const formData = new FormData();
  formData.append("upload_preset", "journal-react");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("image could not be uploaded");
    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
