// types.d.ts
// declare module "pannellum" {
//   export function viewer(
//     element: HTMLElement,
//     configuration: {
//       type: "equirectangular";
//       panorama: string;
//       autoLoad: boolean;
//     }
//   ): any;
// }
declare module "react-pannellum" {
  interface ReactPannellumProps {
    id?: string;
    sceneId?: string;
    imageSource?: string;
    config?: any;
    style?: any;
  }

  const ReactPannellum: React.ComponentType<ReactPannellumProps>;
  export default ReactPannellum;
}
