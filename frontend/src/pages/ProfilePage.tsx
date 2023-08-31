import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Col, Row, Table } from "react-bootstrap";
import BookItem from "../components/BookItem";
import { useGetDefaultBooks } from "../hooks/bookHooks";
import LoadingMessage from "../components/LoadingMessage";

export const ProfilePage = () => {
  const {
    state: { mode, userInfo },
  } = useContext(Store);

  const { isLoading, data: books } = useGetDefaultBooks();

  return isLoading ? (
    <LoadingMessage />
  ) : userInfo ? (
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
      <h2 className="text-center my-4">Your Books</h2>
      <Row>
        {books!.map((book, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <BookItem book={book} />
          </Col>
        ))}
      </Row>
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
