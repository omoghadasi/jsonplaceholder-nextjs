import React from "react";

export default function UserInfo() {
  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <div className="flex gap-4 flex-wrap">
        <span className="w-[32%]">id: 10000</span>
        <span className="w-[32%]">name: ali</span>
        <span className="w-[32%]">username: akbar</span>
        <span className="w-[32%]">email: omoghadasi@gmail.com</span>
        <span className="w-[32%]">phone: 0913642451</span>
        <span className="w-[32%]">website: http://mrjunior.ir</span>
      </div>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
      >
        <div className="collapse-title text-xl font-medium">
          Address: this is test
        </div>
        <div className="collapse-content">
          <p>tabIndex={0} attribute is necessary to make the div focusable</p>
        </div>
      </div>
      <div
        tabIndex={1}
        className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
      >
        <div className="collapse-title text-xl font-medium">
          company: this is test
        </div>
        <div className="collapse-content">
          <p>tabIndex={1} attribute is necessary to make the div focusable</p>
        </div>
      </div>
    </div>
  );
}
