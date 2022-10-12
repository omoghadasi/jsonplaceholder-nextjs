import React from "react";

export default function UserInfo({ user }) {
  const address = user.address;
  const company = user.company;
  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <div className="flex gap-4 flex-wrap">
        <span className="w-[32%]">id: {user.id}</span>
        <span className="w-[32%]">name: {user.name}</span>
        <span className="w-[32%]">username: {user.username}</span>
        <span className="w-[32%]">email: {user.email}</span>
        <span className="w-[32%]">phone: {user.phone}</span>
        <span className="w-[32%]">website: {user.website}</span>
      </div>
      <div className="flex gap-4 items-start mt-4">
        <div className="flex-grow bg-base-300 p-4 rounded-lg">
          <h1 className="font-bold">Address</h1>
          <ul>
            <li>Street: {address.street}</li>
            <li>Suite: {address.suite}</li>
            <li>City: {address.city}</li>
          </ul>
        </div>
        <div className="flex-grow bg-base-300 p-4 rounded-lg">
          <h1 className="font-bold">Company</h1>
          <ul>
            <li>Name: {company.name}</li>
            <li>Catch Phrase: {company.catchPhrase}</li>
            <li>BS: {company.bs}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
