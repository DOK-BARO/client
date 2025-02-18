type ConvertUrlsToImgProps = {
  urls: string[];
  renderImage: (url: string) => JSX.Element;
};

export const convertUrlsToImg = async ({
  urls,
  renderImage,
}: ConvertUrlsToImgProps): Promise<JSX.Element[]> => {
  const files = await Promise.all(
    urls.map(async (url) => {
      return renderImage(url);
    }),
  );
  return files;
};
