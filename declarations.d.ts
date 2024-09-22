declare module "*.svg" {
  // For svg imports to work
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "@env" {
  export const IN_PROGRESS: string;
  // Добавьте сюда любые другие переменные из Config.env файла
}
