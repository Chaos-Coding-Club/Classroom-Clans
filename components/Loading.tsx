import { Spinner } from "tamagui";

interface LoadingProps {
  size?: "small" | "large";
  color?: string;
}
const Loading: React.FC<LoadingProps> = ({ size, color }) => {
  return (
    <Spinner
      theme="ProgressIndicator"
      size={size ?? "small"}
      color={color ?? "$green10"}
    />
  );
};

export { Loading };
