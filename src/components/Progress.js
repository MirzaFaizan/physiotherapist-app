import React from "react";
import { Assets } from "../config/Asset-Config";

export const Progress = () => {
  return (
    <div className="p-2">
      <h3 className="custom-active font-weight-bold">Progress</h3>
      <div className="h-100 w-100">
        <img src={Assets.chart} alt="" />
      </div>
    </div>
  );
};
