import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Table } from "react-bootstrap";

export const ProfilePage = () => {
  const {
    state: { mode, userInfo },
  } = useContext(Store);

  return userInfo ? (
    <div>
      <Helmet>
        <title>Your Profile</title>
      </Helmet>
      <h1>Welcome, {userInfo?.name}!</h1>
      <Table
        striped
        bordered
        hover
        variant={mode === "light" ? "light" : "dark"}
        className="mt-4 w-70"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userInfo.name}</td>
            <td>{userInfo.email}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  ) : (
    <div>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <h1>Please sign in to see your details</h1>
    </div>
  );
};
