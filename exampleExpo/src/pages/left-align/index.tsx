import * as React from "react";
import { View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";

import { SBItem } from "../../components/SBItem";
import SButton from "../../components/SButton";
import { ElementsText, window } from "../../constants";

const PAGE_WIDTH = window.width;

function Index() {
  const [data, setData] = React.useState([...new Array(6).keys()]);
  const [isFast, setIsFast] = React.useState(false);
  const [isAutoPlay, setIsAutoPlay] = React.useState(false);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loop, setLoop] = React.useState(true);
  const [justifyContent, setJustifyContent] = React.useState<"center" | "flex-start">("flex-start");
  const ref = React.useRef<ICarouselInstance>(null);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH * 0.85,
    height: PAGE_WIDTH / 2,
  } as const;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop={loop}
        ref={ref}
        style={{ width: "100%", justifyContent }}
        autoPlay={isAutoPlay}
        autoPlayInterval={isFast ? 100 : 2000}
        data={data}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={index => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View style={{ flex: 1, marginLeft: "2.5%" }}>
            <SBItem key={index} index={index} />
          </View>
        )}
        onProgressChange={(_, absoluteProgress) => {
          setCurrentIndex(Math.round(absoluteProgress));
        }}
      />
      <SButton
        onPress={undefined}
      >
        {`Current index: ${currentIndex}`}
      </SButton>
      <SButton
        onPress={() => {
          setJustifyContent(justifyContent === "center" ? "flex-start" : "center");
        }}
      >
        {`Justify content: ${justifyContent}`}
      </SButton>
      <SButton
        onPress={() => {
          setLoop(!loop);
        }}
      >
        {`Loop: ${String(loop)}`}
      </SButton>
      <SButton
        onPress={() => {
          setIsFast(!isFast);
        }}
      >
        {isFast ? "NORMAL" : "FAST"}
      </SButton>
      <SButton
        onPress={() => {
          setIsPagingEnabled(!isPagingEnabled);
        }}
      >
                PagingEnabled:{isPagingEnabled.toString()}
      </SButton>
      <SButton
        onPress={() => {
          setIsAutoPlay(!isAutoPlay);
        }}
      >
        {ElementsText.AUTOPLAY}:{`${isAutoPlay}`}
      </SButton>
      <SButton
        onPress={() => {
          console.log(ref.current?.getCurrentIndex());
        }}
      >
                Log current index
      </SButton>
      <SButton
        onPress={() => {
          setData(
            data.length === 6
              ? [...new Array(8).keys()]
              : [...new Array(6).keys()],
          );
        }}
      >
                Change data length to:{data.length === 6 ? 8 : 6}
      </SButton>
      <SButton
        onPress={() => {
          ref.current?.scrollTo({ count: -1, animated: true });
        }}
      >
                prev
      </SButton>
      <SButton
        onPress={() => {
          ref.current?.scrollTo({ count: 1, animated: true });
        }}
      >
                next
      </SButton>
    </View>
  );
}

export default Index;
