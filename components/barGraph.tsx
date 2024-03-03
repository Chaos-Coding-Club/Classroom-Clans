import * as scale from "d3-scale";
import React from "react";
import { View } from "react-native";
import { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { BarChart } from "react-native-svg-charts";

type DataPoint = {
  value: number;
  label: string;
};

const data: DataPoint[] = [
  { value: 50, label: "Class 1" },
  { value: 10, label: "Class 2" },
  { value: 40, label: "Class 3" },
  { value: 95, label: "Class 4" },
  { value: 85, label: "Class 5" },
];

const GradientBarGraph: React.FC = () => {
  const Decorator = ({
    x,
    y,
    bandwidth,
  }: {
    x: (index: number) => number;
    y: (value: number) => number;
    bandwidth: number;
  }) => {
    return data.map((value, index) => (
      <Rect
        key={index}
        x={x(index)}
        y={y(value.value)}
        width={bandwidth}
        height={y(0) - y(value.value)}
        fill={`url(#gradient-${index})`}
        stroke={value.value > 50 ? "#00FFCC" : "#FF00CC"} // Neon green for values above 50, neon red otherwise
        strokeWidth={2}
      />
    ));
  };

  return (
    <View>
      <BarChart
        style={{ height: 200 }}
        data={data}
        yAccessor={({ item }) => item.value}
        xAccessor={({ index }) => index}
        contentInset={{ top: 10, bottom: 10 }}
        gridMin={0}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        xScale={scale.scaleBand}
        spacingInner={0.2}
        spacingOuter={0.2}
      >
        <Defs>
          {data.map((item, index) => (
            <LinearGradient
              key={index}
              id={`gradient-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
            >
              <Stop
                offset="0%"
                stopColor={item.value > 50 ? "#00ff00" : "#ff0000"}
                stopOpacity="1"
              />
              <Stop
                offset="100%"
                stopColor={item.value > 50 ? "#007f00" : "#7f0000"}
                stopOpacity="1"
              />
            </LinearGradient>
          ))}
        </Defs>
        <Decorator
          bandwidth={scale.scaleBand().bandwidth()}
          x={function (index: number): number {
            throw new Error("Function not implemented.");
          }}
          y={function (value: number): number {
            throw new Error("Function not implemented.");
          }}
        />
      </BarChart>
    </View>
  );
};

export default GradientBarGraph;
