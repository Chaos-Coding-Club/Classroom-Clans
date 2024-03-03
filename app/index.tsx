import { Redirect } from "expo-router";
import React from "react";

const RedirectComponent: React.FC = () => {
  return <Redirect href="/(app)/Home" />;
};

export default RedirectComponent;
