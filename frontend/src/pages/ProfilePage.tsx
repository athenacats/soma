/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useGetUserRatedBooks } from "../hooks/bookHooks";
import LoadingMessage from "../components/LoadingMessage";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

export const ProfilePage = () => {
  const {
    state: { mode, userInfo },
  } = useContext(Store);

  const { isLoading, data: books } = useGetUserRatedBooks(userInfo!._id);

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
      {!books || !books[0] ? (
        <p style={{ textAlign: "center" }}>
          <i>You haven't rated any book yet </i>
        </p>
      ) : (
        <Row>
          {books!.map((dataItem: any, index: number) => {
            const book = dataItem.book;

            return (
              <Col key={index} sm={6} md={4} lg={3}>
                <Card className="mb-3" style={{ cursor: "pointer" }}>
                  <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
                    <img
                      src={book.image}
                      className="card-img-top"
                      alt={book.name}
                    />
                  </Link>
                  <Card.Body>
                    <Link to={`/book/${book.slugName}/${book.slugAuthor}`}>
                      <Card.Title>{book.name}</Card.Title>

                      <Card.Subtitle>by {book.author}</Card.Subtitle>
                    </Link>
                    <Rating yourRating={dataItem.rating} book={book} />
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
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
