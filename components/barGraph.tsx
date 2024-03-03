// import * as scale from "d3-scale";
// import React from "react";
// import { View } from "react-native";
// import { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
// import { BarChart } from "react-native-svg-charts";

// interface DataPoint {
//   value: number;
//   label: string;
// }

// const GradientBarGraph: React.FC<{ data: DataPoint[] }> = ({ data }) => {
//   const Decorator = ({
//     x,
//     y,
//     bandwidth,
//   }: {
//     x: (index: number) => number;
//     y: (value: number) => number;
//     bandwidth: number;
//   }) => {
//     return data.map((value, index) => (
//       <Rect
//         key={index}
//         x={x(index)}
//         y={y(value.value)}
//         width={bandwidth}
//         height={y(0) - y(value.value)}
//         fill={`url(#gradient-${index})`}
//         stroke={value.value > 50 ? "#00FFCC" : "#FF00CC"} // Neon green for values above 50, neon red otherwise
//         strokeWidth={2}
//       />
//     ));
//   };

//   return (
//     <View>
//       <BarChart
//         style={{ height: 200 }}
//         data={data}
//         yAccessor={({ item }) => item.value}
//         xAccessor={({ index }) => index}
//         contentInset={{ top: 10, bottom: 10 }}
//         gridMin={0}
//         svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
//         xScale={scale.scaleBand}
//         spacingInner={0.2}
//         spacingOuter={0.2}
//       >
//         <Defs>
//           {data.map((item, index) => (
//             <LinearGradient
//               key={index}
//               id={`gradient-${index}`}
//               x1="0"
//               y1="0"
//               x2="0"
//               y2="100%"
//             >
//               <Stop
//                 offset="0%"
//                 stopColor={item.value > 50 ? "#00ff00" : "#ff0000"}
//                 stopOpacity="1"
//               />
//               <Stop
//                 offset="100%"
//                 stopColor={item.value > 50 ? "#007f00" : "#7f0000"}
//                 stopOpacity="1"
//               />
//             </LinearGradient>
//           ))}
//         </Defs>
//         <Decorator
//           bandwidth={scale.scaleBand().bandwidth()}
//           x={function (index: number): number {
//             throw new Error("Function not implemented.");
//           }}
//           y={function (value: number): number {
//             throw new Error("Function not implemented.");
//           }}
//         />
//       </BarChart>
//     </View>
//   );
// };

// export { GradientBarGraph, DataPoint };

// import React from "react";
// import { View } from "react-native";
// import { BarChart } from "react-native-svg-charts";
// import { Defs, LinearGradient, Stop, Rect, Text } from "react-native-svg";
// import * as scale from "d3-scale";

// interface DataPoint {
//   value: number;
//   label: string;
// }

// const GradientBarGraph: React.FC<{ data: DataPoint[] }> = ({ data }) => {
//   const xScale = scale
//     .scaleBand()
//     .domain(data.map((_, index) => index.toString()))
//     .range([0, data.length * 50])
//     .paddingInner(0.2)
//     .paddingOuter(0.2);

//   const Decorator = ({
//     x,
//     y,
//     bandwidth,
//   }: {
//     x: (index: number) => number;
//     y: (value: number) => number;
//     bandwidth: number;
//   }) => {
//     return (
//       <>
//         {data.map((value, index) => (
//           <Rect
//             key={index}
//             x={x(index)}
//             y={y(value.value)}
//             width={bandwidth}
//             height={y(0) - y(value.value)}
//             fill={`url(#gradient-${index})`}
//             stroke={value.value > 50 ? "#00FFCC" : "#FF00CC"}
//             strokeWidth={2}
//           />
//         ))}
//         {data.map((value, index) => (
//           <Text
//             key={`label-${index}`}
//             x={x(index) + bandwidth / 2}
//             y={y(0) + 15}
//             fontSize={12}
//             fill="black"
//             alignmentBaseline="middle"
//             textAnchor="middle"
//           >
//             {value.label}
//           </Text>
//         ))}
//         {data.map((value, index) => (
//           <Text
//             key={`value-${index}`}
//             x={x(index) + bandwidth / 2}
//             y={y(0) + 30}
//             fontSize={12}
//             fill="#666"
//             alignmentBaseline="middle"
//             textAnchor="middle"
//           >
//             {value.label}
//           </Text>
//         ))}
//       </>
//     );
//   };

//   return (
//     <View>
//       <BarChart
//         style={{ height: 200 }}
//         data={data}
//         yAccessor={({ item }) => item.value}
//         xAccessor={({ index }) => index}
//         contentInset={{ top: 10, bottom: 50 }} // Adjusted bottom inset to accommodate labels and values
//         gridMin={0}
//         svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
//         xScale={scale.scaleBand}
//       >
//         <Defs>
//           {data.map((item, index) => (
//             <LinearGradient
//               key={index}
//               id={`gradient-${index}`}
//               x1="0"
//               y1="0"
//               x2="0"
//               y2="100%"
//             >
//               <Stop
//                 offset="0%"
//                 stopColor={item.value > 50 ? "#00ff00" : "#ff0000"}
//                 stopOpacity="1"
//               />
//               <Stop
//                 offset="100%"
//                 stopColor={item.value > 50 ? "#007f00" : "#7f0000"}
//                 stopOpacity="1"
//               />
//             </LinearGradient>
//           ))}
//         </Defs>
//         <Decorator
//           bandwidth={xScale.bandwidth()}
//           x={(index) => xScale(index.toString()) ?? 0}
//           y={(value: number) =>
//             scale
//               .scaleLinear()
//               .domain([0, Math.max(...data.map((d) => d.value))])
//               .range([200, 0])(value)
//           }
//         />
//       </BarChart>
//     </View>
//   );
// };

// export { GradientBarGraph, DataPoint };

// import React from "react";
// import { View } from "react-native";
// import { BarChart } from "react-native-svg-charts";
// import { Defs, LinearGradient, Stop, Rect, Text } from "react-native-svg";
// import * as scale from "d3-scale";

// interface DataPoint {
//   value: number;
//   label: string;
// }

// const GradientBarGraph: React.FC<{ data: DataPoint[] }> = ({ data }) => {
//   const xScale = scale
//     .scaleBand()
//     .domain(data.map((_, index) => index.toString()))
//     .range([0, data.length * 50])
//     .paddingInner(0.2)
//     .paddingOuter(0.2);

//   const Decorator = ({
//     x,
//     y,
//     bandwidth,
//   }: {
//     x: (index: number) => number;
//     y: (value: number) => number;
//     bandwidth: number;
//   }) => {
//     return (
//       <>
//         {data.map((value, index) => (
//           <Rect
//             key={index}
//             x={x(index)}
//             y={y(value.value)}
//             width={bandwidth}
//             height={y(0) - y(value.value)}
//             fill={`url(#gradient-${index})`}
//             stroke={value.value > 50 ? "#00FFCC" : "#FF00CC"}
//             strokeWidth={2}
//           />
//         ))}
//         {data.map((value, index) => (
//           <Text
//             key={`value-${index}`}
//             x={x(index) + bandwidth / 2}
//             y={y(value.value) - 10} // Position the label slightly above the top of each bar
//             fontSize={12}
//             fill="cyan"
//             alignmentBaseline="middle"
//             textAnchor="middle"
//           >
//             {value.value}
//           </Text>
//         ))}
//       </>
//     );
//   };

//   return (
//     <View>
//       <BarChart
//         style={{ height: 200 }}
//         data={data}
//         yAccessor={({ item }) => item.value}
//         xAccessor={({ index }) => index}
//         contentInset={{ top: 30, bottom: 10 }} // Adjust top contentInset to avoid clipping the value labels
//         gridMin={0}
//         svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
//         xScale={scale.scaleBand}
//       >
//         <Defs>
//           {data.map((item, index) => (
//             <LinearGradient
//               key={index}
//               id={`gradient-${index}`}
//               x1="0"
//               y1="0"
//               x2="0"
//               y2="100%"
//             >
//               <Stop
//                 offset="0%"
//                 stopColor={item.value > 50 ? "#00ff00" : "#ff0000"}
//                 stopOpacity="1"
//               />
//               <Stop
//                 offset="100%"
//                 stopColor={item.value > 50 ? "#007f00" : "#7f0000"}
//                 stopOpacity="1"
//               />
//             </LinearGradient>
//           ))}
//         </Defs>
//         <Decorator
//           bandwidth={xScale.bandwidth()}
//           x={(index) => xScale(index.toString()) ?? 0}
//           y={(value: number) =>
//             scale
//               .scaleLinear()
//               .domain([0, Math.max(...data.map((d) => d.value))])
//               .range([200, 0])(value)
//           }
//         />
//       </BarChart>
//     </View>
//   );
// };

// export { GradientBarGraph, DataPoint };

import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop, Rect, Text } from "react-native-svg";
import * as scale from "d3-scale";

interface DataPoint {
  value: number;
  label: string;
}

const GradientBarGraph: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const xScale = scale
    .scaleBand()
    .domain(data.map((_, index) => index.toString()))
    .range([0, data.length * 50])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const Decorator = ({
    x,
    y,
    bandwidth,
  }: {
    x: (index: number) => number;
    y: (value: number) => number;
    bandwidth: number;
  }) => {
    return (
      <>
        {data.map((value, index) => (
          <Rect
            key={index}
            x={x(index)}
            y={y(value.value)}
            width={bandwidth}
            height={y(0) - y(value.value)}
            fill={`url(#gradient-${index})`}
            stroke={value.value > 50 ? "#00FFCC" : "#FF00CC"}
            strokeWidth={2}
          />
        ))}
        {data.map((value, index) => (
          <Text
            key={`value-${index}`}
            x={x(index) + bandwidth / 2}
            y={y(value.value) - 10} // Position the label slightly above the top of each bar
            fontSize={12}
            fill="cyan"
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {value.value}
          </Text>
        ))}
        {data.map((value, index) => (
          <Text
            key={`label-${index}`}
            x={x(index) + bandwidth / 2}
            y={240} // Position the label below the x-axis
            fontSize={12}
            fill="cyan"
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {value.label}
          </Text>
        ))}
      </>
    );
  };

  return (
    <View>
      <BarChart
        style={{ height: 250 }} // Increase height to accommodate x-axis labels
        data={data}
        yAccessor={({ item }) => item.value}
        xAccessor={({ index }) => index}
        contentInset={{ top: 30, bottom: 30 }} // Adjust contentInset to avoid clipping
        gridMin={0}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        xScale={scale.scaleBand}
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
          bandwidth={xScale.bandwidth()}
          x={(index) => xScale(index.toString()) ?? 0}
          y={(value: number) =>
            scale
              .scaleLinear()
              .domain([0, Math.max(...data.map((d) => d.value))])
              .range([200, 0])(value)
          }
        />
      </BarChart>
    </View>
  );
};

export { GradientBarGraph, DataPoint };
