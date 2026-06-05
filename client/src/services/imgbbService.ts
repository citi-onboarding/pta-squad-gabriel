// envia a imagem pro ImgBB e retorna a URL pública
export async function uploadImagem(arquivo: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", arquivo);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error("Erro ao fazer upload da imagem.");
  }

  return data.data.url;
}