


export const clientGetS3URL = async (fileName: string) => {
    const encodedFileName = encodeURIComponent(fileName)
   const signedUrl = await fetch(`/api/AWS/signedURL?fileName=${encodedFileName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    return signedUrl
}