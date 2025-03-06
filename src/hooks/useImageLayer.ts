import { useState } from "react";

export interface ImageType {
  index: number;
  src: string;
}

interface UseImageLayerReturn {
  clickedImage: ImageType | undefined;
  handleImageClicked: (image: ImageType) => void;
  handleCloseLayer: () => void;
  handleArrowClick: (e: React.MouseEvent, direction: "left" | "right") => void;
}

const useImageLayer = (imageList: string[]): UseImageLayerReturn => {
  const [clickedImage, setClickedImage] = useState<ImageType | undefined>(
    undefined,
  );

  // 해설 사진 클릭 시 확대 보기
  const handleImageClicked = (image: ImageType) => {
    setClickedImage(image);
  };

  // 닫기
  const handleCloseLayer = () => {
    setClickedImage(undefined);
  };

  // 화살표 클릭 시
  const handleArrowClick = (
    e: React.MouseEvent,
    direction: "left" | "right",
  ) => {
    e.stopPropagation();
    setClickedImage((prev) => {
      if (!prev || !imageList) return undefined;

      const newIndex = direction === "left" ? prev.index - 1 : prev.index + 1;

      if (newIndex < 0 || newIndex >= imageList.length) {
        return prev;
      }

      return {
        index: newIndex,
        src: imageList[newIndex],
      };
    });
  };

  return {
    clickedImage,
    handleImageClicked,
    handleCloseLayer,
    handleArrowClick,
  };
};

export default useImageLayer;
